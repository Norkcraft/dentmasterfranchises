import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  childSelector?: string;
}

export function useScrollReveal<T extends HTMLElement>(opts: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !ref.current) return;

    let killed = false;
    let kill: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (killed || !ref.current) return;

      const { y = 40, x = 0, scale = 1, duration = 0.7, delay = 0, stagger = 0, childSelector } = opts;
      const targets = childSelector ? ref.current.querySelectorAll(childSelector) : ref.current;

      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y, x, scale },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger: stagger || 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      kill = () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === ref.current) t.kill();
        });
      };
    })();

    return () => {
      killed = true;
      kill?.();
    };
  }, []);

  return ref;
}

export function useCountUp(end: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !ref.current) {
      if (ref.current) ref.current.textContent = String(end);
      return;
    }

    let killed = false;
    let kill: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (killed || !ref.current) return;

      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString();
        },
      });

      kill = () => {
        tween.kill();
      };
    })();

    return () => {
      killed = true;
      kill?.();
    };
  }, [end, duration]);

  return ref;
}
