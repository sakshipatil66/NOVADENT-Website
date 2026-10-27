
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

import "./DoctorsPremium.css";
import "./DoctorsResponsiveFinal.css";
import observeElementsOnce from "../utils/observeElementsOnce";

const doctors = [
  {
    name: "Dr. Rohan Mehta",
    role: "Lead Dental Surgeon",
    qualification: "Advanced Dental Care",
    experience: "12+ Years",
    image: "doctor-01.jpg",
    number: "01",
    description:
      "Focused on comprehensive dental care, patient comfort, and personalised treatment planning.",
    specialties: ["General Dentistry", "Smile Care"],
  },
  {
    name: "Dr. Ananya Sharma",
    role: "Cosmetic Dental Specialist",
    qualification: "Cosmetic & Smile Dentistry",
    experience: "10+ Years",
    image: "doctor-02.jpg",
    number: "02",
    description:
      "Dedicated to creating confident smiles through thoughtful cosmetic dentistry and individual care.",
    specialties: ["Smile Design", "Cosmetic Dentistry"],
  },
  {
    name: "Dr. Priya Deshmukh",
    role: "Orthodontic Consultant",
    qualification: "Orthodontic Care",
    experience: "Experienced Specialist",
    image: "doctor-03.jpg",
    number: "03",
    description:
      "Helps patients explore personalised options for tooth alignment and a healthier-looking smile.",
    specialties: ["Braces", "Tooth Alignment"],
  },
  {
    name: "Dr. Arjun Kulkarni",
    role: "Implant & Oral Care Specialist",
    qualification: "Dental Implant Care",
    experience: "Experienced Specialist",
    image: "doctor-04.jpg",
    number: "04",
    description:
      "Supports patients through carefully planned restorative and implant-related dental treatments.",
    specialties: ["Dental Implants", "Restorative Care"],
  },
  {
    name: "Dr. Neha Patil",
    role: "Periodontic Specialist",
    qualification: "Gum Health & Care",
    experience: "Experienced Specialist",
    image: "doctor-05.jpg",
    number: "05",
    description:
      "Emphasises gum health, preventive care, and treatment plans tailored to individual needs.",
    specialties: ["Gum Care", "Preventive Dentistry"],
  },
  {
    name: "Dr. Aditya Joshi",
    role: "Endodontic Specialist",
    qualification: "Root Canal Care",
    experience: "Experienced Specialist",
    image: "doctor-06.jpg",
    number: "06",
    description:
      "Provides focused dental care for preserving natural teeth and supporting long-term oral health.",
    specialties: ["Root Canal Care", "Tooth Preservation"],
  },
];

const values = [
  {
    icon: HeartPulse,
    title: "Patient-First Care",
    description:
      "Every treatment begins with listening to your concerns and understanding your needs.",
  },
  {
    icon: ShieldCheck,
    title: "Thoughtful Treatment",
    description:
      "Clear explanations and personalised options help you make informed decisions.",
  },
  {
    icon: Sparkles,
    title: "Modern Dentistry",
    description:
      "A contemporary approach focused on comfort, precision, and your smile goals.",
  },
  {
    icon: Users,
    title: "Team-Based Approach",
    description:
      "A collaborative team works together to support your dental care journey.",
  },
];

const process = [
  {
    number: "01",
    title: "We Listen",
    description:
      "Tell us about your concerns, dental history, and the smile you want to achieve.",
  },
  {
    number: "02",
    title: "We Plan",
    description:
      "Discuss your examination, suitable treatment options, and the next steps.",
  },
  {
    number: "03",
    title: "We Care",
    description:
      "Move forward with a treatment plan tailored to your individual needs.",
  },
];

function DoctorImage({ doctor }) {
  const imagePath = `${import.meta.env.BASE_URL}images/doctors/${doctor.image}`;

  return (
    <div className="novaDoctorImage">
      <img
        src={imagePath}
        alt={doctor.name}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.opacity = "0";
        }}
      />

      <span className="novaDoctorImageNumber">{doctor.number}</span>

      <span className="novaDoctorImageIcon" aria-hidden="true">
        <ArrowUpRight size={19} />
      </span>
    </div>
  );
}

