import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const HERO_VIDEO = "/videos/novadent-hero.mp4";

const heroSlides = [
  {
    eyebrow: "ADVANCED DENTAL CARE",
    title: "Modern dentistry",
    accent: "designed around you.",
    description:
      "Modern dentistry, gentle care and personalized treatment designed around your comfort, confidence and individual smile goals.",
  },
  {
    eyebrow: "CONFIDENT SMILES",
    title: "A confident smile",
    accent: "changes everything.",
    description:
      "Personalized cosmetic and restorative dental care that helps you feel comfortable, look confident and smile naturally every day.",
  },
  {
    eyebrow: "PRECISION DENTISTRY",
    title: "Exceptional care",
    accent: "from every angle.",
    description:
      "Advanced technology, experienced dental care and a thoughtful clinic experience created to make every visit comfortable, precise and reassuring.",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const transitionTimer = useRef(null);
  const isPaused = isPointerInside || hasFocus;

  useEffect(() => {
    // Keep the carousel still for reduced-motion visitors and while they interact.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    if (isPaused) return undefined;

    const intervalTimer = window.setInterval(() => {
      setIsChanging(true);
      transitionTimer.current = window.setTimeout(() => {
        setActiveSlide((previous) => (previous + 1) % heroSlides.length);
        setIsChanging(false);
        transitionTimer.current = null;
      }, 350);
    }, 5600);

    return () => {
      window.clearInterval(intervalTimer);
    };
  }, [isPaused]);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  const selectSlide = (index) => {
    window.clearTimeout(transitionTimer.current);
    transitionTimer.current = null;

    if (index === activeSlide) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveSlide(index);
      setIsChanging(false);
      return;
    }

    setIsChanging(true);
    transitionTimer.current = window.setTimeout(() => {
      setActiveSlide(index);
      setIsChanging(false);
      transitionTimer.current = null;
    }, 220);
  };

  const slide = heroSlides[activeSlide];

  return (
    <section
      className="novaHero"
      aria-label="NOVADENT Dental Care"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsPointerInside(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsPointerInside(false);
      }}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHasFocus(false);
        }
      }}
    >
      {/* =================================================
          BACKGROUND VIDEO
          ================================================= */}

      <div className="novaHeroMedia" aria-hidden="true">
        <video
          className="novaHeroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/gallery/gallery-01.jpg"
        >
          <source
            src={HERO_VIDEO}
            type="video/mp4"
          />
        </video>

        <div className="novaHeroOverlay" />
        <div className="novaHeroGradient" />
        <div className="novaHeroVignette" />
      </div>

      {/* =================================================
          TOP LABEL
          ================================================= */}

      <div className="novaHeroTopLabel">
        <Sparkles size={14} />

        <span>
          MODERN DENTAL CARE · NOVADENT
        </span>
      </div>

      {/* =================================================
          MAIN HERO CONTENT
          ================================================= */}

      <div className="novaHeroContent">

        {/* EYEBROW */}

        <div
          key={`eyebrow-${activeSlide}`}
          className={`novaHeroEyebrow ${
            isChanging
              ? "textSlideExit"
              : "textSlideEnter"
          }`}
        >
          <span className="novaHeroEyebrowLine" />

          <span>{slide.eyebrow}</span>

          <span className="novaHeroEyebrowLine" />
        </div>

        {/* TEXT SLIDER */}

        <div
          key={`content-${activeSlide}`}
          className={`novaHeroTextSlider ${
            isChanging
              ? "textSlideExit"
              : "textSlideEnter"
          }`}
        >
          <h1 className="novaHeroTitle">

            <span>
              {slide.title}
            </span>

            <span className="novaHeroAccent">
              {slide.accent}
            </span>

          </h1>

          <p className="novaHeroDescription">
            {slide.description}
          </p>

          {/* BUTTONS */}

          <div className="novaHeroActions">

            <Link
              to="/appointment"
              className="novaHeroPrimary"
            >
              <span>
                Book an Appointment
              </span>

              <ArrowRight size={17} />
            </Link>

            <Link
              to="/treatments"
              className="novaHeroSecondary"
            >
              <span>
                Explore Treatments
              </span>

              <ArrowUpRight size={16} />
            </Link>

          </div>
        </div>

        {/* =================================================
            STATS
            ================================================= */}



      </div>

      {/* =================================================
          BOTTOM INFORMATION
          ================================================= */}

      <div className="novaHeroInfo">

        {/* LOCATION */}

        <div className="novaHeroInfoItem">

          <small>
            CLINIC LOCATION
          </small>

          <strong>
            Kharadi, Pune
          </strong>

          <span>
            Maharashtra, India
          </span>

        </div>

        {/* HOURS */}

        <div className="novaHeroInfoItem">

          <small>
            OPENING HOURS
          </small>

          <strong>
            Mon–Sun: 10:00 AM – 7:00 PM
          </strong>

          <span>
            Appointments available
          </span>

        </div>

        {/* PHONE */}

        <div className="novaHeroInfoItem">

          <small>
            NEED DENTAL SERVICES?
          </small>

          <a href="tel:+919000012345">
  +91 90000 12345
</a>

          <span>
            Call our clinic
          </span>

        </div>

        {/* APPOINTMENT */}

        <Link
          to="/appointment"
          className="novaHeroMakeAppointment"
        >
          <span>
            Make an Appointment
          </span>

          <ArrowRight size={15} />
        </Link>

      </div>

      {/* =================================================
          RIGHT SIDE LABEL
          ================================================= */}

      <div className="novaHeroSideLabel">

        <span>PRECISION</span>
        <span>COMFORT</span>
        <span>CONFIDENCE</span>

      </div>

      {/* =================================================
          SLIDER INDICATORS
          ================================================= */}

      <div className="novaHeroIndicators">

        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={
              activeSlide === index
                ? "active"
                : ""
            }
            onClick={() => {
              selectSlide(index);
            }}
            aria-pressed={activeSlide === index}
            aria-label={`Go to slide ${
              index + 1
            }`}
          >
            <span />
          </button>
        ))}

      </div>

      {/* =================================================
          SCROLL
          ================================================= */}

      <div className="novaHeroScroll">

        <span>
          SCROLL TO EXPLORE
        </span>

        <ChevronDown size={17} />

      </div>

    </section>
  );
}
