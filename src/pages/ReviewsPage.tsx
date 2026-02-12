import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import ReviewCard from "@/components/ReviewCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { reviews } from "@/data/reviews";
import { BUSINESS } from "@/data/constants";

export default function ReviewsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useScrollReveal<HTMLDivElement>({ childSelector: ".review-item", stagger: 0.1, y: 30 });
  const { t } = useLanguage();

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
        title={t("Top-Rated Customer Reviews — Dent Master Franchise Orlando, FL", "Reseñas de Clientes — Dent Master Franchise Orlando, FL")}
        description={t("Read real customer reviews for Dent Master Franchise in Orlando, FL.", "Lea reseñas reales de clientes de Dent Master Franchise en Orlando, FL.")}
        path="/reviews"
      />
      <LocalBusinessJsonLd />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t("Customer Reviews", "Reseñas de Clientes")}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">
            {t("Real reviews from real customers — see why Orlando trusts Dent Master Franchise.", "Reseñas reales de clientes reales — vea por qué Orlando confía en Dent Master Franchise.")}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" ref={gridRef}>
            {reviews.map((r) => (
              <div key={r.name} className="review-item">
                <ReviewCard {...r} />
              </div>
            ))}
          </div>
          <div className="text-center flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="btn-primary">{t("View Google Reviews", "Ver Reseñas en Google")}</a>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t("View Facebook Reviews", "Ver Reseñas en Facebook")}</a>
          </div>
          <div className="text-center mt-8">
            <Link to="/contact" className="btn-secondary">{t("Get Your Free Quote", "Obtenga su Cotización Gratis")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
