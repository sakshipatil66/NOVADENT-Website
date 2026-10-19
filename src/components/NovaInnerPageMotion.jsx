import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll-triggered motion for existing inner-page content; no page content is removed. */
export default function NovaInnerPageMotion() {
  const location = useLocation();

  useEffect(() => {
    const selectors = [
      ".novaAbout .aboutValueCard",
      ".novaAbout .aboutJourneyStep",
      ".novaAbout .aboutGalleryItem",
      ".novaAbout .aboutIntroGrid",
      ".novaAbout .aboutIntroText",
      ".novaAbout .aboutStoryImages",
      ".novaAbout .aboutExperienceSection",
      ".novaAbout .aboutModern",
      ".novaAbout .aboutPromise",
      ".novaAbout .aboutFinalCta",
      ".novaAbout .aboutStoryContent",
      ".novaAbout .aboutFounderContent",
      ".novaAbout .aboutModernCardIcon",
      ".novaDoctorCard",
      ".novaDoctorsValueCard",
      ".novaDoctorsProcessStep",
      ".novaDoctorsIntroGrid",
      ".novaDoctorsStoryGrid",
      ".premiumTreatmentItem",
      ".premiumTreatmentStep",
      ".premiumTreatmentFAQ",
      ".premiumTreatmentIntro",
      ".premiumTreatmentEditorial",
      ".nova-gallery-item",
      ".nova-gallery-intro-left",
      ".nova-gallery-intro-right",
      ".nova-gallery-collection-header",
      ".nova-gallery-final-cta-content",
      ".novaReviewsIntroGrid",
      ".novaReviewTrustCard",
      ".novaReviewCard",
      ".novaReviewsCTACard",
      ".novaServicesIntroGrid",
      ".novaServicesBenefitCard",
      ".novaServicesJourneyGrid",
      ".novaServiceCard",
      ".appointmentInfoCard",
      ".appointmentFormCard",
      ".appointmentSideCard",
      ".appointmentCTACard",
      ".contactInfoCard",
      ".contactFormCard",
      ".contactSideCard",
      ".contactLocationGrid",
      ".contactCTACard",
    ];
    const nodes = document.querySelectorAll(selectors.join(","));
    if (!nodes.length) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("nova-motion-visible"));
      return undefined;
    }

    nodes.forEach((node, index) => {
      node.classList.add("nova-motion-item");
      node.style.setProperty("--nova-motion-delay", `${Math.min(index % 4, 3) * 85}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("nova-motion-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}
