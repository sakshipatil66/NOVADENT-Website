import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, SearchX } from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="novaNotFound" aria-labelledby="not-found-title">
      <div className="novaNotFoundGlow" aria-hidden="true" />
      <div className="novaNotFoundCard">
        <span className="novaNotFoundIcon"><SearchX size={26} /></span>
        <p className="novaNotFoundEyebrow">NOVADENT · PAGE NOT FOUND</p>
        <p className="novaNotFoundCode">404</p>
        <h1 id="not-found-title">This page took a wrong turn.</h1>
        <p className="novaNotFoundCopy">The link may be outdated, or the page may have moved. Let’s get you back to the right place.</p>
        <div className="novaNotFoundActions">
          <Link className="novaNotFoundPrimary" to="/"><ArrowLeft size={17} /> Back to home</Link>
          <Link className="novaNotFoundSecondary" to="/appointment"><CalendarDays size={17} /> Book appointment</Link>
        </div>
      </div>
    </main>
  );
}
