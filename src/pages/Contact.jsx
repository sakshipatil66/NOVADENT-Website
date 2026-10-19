
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  CheckCircle,
  MessageSquare,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./ContactPremium.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // Reveal contact sections as they enter the viewport.
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".novaContactPage .contactInfoCard, " +
        ".novaContactPage .contactFormCard, " +
        ".novaContactPage .contactSideCard, " +
        ".novaContactPage .contactMapVisual, " +
        ".novaContactPage .contactCTACard"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add("contactVisible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contactVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => {
      element.classList.add("contactReveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Validate the form and prepare the enquiry in WhatsApp.
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !phone || !subject || !message) {
      alert("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const digits = phone.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      alert("Please enter a valid phone number.");
      return;
    }

    const whatsappMessage = [
      "Hello NOVADENT Dental Care,",
      "",
      "I would like to make an enquiry.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Subject: ${subject}`,
      `Message: ${message}`,
    ].join("\n");

    // IMPORTANT: Replace this demo number with the real clinic number.
    // Use country code + number, without +, spaces or hyphens.
    const whatsappNumber = "917507559161";

    const whatsappURL =
      `https://api.whatsapp.com/send?phone=${whatsappNumber}` +
      `&text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp from the user's submit action.
    const whatsappWindow = window.open(whatsappURL, "_blank");

    if (whatsappWindow) {
      // Prevent the new tab from controlling this page.
      whatsappWindow.opener = null;
      setSubmitted(true);
    } else {
      alert(
        "Your browser blocked the WhatsApp window. " +
          "Please allow pop-ups for this website and try again."
      );
    }
  };

  return (
    <main className="novaContactPage">
      {/* HERO */}
      <section
        className="novaContactHero"
        aria-labelledby="contact-hero-title"
      >
        <div className="contactHeroGlow" />

        <div className="contactContainer contactHeroGrid">
          <div className="contactHeroContent">
            <span className="contactEyebrow">
              <MessageSquare size={15} aria-hidden="true" />
              NOVADENT · GET IN TOUCH
            </span>

            <h1 id="contact-hero-title">
              Let's talk about
              <em> your smile.</em>
            </h1>

            <p>
              Have a question, need help choosing a treatment,
              or simply want to know more about NOVADENT?
              Our team is here to help.
            </p>
          </div>

          <div className="contactHeroVisual">
            <div className="contactHeroImage">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=90"
                alt="Modern clinic interior"
                loading="eager"
              />
              <div className="contactHeroImageOverlay" />
            </div>

            <div className="contactHeroFloating">
              <div className="contactFloatingIcon">
                <Sparkles size={19} aria-hidden="true" />
              </div>

              <div>
                <strong>We're here for you</strong>
                <span>Mon – Sun · 10 AM – 7 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section
        className="contactDetailsSection"
        aria-labelledby="contact-details-title"
      >
        <div className="contactContainer">
          <div className="contactSectionIntro">
            <div>
              <span className="contactOverline">REACH NOVADENT</span>
              <small>01 / CONTACT DETAILS</small>
              <h2 id="contact-details-title">
                We'd love to
                <em> hear from you.</em>
              </h2>
            </div>

            <p>
              Whether you are planning your first visit or already
              part of the NOVADENT family, getting in touch is simple.
            </p>
          </div>

          <div className="contactInfoGrid">
            <a
              href="tel:+919000012345"
              className="contactInfoCard"
              aria-label="Call NOVADENT"
            >
              <span className="contactInfoNumber">01</span>

              <div className="contactInfoIcon">
                <Phone size={22} aria-hidden="true" />
              </div>

              <div className="contactInfoContent">
                <span>CALL US</span>
                <h3>+91 90000 12345</h3>
                <p>Speak directly with our clinic team.</p>
                <span className="contactInlineWhatsApp">
                  Message on WhatsApp
                  <ArrowUpRight size={14} />
                </span>
              </div>

              <ArrowUpRight
                className="contactInfoArrow"
                size={19}
                aria-hidden="true"
              />
            </a>

            <a
              href="mailto:info@novadentcare.com"
              className="contactInfoCard"
              aria-label="Email NOVADENT"
            >
              <span className="contactInfoNumber">02</span>

              <div className="contactInfoIcon">
                <Mail size={22} aria-hidden="true" />
              </div>

              <div className="contactInfoContent">
                <span>EMAIL US</span>
                <h3>info@novadentcare.com</h3>
                <p>Send us your questions anytime.</p>
              </div>

              <ArrowUpRight
                className="contactInfoArrow"
                size={19}
                aria-hidden="true"
              />
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Kharadi%2C%20Pune%2C%20Maharashtra%2C%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="contactInfoCard"
              aria-label="Find NOVADENT in Kharadi Pune on Google Maps"
            >
              <span className="contactInfoNumber">03</span>

              <div className="contactInfoIcon">
                <MapPin size={22} aria-hidden="true" />
              </div>

              <div className="contactInfoContent">
                <span>VISIT US</span>
                <h3>Kharadi, Pune</h3>
                <p>Kharadi, Pune, Maharashtra, India.</p>
              </div>

              <ArrowUpRight
                className="contactInfoArrow"
                size={19}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section
        id="contactForm"
        className="contactFormSection"
        aria-labelledby="contact-form-title"
      >
        <div className="contactContainer">
          <div className="contactFormHeader">
            <span className="contactOverline">SEND AN ENQUIRY</span>
            <small>02 / LET'S CONNECT</small>

            <h2 id="contact-form-title">
              Tell us how
              <em> we can help.</em>
            </h2>

            <p>
              Fill in the form to prepare your enquiry for WhatsApp.
            </p>
          </div>

          <div className="contactFormLayout">
            <div className="contactFormCard">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="contactFormRow">
                    <div className="contactField">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        autoComplete="name"
                        minLength={2}
                        maxLength={100}
                        required
                      />
                    </div>

                    <div className="contactField">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        maxLength={150}
                        required
                      />
                    </div>
                  </div>

                  <div className="contactFormRow">
                    <div className="contactField">
                      <label htmlFor="contact-phone">Phone</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        placeholder="+91 90000 12345"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={20}
                        required
                      />
                    </div>

                    <div className="contactField">
                      <label htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        placeholder="How can we help?"
                        maxLength={150}
                        required
                      />
                    </div>
                  </div>

                  <div className="contactField">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      placeholder="Write your message here..."
                      minLength={3}
                      maxLength={2000}
                      required
                    />
                  </div>

                  <button type="submit" className="contactSubmitBtn">
                    <span>Continue with WhatsApp</span>
                    <Send size={17} aria-hidden="true" />
                  </button>

                  <p className="contactFormNote">
                    WhatsApp will open with your enquiry prepared.
                    You must press Send in WhatsApp to submit it.
                  </p>
                </form>
              ) : (
                <div className="contactSuccess" role="status">
                  <div className="contactSuccessIcon">
                    <CheckCircle size={42} aria-hidden="true" />
                  </div>

                  <span>WHATSAPP OPENED</span>
                  <h3>Your enquiry is ready.</h3>

                  <p>
                    Please check the WhatsApp tab and press Send
                    to complete your enquiry. This page cannot verify
                    whether the message was sent.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="contactAgainBtn"
                  >
                    Send Another Message
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {/* SIDE PANEL */}
            <aside className="contactSidePanel">
              <div className="contactSideCard">
                <div className="contactSideTop">
                  <Clock3 size={21} aria-hidden="true" />
                  <span>CLINIC HOURS</span>
                </div>

                <h3>
                  When we're
                  <em> available.</em>
                </h3>

                <div className="contactHours">
                  <div>
                    <span>Monday – Sunday</span>
                    <strong>10:00 AM – 7:00 PM</strong>
                  </div>

                  <div>
                    <span>Appointments</span>
                    <strong>Available</strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>Kharadi, Pune</strong>
                  </div>
                </div>
              </div>

              <div className="contactSideCard contactAppointmentCard">
                <CalendarDays size={25} aria-hidden="true" />
                <span>READY TO VISIT?</span>

                <h3>
                  Book your
                  <em> appointment.</em>
                </h3>

                <p>
                  Skip the enquiry and directly schedule
                  your preferred appointment.
                </p>

                <Link
                  to="/appointment"
                  className="contactAppointmentBtn"
                  aria-label="Book a NOVADENT appointment"
                >
                  Book Appointment
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>

              <div className="contactSideCard contactEmailCard">
                <Mail size={24} aria-hidden="true" />
                <span>EMAIL NOVADENT</span>

                <h3>
                  We're happy
                  <em> to help.</em>
                </h3>

                <p>
                  Have a question about treatments,
                  appointments or dental care?
                </p>

                <a
                  href="mailto:info@novadentcare.com"
                  className="contactSideEmail"
                >
                  info@novadentcare.com
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* LOCATION / MAP */}
      <section
        className="contactLocationSection"
        aria-labelledby="location-title"
      >
        <div className="contactContainer contactLocationGrid">
          <div className="contactLocationContent">
            <span className="contactOverline">FIND US</span>
            <small>03 / OUR LOCATION</small>

            <h2 id="location-title">
              Come visit
              <em> NOVADENT.</em>
            </h2>

            <p>
              Our clinic is designed to make every visit
              comfortable, welcoming and stress-free.
            </p>

            <div className="contactLocationAddress">
              <div className="locationAddressIcon">
                <MapPin size={20} aria-hidden="true" />
              </div>

              <div>
                <strong>NOVADENT Dental Care</strong>
                <span>Kharadi, Pune, Maharashtra, India</span>
              </div>
            </div>

            <div className="contactLocationMeta">
              <div>
                <Clock3 size={17} aria-hidden="true" />
                <span>
                  Mon – Sun
                  <strong>10 AM – 7 PM</strong>
                </span>
              </div>

              <div>
                <Phone size={17} aria-hidden="true" />
                <span>
                  Call us
                  <strong>+91 90000 12345</strong>
                </span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Kharadi%2C%20Pune%2C%20Maharashtra%2C%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="contactMapLink"
            >
              Open in Google Maps
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="contactMapVisual">
            <div className="contactMapTopBar">
              <div>
                <span>NOVADENT LOCATION</span>
                <strong>Kharadi, Pune</strong>
              </div>

              <MapPin size={21} aria-hidden="true" />
            </div>

            <div className="contactMapCanvas">
              <div className="mapGridLines" />
              <div className="mapRoad roadOne" />
              <div className="mapRoad roadTwo" />
              <div className="mapRoad roadThree" />
              <div className="mapRoad roadFour" />

              <div className="mapArea areaOne">Kharadi</div>
              <div className="mapArea areaTwo">Pune</div>
              <div className="mapArea areaThree">Main Road</div>

              <div className="mapPinLarge">
                <span className="mapPulse" />
                <div>
                  <MapPin size={28} aria-hidden="true" />
                </div>
              </div>

              <div className="mapLocationLabel">
                <strong>NOVADENT</strong>
                <span>Dental Care · Kharadi, Pune</span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Kharadi%2C%20Pune%2C%20Maharashtra%2C%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="mapOpenButton"
            >
              Open Location
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="contactFinalCTA"
        aria-labelledby="contact-cta-title"
      >
        <div className="contactContainer">
          <div className="contactCTACard">
            <div>
              <span>YOUR SMILE · OUR PRIORITY</span>

              <h2 id="contact-cta-title">
                Have a question?
                <em> Let's talk.</em>
              </h2>

              <p>Our friendly dental team is ready to help.</p>
            </div>

            <div className="contactCTAActions">
              <a
                href="tel:+919000012345"
                className="contactCTASecondary"
                aria-label="Call NOVADENT clinic"
              >
                <Phone size={17} aria-hidden="true" />
                Call Clinic
              </a>

              <a
                href="mailto:info@novadentcare.com"
                className="contactCTAButton"
                aria-label="Email NOVADENT"
              >
                Email NOVADENT
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
