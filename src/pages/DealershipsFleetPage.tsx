import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { FAQJsonLd, ServiceJsonLd } from "@/components/JsonLd";
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
    const els = heroRef.current.querySelectorAll(".hero-anim");
    gsap.set(els, { opacity: 0, y: 25 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 });
  }, []);

  return (
    <>
      <SEOHead
        title={t("Elite Dealership & Fleet PDR Discounts Orlando, FL | Dent Master Franchise", "Descuentos PDR para Concesionarios Orlando, FL | Dent Master Franchise")}
        description={t("Professional PDR discounts for dealerships, auto lots, and fleet clients in Orlando, FL.", "Descuentos PDR profesionales para concesionarios y flotas en Orlando, FL.")}
        path="/dealerships-fleet"
      />
      <ServiceJsonLd name="Dealership & Fleet PDR Services" description="Professional PDR discounts for dealerships and fleet clients." url="/dealerships-fleet" />
      <FAQJsonLd faqs={faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t("Dealership & Fleet PDR Services", "Servicios PDR para Concesionarios y Flotas")}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl">
            {t("Professional paintless dent repair for dealerships, auto lots, wholesalers, and fleet clients.", "Reparación profesional sin pintura para concesionarios, lotes de autos y flotas.")}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container" ref={benefitsRef}>
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
              <Link to="/contact" className="btn-primary">{t("Get Fleet Quote", "Cotización para Flotas")}</Link>
            </div>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("Professional PDR for Business Clients", "PDR Profesional para Clientes Comerciales")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("Dent Master Franchise is the preferred PDR provider for dealerships, auto lots, wholesalers, and fleet operators throughout Orlando and Central Florida. We understand that vehicle appearance directly impacts sales and business success.", "Dent Master Franchise es el proveedor PDR preferido para concesionarios, lotes de autos y operadores de flotas en Orlando y Florida Central.")}
            </p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">{t("Frequently Asked Questions", "Preguntas Frecuentes")}</h2>
            <FAQSection faqs={faqs} />
          </div>

          <div className="text-center">
            <Link to="/contact" className="btn-primary">{t("Get Fleet Quote", "Cotización para Flotas")}</Link>
            <span className="mx-3 text-muted-foreground">{t("or call", "o llame")}</span>
            <a href={BUSINESS.phoneHref} className="btn-secondary">{BUSINESS.phone}</a>
          </div>
        </div>
      </article>
    </>
  );
}
