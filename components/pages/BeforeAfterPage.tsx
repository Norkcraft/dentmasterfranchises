"use client";

import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import beforeDoor from "@/assets/before-after/door-before.jpeg";
import afterDoor from "@/assets/before-after/door-after.jpeg";
import beforeHood from "@/assets/before-after/hood-before.jpeg";
import afterHood from "@/assets/before-after/hood-after.jpeg";
import beforeBack from "@/assets/before-after/grey-back-before.jpeg";
import afterBack from "@/assets/before-after/grey-back-after.jpeg";
import beforeBack2 from "@/assets/before-after/back-before.jpeg";
import afterBack2 from "@/assets/before-after/back-after.jpeg";

const BeforeAfterSlider = memo(function BeforeAfterSlider({ before, after, label, alt, t }: { before: StaticImageData; after: StaticImageData; label: string; alt: string; t: (en: string, es: string) => string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  useEffect(() => {
    const onUp = () => { isDragging.current = false; };
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches.item(0);
      if (!touch) return;
      handleMove(touch.clientX);
    };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div className="card-elevated p-0 overflow-hidden">
      <div
        ref={containerRef}
        className="relative h-64 md:h-80 cursor-col-resize select-none overflow-hidden"
        onMouseDown={() => { isDragging.current = true; }}
        onTouchStart={() => { isDragging.current = true; }}
      >
        <Image
          src={after}
          alt={`After: ${alt}`}
          width={1200}
          height={800}
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <Image
            src={before}
            alt={`Before: ${alt}`}
            width={1200}
            height={800}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
            <span className="text-charcoal font-bold text-xs">↔</span>
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-charcoal/80 text-white text-xs px-2 py-1 rounded">{t("Before", "Antes")}</span>
        <span className="absolute top-3 right-3 bg-primary/90 text-white text-xs px-2 py-1 rounded">{t("After", "Después")}</span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground font-heading">{label}</h3>
        <p className="text-sm text-muted-foreground mt-1">{t("Drag the slider to compare — no repainting, no fillers.", "Deslice para comparar — sin pintura, sin rellenos.")}</p>
      </div>
    </div>
  );
});

export default function BeforeAfterPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useScrollReveal<HTMLDivElement>({ childSelector: ".gallery-item", stagger: 0.15, y: 40 });
  const { t } = useLanguage();

  const gallery = [
    { before: beforeDoor, after: afterDoor, label: t("Door Dent Repair", "Reparación de Puerta"), alt: "Door dent repair" },
    { before: beforeHood, after: afterHood, label: t("Hood Dent Repair", "Reparación de Capó"), alt: "Hood dent repair" },
    { before: beforeBack, after: afterBack, label: t("Rear Panel Repair", "Reparación Trasera"), alt: "Rear panel repair" },
    { before: beforeBack2, after: afterBack2, label: t("Trunk Lid Repair", "Reparación de Maletero"), alt: "Trunk lid repair" },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !heroRef.current) return;

    let killed = false;
    void (async () => {
      const gsap = (await import("gsap")).default;
      if (killed || !heroRef.current) return;
      const els = heroRef.current.querySelectorAll(".hero-anim");
      gsap.set(els, { opacity: 0, y: 25 });
      gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 });
    })();

    return () => {
      killed = true;
    };
  }, []);

  return (
    <>
      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t(
              "See Paintless Dent Repair Results Orlando Drivers Trust",
              "Vea Resultados de Reparación sin Pintura en Orlando"
            )}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">
            {t(
              "Paintless dent repair results matter. Drag the slider to compare before and after photos from real Orlando repairs.",
              "Los resultados importan. Deslice para comparar fotos de antes y después de reparaciones reales en Orlando."
            )}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          <h2 className="sr-only">{t("Before and after comparisons", "Comparaciones antes y después")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={galleryRef}>
            {gallery.map((item) => (
              <div key={item.label} className="gallery-item">
                <BeforeAfterSlider {...item} t={t} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary">{t("Get My Free Quote in Minutes", "Obtenga Mi Cotización en Minutos")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
