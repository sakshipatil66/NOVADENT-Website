import novaLogo from "../assets/logo-mark.svg";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  CalendarDays,
  Home,
  Users,
  Stethoscope,
  Images,
  Star,
  Phone,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "About",
    path: "/about",
    icon: Users,
  },
  {
    label: "Doctors",
    path: "/doctors",
    icon: Stethoscope,
  },
  {
    label: "Treatments",
    path: "/treatments",
    icon: Stethoscope,
  },
  {
    label: "Gallery",
    path: "/gallery",
    icon: Images,
  },
  {
    label: "Reviews",
    path: "/reviews",
    icon: Star,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: Phone,
  },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="novaNavbar">
        <div className="novaNavbarInner">

          {/* =================================================
              LOGO / BRAND
          ================================================= */}

          <Link
            to="/"
            className="novaBrand"
            onClick={closeMenu}
            aria-label="NOVADENT Dental Care Home"
          >
            <div className="novaLogo">
              <img src={novaLogo} alt="" className="novaNavbarLogoImage" />
            </div>

            <div className="novaBrandText">
              <strong>NOVADENT</strong>
              <span>DENTAL CARE</span>
            </div>
          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            id="nova-main-navigation"
            className={`novaNavigation ${isOpen ? "isOpen" : ""}`}
            aria-label="Main navigation"
          >
            <div className="novaNavLinks">

              {navItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`novaNavLink ${
                      active ? "isActive" : ""
                    }`}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}

            </div>


            {/* =================================================
                MOBILE APPOINTMENT BUTTON
            ================================================= */}

            <Link
              to="/appointment"
              className="novaMobileAppointment"
              onClick={closeMenu}
            >
              <CalendarDays size={18} />

              <span>
                Book Appointment
              </span>

              <ChevronRight size={17} />
            </Link>
          </nav>


          {/* =================================================
              DESKTOP APPOINTMENT BUTTON
          ================================================= */}

          <Link
            to="/appointment"
            className="novaDesktopCTA"
          >
            <CalendarDays size={17} />

            <span>
              Book Appointment
            </span>

            <ChevronRight size={16} />
          </Link>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            className="novaMenuButton"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="nova-main-navigation"
          >
            {isOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>
      </header>


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {isOpen && (
        <button
          type="button"
          className="novaMenuOverlay"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}


      {/* =====================================================
          MOBILE BOTTOM BAR
      ===================================================== */}

      <nav
        className="novaMobileBar"
        aria-label="Quick navigation"
      >
        <Link to="/" onClick={closeMenu}>
          <Home size={17} />
          <span>Home</span>
        </Link>

        <span
          className="novaBarDivider"
          aria-hidden="true"
        />

        <Link to="/treatments" onClick={closeMenu}>
          <Stethoscope size={17} />
          <span>Care</span>
        </Link>

        <span
          className="novaBarDivider"
          aria-hidden="true"
        />

        <Link to="/appointment" onClick={closeMenu}>
          <CalendarDays size={17} />
          <span>Book</span>
        </Link>

        <span
          className="novaBarDivider"
          aria-hidden="true"
        />

        <Link to="/contact" onClick={closeMenu}>
          <Phone size={17} />
          <span>Contact</span>
        </Link>
      </nav>
    </>
  );
}
