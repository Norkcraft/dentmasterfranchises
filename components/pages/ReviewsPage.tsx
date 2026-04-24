"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
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
      <LocalBusinessJsonLd />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t(
              "Paintless Dent Repair Reviews Orlando Drivers Trust",
              "Reseñas de Reparación sin Pintura en Orlando"
            )}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">
            {t(
              "Paintless dent repair reviews in Orlando show what results look like. Read what drivers say, then get a quote without pressure.",
              "Las reseñas en Orlando muestran resultados reales. Lea opiniones y luego obtenga una cotización sin presión."
            )}
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
            <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="btn-primary">{t("Read Google Reviews for Proof", "Lea Reseñas en Google")}</a>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t("Read Facebook Reviews for Proof", "Lea Reseñas en Facebook")}</a>
          </div>

          {/* Review acquisition CTA */}
          <div className="mt-12 bg-accent/50 rounded-xl p-8 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2 font-heading">
              {t("Had a great experience?", "¿Tuvo una gran experiencia?")}
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              {t(
                "Your Google review helps other Orlando drivers find honest dent repair. It takes less than a minute.",
                "Su reseña en Google ayuda a otros conductores en Orlando a encontrar reparación honesta de abolladuras. Toma menos de un minuto."
              )}
            </p>
            <Link href="/leave-a-review" className="btn-primary inline-flex items-center gap-2">
              <Star className="w-4 h-4 fill-white text-white" />
              {t("Leave a Review", "Dejar una Reseña")}
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/contact" className="btn-secondary">{t("Get My Free Quote in Minutes", "Obtenga Mi Cotización en Minutos")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
