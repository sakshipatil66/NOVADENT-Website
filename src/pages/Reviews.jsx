import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Heart,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import "./ReviewsPremium.css";

const reviews = [
  {
    name: "Priya Sharma",
    treatment: "Smile Makeover",
    initials: "PS",
    quote:
      "The entire experience was comfortable and reassuring. The team explained every step clearly, and I felt genuinely cared for throughout my treatment.",
  },
  {
    name: "Rahul Deshmukh",
    treatment: "Dental Check-up",
    initials: "RD",
    quote:
      "The clinic feels modern and welcoming. The consultation was detailed, and all my questions were answered patiently.",
  },
  {
    name: "Ananya Patil",
    treatment: "Teeth Alignment",
    initials: "AP",
    quote:
      "I appreciated the clear guidance and professional approach. The team made my visits feel much less stressful.",
  },
  {
    name: "Amit Kulkarni",
    treatment: "Root Canal Treatment",
    initials: "AK",
    quote:
      "The procedure and aftercare were explained in a way that was easy to understand. The overall experience was reassuring.",
  },
];

const trustItems = [
  {
    icon: Heart,
    title: "Care That Listens",
    text: "Every patient deserves attention, understanding and a personalised approach.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Guidance",
    text: "Understand your treatment options before making decisions about your care.",
  },
  {
    icon: MessageCircle,
    title: "Open Communication",
    text: "We welcome your questions and believe good care starts with a conversation.",
  },
];

