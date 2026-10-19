import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="ctaSection">

      <div className="ctaGlow"></div>

      <div className="ctaContent">

        <div className="ctaIcon">
          <Sparkles size={24} />
        </div>

        <span className="eyebrow">
          YOUR SMILE JOURNEY STARTS HERE
        </span>

        <h2>
          Ready for a
          <br />
          <span>Healthier, Brighter Smile?</span>
        </h2>

        <p>
          Book a consultation with our dental experts and take
          the first step toward confident, beautiful smiles.
        </p>

        <div className="ctaActions">

          <Link to="/appointment" className="btn">
            <CalendarCheck size={18} />
            Book an Appointment
          </Link>

          <Link to="/contact" className="btn ghost">
            Contact NOVADENT
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}