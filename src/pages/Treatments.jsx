import { useEffect, useState } from "react";
import observeElementsOnce from "../utils/observeElementsOnce";

import { Link } from "react-router-dom";

import {

  ArrowRight,

  ArrowUpRight,

  CheckCircle,

  Clock3,

  Sparkles,

  ChevronDown,

  ClipboardCheck,

  HeartPulse,

  Stethoscope,

  ShieldCheck,
  Search,
  X,

} from "lucide-react";

import gallery01 from "../assets/gallery/gallery-01.jpg";

import gallery02 from "../assets/gallery/gallery-02.jpg";

import gallery03 from "../assets/gallery/gallery-03.jpg";

import gallery04 from "../assets/gallery/gallery-04.jpg";

import gallery05 from "../assets/gallery/gallery-05.jpg";

import gallery06 from "../assets/gallery/gallery-06.jpg";

import gallery07 from "../assets/gallery/gallery-07.jpg";

import gallery08 from "../assets/gallery/gallery-08.jpg";

import "./Treatments.css";

import "./TreatmentsPremiumStory.css";

import "./TreatmentsVisualFix.css";

import "./TreatmentsImageFix.css";
import "./TreatmentExplorer.css";
import "./TreatmentsResponsiveFinal.css";

const treatments = [

  {

    number: "01",

    title: "Dental Check-Up",

    category: "PREVENTIVE CARE",

    duration: "30–45 MIN",

    image: gallery01,

    imageAlt: "Dental check-up and oral examination",

    price: "₹500 onwards",

    description:

      "Keep your smile healthy with a thorough dental examination and personalized oral-care guidance.",

    tags: ["Oral examination", "Gum health", "Prevention"],

    icon: Stethoscope,

  },

  {

    number: "02",

    title: "Teeth Whitening",

    category: "COSMETIC DENTISTRY",

    duration: "45–60 MIN",

    image: gallery02,

    imageAlt: "Cosmetic dentistry and teeth whitening",

    price: "₹4,000 onwards",

    description:

      "Explore whitening options designed around your dental needs and smile goals.",

    tags: ["Smile enhancement", "Personalized care", "Confidence"],

    icon: Sparkles,

  },

  {

    number: "03",

    title: "Dental Implants",

    category: "RESTORATIVE CARE",

    duration: "PERSONALIZED PLAN",

    image: gallery03,

    imageAlt: "Dental implant and tooth replacement treatment",

    price: "₹25,000 onwards",

    description:

      "Explore tooth-replacement options with a treatment plan tailored to your oral health.",

    tags: ["Tooth replacement", "Treatment planning", "Long-term care"],

    icon: HeartPulse,

  },

  {

    number: "04",

    title: "Orthodontics",

    category: "SMILE ALIGNMENT",

    duration: "PERSONALIZED PLAN",

    image: gallery04,

    imageAlt: "Orthodontic treatment and teeth alignment",

    price: "₹25,000 onwards",

    description:

      "Discover suitable options for improving tooth alignment, bite function and smile balance.",

    tags: ["Tooth alignment", "Bite assessment", "Progress reviews"],

    icon: ShieldCheck,

  },

  {

    number: "05",

    title: "Dental Crowns",

    category: "RESTORATIVE DENTISTRY",

    duration: "CASE DEPENDENT",

    image: gallery05,

    imageAlt: "Dental crown and restorative dental care",

    price: "₹2,000 onwards",

    description:

      "Restore and protect damaged teeth with crown options selected for your individual needs.",

    tags: ["Tooth protection", "Restoration", "Natural appearance"],

    icon: ClipboardCheck,

  },

  {

    number: "06",

    title: "Root Canal Care",

    category: "TOOTH PRESERVATION",

    duration: "CASE DEPENDENT",

    image: gallery06,

    imageAlt: "Root canal treatment and tooth preservation",

    price: "₹3,500 onwards",

    description:

      "Get an assessment for tooth pain or infection and learn about options to preserve your natural tooth.",

    tags: ["Tooth preservation", "Pain assessment", "Aftercare"],

    icon: HeartPulse,

  },

  {

    number: "07",

    title: "Gum Health Care",

    category: "PREVENTIVE CARE",

    duration: "PERSONALIZED PLAN",

    image: gallery07,

    imageAlt: "Gum health and periodontal dental care",

    price: "₹500 onwards",

    description:

      "Support healthier gums with an assessment, practical guidance and a personalized care plan.",

    tags: ["Gum assessment", "Oral hygiene", "Prevention"],

    icon: ShieldCheck,

  },

  {

    number: "08",

    title: "Smile Consultation",

    category: "PERSONALIZED GUIDANCE",

    duration: "30 MIN APPROX.",

    image: gallery08,

    imageAlt: "Smile consultation and personalized dental planning",

    price: "Price on consultation",

    description:

      "Discuss your smile goals and explore suitable options after a professional assessment.",

    tags: ["Smile goals", "Clear guidance", "Next steps"],

    icon: Sparkles,

  },

];

