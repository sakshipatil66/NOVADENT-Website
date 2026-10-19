import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ServiceCard({
  title,
  text,
  img,
  icon = "✦",
}) {
  return (
    <article className="serviceCard">

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="serviceCardImage">

        <img
          src={img}
          alt={`${title} treatment at NOVADENT Dental Care`}
          loading="lazy"
        />

        <div className="serviceCardImageOverlay"></div>

        <div
          className="serviceCardIcon"
          aria-hidden="true"
        >
          <span>{icon}</span>
        </div>

        <div className="serviceCardImageLabel">
          <span>01</span>
          <span>NOVADENT CARE</span>
        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="serviceCardContent">

        <div className="serviceCardTop">

          <span className="serviceCardSmallTitle">
            TREATMENT
          </span>

          <span
            className="serviceCardCheck"
            aria-label="Treatment available"
          >
            <CheckCircle2 size={18} />
          </span>

        </div>


        {/* SEO: Card title uses H3 */}

        <h3 className="serviceCardTitle">
          {title}
        </h3>


        <p className="serviceCardDescription">
          {text}
        </p>


        <div className="serviceCardBottom">

          <Link
            to="/treatments"
            className="serviceCardLink"
            aria-label={`Explore ${title}`}
          >

            <span>
              Explore Treatment
            </span>

            <span
              className="serviceCardArrow"
              aria-hidden="true"
            >
              <ArrowUpRight size={18} />
            </span>

          </Link>

          <span
            className="serviceCardLine"
            aria-hidden="true"
          ></span>

        </div>

      </div>

    </article>
  );
}