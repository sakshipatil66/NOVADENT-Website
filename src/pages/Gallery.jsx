import { useEffect, useRef, useState } from "react";
import observeElementsOnce from "../utils/observeElementsOnce";
import "./GalleryPremiumStory.css";

import gallery01 from "../assets/gallery/gallery-01.jpg";
import gallery02 from "../assets/gallery/gallery-02.jpg";
import gallery03 from "../assets/gallery/gallery-03.jpg";
import gallery04 from "../assets/gallery/gallery-04.jpg";
import gallery05 from "../assets/gallery/gallery-05.jpg";
import gallery06 from "../assets/gallery/gallery-06.jpg";
import gallery07 from "../assets/gallery/gallery-07.jpg";
import gallery08 from "../assets/gallery/gallery-08.jpg";

const galleryImages = [
  { id: 1, image: gallery01, title: "Modern Dental Clinic", category: "Clinic" },
  { id: 2, image: gallery02, title: "Advanced Dental Care", category: "Treatment" },
  { id: 3, image: gallery03, title: "Comfortable Environment", category: "Clinic" },
  { id: 4, image: gallery04, title: "Advanced Dental Technology", category: "Technology" },
  { id: 5, image: gallery05, title: "Modern Technology", category: "Technology" },
  { id: 6, image: gallery06, title: "Patient Care", category: "Patients" },
  { id: 7, image: gallery07, title: "Dental Excellence", category: "Clinic" },
  { id: 8, image: gallery08, title: "Beautiful Smiles", category: "Patients" },
];

const categories = ["All", "Clinic", "Treatment", "Technology", "Patients"];

