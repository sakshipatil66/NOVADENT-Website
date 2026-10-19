import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeMeta = {
  "/": { title: "NOVADENT Dental Care | Every Smile Has a Story", description: "Explore thoughtful dental care, meet the NOVADENT team, discover treatment options and request a consultation for your smile." },
  "/about": { title: "About NOVADENT | Patient-First Dental Care", description: "Learn about NOVADENT's approach to thoughtful, personalized dental care and patient comfort." },
  "/doctors": { title: "Our Doctors | NOVADENT Dental Care", description: "Meet the NOVADENT dental team and explore areas of care, experience and treatment planning." },
  "/treatments": { title: "Dental Treatments | NOVADENT", description: "Explore preventive, cosmetic, restorative and orthodontic dental treatment options at NOVADENT." },
  "/gallery": { title: "Clinic Gallery | NOVADENT Dental Care", description: "Explore the NOVADENT clinic and its dental care environment." },
  "/reviews": { title: "Patient Reviews | NOVADENT Dental Care", description: "Read patient feedback and learn what a NOVADENT visit may feel like." },
  "/appointment": { title: "Book an Appointment | NOVADENT", description: "Request a dental consultation with NOVADENT. Choose a service, preferred date and time." },
  "/admin/appointments": { title: "Appointment Dashboard | NOVADENT", description: "Local appointment request management dashboard for NOVADENT." },
  "/contact": { title: "Contact NOVADENT | Dental Care in Pune", description: "Contact NOVADENT for clinic details, appointment enquiries and directions." },
};

export default function SiteSEO() {
  const location = useLocation();
  useEffect(() => {
    const basePath = location.pathname.startsWith("/doctors/") ? "/doctors" : location.pathname;
    const meta = routeMeta[basePath] || { title: "Page Not Found | NOVADENT", description: "The page you requested could not be found. Explore NOVADENT dental care and appointment options." };
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = meta.description;
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = meta.title;
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = meta.description;
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
    robots.content = basePath === "/admin/appointments" ? "noindex, nofollow" : "index, follow";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    // Do not publish localhost or preview-host canonical URLs. Set a verified production
    // domain here once the clinic domain is known.
    const isLocalHost = ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
    if (isLocalHost) { canonical.remove(); }
    else { canonical.href = `${window.location.origin}${location.pathname}`; }
  }, [location.pathname]);
  return null;
}
