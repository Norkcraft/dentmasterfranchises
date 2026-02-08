import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    const { y = 40, x = 0, scale = 1, duration = 0.7, delay = 0, stagger = 0, childSelector } = opts;
    const targets = childSelector ? ref.current.querySelectorAll(childSelector) : ref.current;

    gsap.set(targets, { opacity: 0, y, x, scale });

    const tween = gsap.to(targets, {
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
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === ref.current) t.kill();
      });
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

    return () => { tween.kill(); };
  }, [end, duration]);

  return ref;
}
