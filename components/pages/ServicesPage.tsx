"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import { BUSINESS } from "@/data/constants";
import { Wrench, Zap, Car, Shield, ChevronRight } from "lucide-react";

const icons = [Wrench, Zap, Car, Shield, Wrench];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useScrollReveal<HTMLDivElement>({ childSelector: ".service-card", stagger: 0.1, y: 30, scale: 0.95 });
  const { t, lang } = useLanguage();

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
      <section className="section-padding bg-background">
        <div className="section-container" ref={heroRef}>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h1 className="hero-anim text-3xl md:text-5xl font-bold text-foreground mb-3 font-heading">
                {t("Fast Paintless Dent Repair Services Orlando Drivers Trust", "Servicios Rápidos de Reparación sin Pintura en Orlando")}
              </h1>
              <p className="hero-anim text-base md:text-lg text-muted-foreground max-w-2xl">
                {t(
                  "Paintless dent repair services in Orlando for hail damage, door dings, and minor collision dents. Pick your service, then get a quote fast.",
                  "Explore nuestros servicios de reparación sin pintura para granizo, golpes de puerta y daños por colisión en Orlando, FL."
                )}
              </p>
            </div>
            <div className="lg:col-span-4 hero-anim">
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                <Link href="/contact" className="btn-primary w-full sm:w-auto lg:w-full text-center">
                  {t("Get My Free Quote in Minutes", "Obtenga Mi Cotización Gratis")}
                </Link>
                <a href={BUSINESS.phoneHref} className="btn-secondary w-full sm:w-auto lg:w-full text-center">
                  {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={gridRef}>
            {services.map((s, i) => {
              const Icon = icons[i] ?? Wrench;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="service-card card-elevated group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 font-heading">{lang === "es" ? s.titleEs : s.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{lang === "es" ? s.heroDescriptionEs : s.heroDescription}</p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("See Options • Get Pricing", "Ver Opciones • Precios")} <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="section-container">
          <div className="card-elevated bg-white/5 border-white/10">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
                  {t("Ready to remove your dent without repainting?", "¿Listo para reparar su abolladura sin pintar?")}
                </h2>
                <p className="mt-2 text-white/70">
                  {t(
                    "Send photos and get a fast estimate. Mobile service available when conditions allow a factory-finish repair.",
                    "Envíe fotos y obtenga una estimación rápida. Servicio móvil disponible cuando las condiciones lo permiten."
                  )}
                </p>
              </div>
              <div className="lg:col-span-4">
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                  <Link href="/contact" className="btn-hero-primary w-full sm:w-auto lg:w-full text-center">
                    {t("Get My Free Quote", "Obtener Cotización")}
                  </Link>
                  <a href={BUSINESS.phoneHref} className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 w-full sm:w-auto lg:w-full text-center">
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
