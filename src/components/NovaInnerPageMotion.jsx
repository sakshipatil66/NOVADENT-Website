import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import observeElementsOnce from "../utils/observeElementsOnce";

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
      ".doctorProfilePhoto",
      ".doctorProfileContent",
      ".doctorProfileNote",
    ];
    const nodes = document.querySelectorAll(selectors.join(","));
    if (!nodes.length) return undefined;

    nodes.forEach((node, index) => {
      node.classList.add("nova-motion-item");
      node.style.setProperty("--nova-motion-delay", `${Math.min(index % 4, 3) * 85}ms`);
    });
    return observeElementsOnce(nodes, (node) => node.classList.add("nova-motion-visible"), {
      threshold: 0.08,
      rootMargin: "0px 0px 280px 0px",
    });
  }, [location.pathname]);

  return null;
}