function Stars() {
  return (
    <div className="novaReviewStars" aria-label="5 stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          fill="currentColor"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".novaReviewsPage .novaReveal"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add("novaRevealed")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("novaRevealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export default function Reviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useScrollReveal();

  const currentReview = reviews[activeReview];

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const showPrevious = () => {
    setActiveReview((current) =>
      current === 0 ? reviews.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveReview((current) => (current + 1) % reviews.length);
  };

  const openReview = (index) => {
    setActiveReview(index);
    document.getElementById("patientReviews")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="novaReviewsPage">
      {/* HERO */}
      <section className="novaReviewsHero">
        <div className="novaReviewsHeroGlow" aria-hidden="true" />

        <div className="novaReviewsContainer novaReviewsHeroContent">
          <span className="novaReviewsEyebrow">
            PATIENT STORIES · NOVADENT
          </span>

          <h1>
            Every smile has
            <br />
            <em>a story to tell.</em>
          </h1>

          <p>
            Discover what matters most to our patients: thoughtful care,
            clear guidance and a reassuring dental experience.
          </p>

          <a className="novaReviewsHeroLink" href="#patientReviews">
            Explore patient stories <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="novaReviewsIntro">
        <div className="novaReviewsContainer novaReviewsIntroGrid novaReveal">
          <div className="novaReviewsIntroHeading">
            <span className="novaReviewsOverline">
              THE PATIENT EXPERIENCE
            </span>
            <span className="novaReviewsNumber">
              01 / YOUR VOICE MATTERS
            </span>

            <h2>
              Care is more than
              <br />
              <em>the treatment itself.</em>
            </h2>
          </div>

          <div className="novaReviewsIntroText">
            <p>
              A good dental experience begins with listening. We want every
              patient to feel informed, respected and comfortable asking
              questions at every stage of their care.
            </p>
            <p>
              Our approach centres on personal attention, clear communication
              and thoughtful guidance.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED REVIEW SLIDER */}
      <section className="novaReviewsFeatured" id="patientReviews">
        <div className="novaReviewsContainer">
          <div className="novaReviewsSectionHeading novaReveal">
            <div>
              <span className="novaReviewsOverline">
                PATIENT PERSPECTIVES
              </span>
              <h2>
                Stories that <em>matter.</em>
              </h2>
            </div>

            <p>
              Every patient is different. Our aim is to make every visit feel
              considered, clear and personal.
            </p>
          </div>

          <article
            className="novaFeaturedReview novaFeaturedReviewAnimated"
            key={currentReview.name}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div className="novaFeaturedQuote">
              <Quote size={38} strokeWidth={1.3} />
            </div>

            <div className="novaFeaturedContent">
              <Stars />

              <blockquote aria-live="polite">
                “{currentReview.quote}”
              </blockquote>

              <div className="novaFeaturedPerson">
                <div className="novaPersonAvatar">
                  {currentReview.initials}
                </div>
                <div>
                  <strong>{currentReview.name}</strong>
                  <span>{currentReview.treatment}</span>
                </div>
              </div>
            </div>

            <div className="novaFeaturedControls">
              <span>
                {String(activeReview + 1).padStart(2, "0")} /{" "}
                {String(reviews.length).padStart(2, "0")}
              </span>

              <div className="novaReviewButtons">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous review"
                >
                  <ChevronLeft size={19} />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next review"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
          </article>

          <div className="novaReviewDots" aria-label="Choose a review">
            {reviews.map((review, index) => (
              <button
                type="button"
                key={review.name}
                className={index === activeReview ? "active" : ""}
                onClick={() => setActiveReview(index)}
                aria-label={`Show review ${index + 1}`}
                aria-pressed={index === activeReview}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="novaReviewsTrust">
        <div className="novaReviewsContainer">
          <div className="novaReviewsSectionHeading novaTrustHeading novaReveal">
            <div>
              <span className="novaReviewsOverline">OUR COMMITMENT</span>
              <h2>
                What guides <em>our care.</em>
              </h2>
            </div>

            <p>
              The principles behind a more thoughtful dental experience.
            </p>
          </div>

          <div className="novaReviewsTrustGrid">
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  className="novaReviewTrustCard novaReveal"
                  key={item.title}
                  style={{ "--reveal-delay": `${index * 110}ms` }}
                >
                  <span className="novaTrustIcon">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MORE PATIENT STORIES */}
      <section className="novaReviewsCardsSection">
        <div className="novaReviewsContainer">
          <div className="novaReviewsCardsHeading novaReveal">
            <span className="novaReviewsOverline">
              MORE PATIENT PERSPECTIVES
            </span>

            <h2>
              Different journeys. <em>One priority.</em>
            </h2>

            <p>
              Thoughtful, individual care at every stage of the dental journey.
            </p>
          </div>

          <div className="novaReviewsCardsGrid">
            {reviews.map((review, index) => (
              <article
                className="novaReviewCard novaReveal"
                key={review.name}
                style={{ "--reveal-delay": `${index * 100}ms` }}
              >
                <div className="novaReviewCardTop">
                  <div className="novaReviewMiniAvatar">
                    {review.initials}
                  </div>
                  <Stars />
                </div>

                <Quote
                  className="novaReviewCardQuote"
                  size={24}
                  strokeWidth={1.4}
                />

                <p>{review.quote}</p>

                <div className="novaReviewCardPerson">
                  <strong>{review.name}</strong>
                  <span>{review.treatment}</span>
                </div>

                <button
                  className="novaReviewCardView"
                  type="button"
                  onClick={() => openReview(index)}
                >
                  Read featured story <ArrowUpRight size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}

{/* CALL TO ACTION */}
<section className="novaReviewsCTA">
  <div className="novaReviewsCTACard novaReveal">
    
    <div className="novaReviewsCTAContent">
      <div className="novaReviewsCTALeft">
        <span className="novaReviewsCTABadge">
          YOUR JOURNEY STARTS HERE
        </span>
      </div>

      <div className="novaReviewsCTARight">
        <h2>
          Let’s Make Your Next Dental Visit
          <span> Feel Different.</span>
        </h2>

        <p>
          Have questions about your dental care? Connect with our team
          to discuss your needs and explore the next step.
        </p>

        <Link
          to="/appointment"
          className="novaReviewsCTAButton"
        >
          Book an Appointment <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}
