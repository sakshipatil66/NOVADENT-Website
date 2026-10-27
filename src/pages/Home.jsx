import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Award,
} from "lucide-react";

import Hero from "../components/Hero";
import SmileGoalExplorer from "../components/SmileGoalExplorer";
import VisitPrepChecklist from "../components/VisitPrepChecklist";
import observeElementsOnce from "../utils/observeElementsOnce";
import novaLogo from "../assets/logo.svg";

import gallery01 from "../assets/gallery/gallery-01.jpg";
import gallery02 from "../assets/gallery/gallery-02.jpg";
import gallery03 from "../assets/gallery/gallery-03.jpg";
import gallery04 from "../assets/gallery/gallery-04.jpg";
import gallery05 from "../assets/gallery/gallery-05.jpg";
import gallery06 from "../assets/gallery/gallery-06.jpg";
import gallery07 from "../assets/gallery/gallery-07.jpg";
import gallery08 from "../assets/gallery/gallery-08.jpg";

import philosophy03 from "../assets/gallery/gallery-07 copy.jpg";
import philosophy04 from "../assets/gallery/gallery-08 copy.jpg";

import treatment01 from "../assets/gallery/01-dental-check-up.jpg";
import treatment02 from "../assets/gallery/02-teeth-whitening.jpg";
import treatment03 from "../assets/gallery/03-dental-implants.jpg";
import treatment04 from "../assets/gallery/04-orthodontics.jpg";
import treatment05 from "../assets/gallery/05-dental-crowns.jpg";
import treatment06 from "../assets/gallery/06-root-canal-care.jpg";

/* =========================================================
   SERVICES / TREATMENTS
========================================================= */

const services = [
  {
    number: "01",
    title: "Dental Check-Up",
    text: "Preventive dental examination to maintain healthy teeth and gums with early identification of possible dental concerns.",
    detail:
      "Complete oral examination, preventive guidance and personalized dental care.",
    img: treatment01,
  },
  {
    number: "02",
    title: "Teeth Whitening",
    text: "Professional whitening treatment designed to brighten your smile while maintaining a natural and confident appearance.",
    detail:
      "Safe, professional and effective smile-brightening treatment.",
    img: treatment02,
  },
  {
    number: "03",
    title: "Dental Implants",
    text: "Modern implant treatment designed to replace missing teeth and restore natural appearance, comfort and everyday function.",
    detail:
      "Natural-looking and durable tooth replacement solution.",
    img: treatment03,
  },
  {
    number: "04",
    title: "Orthodontics",
    text: "Personalized orthodontic care for better alignment, improved bite and a more balanced, confident smile.",
    detail:
      "Customized solutions for straighter and healthier teeth.",
    img: treatment04,
  },
  {
    number: "05",
    title: "Dental Crowns",
    text: "Restorative treatment that protects damaged or weakened teeth while helping restore their strength, shape and appearance.",
    detail:
      "Strong, functional and natural-looking tooth restoration.",
    img: treatment05,
  },
  {
    number: "06",
    title: "Root Canal Care",
    text: "Gentle root canal treatment focused on relieving discomfort, removing infection and preserving your natural tooth.",
    detail:
      "Comfort-focused treatment designed to save your natural tooth.",
    img: treatment06,
  },
];

/* =========================================================
   DOCTORS
========================================================= */

const doctors = [
  {
    name: "Dr. Rohan Mehta",
    specialty: "Founder & Lead Dentist",
    qualification: "Comprehensive Dental Care",
    experience: "10+ Years",
    img: "/images/doctors/doctor-01.jpg",
  },
  {
    name: "Dr. Priya Deshmukh",
    specialty: "Orthodontic Consultant",
    qualification: "Orthodontics & Alignment",
    experience: "9+ Years",
    img: "/images/doctors/doctor-02.jpg",
  },
  {
    name: "Dr. Neha Patil",
    specialty: "Cosmetic Dentist",
    qualification: "Aesthetic & Preventive Dentistry",
    experience: "7+ Years",
    img: "/images/doctors/doctor-05.jpg",
  },
  {
    name: "Dr. Ananya Sharma",
    specialty: "Cosmetic Dentist",
    qualification: "Cosmetic & Smile Dentistry",
    experience: "Experienced Clinician",
    img: "/images/doctors/doctor-03.jpg",
  },
];

/* =========================================================
   PHILOSOPHY
========================================================= */

const principles = [
  {
    number: "01",
    title: "Patient-first care",
    text: "Every treatment begins with understanding your comfort, concerns and individual needs. From your first consultation to your follow-up visits, our team focuses on making every step calm, clear and comfortable.",
    image: gallery01,
  },
  {
    number: "02",
    title: "Modern technology",
    text: "Advanced dental technology helps us provide precise, comfortable and efficient treatment. Modern diagnostic and treatment techniques allow our team to plan care with greater accuracy and confidence.",
    image: gallery02,
  },
  {
    number: "03",
    title: "Clear communication",
    text: "We explain every step clearly so you can make confident decisions about your dental care. You will always understand your treatment options, expected results and the care involved.",
    image: philosophy03,
  },
  {
    number: "04",
    title: "Personalized treatment",
    text: "Your smile is unique, so every treatment plan is designed around your specific goals. We combine clinical expertise with your preferences to create care that feels truly personal.",
    image: philosophy04,
  },
];

/* =========================================================
   REVIEWS
========================================================= */

const reviews = [
  {
    quote:
      "The entire experience at NOVADENT felt calm, professional and genuinely comfortable.",
    name: "Patient Review",
    role: "NOVADENT Patient",
    image: gallery03,
  },
  {
    quote:
      "The treatment was explained clearly and the team made me feel completely at ease.",
    name: "Patient Review",
    role: "NOVADENT Patient",
    image: gallery04,
  },
  {
    quote:
      "A modern clinic with thoughtful care, friendly communication and a very comfortable environment.",
    name: "Patient Review",
    role: "NOVADENT Patient",
    image: gallery06,
  },
];

/* =========================================================
   REVEAL ANIMATION
========================================================= */

function useRevealAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".homePage.premiumHome [data-reveal]"
    );

    if (!elements.length) return;

    return observeElementsOnce(elements, (element) => element.classList.add("is-visible"), {
      threshold: 0.08,
      rootMargin: "0px 0px 280px 0px",
    });
  }, []);
}

