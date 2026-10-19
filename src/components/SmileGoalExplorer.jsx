import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, ShieldCheck, Sparkles } from "lucide-react";
import checkupImage from "../assets/gallery/01-dental-check-up.jpg";
import whiteningImage from "../assets/gallery/02-teeth-whitening.jpg";
import implantImage from "../assets/gallery/03-dental-implants.jpg";
import "./SmileGoalExplorer.css";

const chapters = [
  {
    number: "01",
    eyebrow: "START WITH COMFORT",
    title: "Feel at ease asking questions.",
    copy: "A thoughtful consultation starts with listening. Share your concerns and learn about suitable next steps at your own pace.",
    image: checkupImage,
    alt: "Dental check-up and oral examination",
    icon: Heart,
    treatment: "Dental Check-Up",
  },
  {
    number: "02",
    eyebrow: "EXPLORE YOUR OPTIONS",
    title: "Find care that fits your goals.",
    copy: "From preventive care to cosmetic options, explore treatments with clear guidance from a dental professional.",
    image: whiteningImage,
    alt: "Teeth whitening treatment information",
    icon: Sparkles,
    treatment: "Teeth Whitening",
  },
  {
    number: "03",
    eyebrow: "PLAN WITH CONFIDENCE",
    title: "Understand your next step.",
    copy: "A personalized plan helps you understand the process, expected visits and aftercare before you decide how to proceed.",
    image: implantImage,
    alt: "Dental implant care and treatment planning",
    icon: ShieldCheck,
    treatment: "Dental Implants",
  },
];

export default function SmileGoalExplorer() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  const Icon = chapter.icon;
  const move = (direction) => setActive((current) => (current + direction + chapters.length) % chapters.length);

  return (
    <section className="smileGoalSection" aria-labelledby="smile-goal-title" data-reveal>
      <div className="smileGoalContainer">
        <div className="smileGoalIntro">
          <span className="smileGoalEyebrow">A MORE PERSONAL KIND OF CARE</span>
          <h2 id="smile-goal-title">Your smile journey, <em>your pace.</em></h2>
          <p>Every smile starts somewhere. Explore a few ways your NOVADENT journey can begin—then choose the conversation that feels right for you.</p>
        </div>

        <div className="smileGoalExperience">
          <div className="smileGoalImageWrap">
            <img key={chapter.image} src={chapter.image} alt={chapter.alt} loading="lazy" />
            <span className="smileGoalImageIndex">{chapter.number} <span>/ 03</span></span>
            <span className="smileGoalImageCaption">ILLUSTRATIVE TREATMENT PHOTOGRAPHY</span>
          </div>
          <div className="smileGoalContent" aria-live="polite">
            <div className="smileGoalStep"><Icon size={17} aria-hidden="true" /> {chapter.eyebrow}</div>
            <h3>{chapter.title}</h3>
            <p>{chapter.copy}</p>
            <Link className="smileGoalLink" to={`/appointment?treatment=${encodeURIComponent(chapter.treatment)}`}>
              Explore this option <ArrowUpRight size={17} />
            </Link>
            <div className="smileGoalControls">
              <div className="smileGoalDots" role="group" aria-label="Choose a smile journey chapter">
                {chapters.map((item, index) => (
                  <button key={item.number} type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show chapter ${index + 1}: ${item.eyebrow}`} aria-pressed={active === index} />
                ))}
              </div>
              <div className="smileGoalArrows">
                <button type="button" onClick={() => move(-1)} aria-label="Previous chapter"><ArrowLeft size={18} /></button>
                <button type="button" onClick={() => move(1)} aria-label="Next chapter"><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
        <p className="smileGoalNote">Treatment suitability and outcomes vary by person. Your dentist can discuss options after an individual assessment.</p>
      </div>
    </section>
  );
}
