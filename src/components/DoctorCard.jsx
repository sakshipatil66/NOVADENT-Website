import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Stethoscope,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export default function DoctorCard({
  name,
  specialty,
  img,
}) {
  return (
    <article className="card doctor novaDoctorMiniCard">

      {/* =====================================================
          DOCTOR IMAGE
      ===================================================== */}

      <div className="doctorImage novaDoctorMiniImage">

        <img
          src={img}
          alt={`${name} - ${specialty} at NOVADENT Dental Care`}
          loading="lazy"
        />

        <div className="doctorOverlay novaDoctorMiniOverlay">

          <span className="doctorBadge">
            <Stethoscope size={15} />
            <span>Dental Expert</span>
          </span>

          <span
            className="novaDoctorMiniSparkle"
            aria-hidden="true"
          >
            <Sparkles size={15} />
          </span>

        </div>
      </div>


      {/* =====================================================
          DOCTOR DETAILS
      ===================================================== */}

      <div className="cardbody doctorBody novaDoctorMiniBody">

        <div className="novaDoctorMiniTop">

          <span className="doctorLabel">
            PROFESSIONAL DENTIST
          </span>

          <span className="novaDoctorMiniYears">
            10+ YRS
          </span>

        </div>


        {/* SEO: Doctor card title uses H3 */}

        <h3 className="doctorCardTitle">
          {name}
        </h3>


        <p className="doctorSpecialty">
          {specialty}
        </p>


        <div
          className="doctorExperience"
          aria-label="10 plus years of experience"
        >
          <span>10+</span>
          <small>Years Experience</small>
        </div>


        <p className="doctorText">
          Dedicated to providing comfortable, personalized
          and modern dental care for every patient.
        </p>


        <div className="novaDoctorMiniActions">
          <Link
            to={`/doctors/${encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))}`}
            className="novaDoctorProfileLink"
            aria-label={`View profile of ${name}`}
          >
            View Profile <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link
            to={`/appointment?doctor=${encodeURIComponent(name)}`}
            className="doctorLink novaDoctorMiniLink"
            aria-label={`Book a consultation with ${name}`}
          >
            <span><CalendarDays size={16} /> Book with {name}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

      </div>

    </article>
  );
}