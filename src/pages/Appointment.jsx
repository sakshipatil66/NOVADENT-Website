
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  Phone,
  Mail,
  ArrowUpRight,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Clock3,
} from "lucide-react";
import "./Appointment.css";

const services = [
  "General Dental Care",
  "Dental Check-Up",
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Implants",
  "Braces & Aligners",
  "Orthodontics",
  "Dental Crowns",
  "Root Canal Care",
  "Gum Health Care",
  "Cosmetic Dentistry",
];

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

const getToday = () => {
  const date = new Date();

  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);
};

function formatDate(value) {
  if (!value) return "Not selected";

  const date = new Date(`${value}T12:00:00`);

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
}

function getNotificationErrors(notifications) {
  if (!notifications) return [];

  return Object.entries(notifications)
    .filter(
      ([key, value]) =>
        key.endsWith("Error") && Boolean(value)
    )
    .map(([, value]) => value);
}

export default function Appointment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedDoctor = searchParams.get("doctor") || "";
  const selectedTreatment = searchParams.get("treatment") || "";

  const initialService = services.includes(selectedTreatment)
    ? selectedTreatment
    : "";

  const [form, setForm] = useState(() => ({
    ...initialForm,
    service: initialService,
  }));

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(null);

  const today = getToday();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    const digits = form.phone.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      setSubmitError(
        "Please enter a valid phone number, including your country code."
      );
      return;
    }

    if (form.date < today) {
      setSubmitError(
        "Please select today or a future appointment date."
      );
      return;
    }

    const request = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      doctor: selectedDoctor || "Any available doctor",
      service: form.service,
      date: form.date,
      time: form.time,
      message: form.message.trim(),

      // Kept for compatibility with the existing backend.
      // This does not trigger a WhatsApp message by itself.
      whatsappConsent: true,
    };

    setSubmitting(true);

    try {
      const response = await fetch(
        "/.netlify/functions/appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (
        !response.ok ||
        result.requestAccepted !== true
      ) {
        const notificationErrors = getNotificationErrors(
          result.notifications
        );

        throw new Error(
          result.message ||
            notificationErrors[0] ||
            "We couldn't submit your request. Please try again."
        );
      }

      setNotificationStatus(result.notifications || null);

      // Optional local copy for this browser.
      // The server remains responsible for processing notifications.
      try {
        const stored = JSON.parse(
          window.localStorage.getItem(
            "novadent_appointment_requests"
          ) || "[]"
        );

        const safeStored = Array.isArray(stored) ? stored : [];

        window.localStorage.setItem(
          "novadent_appointment_requests",
          JSON.stringify(
            [
              {
                ...request,
                id: `NOVA-${Date.now()}`,
                createdAt: new Date().toISOString(),
                status: "Pending",
              },
              ...safeStored,
            ].slice(0, 100)
          )
        );
      } catch (storageError) {
        console.warn(
          "Could not save the local appointment copy:",
          storageError
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Appointment submission failed:", error);

      setSubmitError(
        error instanceof TypeError
          ? "Unable to connect to the appointment server. Please run the site with Netlify Dev and try again."
          : error.message ||
              "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewAppointment = () => {
    setForm({
      ...initialForm,
      service: initialService,
    });

    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
    setNotificationStatus(null);

    window.setTimeout(() => {
      document
        .getElementById("appointment-form-title")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 0);
  };

  return (
    <main className="novaAppointmentPage">
      {/* APPOINTMENT HERO */}

      <section
        className="novaAppointmentHero"
        aria-labelledby="appointment-hero-title"
      >
        <div className="appointmentHeroGlow" />

        <div className="appointmentContainer appointmentHeroGrid">
          <div className="appointmentHeroContent">
            <span className="appointmentEyebrow">
              <CalendarDays size={16} aria-hidden="true" />
              NOVADENT · APPOINTMENTS
            </span>

            <h1 id="appointment-hero-title">
              Your smile <em>deserves better care.</em>
            </h1>

            <p>
              Take the first step toward a healthier, more confident
              smile. Send us your preferred appointment details and
              our team can follow up to discuss availability.
            </p>

            <div className="appointmentTrustRow">
              <div>
                <CheckCircle size={17} aria-hidden="true" />
                <span>Easy Booking</span>
              </div>

              <div>
                <ShieldCheck size={17} aria-hidden="true" />
                <span>Patient First</span>
              </div>

              <div>
                <Sparkles size={17} aria-hidden="true" />
                <span>Personalized Care</span>
              </div>
            </div>
          </div>

          <div className="appointmentHeroVisual">
            <div className="appointmentHeroImage">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=90"
                alt="Modern dental care interior"
              />

              <div className="appointmentImageOverlay" />
            </div>

            <div className="appointmentFloatingCard">
              <div className="floatingIcon">
                <CalendarDays size={20} aria-hidden="true" />
              </div>

              <div>
                <strong>Flexible Scheduling</strong>
                <span>Choose your preferred time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="appointmentIntro">
        <div className="appointmentContainer appointmentIntroGrid">
          <div className="appointmentIntroHeading">
            <span className="appointmentOverline">
              PLAN YOUR VISIT
            </span>

            <small>01 / APPOINTMENT</small>

            <h2>
              Simple booking. <em>Comfortable care.</em>
            </h2>

            <p className="appointmentIntroLead">
              Share your preferences and take the next step toward
              the smile you deserve.
            </p>
          </div>

          <div className="appointmentIntroText">
            <div className="appointmentInfoCard">
              <span className="appointmentInfoNumber">01</span>

              <div>
                <h3>Clinic Hours</h3>
                <p>Monday – Sunday · 10:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className="appointmentInfoCard">
              <span className="appointmentInfoNumber">02</span>

              <div>
                <h3>Visit NOVADENT</h3>
                <p>Kharadi, Pune, Maharashtra</p>
              </div>
            </div>

            <div className="appointmentInfoCard">
              <span className="appointmentInfoNumber">03</span>

              <div>
                <h3>Personalized Care</h3>
                <p>
                  Tell us which service you need and when you would
                  prefer to visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT FORM */}

      <section
        id="appointmentForm"
        className="appointmentFormSection"
        aria-labelledby="appointment-form-title"
      >
        <div className="appointmentContainer">
          <div className="appointmentSectionHeading">
            <div>
              <span className="appointmentOverline">
                BOOK YOUR VISIT
              </span>

              <small>02 / YOUR DETAILS</small>

              <h2 id="appointment-form-title">
                Let's plan your <em>next visit.</em>
              </h2>
            </div>

            <p>
              Complete the form with your contact details and
              preferred appointment time.
            </p>
          </div>

          <div className="appointmentFormLayout">
            <div className="appointmentFormCard">
              {(selectedDoctor || selectedTreatment) && (
                <div
                  className="appointmentSelectedDoctor"
                  role="status"
                >
                  <strong>
                    {selectedDoctor
                      ? `Preferred doctor: ${selectedDoctor}`
                      : "Your treatment enquiry"}
                  </strong>

                  <span>
                    {selectedTreatment
                      ? `Selected treatment: ${selectedTreatment}. `
                      : ""}
                    You can update the service below if needed.
                  </span>
                </div>
              )}

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="formRow">
                    <div className="formField">
                      <label htmlFor="appointment-name">
                        Full Name
                      </label>

                      <input
                        id="appointment-name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        maxLength={100}
                        required
                      />
                    </div>

                    <div className="formField">
                      <label htmlFor="appointment-phone">
                        Phone Number
                      </label>

                      <input
                        id="appointment-phone"
                        type="tel"
                        inputMode="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        maxLength={20}
                        pattern="[0-9+(). -]{10,20}"
                        title="Enter a valid phone number, including country code"
                        required
                      />
                    </div>
                  </div>

                  <div className="formRow">
                    <div className="formField">
                      <label htmlFor="appointment-email">
                        Email Address
                      </label>

                      <input
                        id="appointment-email"
                        type="email"
                        autoCapitalize="none"
                        name="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        maxLength={150}
                        required
                      />
                    </div>

                    <div className="formField">
                      <label htmlFor="appointment-service">
                        Dental Service
                      </label>

                      <select
                        id="appointment-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a service</option>

                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="formRow">
                    <div className="formField">
                      <label htmlFor="appointment-date">
                        Preferred Date
                      </label>

                      <input
                        id="appointment-date"
                        type="date"
                        name="date"
                        min={today}
                        value={form.date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="formField">
                      <label htmlFor="appointment-time">
                        Preferred Time
                      </label>

                      <select
                        id="appointment-time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a time</option>

                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="formField">
                    <label htmlFor="appointment-message">
                      Message <span>(Optional)</span>
                    </label>

                    <textarea
                      id="appointment-message"
                      name="message"
                      rows={5}
                      placeholder="Share any additional information..."
                      value={form.message}
                      onChange={handleChange}
                      maxLength={1000}
                    />
                  </div>

                  <div className="appointmentConsent">
                    <span
                      className="appointmentConsentIcon"
                      aria-hidden="true"
                    >
                      <ShieldCheck size={18} />
                    </span>

                    <span>
                      Your preferred date and time are requests only.
                      An appointment is confirmed only after availability
                      has been checked and confirmation has been provided.
                    </span>
                  </div>

                  {submitError && (
                    <div
                      className="appointmentSubmitError"
                      role="alert"
                      aria-live="assertive"
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="appointmentSubmitBtn appointment-submit-btn"
                  >
                    <span>
                      {submitting
                        ? "Submitting your request..."
                        : "Request an Appointment"}
                    </span>

                    {submitting ? (
                      <span
                        className="appointment-spinner"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRight size={19} aria-hidden="true" />
                    )}
                  </button>

                  <p className="appointmentFormNote">
                    Please wait for confirmation before treating your
                    preferred date and time as a confirmed appointment.
                  </p>
                </form>
              ) : (
                /* SUCCESS PAGE */

                <div className="appointmentSuccess" role="status">
                  <div className="successIcon">
                    <CheckCircle size={42} aria-hidden="true" />
                  </div>

                  <span>APPOINTMENT · REQUEST RECEIVED</span>

                  <h3>
                    Thank You, {form.name.trim()}!
                  </h3>

                  <p>
                    Your appointment request has been received.
                    Please wait for confirmation of your preferred
                    date and time.
                  </p>

                  <div
                    className="appointmentRequestSummary"
                    aria-label="Appointment details"
                  >
                    <h3>Your Appointment Details</h3>

                    <div className="appointmentSummaryRow">
                      <strong>Treatment</strong>
                      <span>{form.service}</span>
                    </div>

                    <div className="appointmentSummaryRow">
                      <strong>Preferred Date</strong>
                      <span>{formatDate(form.date)}</span>
                    </div>

                    <div className="appointmentSummaryRow">
                      <strong>Preferred Time</strong>
                      <span>{form.time}</span>
                    </div>

                    <div className="appointmentSummaryRow">
                      <strong>Preferred Doctor</strong>
                      <span>
                        {selectedDoctor || "Any Available Doctor"}
                      </span>
                    </div>

                    <div className="appointmentSummaryRow">
                      <strong>Contact Number</strong>
                      <span>{form.phone}</span>
                    </div>

                    <div className="appointmentSummaryRow">
                      <strong>Email Address</strong>
                      <span>{form.email}</span>
                    </div>
                  </div>

                  <div className="appointmentConfirmationNote">
                    <ShieldCheck size={21} aria-hidden="true" />

                    <div>
                      <strong>What happens next?</strong>

                      <p>
                        Your requested time is not yet confirmed.
                        Please wait for the appointment confirmation
                        before planning your visit.
                      </p>
                    </div>
                  </div>

                  {notificationStatus && (
                    <div
                      className="appointmentNotificationStatus"
                      aria-label="Email notification status"
                    >
                      <h3>Email Notification Status</h3>

                      <ul>
                        <li>
                          <span>Patient Email:</span>{" "}
                          {notificationStatus.patientEmailAccepted
                            ? "Accepted for sending"
                            : "Not accepted or not configured"}
                        </li>

                        <li>
                          <span>Appointment Team Email:</span>{" "}
                          {notificationStatus.clinicEmailAccepted
                            ? "Accepted for sending"
                            : "Not accepted or not configured"}
                        </li>
                      </ul>

                      <p>
                        Email acceptance does not guarantee delivery
                        to the recipient's inbox.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleNewAppointment}
                    className="appointmentAgainBtn"
                  >
                    Request Another Appointment
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </button>

                  <p className="appointmentSuccessFooter">
                    Thank you for choosing NOVADENT Dental Care.
                  </p>
                </div>
              )}
            </div>

            {/* SIDEBAR */}

            <aside className="appointmentSide">
              <div className="appointmentSideCard appointmentHighlight">
                <span className="appointmentSideNumber">01</span>

                <CalendarDays size={28} aria-hidden="true" />

                <h3>
                  Find a time
                  <br />
                  that works for you.
                </h3>

                <p>
                  Select your preferred date and time when submitting
                  your appointment request.
                </p>
              </div>

              <div className="appointmentSideCard">
                <span className="appointmentSideNumber">02</span>

                <Clock3 size={24} aria-hidden="true" />

                <h3>Clinic Hours</h3>

                <p>
                  Monday – Sunday
                  <br />
                  10:00 AM – 7:00 PM
                </p>
              </div>

              <div className="appointmentSideCard">
                <span className="appointmentSideNumber">03</span>

                <Mail size={24} aria-hidden="true" />

                <h3>Email Updates</h3>

                <p>
                  Appointment updates depend on the configured email
                  service and successful notification processing.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section
        className="appointmentFinalCTA"
        aria-labelledby="appointment-cta-title"
      >
        <div className="appointmentContainer">
          <div className="appointmentCTACard">
            <div>
              <span>YOUR SMILE · OUR PRIORITY</span>

              <h2 id="appointment-cta-title">
                Ready for your <em>next smile move?</em>
              </h2>

              <p>
                Explore our services and learn more about NOVADENT.
              </p>
            </div>

            <Link
              to="/contact"
              className="appointmentCTAButton"
              aria-label="Contact NOVADENT Dental Care"
            >
              Contact Us
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