const clinicSpaces = [
  {
    image: gallery01,
    title: "Reception Area",
    description: "A welcoming space designed to make every visit comfortable.",
  },
  {
    image: gallery02,
    title: "Treatment Room",
    description: "Modern dental equipment in a clean, calm environment.",
  },
  {
    image: gallery03,
    title: "Patient Lounge",
    description: "A relaxing environment that puts your comfort first.",
  },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryRef = useRef(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const root = galleryRef.current;
    if (!root) return;

    const elements = root.querySelectorAll("[data-gallery-reveal]");

    return observeElementsOnce(elements, (element) => element.classList.add("gallery-revealed"), {
      threshold: 0.08,
      rootMargin: "0px 0px 280px 0px",
    });
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <main className="nova-gallery" ref={galleryRef}>
      {/* HERO */}
      <section className="nova-gallery-hero" aria-labelledby="gallery-hero-title">
        <img
          src={gallery01}
          alt="Modern NOVADENT dental clinic interior"
        />
        <div className="nova-gallery-hero-overlay" aria-hidden="true" />

        <div className="nova-gallery-hero-content">
          <p>NOVADENT · OUR GALLERY</p>
          <h1 id="gallery-hero-title">
            See the space.
            <br />
            <i>Feel the difference.</i>
          </h1>
          <span>
            Explore our modern clinic, advanced technology, expert doctors
            and patient-focused dental experience.
          </span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        className="nova-gallery-intro"
        data-gallery-reveal
        aria-labelledby="gallery-intro-title"
      >
        <div className="nova-gallery-container">
          <div className="nova-gallery-intro-left">
            <span>THE NOVADENT EXPERIENCE</span>
            <h2 id="gallery-intro-title">
              Designed around
              <br />
              <i>your comfort.</i>
            </h2>
          </div>

          <div className="nova-gallery-intro-right">
            <div className="nova-gallery-intro-line" />
            <p>
              At NOVADENT, modern dentistry meets thoughtful design.
              Every space is created to make your dental journey calm,
              comfortable and reassuring.
            </p>
            <p>
              From advanced treatment rooms to welcoming patient spaces,
              every detail reflects our commitment to comfortable dental care.
            </p>
            <div className="nova-gallery-intro-meta">
              <span>01</span>
              <span>MODERN · CALM · PATIENT FIRST</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERABLE GALLERY */}
      <section
        className="nova-gallery-collection-pro"
        aria-labelledby="gallery-collection-title"
      >
        <div className="nova-gallery-collection-inner">
          <div className="nova-gallery-collection-header" data-gallery-reveal>
            <div>
              <span>INSIDE NOVADENT</span>
              <h2 id="gallery-collection-title">
                Moments from
                <br />
                <i>our clinic.</i>
              </h2>
            </div>

            <div className="nova-gallery-image-count" aria-live="polite">
              <strong>{filteredImages.length}</strong>
              <span>Images</span>
            </div>
          </div>

          <div className="nova-gallery-filters-pro" aria-label="Gallery categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="nova-gallery-grid-pro">
            {filteredImages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="nova-gallery-item-pro"
                data-gallery-reveal
                onClick={() => setSelectedImage(item)}
                style={{ "--gallery-delay": `${index * 0.07}s` }}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={`${item.title} at NOVADENT Dental Care`}
                  loading="lazy"
                />
                <div className="nova-gallery-item-shade" />

                <div className="nova-gallery-item-content">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <small>View Image <b>↗</b></small>
                </div>

                <strong className="nova-gallery-item-number">
                  {String(item.id).padStart(2, "0")}
                </strong>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* CINEMATIC STORY SECTION */}
      <section
        className="nova-gallery-story"
        data-gallery-reveal
        aria-labelledby="nova-gallery-story-title"
      >
        <div className="nova-gallery-story-image">
          <img
            src={gallery05}
            alt="Modern dental technology at NOVADENT"
            loading="lazy"
          />
          <span className="nova-gallery-story-image-label">
            PRECISION · COMFORT · CARE
          </span>
        </div>

        <div className="nova-gallery-story-content">
          <span className="nova-gallery-story-eyebrow">
            MORE THAN A DENTAL VISIT
          </span>

          <h2 id="nova-gallery-story-title">
            Thoughtful care.
            <br />
            <i>Every detail matters.</i>
          </h2>

          <p>
            A comfortable dental experience starts with listening,
            understanding your concerns and helping you feel informed
            at every step.
          </p>

          <p>
            At NOVADENT, our focus is on clear guidance, a welcoming
            environment and care tailored to your individual needs.
          </p>

          <a
            href="/appointment"
            className="nova-gallery-story-button"
          >
            Plan Your Visit <span>↗</span>
          </a>

          <div className="nova-gallery-story-footer">
            <span>01</span>
            <span>YOUR COMFORT COMES FIRST</span>
          </div>
        </div>
      </section>
      
      {/* NEW SECTION: OUR CLINIC SPACES */}
      <section
        className="nova-gallery-spaces"
        data-gallery-reveal
        aria-labelledby="gallery-spaces-title"
      >
        <div className="nova-gallery-spaces-inner">
          <div className="nova-gallery-spaces-copy">
            <span className="nova-gallery-spaces-eyebrow">
              OUR CLINIC SPACES
            </span>

            <h2 id="gallery-spaces-title">
              A space built for
              <br />
              <i>better smiles.</i>
            </h2>

            <p>
              Step inside NOVADENT and experience a clinic designed around
              comfort, modern technology and trust. Every space reflects
              our commitment to a more reassuring dental journey.
            </p>

            <a href="/contact" className="nova-gallery-spaces-button">
              Explore Our Clinic <b>→</b>
            </a>
          </div>

          <div className="nova-gallery-spaces-grid">
            {clinicSpaces.map((space, index) => (
              <button
                type="button"
                className="nova-gallery-space-card"
                key={space.title}
                onClick={() =>
                  setSelectedImage({
                    id: `space-${index}`,
                    image: space.image,
                    title: space.title,
                    category: "Our Clinic",
                  })
                }
                aria-label={`View ${space.title}`}
              >
                <div className="nova-gallery-space-image">
                  <img src={space.image} alt={space.title} loading="lazy" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{space.title}</h3>
                <p>{space.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section
        className="nova-gallery-final-cta"
        data-gallery-reveal
        aria-labelledby="gallery-cta-title"
      >
        <div className="nova-gallery-final-cta-image">
          <img
            src={gallery07}
            alt="NOVADENT clinic environment"
            loading="lazy"
          />
        </div>
        <div className="nova-gallery-final-cta-overlay" />

        <div className="nova-gallery-final-cta-content">
          <div className="nova-gallery-hours">
            ◷ &nbsp; MONDAY – SATURDAY · 9 AM – 6 PM
          </div>

          <span className="nova-gallery-cta-label">
            YOUR SMILE DESERVES CARE
          </span>

          <h2 id="gallery-cta-title">
            Ready for your
            <br />
            <i>next step?</i>
          </h2>

          <p>
            Talk with our team about your dental concerns, treatment options
            and the next step for your smile.
          </p>

          <a href="/contact" className="nova-gallery-final-button">
            Contact NOVADENT <b>→</b>
          </a>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="nova-gallery-lightbox"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
        >
          <div
            className="nova-gallery-lightbox-box"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="nova-gallery-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
            >
              ×
            </button>

            <img src={selectedImage.image} alt={selectedImage.title} />
            <span>{selectedImage.category}</span>
            <h3 id="gallery-lightbox-title">{selectedImage.title}</h3>
          </div>
        </div>
      )}
    </main>
  );
}

export default Gallery;
