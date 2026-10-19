import { Link } from "react-router-dom";

import gallery02 from "../assets/gallery/gallery-02.jpg";
import gallery03 from "../assets/gallery/gallery-03.jpg";
import gallery04 from "../assets/gallery/gallery-04.jpg";
import gallery06 from "../assets/gallery/gallery-06.jpg";
import gallery07 from "../assets/gallery/gallery-07.jpg";
import gallery08 from "../assets/gallery/gallery-08.jpg";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Smile,
} from "lucide-react";

/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    number: "01",
    category: "PREVENTIVE CARE",
    title: "General Dentistry",
    description:
      "Complete everyday dental care focused on prevention, early detection and maintaining a healthy smile.",
    image: gallery03,
    duration: "30–45 MIN",
    points: [
      "Dental Check-Ups",
      "Professional Cleaning",
      "Oral Health Assessment",
    ],
  },
  {
    number: "02",
    category: "SMILE ENHANCEMENT",
    title: "Teeth Whitening",
    description:
      "Professional whitening care designed to brighten your smile while keeping your experience comfortable.",
    image: gallery08,
    duration: "45–60 MIN",
    points: [
      "Smile Brightening",
      "Shade Assessment",
      "Personalized Aftercare",
    ],
  },
  {
    number: "03",
    category: "RESTORATIVE CARE",
    title: "Dental Implants",
    description:
      "Modern implant solutions designed to restore missing teeth, improve function and support a natural-looking smile.",
    image: gallery07,
    duration: "TREATMENT PLAN",
    points: [
      "Implant Consultation",
      "Tooth Replacement",
      "Restorative Planning",
    ],
  },
  {
    number: "04",
    category: "ORTHODONTIC CARE",
    title: "Braces & Aligners",
    description:
      "Personalized alignment solutions using modern orthodontic techniques for healthier and more confident smiles.",
    image: gallery02,
    duration: "45–60 MIN",
    points: [
      "Smile Assessment",
      "Clear Aligners",
      "Alignment Planning",
    ],
  },
  {
    number: "05",
    category: "RESTORATIVE CARE",
    title: "Dental Crowns",
    description:
      "Carefully planned restorative care that helps protect damaged teeth and restore their strength and appearance.",
    image: gallery06,
    duration: "CONSULTATION",
    points: [
      "Tooth Protection",
      "Custom Restoration",
      "Natural Appearance",
    ],
  },
  {
    number: "06",
    category: "COMFORT & HEALTH",
    title: "Root Canal Care",
    description:
      "Comfort-focused treatment designed to relieve dental pain while preserving your natural tooth.",
    image: gallery04,
    duration: "60–90 MIN",
    points: [
      "Pain Relief",
      "Tooth Preservation",
      "Careful Aftercare",
    ],
  },
];

/* =========================================================
   BENEFITS
========================================================= */

const benefits = [
  {
    icon: ShieldCheck,
    title: "Patient-First Care",
    text: "Treatment recommendations are designed around your needs, comfort and goals.",
  },
  {
    icon: Sparkles,
    title: "Modern Techniques",
    text: "We combine contemporary dental methods with thoughtful clinical care.",
  },
  {
    icon: HeartPulse,
    title: "Comfort Focused",
    text: "Every visit is designed to feel calm, clear and supportive.",
  },
  {
    icon: Stethoscope,
    title: "Experienced Team",
    text: "Our dental professionals bring experience across different areas of care.",
  },
];

/* =========================================================
   SERVICES PAGE
========================================================= */

