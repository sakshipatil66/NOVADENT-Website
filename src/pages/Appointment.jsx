
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
} from "lucide-react";
import "./Appointment.css";
import {
  CLINIC_PUBLIC_EMAIL,
  createEmailDraftUrl,
  createWhatsAppUrl,
} from "../config/clinicContact";

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

const getToday = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60 * 1000)
    .toISOString()
    .slice(0, 10);
};

const formatAppointmentDate = (dateString) => {
  if (!dateString) return "Not specified";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

const getRequestMessage = (request) =>
  [
    "Hello NOVADENT Dental Care, I would like to request an appointment.",
    "",
    `Patient Name: ${request.name}`,
    `Phone: ${request.phone}`,
    `Email: ${request.email}`,
    `Treatment: ${request.service}`,
    `Preferred Date: ${formatAppointmentDate(request.date)}`,
    `Preferred Time: ${request.time}`,
    `Preferred Doctor: ${request.doctor}`,
    `Additional Message: ${request.message || "None"}`,
    "",
    "Kindly confirm my appointment and let me know if any further information is required.",
    "",
    "Thank you.",
  ].join("\n");

export default function Appointment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedDoctor = searchParams.get("doctor") || "";
  const selectedTreatment = searchParams.get("treatment") || "";

  const initialService = services.includes(selectedTreatment)
    ? selectedTreatment
    : selectedTreatment === "Braces & Aligners"
      ? "Braces & Aligners"
      : "";

  const [form, setForm] = useState(() => ({
    ...initialForm,
    service: initialService,
  }));

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [whatsappConsent, setWhatsappConsent] = useState(false);
  const [notificationResults, setNotificationResults] = useState(null);
  const [fallbackRequest, setFallbackRequest] = useState(null);

  const today = getToday();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitError) setSubmitError("");
    setFallbackRequest(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const formElement = e.currentTarget;

    if (!formElement.reportValidity()) return;

    const phoneE164 = form.phone.replace(/[\s().-]/g, "");

    if (!/^\+[1-9]\d{7,14}$/.test(phoneE164)) {
      setSubmitError(
        "Enter a valid phone number with its country code, for example +91 98765 43210."
      );
      return;
    }

    if (form.date < today) {
      setSubmitError(
        "Please select today or a future appointment date."
      );
      return;
    }

    if (!form.service || !form.date || !form.time) {
      setSubmitError(
        "Please select a dental service, preferred date, and preferred time."
      );
      return;
    }

    if (!whatsappConsent) {
      setSubmitError(
        "Please consent to receive appointment updates on WhatsApp."
      );
      return;
    }

    const request = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: phoneE164,
      doctor: selectedDoctor || "Any available doctor",
      service: form.service,
      date: form.date,
      time: form.time,
      message: form.message.trim(),
      whatsappConsent,
    };

    setSubmitting(true);

    try {
      const response = await fetch("/.netlify/functions/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to submit your appointment. Please try again."
        );
      }

      setFallbackRequest(request);
      setNotificationResults(result.notifications || null);
      setSubmitted(true);
    } catch (error) {
      setFallbackRequest(request);

      setSubmitError(
        error.message ||
          "Unable to submit your appointment. Please try again."
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
    setWhatsappConsent(false);
    setNotificationResults(null);
    setFallbackRequest(null);
  };

  const renderFallbackActions = (request, showIntro = false) => {
    if (!request) return null;

    return (
      <div className="appointmentFallbackActions">
        {showIntro && (
          <p>
            You can send your appointment details directly to our clinic:
          </p>
        )}

        <a
          href={createWhatsAppUrl(getRequestMessage(request))}
          target="_blank"
          rel="noopener noreferrer"
        >
          Continue with WhatsApp
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>

        <a
          href={createEmailDraftUrl(
            "NOVADENT Appointment Request",
            getRequestMessage(request)
          )}
        >
          Email {CLINIC_PUBLIC_EMAIL}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>

        <small>
          Your WhatsApp or email app will open with the appointment
          details ready. Press Send in that app to contact the clinic.
        </small>
      </div>
    );
  };

  return (
    <main className="novaAppointmentPage">
      {/* HERO */}
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
              Your smile
              <em> deserves better care.</em>
            </h1>

            <p>
              Schedule a consultation with our dental team and take
              the first step toward a healthier, more confident smile.
            </p>

            <a
              className="appointmentHeroCTA"
              href="#appointmentForm"
            >
              Request an appointment
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>

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
                <span>Modern Care</span>
              </div>
            </div>
          </div>

          <div className="appointmentHeroVisual">
            <div className="appointmentHeroImage">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=90"
                alt="Modern dental clinic interior"
              />

              <div className="appointmentImageOverlay" />
            </div>

            <div className="appointmentFloatingCard">
              <div className="floatingIcon">
                <CalendarDays size={20} aria-hidden="true" />
              </div>

              <div>
                <strong>Flexible Scheduling</strong>
                <span>Choose a convenient time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="appointmentIntro">
        <div className="appointmentContainer appointmentIntroGrid">
          <div className="appointmentIntroHeading">
            <span className="appointmentOverline">
              PLAN YOUR VISIT
            </span>

            <small>01 / APPOINTMENT</small>

            <h2>
              Simple booking.
              <em> Comfortable care.</em>
            </h2>

            <p className="appointmentIntroLead">
              Plan your visit with NOVADENT and take the first step
              toward a healthier, more confident smile.
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
                  Our team will help you choose a suitable appointment
                  and treatment.
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
                Let's plan your
                <em> next visit.</em>
              </h2>
            </div>

            <p>
              Fill in the details below. Our team will review your
              preferred appointment date and time.
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
                      ? `Booking with ${selectedDoctor}`
                      : "Your treatment enquiry"}
                  </strong>

                  <span>
                    {selectedTreatment
                      ? `Selected treatment: ${selectedTreatment}. `
                      : ""}
                    You can change the service below before sending
                    your request.
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
                        placeholder="Enter your name"
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
                        maxLength={16}
                        title="Include the country code, for example +91 98765 43210"
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
                      placeholder="Tell us anything we should know..."
                      value={form.message}
                      onChange={handleChange}
                      maxLength={1000}
                    />
                  </div>

                  <div className="formField appointmentWhatsAppConsent">
                    <label
                      className="appointmentConsentLabel"
                      htmlFor="appointment-whatsapp-consent"
                    >
                      <input
                        id="appointment-whatsapp-consent"
                        type="checkbox"
                        checked={whatsappConsent}
                        onChange={(e) => {
                          setWhatsappConsent(e.target.checked);

                          if (submitError) setSubmitError("");
                        }}
                        required
                      />

                      <span>
                        I agree to receive appointment-related WhatsApp
                        messages on the phone number provided above.
                      </span>
                    </label>
                  </div>

                  {submitError && (
                    <div
                      className="appointmentSubmitError"
                      role="alert"
                      aria-live="assertive"
                    >
                      <p>{submitError}</p>

                      {fallbackRequest &&
                        renderFallbackActions(fallbackRequest, true)}
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
                        ? "Submitting Request..."
                        : "Request an Appointment"}
                    </span>

                    {submitting ? (
                      <span
                        className="appointment-spinner"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRight
                        size={19}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  <p className="appointmentFormNote">
                    Your requested date and time are not confirmed
                    until our clinic contacts you. By submitting,
                    you agree to receive appointment-related messages
                    on WhatsApp as selected above.
                  </p>
                </form>
              ) : (
                /* SUCCESS MESSAGE */
                <div
                  className="appointmentSuccess"
                  role="status"
                  aria-live="polite"
                >
                  <div className="successIcon">
                    <CheckCircle size={42} aria-hidden="true" />
                  </div>

                  <span className="appointmentSuccessEyebrow">
                    APPOINTMENT · REQUEST RECEIVED
                  </span>

                  <h3>
                    Thank You, {form.name.trim()}!
                  </h3>

                  <p className="appointmentSuccessMessage">
                    Your appointment request has been submitted
                    successfully to NOVADENT Dental Care. Our team
                    will contact you to confirm your preferred date
                    and time.
                  </p>

                  <div
                    className="appointmentRequestSummary"
                    aria-label="Appointment request summary"
                  >
                    <h4>Your Appointment Details</h4>

                    <span>
                      <strong>Treatment</strong>
                      <span>{form.service}</span>
                    </span>

                    <span>
                      <strong>Preferred Date</strong>
                      <span>
                        {formatAppointmentDate(form.date)}
                      </span>
                    </span>

                    <span>
                      <strong>Preferred Time</strong>
                      <span>{form.time}</span>
                    </span>

                    <span>
                      <strong>Preferred Doctor</strong>
                      <span>
                        {selectedDoctor || "Any Available Doctor"}
                      </span>
                    </span>

                    <span>
                      <strong>Contact Number</strong>
                      <span>{form.phone}</span>
                    </span>
                  </div>

                  <div className="appointmentConfirmationNote">
                    <ShieldCheck
                      size={22}
                      aria-hidden="true"
                    />

                    <p>
                      <strong>Please Note</strong>
                      Your appointment is not confirmed until our
                      clinic contacts you and confirms the date
                      and time.
                    </p>
                  </div>

                  {notificationResults && (
                    <div className="appointmentNotificationPanel">
                      <h4>Notification Status</h4>

                      <ul
                        className="appointmentNotificationResults"
                        aria-label="Notification results"
                      >
                        <li>
                          <strong>Patient Email:</strong>{" "}
                          {notificationResults.patientEmailAccepted
                            ? "Accepted for sending"
                            : "Not accepted or not configured"}
                        </li>

                        <li>
                          <strong>Clinic Email:</strong>{" "}
                          {notificationResults.clinicEmailAccepted
                            ? "Accepted for sending"
                            : "Not accepted or not configured"}
                        </li>

                        <li>
                          <strong>Patient WhatsApp:</strong>{" "}
                          {notificationResults.patientWhatsAppQueued
                            ? "Accepted for processing; delivery not confirmed"
                            : "Not accepted or not configured"}
                        </li>

                        <li>
                          <strong>Clinic WhatsApp:</strong>{" "}
                          {notificationResults.clinicWhatsAppQueued
                            ? "Accepted for processing; delivery not confirmed"
                            : "Not accepted or not configured"}
                        </li>
                      </ul>

                      <small>
                        Email acceptance does not guarantee inbox
                        delivery. WhatsApp processing does not
                        guarantee message delivery.
                      </small>
                    </div>
                  )}

                  {fallbackRequest &&
                    notificationResults?.clinicWhatsAppQueued !== true &&
                    renderFallbackActions(fallbackRequest)}

                  <button
                    type="button"
                    onClick={handleNewAppointment}
                    className="appointmentAgainBtn"
                  >
                    Book Another Appointment
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                    />
                  </button>

                  <p className="appointmentSuccessFooter">
                    Thank you for choosing NOVADENT Dental Care.
                    We look forward to taking care of your smile!
                  </p>
                </div>
              )}
            </div>

            {/* SIDE INFORMATION */}
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
                  Choose your preferred date and time. We will confirm
                  availability with you.
                </p>
              </div>

              <div className="appointmentSideCard">
                <span className="appointmentSideNumber">02</span>

                <Phone size={24} aria-hidden="true" />

                <h3>Prefer to call?</h3>

                <p>
                  Our team can help you schedule your visit over the
                  phone.
                </p>

                <a
                  href="tel:+919000012345"
                  aria-label="Call NOVADENT"
                >
                  +91 90000 12345
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="appointmentSideCard">
                <span className="appointmentSideNumber">03</span>

                <Mail size={24} aria-hidden="true" />

                <h3>Have a question?</h3>

                <p>
                  Email us with your dental care questions.
                </p>

                <a href={`mailto:${CLINIC_PUBLIC_EMAIL}`}>
                  {CLINIC_PUBLIC_EMAIL}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
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
                Ready to make your
                <em> next smile move?</em>
              </h2>

              <p>
                Start with a consultation at NOVADENT.
              </p>
            </div>

            <Link
              to="/contact"
              className="appointmentCTAButton"
              aria-label="Contact NOVADENT Dental Care"
            >
              Contact NOVADENT
              <ArrowUpRight
                size={19}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
