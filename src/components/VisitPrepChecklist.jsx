import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Check, ClipboardList, RotateCcw, ArrowUpRight } from "lucide-react";
import "./VisitPrepChecklist.css";

const items = [
  { id: "questions", title: "Write down your questions", detail: "Note any concerns or symptoms you want to discuss." },
  { id: "medications", title: "Bring your medication list", detail: "Include medicines and relevant allergies, if any." },
  { id: "records", title: "Bring previous dental records", detail: "Recent X-rays or treatment notes can be helpful when available." },
  { id: "timing", title: "Choose a preferred time", detail: "Share a convenient date and time; the clinic will confirm availability." },
];

export default function VisitPrepChecklist() {
  const [checked, setChecked] = useState([]);
  const done = useMemo(() => items.filter((item) => checked.includes(item.id)).length, [checked]);
  const progress = Math.round((done / items.length) * 100);

  function toggle(id) {
    setChecked((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }

  return (
    <section className="visitPrepSection storySection" data-reveal aria-labelledby="visit-prep-title">
      <div className="visitPrepInner">
        <div className="visitPrepIntro">
          <span className="storyKicker">YOUR FIRST VISIT, MADE SIMPLER</span>
          <span className="storyIndex">A SMALL CHECKLIST</span>
          <h2 id="visit-prep-title">A little preparation.<br /><em>A more confident visit.</em></h2>
          <p>Use this optional checklist to help you prepare for a conversation with your dental team. You can tick items off as you get ready.</p>
          <div className="visitPrepNote"><ClipboardList size={18} aria-hidden="true" /><span>This checklist is a guide, not medical advice. Your clinic may recommend other items for your visit.</span></div>
        </div>

        <div className="visitPrepCard">
          <div className="visitPrepProgressHead">
            <div><span className="visitPrepProgressLabel">YOUR PREPARATION</span><strong>{done} of {items.length} ready</strong></div>
            <span className="visitPrepPercent" aria-live="polite">{progress}%</span>
          </div>
          <div className="visitPrepProgressTrack" role="progressbar" aria-label="Visit preparation progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>

          <div className="visitPrepItems">
            {items.map((item, index) => {
              const isChecked = checked.includes(item.id);
              return <label className={`visitPrepItem ${isChecked ? "is-checked" : ""}`} key={item.id}>
                <input type="checkbox" checked={isChecked} onChange={() => toggle(item.id)} />
                <span className="visitPrepCheck" aria-hidden="true">{isChecked ? <Check size={16} /> : String(index + 1).padStart(2, "0")}</span>
                <span className="visitPrepItemText"><strong>{item.title}</strong><small>{item.detail}</small></span>
              </label>;
            })}
          </div>

          <div className="visitPrepActions">
            <button type="button" className="visitPrepReset" onClick={() => setChecked([])} disabled={checked.length === 0}><RotateCcw size={15} /> Reset checklist</button>
            <Link to="/appointment" className="visitPrepBook"><CalendarCheck size={16} /> Plan a visit <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