const steps = [

  {

    number: "01",

    title: "Discover",

    description:

      "Tell us about your concerns, dental goals and the changes you would like to make.",

    icon: Stethoscope,

  },

  {

    number: "02",

    title: "Assess",

    description:

      "Your dentist evaluates your oral health and explains the findings clearly.",

    icon: ClipboardCheck,

  },

  {

    number: "03",

    title: "Plan",

    description:

      "Discuss suitable treatment options, expected visits and the next steps.",

    icon: ShieldCheck,

  },

  {

    number: "04",

    title: "Care",

    description:

      "Receive your agreed treatment and guidance for maintaining your smile.",

    icon: HeartPulse,

  },

];

const faqs = [

  {

    question: "How do I choose the right dental treatment?",

    answer:

      "Start with a dental consultation. Your dentist can assess your oral health, discuss your concerns and explain suitable treatment options.",

  },

  {

    question: "Do I need an appointment before treatment?",

    answer:

      "Booking a consultation is a helpful first step. Some treatments require an examination and a personalized plan before treatment begins.",

  },

  {

    question: "Will the treatment cost be the same for everyone?",

    answer:

      "Costs can vary depending on your dental needs, the complexity of treatment and the options selected. Ask the clinic for a treatment-specific estimate after assessment.",

  },

  {

    question: "How should I prepare for my first visit?",

    answer:

      "Bring any relevant dental records, a list of medicines you take and questions you would like to discuss. Tell the dentist about any current discomfort.",

  },

];

const whyChoose = [

  {

    number: "01",

    title: "Personalized Attention",

    description:

      "Care discussions tailored to your dental concerns, needs and goals.",

  },

  {

    number: "02",

    title: "Clear Communication",

    description:

      "Understand your treatment options, expected steps and aftercare guidance.",

  },

  {

    number: "03",

    title: "Comfort-Focused Care",

    description:

      "A welcoming environment where you can discuss concerns and ask questions.",

  },

  {

    number: "04",

    title: "Guidance Beyond Treatment",

    description:

      "Practical advice on oral hygiene and maintaining your dental health.",

  },

];

function TreatmentBookingLink({ treatment, className, children }) {

  const bookingLink = `/appointment?treatment=${encodeURIComponent(treatment)}`;

  return (

    <Link to={bookingLink} className={className}>

      {children}

    </Link>

  );

}

