import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeMeta = [
  { test: /^\/$/, title: "NOVADENT Dental Care | Confident Smiles, Thoughtful Care", description: "Explore modern dental care, experienced doctors and treatments at NOVADENT Dental Care." },
  { test: /^\/about\/?$/, title: "About NOVADENT | Dental Care Built Around You", description: "Learn about NOVADENT's approach to comfortable, patient-focused dental care." },
  { test: /^\/doctors\/?$/, title: "Our Doctors | NOVADENT Dental Care", description: "Meet the dental professionals at NOVADENT Dental Care." },
  { test: /^\/treatments\/?$/, title: "Dental Treatments | NOVADENT Dental Care", description: "Explore dental treatments and find the right next step for your smile." },
  { test: /^\/gallery\/?$/, title: "Clinic Gallery | NOVADENT Dental Care", description: "Take a look inside NOVADENT Dental Care and its clinic environment." },
  { test: /^\/reviews\/?$/, title: "Patient Reviews | NOVADENT Dental Care", description: "Read patient feedback about their NOVADENT dental care experience." },
  { test: /^\/appointment\/?$/, title: "Book an Appointment | NOVADENT Dental Care", description: "Request a dental appointment with NOVADENT Dental Care." },
  { test: /^\/contact\/?$/, title: "Contact NOVADENT | Dental Care in Pune", description: "Contact NOVADENT Dental Care in Kharadi, Pune, for help and appointment enquiries." },
];

export default function RouteExperience() {
  const location = useLocation();

  useEffect(() => {
    const current = routeMeta.find((item) => item.test.test(location.pathname));
    document.title = current?.title || (location.pathname.startsWith("/doctors/") ? "Doctor Profile | NOVADENT Dental Care" : "Page Not Found | NOVADENT Dental Care");
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = current?.description || "Explore NOVADENT Dental Care and find information about our dental services.";

    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}
