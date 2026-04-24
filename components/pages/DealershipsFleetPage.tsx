"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import FAQSection from "@/components/FAQSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUSINESS, DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { Building2, Clock, BadgePercent, Truck } from "lucide-react";

const faqs = [
  { q: "What types of businesses qualify for fleet discounts?", a: "Dealerships, auto lots, wholesalers, fleet management companies, rental car agencies, and businesses with multiple vehicles may all qualify." },
  { q: "How much is the professional discount?", a: "Qualifying clients may receive 10%–20% off standard pricing, depending on job scope and volume." },
  { q: "Can you service our vehicles on-site?", a: "Yes, we offer on-site PDR service at your dealership, lot, or fleet location." },
  { q: "How fast is turnaround for fleet repairs?", a: "We prioritize fleet clients and can often complete repairs within 1-3 business days." },
  { q: "Do you offer ongoing service agreements?", a: "Yes, we can establish ongoing service arrangements with regular scheduling." },
  { q: "Do you handle auto dealer reconditioning?", a: "Yes. We specialize in dealership PDR reconditioning — batch dent repairs that get vehicles lot-ready faster and at a lower cost than traditional body shops. Our recon process preserves factory paint and avoids carfax-reportable body work." },
  { q: "Do you repair rental car fleets?", a: "Yes. We work with rental car agencies and fleet operators across the Orlando area, including near MCO. Rental fleets benefit from our fast batch turnaround, on-site service, and volume pricing." },
];

export default function DealershipsFleetPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useScrollReveal<HTMLDivElement>({ childSelector: ".benefit-card", stagger: 0.1, y: 30, scale: 0.95 });
  const contentRef = useScrollReveal<HTMLDivElement>({ childSelector: ".content-section", stagger: 0.12, y: 30 });
  const { t } = useLanguage();

  const benefits = [
    { icon: BadgePercent, title: t("10%–20% Discount", "10%–20% Descuento"), desc: t("Professional volume pricing for qualifying business clients.", "Precios por volumen para clientes comerciales calificados.") },
    { icon: Clock, title: t("Same-Day Service", "Servicio el Mismo Día"), desc: t("Priority turnaround to minimize downtime on your lot.", "Respuesta prioritaria para minimizar tiempo de inactividad.") },
    { icon: Truck, title: t("On-Site Repairs", "Reparación en Sitio"), desc: t("We come to your dealership, lot, or fleet facility.", "Vamos a su concesionario o instalación de flota.") },
    { icon: Building2, title: t("Ongoing Contracts", "Contratos Continuos"), desc: t("Flexible scheduling and regular maintenance agreements.", "Programación flexible y acuerdos de mantenimiento regular.") },
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
      <ServiceJsonLd name="Dealership & Fleet PDR Services" description="Professional PDR discounts for dealerships and fleet clients." url="/dealerships-fleet" />
      <FAQJsonLd faqs={faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t(
              "Speed Up Recon With Fleet Dent Repair Orlando Discounts",
              "Descuentos de Reparación para Flotas en Orlando"
            )}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl">
            {t(
              "Fleet dent repair in Orlando keeps inventory retail-ready. We fix dings in batches, protect factory paint, and keep scheduling simple.",
              "La reparación para flotas en Orlando mantiene el inventario listo. Arreglamos golpes por volumen y cuidamos la pintura."
            )}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container" ref={benefitsRef}>
          <h2 className="sr-only">{t("Fleet service benefits", "Beneficios del servicio para flotas")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="benefit-card card-elevated text-center group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <b.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <article className="section-padding bg-muted">
        <div className="section-container max-w-4xl" ref={contentRef}>
          <div className="content-section bg-accent/50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">{t("Professional Discount Program", "Programa de Descuento Profesional")}</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">{DEALER_DISCOUNT_TEXT}</p>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary">{t("Get Fleet Quote", "Cotización para Flotas")}</Link>
            </div>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("Dealership PDR Reconditioning in Orlando", "Reacondicionamiento PDR para Concesionarios en Orlando")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("Dent Master Franchise is the preferred PDR reconditioning partner for dealerships, auto lots, wholesalers, and fleet operators throughout Orlando and Central Florida. Fast recon turnaround keeps inventory retail-ready and moving — without the cost or timeline of traditional body shop work.", "Dent Master Franchise es el socio PDR preferido para concesionarios, lotes de autos y operadores de flotas en Orlando y Florida Central. El reacondicionamiento rápido mantiene el inventario listo para la venta.")}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t("Our lot-damage PDR service handles batch repairs efficiently, preserves factory paint so there is nothing to report on CarFax, and keeps your per-unit recon cost well below what a body shop would charge.", "Nuestro servicio PDR maneja reparaciones por lote eficientemente, preserva la pintura de fábrica y mantiene el costo de reacondicionamiento por unidad muy por debajo de lo que cobraría un taller de carrocería.")}
            </p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("Rental Car Fleet Dent Repair Near MCO", "Reparación de Abolladuras para Flotas de Renta cerca de MCO")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("Orlando International Airport is home to one of the largest rental car hubs in the country. Dent Master Franchise works with rental car agencies and fleet operators near MCO to keep vehicles road-ready between rentals. Our on-site service, fast batch turnaround, and volume pricing are designed for the pace of rental fleet operations.", "El Aeropuerto Internacional de Orlando alberga uno de los centros de autos de alquiler más grandes del país. Dent Master Franchise trabaja con agencias de renta y operadores de flotas cerca de MCO para mantener los vehículos listos entre alquileres.")}
            </p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">{t("Frequently Asked Questions", "Preguntas Frecuentes")}</h2>
            <FAQSection faqs={faqs} />
          </div>

          <div className="text-center">
            <Link href="/contact" className="btn-primary">{t("Get Fleet Quote", "Cotización para Flotas")}</Link>
            <span className="mx-3 text-muted-foreground">{t("or call", "o llame")}</span>
            <a href={BUSINESS.phoneHref} className="btn-secondary">{BUSINESS.phone}</a>
          </div>
        </div>
      </article>
    </>
  );
}