export default function Treatments() {

  const [activeFAQ, setActiveFAQ] = useState(0);
  const [treatmentQuery, setTreatmentQuery] = useState("");
  const [treatmentCategory, setTreatmentCategory] = useState("ALL");

  const treatmentCategories = ["ALL", "PREVENTIVE", "COSMETIC", "RESTORATIVE", "ALIGNMENT"];
  const visibleTreatments = treatments.filter((treatment) => {
    const query = treatmentQuery.trim().toLowerCase();
    const haystack = [treatment.title, treatment.category, treatment.description, ...treatment.tags].join(" ").toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const category = treatment.category.toLowerCase();
    const matchesCategory = treatmentCategory === "ALL" ||
      (treatmentCategory === "PREVENTIVE" && (category.includes("preventive") || category.includes("gum"))) ||
      (treatmentCategory === "COSMETIC" && category.includes("cosmetic")) ||
      (treatmentCategory === "RESTORATIVE" && (category.includes("restorative") || category.includes("preservation"))) ||
      (treatmentCategory === "ALIGNMENT" && (category.includes("alignment") || category.includes("orthodontic")));
    return matchesQuery && matchesCategory;
  });

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".premiumTreatmentsPage .premiumTreatmentWhyCard, " +
      ".premiumTreatmentsPage .premiumTreatmentExploreCard, " +
      ".premiumTreatmentsPage .premiumTreatmentStep, " +
      ".premiumTreatmentsPage .premiumTreatmentFAQItem"
    );

    return observeElementsOnce(elements, (element) => element.classList.add("is-visible"), {
      threshold: 0.08,
      rootMargin: "0px 0px 280px 0px",
    });
  }, []);

  return (

    <main className="premiumTreatmentsPage">

      <section className="premiumTreatmentHero">

        <div className="premiumTreatmentHeroOverlay" />

        <div className="premiumTreatmentHeroContent">

          <span className="premiumTreatmentEyebrow">

            <span />

            PERSONALIZED DENTAL CARE

          </span>

          <h1>

            Exceptional care.

            <br />

            <em>Confident smiles.</em>

          </h1>

          <p>

            Thoughtful dental treatments designed around your comfort,

            oral health and the smile you want to maintain.

          </p>

          <div className="premiumTreatmentHeroActions">

            <Link to="/appointment" className="premiumTreatmentPrimaryBtn">

              Book a Consultation <ArrowUpRight size={17} />

            </Link>

            <a href="#treatment-intro" className="premiumTreatmentTextLink">

              Explore Treatments <ArrowRight size={16} />

            </a>

          </div>

          <div className="premiumTreatmentHeroNote">

            <span className="premiumTreatmentHeroNoteIcon">

              <ShieldCheck size={19} />

            </span>

            <span>

              <strong>Your smile, our priority</strong>

              <small>Care guided by your individual needs</small>

            </span>

          </div>

        </div>

        <a

          href="#treatment-intro"

          className="premiumTreatmentScroll"

          aria-label="Scroll to explore treatments"

        >

          <span />

          SCROLL TO EXPLORE

        </a>

        <div className="premiumTreatmentHeroIndex">01 / 08</div>

      </section>

      <section className="premiumTreatmentIntro" id="treatment-intro">

        <div className="premiumTreatmentIntroLabel">

          <span>01</span>

          <span>OUR TREATMENTS</span>

        </div>

        <div className="premiumTreatmentIntroMain">

          <div>

            <span className="premiumTreatmentSectionKicker">

              A HEALTHIER SMILE STARTS HERE

            </span>

            <h2>

              Care that puts

              <br />

              <em>you first.</em>

            </h2>

          </div>

          <div className="premiumTreatmentIntroCopy">

            <p>

              Every smile is different. We focus on understanding your needs,

              explaining your options and helping you make informed decisions

              about your dental health.

            </p>

            <div className="premiumTreatmentIntroPoints">

              <span><CheckCircle size={16} /> Personalized treatment plans</span>

              <span><CheckCircle size={16} /> Clear, friendly guidance</span>

              <span><CheckCircle size={16} /> Prevention-focused care</span>

            </div>

          </div>

        </div>

      </section>

      <section className="premiumTreatmentEditorial">

        <div className="premiumTreatmentSectionHeading">

          <div>

            <span className="premiumTreatmentSectionKicker">EXPLORE YOUR OPTIONS</span>

            <h2>Our dental <em>services</em></h2>

          </div>

          <p>

            Explore our treatment options and book a consultation to discuss

            the right care for your smile.

          </p>

        </div>

        <div className="treatmentExplorerTools" aria-label="Find a dental treatment">
          <label className="treatmentSearchBox">
            <Search size={18} aria-hidden="true" />
            <span className="treatmentSearchLabel">Search treatments</span>
            <input value={treatmentQuery} onChange={(event) => setTreatmentQuery(event.target.value)} placeholder="Search treatments, concerns or services…" />
            {treatmentQuery && <button type="button" onClick={() => setTreatmentQuery("")} aria-label="Clear treatment search"><X size={16} /></button>}
          </label>
          <div className="treatmentCategoryFilters" role="group" aria-label="Filter treatments by category">
            {treatmentCategories.map((category) => (
              <button type="button" key={category} className={treatmentCategory === category ? "is-active" : ""} aria-pressed={treatmentCategory === category} onClick={() => setTreatmentCategory(category)}>{category === "ALL" ? "All care" : category.charAt(0) + category.slice(1).toLowerCase()}</button>
            ))}
          </div>
          <p className="treatmentResultsCount" aria-live="polite">Showing {visibleTreatments.length} of {treatments.length} treatment options</p>
        </div>

        <div className="premiumTreatmentList">

          {visibleTreatments.map((treatment) => {

            const Icon = treatment.icon;

            return (

              <article className="premiumTreatmentItem" key={treatment.number}>

                <TreatmentBookingLink

                  treatment={treatment.title}

                  className="premiumTreatmentImage"

                >

                  <img

                    src={treatment.image}

                    alt={treatment.imageAlt}

                    loading="lazy"

                  />

                  <span className="premiumTreatmentImageShade" />

                  <span className="premiumTreatmentNumber">{treatment.number}</span>

                  <span className="premiumTreatmentCategory">{treatment.category}</span>

                  <span className="premiumTreatmentImageTitle">

                    {treatment.title}

                    <span className="premiumTreatmentImageArrow">

                      <ArrowUpRight size={20} />

                    </span>

                  </span>

                </TreatmentBookingLink>

                <div className="premiumTreatmentItemBody">

                  <div className="premiumTreatmentItemTop">

                    <span className="premiumTreatmentItemIcon"><Icon size={21} /></span>

                    <span className="premiumTreatmentDuration">

                      <Clock3 size={13} /> {treatment.duration}

                    </span>

                  </div>

                  <h3>{treatment.title}</h3>

                  <p>{treatment.description}</p>

                  <div className="premiumTreatmentPrice">

                    <span>Estimated starting price</span>

                    <strong>{treatment.price}</strong>

                  </div>

                  <div className="premiumTreatmentTags">

                    {treatment.tags.map((tag) => (

                      <span key={tag}><CheckCircle size={12} /> {tag}</span>

                    ))}

                  </div>

                  <TreatmentBookingLink

                    treatment={treatment.title}

                    className="premiumTreatmentBookButton"

                  >

                    <span>Book {treatment.title}</span>

                    <ArrowRight size={16} />

                  </TreatmentBookingLink>

                </div>

              </article>

            );

          })}

          {visibleTreatments.length === 0 && (
            <div className="treatmentNoResults" role="status">
              <strong>No matching treatments found.</strong>
              <span>Try another search term or clear the filters.</span>
              <button type="button" onClick={() => { setTreatmentQuery(""); setTreatmentCategory("ALL"); }}>Reset filters</button>
            </div>
          )}
        </div>

        <p className="premiumTreatmentPriceNote">

          \*Prices are indicative estimates only, not official NOVADENT quotations.

          Final costs depend on clinical assessment and the treatment plan.

          Please confirm pricing with the clinic.

        </p>

      </section>

      <section className="premiumTreatmentWhy">

        <div className="premiumTreatmentWhyIntro">

          <span className="premiumTreatmentSectionKicker">THE NOVADENT DIFFERENCE</span>

          <h2>Dental care with<br /><em>you in mind.</em></h2>

          <p>

            Every smile has its own story. Our approach focuses on understanding

            your concerns, explaining available options and helping you make

            informed decisions about your dental care.

          </p>

        </div>

        <div className="premiumTreatmentWhyList">

          {whyChoose.map((item) => (

            <article className="premiumTreatmentWhyCard" key={item.number}>

              <span className="premiumTreatmentWhyNumber">{item.number}</span>

              <div><h3>{item.title}</h3><p>{item.description}</p></div>

              <ArrowUpRight size={20} />

            </article>

          ))}

        </div>

      </section>

      <section className="premiumTreatmentExplore">

        <div className="premiumTreatmentExploreHeading">

          <span className="premiumTreatmentSectionKicker">KNOW YOUR OPTIONS</span>

          <h2>More than a treatment.<br /><em>A healthier smile journey.</em></h2>

          <p>

            Learn about treatment planning, preventive care and the habits

            that help support your long-term oral health.

          </p>

        </div>

        <div className="premiumTreatmentExploreList">

          {[

            {

              image: gallery03,

              alt: "Dental treatment planning",

              index: "01 / PLANNING",

              kicker: "START WITH UNDERSTANDING",

              title: "A plan made around your needs.",

              description:

                "Your dental consultation is an opportunity to discuss your concerns, understand the assessment and explore suitable treatment options with your dentist.",

              link: "/appointment",

              linkText: "Discuss Your Needs",

            },

            {

              image: gallery05,

              alt: "Preventive dental care",

              index: "02 / PREVENTION",

              kicker: "SMALL STEPS MATTER",

              title: "Make preventive care a priority.",

              description:

                "Regular dental check-ups, good oral hygiene and professional guidance can help identify concerns and support healthier teeth and gums.",

              link: "/appointment",

              linkText: "Plan a Consultation",

            },

            {

              image: gallery07,

              alt: "Dental aftercare and oral hygiene",

              index: "03 / AFTERCARE",

              kicker: "CARE THAT CONTINUES",

              title: "Keep your smile feeling its best.",

              description:

                "Follow your dentist's recommendations for oral hygiene, recovery and follow-up visits based on your treatment.",

              link: "/contact",

              linkText: "Talk to Our Team",

            },

          ].map((item) => (

            <article className="premiumTreatmentExploreCard" key={item.index}>

              <div className="premiumTreatmentExploreVisual">

                <img src={item.image} alt={item.alt} loading="lazy" />

                <span className="premiumTreatmentExploreIndex">{item.index}</span>

              </div>

              <div className="premiumTreatmentExploreBody">

                <span className="premiumTreatmentSectionKicker">{item.kicker}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <Link to={item.link} className="premiumTreatmentExploreLink">

                  {item.linkText} <ArrowUpRight size={17} />

                </Link>

              </div>

            </article>

          ))}

        </div>

      </section>

      <section className="premiumTreatmentClosing">

        <span className="premiumTreatmentSectionKicker">EVERY SMILE DESERVES THOUGHTFUL CARE</span>

        <h2>Your questions matter.<br /><em>Let's talk about your smile.</em></h2>

        <p>

          Take the first step by discussing your dental concerns and exploring

          the options that may be suitable for you.

        </p>

        <Link to="/appointment" className="premiumTreatmentPrimaryBtn">

          Start Your Journey <ArrowUpRight size={17} />

        </Link>

      </section>

      <section className="premiumTreatmentProcess">

        <div className="premiumTreatmentProcessHeading">

          <span className="premiumTreatmentSectionKicker">YOUR JOURNEY WITH NOVADENT</span>

          <h2>Simple steps.<br /><em>Thoughtful care.</em></h2>

          <p>

            From your first conversation to your aftercare guidance, we want

            you to understand every step of your dental journey.

          </p>

        </div>

        <div className="premiumTreatmentSteps">

          {steps.map((step) => {

            const Icon = step.icon;

            return (

              <article className="premiumTreatmentStep" key={step.number}>

                <div className="premiumTreatmentStepTop">

                  <span>{step.number}</span>

                  <span className="premiumTreatmentStepIcon"><Icon size={22} /></span>

                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                <ArrowUpRight className="premiumTreatmentStepArrow" size={19} />

              </article>

            );

          })}

        </div>

      </section>

      <section className="premiumTreatmentFAQ">

        <div className="premiumTreatmentFAQIntro">

          <span className="premiumTreatmentSectionKicker">GOOD TO KNOW</span>

          <h2>Questions about<br /><em>your care?</em></h2>

          <p>

            Here are a few helpful answers before your first consultation.

            If you have another question, our team can guide you.

          </p>

          <Link to="/contact" className="premiumTreatmentFAQContact">

            Ask us a question <ArrowUpRight size={17} />

          </Link>

        </div>

        <div className="premiumTreatmentFAQList">

          {faqs.map((faq, index) => {

            const isOpen = activeFAQ === index;

            return (

              <article

                className={`premiumTreatmentFAQItem ${isOpen ? "is-open" : ""}`}

                key={faq.question}

              >

                <button

                  type="button"

                  aria-expanded={isOpen}

                  onClick={() => setActiveFAQ(isOpen ? -1 : index)}

                >

                  <span className="premiumTreatmentFAQNumber">0{index + 1}</span>

                  <span>{faq.question}</span>

                  <ChevronDown size={18} />

                </button>

                {isOpen && (

                  <div className="premiumTreatmentFAQAnswer"><p>{faq.answer}</p></div>

                )}

              </article>

            );

          })}

        </div>

      </section>

      <section className="premiumTreatmentCTA">

        <div className="premiumTreatmentCTAImage">

          <img

            src={gallery08}

            alt="Smile consultation and personalized dental care"

            loading="lazy"

          />

          <span />

        </div>

        <div className="premiumTreatmentCTAContent">

          <span className="premiumTreatmentSectionKicker">YOUR NEXT STEP</span>

          <h2>Let’s care for<br /><em>your smile.</em></h2>

          <p>

            Start with a conversation. Book a consultation and discuss your

            dental goals with our team.

          </p>

          <div className="premiumTreatmentCTAActions">

            <Link to="/appointment" className="premiumTreatmentPrimaryBtn">

              Book an Appointment <ArrowUpRight size={17} />

            </Link>

            <Link to="/contact" className="premiumTreatmentOutlineBtn">

              Contact Us <ArrowRight size={16} />

            </Link>

          </div>

        </div>

        <div className="premiumTreatmentCTAMark">N.</div>

      </section>

    </main>

  );

}
