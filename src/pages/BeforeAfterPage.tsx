import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
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

function BeforeAfterSlider({ before, after, label, alt, t }: { before: string; after: string; label: string; alt: string; t: (en: string, es: string) => string }) {
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
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
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
        <img src={after} alt={`After: ${alt}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img src={before} alt={`Before: ${alt}`} className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }} />
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
}

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
    const els = heroRef.current.querySelectorAll(".hero-anim");
    gsap.set(els, { opacity: 0, y: 25 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 });
  }, []);

  return (
    <>
      <SEOHead
        title={t("Before & After PDR Results Orlando, FL | Dent Master Franchise", "Resultados Antes y Después PDR Orlando, FL | Dent Master Franchise")}
        description={t("See real before and after paintless dent repair results from Dent Master Franchise.", "Vea resultados reales de antes y después de reparación sin pintura.")}
        path="/before-after"
      />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t("Before & After Gallery", "Galería Antes y Después")}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">
            {t("Drag the slider to compare — real results from real repairs.", "Deslice para comparar — resultados reales de reparaciones reales.")}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={galleryRef}>
            {gallery.map((item) => (
              <div key={item.label} className="gallery-item">
                <BeforeAfterSlider {...item} t={t} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/contact" className="btn-primary">{t("Get Instant Quote", "Cotización Gratis")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
