import { useEffect } from "react";

/**
 * Adds `is-in` to every `.reveal` / `.reveal-paper` once it scrolls into view.
 * Pass whatever re-renders the page with new elements (the language): the
 * scan runs again and picks up nodes React created since, which would
 * otherwise stay hidden.
 */
export function useReveal(rescanKey?: unknown) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.is-in), .reveal-paper:not(.is-in)",
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => {
      // Anything already on screen or scrolled past (after a language switch or
      // an anchor jump) is shown at once; only what lies below waits for the observer.
      if (node.getBoundingClientRect().top < window.innerHeight) node.classList.add("is-in");
      else io.observe(node);
    });
    return () => io.disconnect();
  }, [rescanKey]);
}