/* =========================================================
   ANIMATED NUMBER
========================================================= */

function AnimatedNumber({ value, suffix = "" }) {
  const numberRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    return observeElementsOnce([node], () => setIsVisible(true), {
      threshold: 0.08,
      rootMargin: "0px 0px 280px 0px",
    });
  }, []);

  useEffect(() => {
    const end = Number(value);

    if (!end || !isVisible) return undefined;

    const isDecimal = !Number.isInteger(end);
    let current = 0;

    const timer = setInterval(() => {
      if (isDecimal) {
        current += 0.1;

        if (current >= end) {
          current = end;
          clearInterval(timer);
        }

        setCount(Number(current.toFixed(1)));
      } else {
        current += Math.max(1, Math.ceil(end / 45));

        if (current >= end) {
          current = end;
          clearInterval(timer);
        }

        setCount(current);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={numberRef}>
      {new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(count)}
      {suffix}
    </span>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  useRevealAnimations();

  const [showCinematicIntro, setShowCinematicIntro] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowCinematicIntro(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setShowCinematicIntro(false), 2550);
    return () => window.clearTimeout(timer);
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  const [review, setReview] = useState(0);
  const [reviewDirection, setReviewDirection] = useState("next");

  
/* =========================================================
   REVIEW CONTROLS + AUTO SLIDER
========================================================= */

const [isReviewPaused, setIsReviewPaused] = useState(false);

const goToPreviousReview = () => {
  setReviewDirection("prev");
  setReview((current) =>
    (current - 1 + reviews.length) % reviews.length
  );
};

const goToNextReview = () => {
  setReviewDirection("next");
  setReview((current) =>
    (current + 1) % reviews.length
  );
};

const goToReview = (index) => {
  setReviewDirection(index >= review ? "next" : "prev");
  setReview(index);
};

/* Automatic rotation; pauses while hovered or focused */
useEffect(() => {
  if (isReviewPaused || reviews.length <= 1) return;

  const timer = setInterval(() => {
    setReviewDirection("next");
    setReview((current) => (current + 1) % reviews.length);
  }, 5200);

  return () => clearInterval(timer);
}, [isReviewPaused, reviews.length]);

  /* =========================================================
     NOVADENT STORY PROGRESS
  ========================================================= */

  useEffect(() => {
    const progress = document.querySelector(
      ".novaStoryProgress"
    );

    if (!progress) return;

    const items = progress.querySelectorAll(
      "[data-story-target]"
    );

    const sections = [...items]
      .map((item) =>
        document.getElementById(
          item.dataset.storyTarget
        )
      )
      .filter(Boolean);

    if (!sections.length) return;

    const updateProgress = () => {
      const point = window.innerHeight * 0.42;

      let activeIndex = 0;

      sections.forEach((section, index) => {
        if (
          section.getBoundingClientRect().top <=
          point
        ) {
          activeIndex = index;
        }
      });

      items.forEach((item, index) => {
        item.classList.toggle(
          "is-active",
          index === activeIndex
        );
      });

      const percent =
        sections.length > 1
          ? (activeIndex / (sections.length - 1)) * 100
          : 0;

      progress.style.setProperty(
        "--story-progress",
        `${percent}%`
      );
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
      document.documentElement.style.setProperty("--nova-story-progress", String(scrollPercent));
    };

    const handleClick = (event) => {
      const target = document.getElementById(
        event.currentTarget.dataset.storyTarget
      );

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    items.forEach((item) => {
      item.addEventListener("click", handleClick);
    });

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    updateProgress();

    return () => {
      items.forEach((item) => {
        item.removeEventListener(
          "click",
          handleClick
        );
      });

      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);

  /* =========================================================
     PHILOSOPHY MOUSE FOLLOW
  ========================================================= */

  useEffect(() => {
    const section = document.querySelector(
      ".novaPhilosophy"
    );

    if (!section) return;

    const handleMouseMove = (event) => {
      const rect =
        section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) /
          rect.width) *
        100;

      const y =
        ((event.clientY - rect.top) /
          rect.height) *
        100;

      section.style.setProperty(
        "--mouse-x",
        `${x}%`
      );

      section.style.setProperty(
        "--mouse-y",
        `${y}%`
      );
    };

    section.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      section.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <main className={`homePage premiumHome ${showCinematicIntro ? "cinematic-intro-active" : "cinematic-intro-complete"}`}>

      {showCinematicIntro && (
        <div className="novaCinematicIntro" role="status" aria-label="Welcome to NOVADENT">
          <div className="novaIntroGrain" aria-hidden="true" />
          <div className="novaIntroMark">
            <span className="novaIntroLine" />
            <img src={novaLogo} alt="NOVADENT Dental Care" />
            <span className="novaIntroTagline">A NEW EXPERIENCE IN DENTAL CARE</span>
            <span className="novaIntroProgress"><i /></span>
          </div>
        </div>
      )}

      {/* =====================================================
          STORY PROGRESS
      ===================================================== */}

      <nav
        className="novaStoryProgress"
        aria-label="NOVADENT page sections"
      >
        <div className="novaStoryProgressTrack"></div>

        <div className="novaStoryProgressItems">

          <button
            type="button"
            data-story-target="welcome"
          >
            <span>01</span>
            <small>WELCOME</small>
          </button>

          <button
            type="button"
            data-story-target="experience"
          >
            <span>02</span>
            <small>EXPERIENCE</small>
          </button>

          <button
            type="button"
            data-story-target="care"
          >
            <span>03</span>
            <small>CARE</small>
          </button>

          <button
            type="button"
            data-story-target="philosophy"
          >
            <span>04</span>
            <small>PHILOSOPHY</small>
          </button>

          <button
            type="button"
            data-story-target="journey"
          >
            <span>05</span>
            <small>JOURNEY</small>
          </button>

        </div>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero />

      <div className="heroRunningLine">
        <div className="heroRunningTrack">
          {[0, 1].map((copy) => (
            <div className="heroRunningGroup" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
              <span>NOVADENT DENTAL CARE</span>
              <span>PRECISION · COMFORT · CONFIDENCE</span>
              <span>MODERN DENTISTRY · PERSONALIZED CARE</span>
              <span>NOVADENT DENTAL CARE</span>
              <span>PRECISION · COMFORT · CONFIDENCE</span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          WELCOME TO NOVADENT
      ===================================================== */}

      <section
        id="welcome"
        className="storySection welcomeStory"
        data-reveal
      >

        <div className="storyContainer storySplit">

          {/* WELCOME IMAGES */}

          <div
            className="storyMedia reveal-left novaWelcomeVisual"
            data-reveal
          >

            <div className="novaWelcomeMainImage">
              <img
                src={gallery01}
                alt="NOVADENT modern dental clinic"
                loading="eager"
              />
            </div>

            <div className="novaWelcomeSecondImage">
              <img
                src={gallery03}
                alt="NOVADENT dental care"
                loading="lazy"
              />
            </div>

            <div className="novaWelcomeImageCaption">
              <span>01</span>

              <div>
                <strong>
                  NOVADENT DENTAL CARE
                </strong>

                <small>
                  Modern care · Human touch
                </small>
              </div>
            </div>

          </div>

          {/* WELCOME CONTENT */}

          <div
            className="storyContent reveal-right"
            data-reveal
          >

            <span className="storyKicker">
              WELCOME TO NOVADENT
            </span>

            <span className="storyIndex">
              01 / THE BEGINNING
            </span>

            <h2 className="welcomeTitle">

              <span className="welcomeTitleLine lineOne">
                Modern dentistry with
              </span>

              <span className="welcomeTitleLine lineTwo">
                <em>
                  compassionate care.
                </em>
              </span>

            </h2>

            <p className="storyLead">
              A healthier smile starts with feeling heard,
              understood and cared for.
            </p>

            <p>
              At NOVADENT, modern dental technology comes
              together with a calm environment and
              personalized attention.
            </p>

            <p>
              Every visit is designed to feel clear,
              comfortable and purposeful.
            </p>

            <div className="storyMiniGrid">

              <div>
                <strong>01</strong>

                <span>
                  Comfort-first experience
                </span>
              </div>

              <div>
                <strong>02</strong>

                <span>
                  Modern clinical approach
                </span>
              </div>

              <div>
                <strong>03</strong>

                <span>
                  Patient-focused care
                </span>
              </div>

            </div>

            <Link
              to="/about"
              className="storyButton"
            >
              Discover NOVADENT

              <ArrowUpRight size={17} />

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          OUR CLINIC EXPERIENCE
      ===================================================== */}

      <section
        id="experience"
        className="storySection clinicStory"
        data-reveal
      >

        <div className="storyContainer">

          {/* SECTION INTRO */}

          <div
            className="sectionIntro clinicExperienceIntro"
            data-reveal
          >

            <div>

              <span className="storyKicker">
                OUR CLINIC EXPERIENCE
              </span>

              <span className="storyIndex">
                02 / THE EXPERIENCE
              </span>

              <h2 className="clinicExperienceTitle">
                <span>
                  A calm clinic designed for
                </span>{" "}
                <em>
                  your comfort.
                </em>
              </h2>

            </div>

            <p>
              From reception to treatment, every detail is
              intended to make your dental journey feel
              welcoming, clear and comfortable.
            </p>

          </div>

          {/* EXPERIENCE LAYOUT */}

          <div className="novaExperienceStory">

            {/* LEFT */}

            <div
              className="novaExperienceGallery"
              data-reveal
            >

              <div className="novaExperienceMain">

                <img
                  src={gallery02}
                  alt="NOVADENT modern dental clinic"
                  loading="lazy"
                />

                <div className="novaExperienceMainOverlay">

                  <span>02</span>

                  <div>

                    <strong>
                      MODERN CLINIC EXPERIENCE
                    </strong>

                    <small>
                      Thoughtful spaces · Gentle care
                    </small>

                  </div>

                </div>

              </div>

              <div
                className="novaExperienceFloating"
                data-reveal
              >

                <img
                  src={gallery05}
                  alt="NOVADENT comfortable dental care"
                  loading="lazy"
                />

                <span>
                  COMFORT-FIRST CARE
                </span>

              </div>

              <div
                className="novaExperienceSmall"
                data-reveal
              >

                <img
                  src={gallery06}
                  alt="NOVADENT modern dental technology"
                  loading="lazy"
                />

              </div>

              <div className="novaExperienceNumber">

                <span>02</span>

                <small>
                  EXPERIENCE
                </small>

              </div>

            </div>

            {/* RIGHT */}

            <div className="novaExperienceContent">

              <div
                className="novaExperienceItem"
                data-reveal
                style={{
                  "--delay": "80ms",
                }}
              >

                <span className="novaExperienceItemNumber">
                  01
                </span>

                <div>

                  <span className="novaExperienceLabel">
                    COMFORT FIRST
                  </span>

                  <h3>
                    Comfort-first environment
                  </h3>

                  <p>
                    A calm and welcoming setting designed
                    to help you feel relaxed before, during
                    and after treatment.
                  </p>

                </div>

                <ArrowUpRight size={18} />

              </div>

              <div
                className="novaExperienceItem"
                data-reveal
                style={{
                  "--delay": "160ms",
                }}
              >

                <span className="novaExperienceItemNumber">
                  02
                </span>

                <div>

                  <span className="novaExperienceLabel">
                    MODERN CARE
                  </span>

                  <h3>
                    Modern dental technology
                  </h3>

                  <p>
                    Contemporary tools and techniques
                    support precise, thoughtful and
                    personalized dental care.
                  </p>

                </div>

                <ArrowUpRight size={18} />

              </div>

              <div
                className="novaExperienceItem"
                data-reveal
                style={{
                  "--delay": "240ms",
                }}
              >

                <span className="novaExperienceItemNumber">
                  03
                </span>

                <div>

                  <span className="novaExperienceLabel">
                    CLEAR COMMUNICATION
                  </span>

                  <h3>
                    Friendly communication
                  </h3>

                  <p>
                    We explain your treatment clearly so
                    you understand every step and feel
                    confident about your care.
                  </p>

                </div>

                <ArrowUpRight size={18} />

              </div>

              <div
                className="novaExperienceItem"
                data-reveal
                style={{
                  "--delay": "320ms",
                }}
              >

                <span className="novaExperienceItemNumber">
                  04
                </span>

                <div>

                  <span className="novaExperienceLabel">
                    PERSONALIZED CARE
                  </span>

                  <h3>
                    Treatment planned around you
                  </h3>

                  <p>
                    Every treatment plan is tailored to your
                    individual needs, comfort, goals and
                    long-term oral health.
                  </p>

                </div>

                <ArrowUpRight size={18} />

              </div>

              <Link
                to="/about"
                className="novaExperienceLink"
              >

                <span>
                  Discover our approach
                </span>

                <ArrowRight size={17} />

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          CARE & DIAGNOSIS
      ========================================================= */}

      <section
        id="care"
        className="careStory section"
      >

        <div className="container">

          <div className="careStoryGrid">

            {/* IMAGE SIDE */}

            <div
              className="careStoryVisual"
              data-reveal
            >

              <div className="careStoryMainImage">

                <img
                  src={gallery07}
                  alt="Modern dental care at NOVADENT"
                  loading="lazy"
                />

              </div>

              <div className="careStorySmallImage">

                <img
                  src={philosophy04}
                  alt="Dental consultation and diagnosis at NOVADENT"
                  loading="lazy"
                />

              </div>

              <div className="careStoryNumber">

                <span>03</span>

                <small>
                  CARE &amp;
                  <br />
                  DIAGNOSIS
                </small>

              </div>

            </div>

            {/* CONTENT SIDE */}

            <div
              className="careStoryContent"
              data-reveal
            >

              <div className="sectionStoryLabel">
              <span className="miniLabel storyKicker">
                CARE &amp; DIAGNOSIS
              </span>
              <span className="storyIndex">03 / CARE &amp; DIAGNOSIS</span>
              </div>

              <h2>
                Understanding your care
                <br />
                <em>before treatment begins.</em>
              </h2>

              <p className="careStoryIntro">
                Every smile deserves a thoughtful beginning.
                At NOVADENT, we take time to understand your
                dental health, concerns and goals before
                recommending the right treatment.
              </p>

              <div className="careStoryPoints">

                <div className="careStoryPoint">

                  <span>01</span>

                  <div>

                    <h3>
                      Clear diagnosis
                    </h3>

                    <p>
                      We carefully understand your oral health
                      before planning the next step.
                    </p>

                  </div>

                </div>

                <div className="careStoryPoint">

                  <span>02</span>

                  <div>

                    <h3>
                      Personalized planning
                    </h3>

                    <p>
                      Your treatment is planned around your
                      needs, comfort and individual goals.
                    </p>

                  </div>

                </div>

                <div className="careStoryPoint">

                  <span>03</span>

                  <div>

                    <h3>
                      Confident decisions
                    </h3>

                    <p>
                      Every option is explained clearly so
                      you can move forward with confidence.
                    </p>

                  </div>

                </div>

              </div>

              <Link
                to="/treatments"
                className="careStoryLink"
              >

                <span>
                  EXPLORE OUR TREATMENTS
                </span>

                <ArrowUpRight size={17} />

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOUNDER
      ===================================================== */}

      <section
        className="storySection founderStory"
        data-reveal
      >

        <div className="storyContainer founderEditorial">

          {/* FOUNDER IMAGE */}

          <div
            className="founderEditorialVisual reveal-left"
            data-reveal
          >

            <div className="founderEditorialImage">

              <img
                src="/images/doctors/doctor-01.jpg"
                alt="Dr. Rohan Mehta, NOVADENT dental clinician"
                loading="lazy"
              />

              <div className="founderImageOverlay">

                <span>03</span>

                <div>

                  <strong>
                    {doctors[0].name.toUpperCase()}
                  </strong>

                  <small>
                    Founder &amp; Lead Dentist
                  </small>

                </div>

              </div>

            </div>

            <div className="founderExperienceCard">

              <strong>
                10+
              </strong>

              <span>
                YEARS OF
                <br />
                EXPERIENCE
              </span>

            </div>

          </div>

          {/* FOUNDER CONTENT */}

          <div
            className="founderEditorialContent reveal-right"
            data-reveal
          >

            <div className="founderHeading">

              <div className="sectionStoryLabel">
              <span className="miniLabel storyKicker">
                OUR FOUNDER
              </span>
              <span className="storyIndex">04 / THE VISION</span>
              </div>

              <h2>
                Meet the heart
                <em>
                  behind NOVADENT.
                </em>
              </h2>

            </div>

            <p className="storyLead">
              Dr. Rohan Mehta leads NOVADENT with a patient-first
              approach to modern dental care, focusing on comfortable
              treatment, clear communication and thoughtful
              treatment planning tailored to each patient.
            </p>

            <div className="founderEditorialDetails">

              <div>

                <span>
                  FOUNDER
                </span>

                <strong>
                  Dr. Rohan Mehta
                </strong>

              </div>

              <div>

                <span>
                  SPECIALTY
                </span>

                <strong>
                  Comprehensive Dental Care
                </strong>

              </div>

              <div>

                <span>
                  ROLE
                </span>

                <strong>
                  Founder &amp; Lead Dentist
                </strong>

              </div>

            </div>

            <p>
              NOVADENT Dental Care was founded with a
              vision to bring modern dental technology,
              comfortable care and clear communication
              together in one trusted dental environment.
            </p>

            <p>
              Every treatment is planned around individual
              patient needs, with a strong focus on
              comfort, clarity and long-term oral health.
            </p>

            <div className="founderVision">

              <span>
                FOUNDER VISION
              </span>

              <p>
                To make modern dental care feel comfortable,
                clear and personalized while helping patients
                build healthier, more confident smiles.
              </p>

            </div>

            <Link
              to="/about"
              className="storyButton"
            >

              Read Founder Story

              <ArrowUpRight size={17} />

            </Link>

          </div>

        </div>

        {/* CR INFORMATION */}

        <div
          className="storyContainer founderRegistration"
          data-reveal
        >

          <div className="founderRegistrationHeader">

            <div>

              <span>
                CLINIC REGISTRATION / CR INFORMATION
              </span>

              <h3>
                Clinic registration details
              </h3>

            </div>

            <span className="crBadge">
              SAMPLE / DEMO DATA
            </span>

          </div>

          <div className="founderRegistrationGrid">

            <div>

              <span>
                CLINIC NAME
              </span>

              <strong>
                NOVADENT Dental Care
              </strong>

            </div>

            <div>

              <span>
                CR / REGISTRATION NO.
              </span>

              <strong>
                CR-NDC-2026-01847
              </strong>

            </div>

            <div>

              <span>
                REGISTRATION AUTHORITY
              </span>

              <strong>
                Maharashtra Dental Health Authority
              </strong>

            </div>

            <div>

              <span>
                REGISTRATION DATE
              </span>

              <strong>
                18 / 06 / 2026
              </strong>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        className="premiumStats"
        data-reveal
      >

        <div className="storyContainer statsEditorial">

          <div className="statsIntro">

            <div className="sectionStoryLabel">
              <span className="statsKicker storyKicker">NOVADENT / AT A GLANCE</span>
              <span className="storyIndex">05 / THE NOVADENT STORY</span>
            </div>

            <h2>
              Experience that
              <em>
                speaks for itself.
              </em>
            </h2>

          </div>

          <div className="statsGrid">

            <div className="statItem">

              <span className="statIndex">
                01
              </span>

              <Award size={20} />

              <strong>

                <AnimatedNumber
                  value="10"
                  suffix="+"
                />

              </strong>

              <span className="statLabel">
                Years Experience
              </span>

            </div>

            <div className="statItem">

              <span className="statIndex">
                02
              </span>

              <Users size={20} />

              <strong>

                <AnimatedNumber
                  value="25000"
                  suffix="+"
                />

              </strong>

              <span className="statLabel">
                Smiles Transformed
              </span>

            </div>

            <div className="statItem">

              <span className="statIndex">
                03
              </span>

              <HeartPulse size={20} />

              <strong>

                <AnimatedNumber
                  value="15"
                  suffix="+"
                />

              </strong>

              <span className="statLabel">
                Treatments
              </span>

            </div>

            <div className="statItem">

              <span className="statIndex">
                04
              </span>

              <Star size={20} />

              <strong>

                <AnimatedNumber
                  value="4.9"
                />

              </strong>

              <span className="statLabel">
                Patient Rating
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          NOVADENT DIFFERENCE
      ===================================================== */}

      <section
        className="differenceStory novaDifference"
        data-reveal
      >

        <div className="storyContainer">

          <div
            className="differenceIntro"
            data-reveal
          >

            <div className="differenceHeading">

              <div className="sectionStoryLabel">

              <div className="differenceSectionLabel storyKicker">

                <span className="differenceLabelLine"></span>

                <span>
                  OUR APPROACH
                </span>

              </div>

              <span className="differenceSectionIndex storyIndex">
                06 / THE NOVADENT STANDARD
              </span>
              </div>

              <h2>
                Designed around
                <em>
                  your smile.
                </em>
              </h2>

            </div>

            <div className="differenceIntroSide">

              <span>
                PRECISION · COMFORT · TRUST
              </span>

              <p>
                Thoughtful dentistry shaped around your needs,
                comfort and confidence at every stage of your
                smile journey.
              </p>

            </div>

          </div>

          <div className="novaDifferenceGrid">

            {/* 01 */}

            <article
              className="differenceVisual"
              data-reveal
            >

              <img
                src={gallery04}
                alt="NOVADENT patient care"
              />

              <div className="differenceVisualOverlay">

                <div className="differenceVisualNumber">
                  01
                </div>

                <div>

                  <small>
                    TRUST
                  </small>

                  <h3>
                    Care you can understand.
                  </h3>

                </div>

              </div>

            </article>

            {/* 02 */}

            <article
              className="differenceContent"
              data-reveal
            >

              <span className="differenceNumber">
                02
              </span>

              <div className="differenceIcon">
                <ShieldCheck size={20} />
              </div>

              <small>
                PRECISION
              </small>

              <h3>
                Modern dentistry,
                thoughtfully used.
              </h3>

              <p>
                Contemporary technology supports accurate diagnosis,
                efficient planning and a smoother treatment experience.
              </p>

              <span className="differenceArrow">
                ↗
              </span>

            </article>

            {/* 03 */}

            <article
              className="differenceImageSmall"
              data-reveal
            >

              <img
                src={gallery08}
                alt="Personalized NOVADENT care"
              />

              <div className="differenceImageLabel">

                <span>
                  03
                </span>

                <small>
                  PERSONAL CARE
                </small>

              </div>

            </article>

            {/* 04 */}

            <article
              className="differenceContent differenceContentDark"
              data-reveal
            >

              <span className="differenceNumber">
                04
              </span>

              <div className="differenceIcon">
                <Stethoscope size={20} />
              </div>

              <small>
                CONFIDENCE
              </small>

              <h3>
                A plan designed
                around you.
              </h3>

              <p>
                Every smile has different needs. Your treatment plan
                is shaped around your goals and long-term oral health.
              </p>

              <span className="differenceArrow">
                ↗
              </span>

            </article>

          </div>

          <div
            className="differenceBottomLine"
            data-reveal
          >

            <span>
              THE NOVADENT WAY
            </span>

            <span>
              01 — 04
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          YOUR SMILE JOURNEY
      ===================================================== */}

      <section
        id="journey"
        className="smileJourney section"
      >

        <div className="storyContainer">

          {/* HEADER */}

          <div
            className="smileJourneyHeader"
            data-reveal
          >

            <div>

              <div className="sectionStoryLabel">
              <span className="smileJourneyEyebrow storyKicker">

                <i></i>

                YOUR SMILE JOURNEY

              </span>

              <span className="smileJourneyIndex storyIndex">
                07 / FROM FIRST VISIT TO CONFIDENT SMILE
              </span>
              </div>

              <h2>
                Every smile has 
                <em>
                   a story.
                </em>
              </h2>

            </div>

            <p>
              A thoughtful journey from understanding your needs
              to creating a healthier, more confident smile.
            </p>

          </div>

          {/* JOURNEY */}

          <div className="smileJourneyGrid">

            {/* 01 */}

            <article
              className="smileJourneyItem"
              data-reveal
            >

              <div className="smileJourneyImage">

                <img
                  src={gallery05}
                  alt="Dental consultation at NOVADENT"
                  loading="lazy"
                />

              </div>

              <div className="smileJourneyMeta">

                <span>
                  01
                </span>

                <div></div>

                <small>
                  DISCOVER
                </small>

              </div>

              <div className="smileJourneyCopy">

                <h3>
                  It starts with
                  {" "}
                  <em>
                    understanding.
                  </em>
                </h3>

                <p>
                  Your journey begins with a conversation. We listen
                  to your concerns, understand your dental health and
                  discover what your smile truly needs.
                </p>

              </div>

            </article>

            {/* 02 */}

            <article
              className="smileJourneyItem"
              data-reveal
            >

              <div className="smileJourneyImage">

                <img
                  src={gallery06}
                  alt="Dental treatment planning at NOVADENT"
                  loading="lazy"
                />

              </div>

              <div className="smileJourneyMeta">

                <span>
                  02
                </span>

                <div></div>

                <small>
                  PLAN
                </small>

              </div>

              <div className="smileJourneyCopy">

                <h3>
                  Find the right
                  {" "}
                  <em>
                    approach.
                  </em>
                </h3>

                <p>
                  With precise diagnosis and thoughtful planning,
                  every treatment is shaped around your needs,
                  comfort and long-term oral health.
                </p>

              </div>

            </article>

            {/* 03 */}

            <article
              className="smileJourneyItem"
              data-reveal
            >

              <div className="smileJourneyImage">

                <img
                  src={gallery07}
                  alt="Confident smile care at NOVADENT"
                  loading="lazy"
                />

              </div>

              <div className="smileJourneyMeta">

                <span>
                  03
                </span>

                <div></div>

                <small>
                  TRANSFORM
                </small>

              </div>

              <div className="smileJourneyCopy">

                <h3>
                  Your smile,
                  {" "}
                  <em>
                    your confidence.
                  </em>
                </h3>

                <p>
                  Thoughtful treatment, clear guidance and continued
                  support come together to create a healthier,
                  more confident smile.
                </p>

              </div>

            </article>

          </div>

          {/* FOOTER */}

          <div
            className="smileJourneyFooter"
            data-reveal
          >

            <span>
              THE NOVADENT EXPERIENCE
            </span>

            <div>

              <b>01</b>

              <i></i>

              <b>02</b>

              <i></i>

              <b>03</b>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          OUR PHILOSOPHY
      ===================================================== */}

      <section
        id="philosophy"
        className="novaPhilosophy"
      >

        <div className="novaPhilosophyAmbient">

          <span className="novaPhilosophyGlow glowOne"></span>

          <span className="novaPhilosophyGlow glowTwo"></span>

          <span className="novaPhilosophyOrbit orbitOne"></span>

          <span className="novaPhilosophyOrbit orbitTwo"></span>

        </div>

        <div className="storyContainer novaPhilosophyInner">

          {/* HEADER */}

          <div
            className="novaPhilosophyHead"
            data-reveal
          >

            <div className="novaPhilosophyTitle">

              <div className="sectionStoryLabel">
              <div className="novaPhilosophyLabel storyKicker">

                <span></span>

                OUR PHILOSOPHY

              </div>

              <span className="novaPhilosophyIndex storyIndex">
                08 / THE NOVADENT WAY
              </span>
              </div>

              <h2>
                Dentistry should feel
                <em>
                  human.
                </em>
              </h2>

            </div>

            <div className="novaPhilosophyIntro">

              <span>
                PRECISION · COMFORT · TRUST
              </span>

              <p>
                We believe great dentistry begins with listening,
                thoughtful decisions and care that feels personal.
              </p>

            </div>

          </div>

          {/* STATEMENT */}

          <div
            className="novaPhilosophyStatement"
            data-reveal
          >

            <span className="novaPhilosophyQuote">
              “
            </span>

            <div className="novaPhilosophyStatementText">

              <p>
                People first.
                <em>
                  Dentistry with purpose.
                </em>
              </p>

              <span className="novaPhilosophyRule"></span>

              <small>
                THE NOVADENT APPROACH
              </small>

            </div>

          </div>

          {/* VALUES */}

          <div className="novaPhilosophyValues">

            <article
              className="novaPhilosophyValue valueDark"
              data-reveal
            >

              <span className="novaPhilosophyNumber">
                01
              </span>

              <div>

                <small>
                  LISTEN FIRST
                </small>

                <h3>
                  Understand before treating.
                </h3>

                <p>
                  Every treatment begins with understanding
                  your concerns, needs and goals.
                </p>

              </div>

              <span className="novaPhilosophyArrow">
                ↗
              </span>

            </article>

            <article
              className="novaPhilosophyValue"
              data-reveal
            >

              <span className="novaPhilosophyNumber">
                02
              </span>

              <div>

                <small>
                  PRECISION
                </small>

                <h3>
                  Treat with purpose.
                </h3>

                <p>
                  Thoughtful diagnosis and precise planning
                  guide every decision we make.
                </p>

              </div>

              <span className="novaPhilosophyArrow">
                ↗
              </span>

            </article>

            <article
              className="novaPhilosophyValue"
              data-reveal
            >

              <span className="novaPhilosophyNumber">
                03
              </span>

              <div>

                <small>
                  COMFORT
                </small>

                <h3>
                  Make every visit comfortable.
                </h3>

                <p>
                  From your first conversation to treatment,
                  your comfort always matters.
                </p>

              </div>

              <span className="novaPhilosophyArrow">
                ↗
              </span>

            </article>

            <article
              className="novaPhilosophyValue"
              data-reveal
            >

              <span className="novaPhilosophyNumber">
                04
              </span>

              <div>

                <small>
                  TRUST
                </small>

                <h3>
                  Build confidence that lasts.
                </h3>

                <p>
                  Clear communication creates confidence
                  before, during and after treatment.
                </p>

              </div>

              <span className="novaPhilosophyArrow">
                ↗
              </span>

            </article>

          </div>

          {/* FOOTER LINE */}

          <div
            className="novaPhilosophyBottom"
            data-reveal
          >

            <span>
              NOVADENT / 04
            </span>

            <div></div>

            <p>
              Thoughtful dentistry.
              <em>
                Human at heart.
              </em>
            </p>

            <span>
              PRECISION / COMFORT / TRUST
            </span>

          </div>

        </div>

        {/* PHILOSOPHY → JOURNEY BRIDGE */}

        <div
          className="philosophyJourneyBridge"
          data-reveal
        >

          <span className="philosophyJourneyBridgeLabel">
            THE NOVADENT WAY
          </span>

          <div className="philosophyJourneyBridgeLine">

            <span></span>

          </div>

          <div className="philosophyJourneyBridgeText">

            <small>
              WHAT WE BELIEVE
            </small>

            <strong>
              ↓
            </strong>

            <span>
              HOW WE CARE
            </span>

          </div>

        </div>

      </section>
{/* =====================================================
    TREATMENTS
===================================================== */}

<section
  className="storySection cinematicTreatments"
  data-reveal
>
  <div className="storyContainer">

    <div
      className="cinematicTreatmentsIntro"
      data-reveal
    >
      <div>
        <span className="storyKicker">
          SERVICES / TREATMENTS
        </span>

        <span className="storyIndex">
          05 / COMPLETE CARE
        </span>

        <h2>
          Everything your smile needs,{" "}
          <em>thoughtfully planned.</em>
        </h2>
      </div>

      <div className="cinematicTreatmentsIntroSide">
        <span>
          PRECISION · COMFORT · TRUST
        </span>

        <p>
          From preventive care to complete smile restoration,
          every treatment is planned around you.
        </p>

        <Link
          to="/treatments"
          className="storyButton"
        >
          View all treatments
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>


    <div className="cinematicTreatmentFeature">

      {/* FEATURED TREATMENT */}

      <article
        className="cinematicTreatmentFeatured"
        data-reveal
      >

        <div className="cinematicTreatmentFeaturedImage">

        <img
  src={gallery07}
  alt={services[0].title}
  loading="lazy"
/>
          <div className="cinematicTreatmentImageShade"></div>

          <span className="cinematicTreatmentNumber">
            {services[0].number}
          </span>

          <div className="cinematicTreatmentArrow">
            <ArrowUpRight size={20} />
          </div>

        </div>


        <div className="cinematicTreatmentFeaturedContent">

          <span>
            {services[0].number} / NOVADENT CARE
          </span>

          <h3>
            {services[0].title}
          </h3>

          <p>
            {services[0].text}
          </p>

          <div className="cinematicTreatmentDetail">

            <CheckCircle2 size={15} />

            <span>
              {services[0].detail}
            </span>

          </div>

          <Link to="/treatments">
            Explore treatment
            <ArrowRight size={15} />
          </Link>

        </div>

      </article>


      {/* OTHER TREATMENTS */}

      <div className="cinematicTreatmentStack">

        {services.slice(1).map((service, index) => (

          <article
            className="cinematicTreatmentRow"
            key={service.number}
            data-reveal
            style={{
              "--treatment-delay": `${index * 90}ms`,
            }}
          >

            <div className="cinematicTreatmentRowImage">

              <img
                src={service.img}
                alt={service.title}
                loading="lazy"
              />

              <span>
                {service.number}
              </span>

            </div>


            <div className="cinematicTreatmentRowContent">

              <small>
                TREATMENT / {service.number}
              </small>

              <h3>
                {service.title}
              </h3>

              <p>
                {service.text}
              </p>

              <Link to="/treatments">
                Explore
                <ArrowUpRight size={15} />
              </Link>

            </div>


            <div className="cinematicTreatmentRowArrow">
              <ArrowUpRight size={18} />
            </div>

          </article>

        ))}

      </div>

    </div>


    <div
      className="cinematicTreatmentFooter"
      data-reveal
    >

      <span>
        THE COMPLETE NOVADENT EXPERIENCE
      </span>

      <div className="cinematicTreatmentProgress">

        {services.map((service) => (
          <i key={service.number}></i>
        ))}

      </div>

      <small>
        06 TREATMENTS / ONE THOUGHTFUL APPROACH
      </small>

    </div>

  </div>
</section>


{/* =====================================================
    DOCTORS
===================================================== */}

<section
  className="storySection cinematicDoctors"
  data-reveal
>
  <div className="storyContainer">

    <div
      className="cinematicDoctorsIntro"
      data-reveal
    >

      <div>

        <span className="storyKicker">
          OUR DENTISTS
        </span>

        <span className="storyIndex">
          06 / THE TEAM
        </span>

        
<h2>
  People behind your <em>healthier smile.</em>
</h2>
      </div>


      <div className="cinematicDoctorsIntroSide">

        <span>
          EXPERTISE · EMPATHY · EXPERIENCE
        </span>

        <p>
          Clinical knowledge meets a calm,
          patient-first approach to modern dentistry.
        </p>

        <Link
          to="/doctors"
          className="storyButton"
        >
          Meet all doctors
          <ArrowRight size={17} />
        </Link>

      </div>

    </div>


    <div className="cinematicDoctorEditorial">

      {doctors.map((doctor, index) => (

        <article
          className={
            index % 2 === 0
              ? "cinematicDoctor"
              : "cinematicDoctor cinematicDoctorReverse"
          }
          key={doctor.name}
          data-reveal
        >

          <div className="cinematicDoctorPortrait">

            <img
              src={doctor.img}
              alt={doctor.name}
              loading="lazy"
            />

            <div className="cinematicDoctorPortraitShade"></div>

            <span className="cinematicDoctorNumber">
              0{index + 1}
            </span>

            <span className="cinematicDoctorExperience">
              {doctor.experience}
            </span>

          </div>


          <div className="cinematicDoctorInfo">

            <span>
              {doctor.specialty}
            </span>

            <h3>
              {doctor.name}
            </h3>

            <p>
              {doctor.qualification}
            </p>

            <div className="cinematicDoctorRule"></div>

            <Link to="/appointment">
              Book consultation
              <ArrowUpRight size={16} />
            </Link>

          </div>

        </article>

      ))}

    </div>

  </div>
</section>


{/* =====================================================
    REVIEWS
===================================================== */}

<section
  className="storySection cinematicReviews"
  data-reveal
>
  <div className="storyContainer cinematicReviewLayout">

    <div
      className="cinematicReviewIntro"
      data-reveal
    >

      <span className="storyKicker">
        PATIENT STORIES
      </span>

      <span className="storyIndex">
        07 / EXPERIENCES
      </span>

      <div className="cinematicReviewStars">
        ★★★★★
      </div>

      <h2>
        Care that patients{" "}
        <em>remember.</em>
      </h2>

      <p>
        Comfort, clarity and thoughtful care
        are at the heart of every NOVADENT experience.
      </p>

      <div className="cinematicReviewCounter">

        <strong>
          0{review + 1}
        </strong>

        <span></span>

        <small>
          0{reviews.length}
        </small>

      </div>

    </div>

<div
  className={
    reviewDirection === "next"
      ? "cinematicReviewFeature reviewSlideNext"
      : "cinematicReviewFeature reviewSlidePrev"
  }
  data-reveal
  key={review}
  onMouseEnter={() => setIsReviewPaused(true)}
  onMouseLeave={() => setIsReviewPaused(false)}
  onFocusCapture={() => setIsReviewPaused(true)}
  onBlurCapture={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsReviewPaused(false);
    }
  }}
>
      <div className="cinematicReviewImage">

        <img
          src={reviews[review].image}
          alt={`${reviews[review].name} review`}
        />

        <span>
          “
        </span>

      </div>


      <div className="cinematicReviewContent">

        <small>
          NOVADENT PATIENT / 0{review + 1}
        </small>

        <blockquote>
          {reviews[review].quote}
        </blockquote>


        <div className="cinematicReviewAuthor">

          <div className="cinematicReviewInitials">
            {reviews[review].name
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div>

            <strong>
              {reviews[review].name}
            </strong>

            <span>
              {reviews[review].role}
            </span>

          </div>

        </div>


        <div className="cinematicReviewControls">

          <button
            type="button"
            onClick={goToPreviousReview}
            aria-label="Previous review"
          >
            ←
          </button>


          <div>

            {reviews.map((_, index) => (

              <button
                type="button"
                key={index}
                className={
                  review === index
                    ? "active"
                    : ""
                }
                onClick={() => goToReview(index)}
                aria-label={`Review ${index + 1}`}
              />

            ))}

          </div>


          <button
            type="button"
            onClick={goToNextReview}
            aria-label="Next review"
          >
            →
          </button>

        </div>

      </div>

    </div>

  </div>
</section>


<SmileGoalExplorer />

{/* =====================================================
    PATIENT FAQ — A CALM, CLEAR NEXT STEP
===================================================== */}
<section className="novaPatientFaq storySection" data-reveal aria-labelledby="nova-faq-title">
  <div className="novaPatientFaqInner">
    <div className="novaPatientFaqIntro">
      <span className="storyKicker">A LITTLE CLARITY</span>
      <span className="storyIndex">BEFORE YOUR FIRST VISIT</span>
      <h2 id="nova-faq-title">Good care starts with <em>good questions.</em></h2>
      <p>Here are a few helpful answers to make your first step feel simpler. Your dentist can guide you based on your individual needs.</p>
      <Link to="/contact" className="novaFaqContactLink">Still have a question? Contact us <ArrowUpRight size={16} /></Link>
    </div>
    <div className="novaPatientFaqList">
      {[
        { q: "What happens at a first consultation?", a: "Your dental team will listen to your concerns, review your oral health and explain suitable next steps. You can ask questions before deciding on a treatment plan." },
        { q: "How do I know which treatment I need?", a: "The right option depends on an individual examination and your goals. A dentist can explain the available choices, benefits, limitations and expected care." },
        { q: "Can I request a particular appointment time?", a: "Yes. Share your preferred date and time through the appointment form. The clinic team will need to confirm the actual slot with you." },
        { q: "What if I feel nervous about dental treatment?", a: "Tell the team about your concerns. They can explain each step, discuss comfort options and help you understand what to expect before treatment begins." },
      ].map((item, index) => (
        <div className={`novaFaqItem ${openFaq === index ? "is-open" : ""}`} key={item.q}>
          <button type="button" className="novaFaqQuestion" aria-expanded={openFaq === index} aria-controls={`nova-faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
            <span className="novaFaqNumber">0{index + 1}</span>
            <span>{item.q}</span>
            <span className="novaFaqToggle" aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
          </button>
          {openFaq === index && <div className="novaFaqAnswer" id={`nova-faq-answer-${index}`}><p>{item.a}</p></div>}
        </div>
      ))}
    </div>
  </div>
</section>

<VisitPrepChecklist />

{/* =====================================================
    APPOINTMENT
===================================================== */}

<section
  className="cinematicAppointment"
  data-reveal
>

  <div className="cinematicAppointmentAmbient" aria-hidden="true">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <div className="cinematicAppointmentSmile" aria-hidden="true">
    <img src={gallery03} alt="" loading="lazy" />
    <span>YOUR SMILE, REIMAGINED</span>
  </div>


  <div className="storyContainer cinematicAppointmentInner">

    <div className="cinematicAppointmentNumber">
      08
    </div>


<div className="appointmentTrustNote">
  <span className="appointmentTrustDot"></span>
  PERSONALIZED CARE · CONFIDENT SMILES
</div>

    <div className="cinematicAppointmentCopy">

      <span className="storyKicker lightKicker">
        YOUR NEXT STEP
      </span>

      <span className="storyIndex lightIndex">
        BEGIN YOUR JOURNEY
      </span>

      <h2>
        Ready for a healthier,{" "}
        <em>more confident smile?</em>
      </h2>

      <p>
        Book a consultation and let the NOVADENT
        team guide you through your next step.
      </p>

    </div>


    <div className="cinematicAppointmentActions">

      <Link
        to="/appointment"
        className="lightStoryButton"
      >
        <CalendarDays size={17} />
        Book an Appointment
        <ArrowRight size={17} />
      </Link>


      <Link
        to="/contact"
        className="textLightLink"
      >
        Contact NOVADENT
        <ArrowUpRight size={16} />
      </Link>

    </div>

  </div>

</section>


    </main>
  );
}

