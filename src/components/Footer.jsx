import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Clock3,
  Sparkles,
} from "lucide-react";

const footerLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Doctors", "/doctors"],
  ["Treatments", "/treatments"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="novaFooter">

      {/* =====================================================
          TOP CTA
      ===================================================== */}

      <div className="novaFooterCTA">

        <div className="novaFooterContainer">

          <div className="novaFooterCTACard">

            <div className="novaFooterCTAText">

              <span className="novaFooterBadge">
                <Sparkles size={14} />
                YOUR SMILE · OUR CARE
              </span>

              <h2>
                Ready for a
                <em> better smile?</em>
              </h2>

              <p>
                Take the first step toward comfortable,
                modern and personalized dental care.
              </p>

            </div>


            <Link
              to="/appointment"
              className="novaFooterCTAButton"
            >
              Book Appointment
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="novaFooterMain">

        <div className="novaFooterContainer">

          <div className="novaFooterGrid">


            {/* =================================================
                BRAND
            ================================================= */}

            <div className="novaFooterBrand">

              <Link
                to="/"
                className="novaFooterLogo"
              >

                <div className="novaFooterLogoIcon">

                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >

                    <path
                      d="M18 8C12 8 8 13 8 20C8 28 13 34 14 42C15 50 17 56 22 56C27 56 27 47 32 47C37 47 37 56 42 56C47 56 49 50 50 42C51 34 56 28 56 20C56 13 52 8 46 8C40 8 37 12 32 12C27 12 24 8 18 8Z"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </div>


                <div>

                  <strong>
                    NOVADENT
                  </strong>

                  <span>
                    DENTAL CARE
                  </span>

                </div>

              </Link>


              <p>
                Modern dentistry with a human touch.
                We create comfortable experiences and
                confident smiles for every patient.
              </p>


              {/* =================================================
                  CLICKABLE CONTACT ICONS
              ================================================= */}

              <div className="novaFooterSocials">

                <a
                  href="tel:+919000012345"
                  aria-label="Call NOVADENT"
                  title="Call NOVADENT"
                >
                  <Phone size={16} />
                </a>


                <a
                  href="mailto:info@novadentcare.com"
                  aria-label="Email NOVADENT"
                  title="Email NOVADENT"
                >
                  <Mail size={16} />
                </a>


                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kharadi%2C%20Pune%2C%20Maharashtra%2C%20India"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open NOVADENT location in Google Maps"
                  title="Open Google Maps"
                >
                  <MapPin size={16} />
                </a>

              </div>

            </div>


            {/* =================================================
                QUICK LINKS
            ================================================= */}

            <div className="novaFooterColumn">

              <span className="novaFooterColumnTitle">
                EXPLORE
              </span>


              <nav className="novaFooterLinks">

                {footerLinks.map(([name, path]) => (

                  <Link
                    key={path}
                    to={path}
                  >

                    <span>
                      {name}
                    </span>

                    <ArrowUpRight size={14} />

                  </Link>

                ))}

              </nav>

            </div>


            {/* =================================================
                CONTACT
            ================================================= */}

            <div className="novaFooterColumn">

              <span className="novaFooterColumnTitle">
                CONTACT
              </span>


              <div className="novaFooterContactList">


                {/* PHONE */}

                <a
                  href="tel:+919000012345"
                  aria-label="Call NOVADENT"
                >

                  <span className="novaFooterContactIcon">
                    <Phone size={15} />
                  </span>

                  <span>

                    <small>
                      CALL US
                    </small>

                    <strong>
                      +91 90000 12345
                    </strong>

                  </span>

                </a>


                {/* EMAIL */}

                <a
                  href="mailto:info@novadentcare.com"
                  aria-label="Email NOVADENT"
                >

                  <span className="novaFooterContactIcon">
                    <Mail size={15} />
                  </span>

                  <span>

                    <small>
                      EMAIL
                    </small>

                    <strong>
                      info@novadentcare.com
                    </strong>

                  </span>

                </a>


                {/* LOCATION */}

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kharadi%2C%20Pune%2C%20Maharashtra%2C%20India"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open NOVADENT location"
                >

                  <span className="novaFooterContactIcon">
                    <MapPin size={15} />
                  </span>

                  <span>

                    <small>
                      LOCATION
                    </small>

                    <strong>
                      Kharadi, Pune
                    </strong>

                  </span>

                </a>

              </div>

            </div>


            {/* =================================================
                CLINIC HOURS
            ================================================= */}

            <div className="novaFooterColumn">

              <span className="novaFooterColumnTitle">
                CLINIC HOURS
              </span>


              <div className="novaFooterHours">

                <div className="novaFooterHoursIcon">
                  <Clock3 size={20} />
                </div>


                <div>

                  <div>

                    <span>
                      Monday – Sunday
                    </span>

                    <strong>
                      10:00 AM – 7:00 PM
                    </strong>

                  </div>


                  <div>

                    <span>
                      Appointments
                    </span>

                    <strong>
                      Available
                    </strong>

                  </div>


                  <div>

                    <span>
                      Location
                    </span>

                    <strong>
                      Kharadi, Pune
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="novaFooterBottom">

        <div className="novaFooterContainer">

          <div className="novaFooterBottomInner">


            <p>
              © {new Date().getFullYear()} NOVADENT Dental Care.
              All rights reserved.
            </p>


            <div className="novaFooterBottomLinks">

              <Link to="/contact">
                Privacy
              </Link>

              <span></span>

              <Link to="/contact">
                Terms
              </Link>

            </div>


            <p className="novaFooterMade">

              Designed for better smiles

              <Sparkles size={13} />

            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}