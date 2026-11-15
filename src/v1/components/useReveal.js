import { useEffect } from "react";

// Faz os elementos com [data-reveal] dentro de `ref` aparecerem ao rolar.
// Sem IntersectionObserver (ou com movimento reduzido), mostra tudo na hora.
export function useReveal(ref, deps = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const items = root.querySelectorAll("[data-reveal]:not(.is-in)");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || reduce) {
      items.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