export default function Services() {
  return (
    <main className="novaServicesPage">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="novaServicesHero"
        aria-labelledby="services-hero-title"
      >

        <div
          className="novaServicesHeroImage"
          aria-hidden="true"
        ></div>

        <div
          className="novaServicesHeroOverlay"
          aria-hidden="true"
        ></div>

        <div className="novaServicesContainer novaServicesHeroContent">

          <div className="novaServicesEyebrow">

            <Sparkles
              size={15}
              aria-hidden="true"
            />

            <span>
              MODERN DENTISTRY · PERSONAL CARE
            </span>

          </div>


          <span className="novaServicesOverline">
            OUR DENTAL SERVICES
          </span>


          <h1 id="services-hero-title">
            Complete care for
            <span> your confident smile.</span>
          </h1>


          <p>
            From preventive dental care to restorative and smile-enhancing
            treatments, NOVADENT provides personalized care in a comfortable
            modern environment.
          </p>


          {/* HERO BUTTONS REMOVED AS REQUESTED */}


          <div
            className="novaServicesTrust"
            aria-label="NOVADENT care benefits"
          >

            <span>
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />
              Personalized Plans
            </span>

            <span>
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />
              Modern Care
            </span>

            <span>
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />
              Comfort Focused
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section
        className="novaServicesIntro"
        aria-labelledby="services-intro-title"
      >

        <div className="novaServicesContainer novaServicesIntroGrid">

          <div>

            <span className="novaServicesMiniTitle">
              OUR APPROACH
            </span>

            <small className="novaServicesSectionNumber">
              01 / CARE WITH PURPOSE
            </small>

            <h2 id="services-intro-title">
              More than a dental
              <span> appointment.</span>
            </h2>

          </div>


          <div className="novaServicesIntroText">

            <p className="novaServicesLead">
              Great dental care starts with understanding what you need.
              Our approach combines clinical expertise, modern techniques
              and genuine attention to your comfort.
            </p>

            <p>
              Whether you need routine preventive care or a more advanced
              treatment plan, our team takes the time to explain your
              options clearly.
            </p>


            <div className="novaServicesIntroList">

              <span>
                <CheckCircle2
                  size={17}
                  aria-hidden="true"
                />
                Clear treatment recommendations
              </span>

              <span>
                <CheckCircle2
                  size={17}
                  aria-hidden="true"
                />
                Modern dental technology
              </span>

              <span>
                <CheckCircle2
                  size={17}
                  aria-hidden="true"
                />
                Comfortable patient experience
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

     {services.map((service, index) => (

  <article
    className={`editorialService ${
      index % 2 === 0
        ? "treatmentFromLeft"
        : "treatmentFromRight"
    }`}
    key={service.number}
    data-reveal
    style={{
      "--delay": `${Number(service.number) * 70}ms`,
    }}
  >

    <div className="editorialServiceImage">

      <img
        src={service.img}
        alt={service.title}
        loading="lazy"
      />

      <span>
        {service.number}
      </span>

      <div className="editorialImageArrow">
        <ArrowUpRight size={18} />
      </div>

    </div>

    <div className="editorialServiceBody">

      <span>
        TREATMENT
      </span>

      <h3>
        {service.title}
      </h3>

      <p>
        {service.text}
      </p>

      <div className="serviceDetail">

        <CheckCircle2 size={15} />

        <span>
          {service.detail}
        </span>

      </div>

      <Link to="/treatments">
        Explore treatment
        <ArrowRight size={15} />
      </Link>

    </div>

  </article>

))}
      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section
        className="novaServicesBenefits"
        aria-labelledby="services-benefits-title"
      >

        <div className="novaServicesContainer">

          <div className="novaServicesBenefitsHeading">

            <span className="novaServicesMiniTitle">
              WHY NOVADENT
            </span>

            <h2 id="services-benefits-title">
              Care designed around
              <span> you.</span>
            </h2>

            <p>
              Every part of your experience is designed to make dental
              care clearer, calmer and more comfortable.
            </p>

          </div>


          <div className="novaServicesBenefitsGrid">

            {benefits.map((benefit) => {

              const Icon = benefit.icon;

              return (
                <article
                  className="novaServicesBenefitCard"
                  key={benefit.title}
                >

                  <div
                    className="novaServicesBenefitIcon"
                    aria-hidden="true"
                  >
                    <Icon size={23} />
                  </div>


                  <h3>
                    {benefit.title}
                  </h3>


                  <p>
                    {benefit.text}
                  </p>


                  <span
                    className="novaServicesBenefitArrow"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={17} />
                  </span>

                </article>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICE JOURNEY
      ===================================================== */}

      <section
        className="novaServicesJourney"
        aria-labelledby="services-journey-title"
      >

        <div className="novaServicesContainer">

          <div className="novaServicesJourneyGrid">

            <div className="novaServicesJourneyImage">

              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85"
                alt="Modern NOVADENT dental consultation"
                loading="lazy"
              />


              <div className="novaServicesJourneyBadge">

                <HeartPulse
                  size={19}
                  aria-hidden="true"
                />

                <div>

                  <strong>
                    Personalized
                  </strong>

                  <span>
                    Dental care
                  </span>

                </div>

              </div>

            </div>


            <div className="novaServicesJourneyContent">

              <span className="novaServicesMiniTitle">
                YOUR DENTAL JOURNEY
              </span>


              <h2 id="services-journey-title">
                Clear care from
                <span> first visit to follow-up.</span>
              </h2>


              <p>
                We keep your dental journey simple and transparent,
                helping you understand what happens at every stage.
              </p>


              <div className="novaServicesJourneySteps">

                <div className="novaServicesJourneyStep">

                  <span>
                    01
                  </span>

                  <div>

                    <h3>
                      Understand
                    </h3>

                    <p>
                      We listen to your concerns and understand your
                      dental goals.
                    </p>

                  </div>

                </div>


                <div className="novaServicesJourneyStep">

                  <span>
                    02
                  </span>

                  <div>

                    <h3>
                      Plan
                    </h3>

                    <p>
                      We explain suitable options and create a clear
                      treatment approach.
                    </p>

                  </div>

                </div>


                <div className="novaServicesJourneyStep">

                  <span>
                    03
                  </span>

                  <div>

                    <h3>
                      Care
                    </h3>

                    <p>
                      Our team provides thoughtful treatment with a
                      focus on your comfort.
                    </p>

                  </div>

                </div>

              </div>


              <Link
                to="/appointment"
                className="novaServicesJourneyButton"
                aria-label="Start your dental journey with NOVADENT"
              >
                Start Your Dental Journey

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        className="novaServicesCTA"
        aria-labelledby="services-cta-title"
      >

        <div
          className="novaServicesCTAOverlay"
          aria-hidden="true"
        ></div>


        <div className="novaServicesContainer novaServicesCTAContent">

          <span
            className="novaServicesCTAIcon"
            aria-hidden="true"
          >
            <Sparkles size={23} />
          </span>


          <span className="novaServicesMiniTitle light">
            READY TO TAKE THE NEXT STEP?
          </span>


          <h2 id="services-cta-title">
            Your healthier smile
            <span> starts with a conversation.</span>
          </h2>


          <p>
            Tell us about your dental concerns and let our team help
            you understand the right next step.
          </p>


          <div className="novaServicesCTAActions">

            <Link
              to="/appointment"
              className="novaServicesCTAPrimary"
              aria-label="Book an appointment with NOVADENT"
            >

              <Stethoscope
                size={18}
                aria-hidden="true"
              />

              Book an Appointment

              <ArrowRight
                size={17}
                aria-hidden="true"
              />

            </Link>


            <Link
              to="/contact"
              className="novaServicesCTASecondary"
              aria-label="Contact NOVADENT"
            >

              Contact NOVADENT

              <ArrowRight
                size={17}
                aria-hidden="true"
              />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}