export default function Doctors() {
 
useEffect(() => {
  const page = document.querySelector(".novaDoctorsPage");
  if (!page) return;

  const elements = [...page.querySelectorAll("[data-doctors-reveal]")];

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("doctors-motion-visible");
    });
    return;
  }

  elements.forEach((element, index) => {
    element.classList.add("doctors-motion-ready");

    // Hero: text left, image right
    if (element.classList.contains("novaDoctorsHeroContent")) {
      element.classList.add("doctors-from-left");
    } else if (
      element.classList.contains("novaDoctorsHeroVisual") ||
      element.classList.contains("novaDoctorsStoryImage")
    ) {
      element.classList.add("doctors-from-right");
    } else if (element.classList.contains("novaDoctorCard")) {
      // Cards alternate left and right
      const siblingCards = [...element.parentElement.children].filter(
        (child) => child.classList.contains("novaDoctorCard")
      );
      const cardIndex = siblingCards.indexOf(element);

      element.classList.add(
        cardIndex % 2 === 0
          ? "doctors-from-left"
          : "doctors-from-right"
      );
    } else {
      // Other content follows its actual horizontal position
      const rect = element.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      if (center < window.innerWidth * 0.42) {
        element.classList.add("doctors-from-left");
      } else if (center > window.innerWidth * 0.58) {
        element.classList.add("doctors-from-right");
      } else {
        element.classList.add("doctors-from-bottom");
      }
    }

    element.style.setProperty(
      "--doctors-motion-delay",
      `${(index % 3) * 110}ms`
    );
  });

  return observeElementsOnce(elements, (element) => element.classList.add("doctors-motion-visible"), {
    threshold: 0.08,
    rootMargin: "0px 0px 280px 0px",
  });
}, []);

  return (
    <main className="novaDoctorsPage">
      <section className="novaDoctorsHero">
        <div className="novaDoctorsHeroGlow" aria-hidden="true" />

        <div className="novaDoctorsContainer novaDoctorsHeroGrid">
          <div className="novaDoctorsHeroContent" data-doctors-reveal>
            <span className="novaDoctorsEyebrow">
              <span className="novaDoctorsEyebrowDot" />
              PEOPLE BEHIND THE CARE
            </span>

            <h1>
              Meet the team
              <br />
              <span>behind your smile.</span>
            </h1>

            <p>
              Meet the team dedicated to understanding your needs, guiding your
              choices, and making every dental visit feel more comfortable.
            </p>

            <div className="novaDoctorsHeroActions">
              <a href="#our-team" className="novaDoctorsTextLink">
                Meet Our Team
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="novaDoctorsHeroNote">
              <ShieldCheck size={19} />
              <span>
                Personalised care. Clear guidance. Healthier smiles.
              </span>
            </div>
          </div>

          <div className="novaDoctorsHeroVisual" data-doctors-reveal>
            <div className="novaDoctorsHeroImageFrame">
              <img
                src={`${import.meta.env.BASE_URL}images/doctors/doctor-01.jpg`}
                alt="NOVADENT dental care professional"
                fetchPriority="high"
              />

              <div className="novaDoctorsHeroImageOverlay" />

              <div className="novaDoctorsHeroImageCaption">
                <span>CARE WITH CONFIDENCE</span>
                <strong>Your smile matters.</strong>
              </div>
            </div>

            <div className="novaDoctorsFloatingCard">
              <span className="novaDoctorsFloatingIcon">
                <Stethoscope size={20} />
              </span>
              <div>
                <strong>Care centred on you</strong>
                <span>Every smile has its own story.</span>
              </div>
            </div>

            <span className="novaDoctorsHeroOrbit" aria-hidden="true" />
          </div>
        </div>

        <a href="#our-team" className="novaDoctorsScrollLink">
          <span>SCROLL TO MEET THE TEAM</span>
          <span className="novaDoctorsScrollArrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </section>

      <section className="novaDoctorsIntro">
        <div className="novaDoctorsContainer novaDoctorsIntroGrid">
          <div data-doctors-reveal>
            <span className="novaDoctorsEyebrow">
              <span className="novaDoctorsEyebrowDot" />
              A TEAM YOU CAN TRUST
            </span>

            <h2>
              Good dentistry is
              <br />
              <span>personal.</span>
            </h2>
          </div>

          <div className="novaDoctorsIntroCopy" data-doctors-reveal>
            <p>
              A great dental experience is about more than a treatment. It is
              about feeling heard, understanding your options, and knowing
              what comes next.
            </p>

            <p>
              At NOVADENT, our approach puts your comfort, oral health, and
              individual smile goals at the centre of every conversation.
            </p>
          </div>
        </div>
      </section>

      <section className="novaDoctorsTeam" id="our-team">
        <div className="novaDoctorsContainer">
          <div className="novaDoctorsSectionHeading" data-doctors-reveal>
            <div>
              <span className="novaDoctorsEyebrow">
                <span className="novaDoctorsEyebrowDot" />
                MEET YOUR DENTAL TEAM
              </span>

              <h2>
                Experience meets
                <br />
                <span>personal care.</span>
              </h2>
            </div>

            <p>
              Get to know the professionals who help make your dental care
              journey more reassuring and personalised.
            </p>
          </div>

          <div className="novaDoctorsGrid">
            {doctors.map((doctor) => (
              <article
                className="novaDoctorCard"
                key={doctor.number}
                data-doctors-reveal
              >
                <DoctorImage doctor={doctor} />

                <div className="novaDoctorCardBody">
                  <div className="novaDoctorCardMeta">
                    <span>{doctor.number} / 06</span>
                    <span>
                      <Award size={14} />
                      {doctor.experience}
                    </span>
                  </div>

                  <h3>{doctor.name}</h3>
                  <p className="novaDoctorRole">{doctor.role}</p>
                  <p className="novaDoctorQualification">
                    {doctor.qualification}
                  </p>
                  <p className="novaDoctorDescription">
                    {doctor.description}
                  </p>

                  <div className="novaDoctorSpecialties">
                    {doctor.specialties.map((specialty) => (
                      <span key={specialty}>{specialty}</span>
                    ))}
                  </div>

                  <div className="novaDoctorCardActions">
                    <Link
                      to={`/doctors/${encodeURIComponent(doctor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}`}
                      className="novaDoctorProfileLink"
                      aria-label={`View profile of ${doctor.name}`}
                    >
                      View Profile <ArrowUpRight size={16} />
                    </Link>
                    <Link
                      to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
                      className="novaDoctorCardLink"
                      aria-label={`Book an appointment with ${doctor.name}`}
                    >
                      Book with {doctor.name}
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="novaDoctorsImageNote">
            Doctor photographs and qualifications should match the clinic's
            verified team information.
          </p>
        </div>
      </section>

      <section className="novaDoctorsValues">
        <div className="novaDoctorsContainer">
          <div className="novaDoctorsCenteredHeading" data-doctors-reveal>
            <span className="novaDoctorsEyebrow">
              <span className="novaDoctorsEyebrowDot" />
              WHAT GUIDES US
            </span>

            <h2>
              The values behind
              <br />
              <span>every smile.</span>
            </h2>

            <p>
              The little things that make your experience feel more
              comfortable, thoughtful, and clear.
            </p>
          </div>

          <div className="novaDoctorsValuesGrid">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  className="novaDoctorsValueCard"
                  key={value.title}
                  data-doctors-reveal
                >
                  <span className="novaDoctorsValueNumber">
                    0{index + 1}
                  </span>

                  <span className="novaDoctorsValueIcon">
                    <Icon size={23} strokeWidth={1.7} />
                  </span>

                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="novaDoctorsProcess">
        <div className="novaDoctorsContainer novaDoctorsProcessGrid">
          <div className="novaDoctorsProcessIntro" data-doctors-reveal>
            <span className="novaDoctorsEyebrow">
              <span className="novaDoctorsEyebrowDot" />
              YOUR VISIT, MADE SIMPLE
            </span>

            <h2>
              A clearer path
              <br />
              to <span>better care.</span>
            </h2>

            <p>
              We believe that understanding your treatment is an important
              part of feeling confident about it.
            </p>

            <Link to="/appointment" className="novaDoctorsPrimaryButton">
              Plan Your Visit
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="novaDoctorsProcessList">
            {process.map((step) => (
              <article
                className="novaDoctorsProcessStep"
                key={step.number}
                data-doctors-reveal
              >
                <span className="novaDoctorsProcessNumber">
                  {step.number}
                </span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

                <CheckCircle2
                  className="novaDoctorsProcessCheck"
                  size={21}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="novaDoctorsStory">
        <div className="novaDoctorsContainer novaDoctorsStoryGrid">
          <div className="novaDoctorsStoryImage" data-doctors-reveal>
            <img
              src={`${import.meta.env.BASE_URL}images/doctors/doctor-02.jpg`}
              alt="Dental care professional at NOVADENT"
              loading="lazy"
            />

            <div className="novaDoctorsStoryImageLabel">
              <Sparkles size={17} />
              Thoughtful care, every day
            </div>
          </div>

          <div className="novaDoctorsStoryContent" data-doctors-reveal>
            <span className="novaDoctorsEyebrow">
              <span className="novaDoctorsEyebrowDot" />
              MORE THAN A DENTAL VISIT
            </span>

            <h2>
              Your comfort is
              <br />
              part of the <span>care.</span>
            </h2>

            <p>
              Questions are welcome. Your concerns matter. And every treatment
              discussion should leave you with a clearer understanding of
              your options.
            </p>

            <ul>
              <li>
                <CheckCircle2 size={18} />
                Personalised treatment discussions
              </li>
              <li>
                <CheckCircle2 size={18} />
                Clear explanations of next steps
              </li>
              <li>
                <CheckCircle2 size={18} />
                A patient-first approach
              </li>
            </ul>

            <Link to="/about" className="novaDoctorsTextLink">
              Discover NOVADENT
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="novaDoctorsCTA">
        <div className="novaDoctorsContainer">
          <div className="novaDoctorsCTACard" data-doctors-reveal>
            <div className="novaDoctorsCTAOrb" aria-hidden="true" />

            <span className="novaDoctorsCTAIcon">
              <HeartPulse size={25} />
            </span>

            <span className="novaDoctorsCTAOverline">
              YOUR SMILE JOURNEY STARTS HERE
            </span>

            <h2>
              Ready to make your
              <br />
              smile a priority?
            </h2>

            <p>
              Take the first step towards a more confident, comfortable
              dental care experience.
            </p>

            <Link to="/appointment" className="novaDoctorsCTAButton">
              Book an Appointment
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
