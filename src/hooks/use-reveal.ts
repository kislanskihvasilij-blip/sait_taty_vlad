import { useEffect } from "react";

/** Adds `is-in` to every `.reveal` / `.reveal-paper` once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal, .reveal-paper");
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
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
}
