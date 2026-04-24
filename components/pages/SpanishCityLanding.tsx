"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import FAQSection from "@/components/FAQSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BUSINESS } from "@/data/constants";
import type { CityData } from "@/data/cities";

interface Props {
  city: CityData;
  englishSlug: string;
}

export default function SpanishCityLanding({ city, englishSlug }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useScrollReveal<HTMLDivElement>({ childSelector: ".content-section", stagger: 0.1, y: 30 });

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

    return () => { killed = true; };
  }, []);

  return (
    <>
      <ServiceJsonLd
        name={`Reparación de Abolladuras sin Pintura — ${city.city}, FL`}
        description={city.introEs}
        url={`/reparacion-abolladuras-${city.city.toLowerCase().replace(/\s+/g, "-")}`}
        area={city.city}
      />
      <FAQJsonLd faqs={city.faqsEs} />

      {/* Language switcher */}
      <div className="bg-muted border-b border-border">
        <div className="section-container py-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">🇪🇸 Página en Español</span>
          <Link
            href={`/service-areas/${englishSlug}`}
            className="text-primary hover:underline font-medium"
          >
            View in English →
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {city.h1Es}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl mb-8">
            {city.introEs}
          </p>
          <div className="hero-anim flex flex-wrap gap-4">
            <Link href="/contact" className="btn-hero-primary">Cotización Gratis</Link>
            <a href={BUSINESS.phoneHref} className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20">
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl" ref={contentRef}>
          {city.sectionsEs.map((section, i) => (
            <div key={i} className="content-section mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
                {section.heading}
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          {/* Services list */}
          <div className="content-section bg-accent/50 rounded-xl p-8 mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4 font-heading">
              Nuestros Servicios en {city.city}, FL
            </h2>
            <ul className="space-y-2 text-foreground/80">
              <li>✓ <Link href="/services/paintless-dent-repair" className="text-primary hover:underline">Reparación de Abolladuras sin Pintura (PDR)</Link></li>
              <li>✓ <Link href="/services/hail-damage-repair" className="text-primary hover:underline">Reparación de Daños por Granizo</Link></li>
              <li>✓ <Link href="/services/minor-dent-ding-removal" className="text-primary hover:underline">Eliminación de Golpes de Puerta</Link></li>
              <li>✓ <Link href="/services/collision-repair" className="text-primary hover:underline">Reparación de Colisión (Basada en PDR)</Link></li>
              <li>✓ <Link href="/services/fender-repair" className="text-primary hover:underline">Reparación de Guardafangos</Link></li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary">Cotización Gratis →</Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="content-section mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
              Preguntas Frecuentes
            </h2>
            <FAQSection faqs={city.faqsEs} />
          </div>

          {/* CTA */}
          <div className="content-section text-center">
            <p className="text-muted-foreground mb-4">
              Hablamos Español — llámenos o envíe fotos para una cotización rápida.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">Obtener Cotización Gratis</Link>
              <a href={BUSINESS.phoneHref} className="btn-secondary">{BUSINESS.phone}</a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
