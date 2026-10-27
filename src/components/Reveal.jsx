
import { useEffect, useRef, useState } from "react";
import observeElementsOnce from "../utils/observeElementsOnce";

export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return observeElementsOnce([element], () => setVisible(true), { threshold: 0.08 });
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-direction": direction,
      }}
    >
      {children}
    </div>
  );
}
