/** Reveal scroll-triggered content even when a fast scroll skips an observer threshold. */
export default function observeElementsOnce(elements, onReveal, options = {}) {
  const pending = new Set(Array.from(elements || []));
  if (!pending.size) return () => {};

  const reveal = (element) => {
    if (!pending.delete(element)) return;
    onReveal(element);
    observer?.unobserve(element);
  };

  const reducedMotion = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (reducedMotion || !("IntersectionObserver" in window)) {
    pending.forEach(onReveal);
    pending.clear();
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
        reveal(entry.target);
      }
    });
  }, {
    threshold: options.threshold ?? 0.08,
    rootMargin: options.rootMargin ?? "0px 0px 240px 0px",
  });

  pending.forEach((element) => observer.observe(element));

  let frame = 0;
  const revealNearOrPassedTargets = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      const margin = options.preloadDistance ?? 240;
      pending.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight + margin || rect.bottom < 0) {
          reveal(element);
        }
      });
    });
  };

  window.addEventListener("scroll", revealNearOrPassedTargets, { passive: true });
  window.addEventListener("resize", revealNearOrPassedTargets, { passive: true });
  revealNearOrPassedTargets();

  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", revealNearOrPassedTargets);
    window.removeEventListener("resize", revealNearOrPassedTargets);
    if (frame) window.cancelAnimationFrame(frame);
  };
}
