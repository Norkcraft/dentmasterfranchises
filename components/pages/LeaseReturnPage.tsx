"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import FAQSection from "@/components/FAQSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUSINESS } from "@/data/constants";
import { CalendarCheck, ShieldCheck, DollarSign, Clock } from "lucide-react";

const faqs = [
  { q: "How far in advance should I fix dents before a lease return?", a: "We recommend getting a free estimate 2–3 weeks before your turn-in date. This gives you plenty of time to schedule the repair and avoid any last-minute rush." },
  { q: "What dents will the dealer charge me for?", a: "Most lease agreements allow 'normal wear and tear' but charge for dents larger than a dime, door dings with paint damage, or any body damage that is clearly visible at arm's length. Check your specific lease agreement for exact thresholds." },
  { q: "Is it cheaper to fix dents before returning my lease?", a: "Almost always yes. Dealers use body shop pricing for lease-return damage — often $300–$500 per dent. Our PDR pricing is significantly lower, and you avoid the surprise charge on your final bill." },
  { q: "Will PDR show on a vehicle history report?", a: "No. Paintless dent repair involves no body work, filler, or repainting — there is nothing to report on CarFax or AutoCheck. Your factory paint stays completely original." },
  { q: "Can you fix dents at my home or office before the lease return?", a: "Yes. We offer mobile PDR service across the Orlando metro. We can often come to your home, office, or another convenient location." },
  { q: "What if the dealer already charged me for dents?", a: "If you have already been billed, reach out to us for future reference. If the turn-in inspection is upcoming, get a PDR estimate first — it almost always beats the dealer's charge." },
];

export default function LeaseReturnPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useScrollReveal<HTMLDivElement>({ childSelector: ".benefit-card", stagger: 0.1, y: 30, scale: 0.95 });
  const contentRef = useScrollReveal<HTMLDivElement>({ childSelector: ".content-section", stagger: 0.12, y: 30 });
  const { t } = useLanguage();

  const benefits = [
    { icon: DollarSign, title: t("Save vs. Dealer Fees", "Ahorre vs. Cargos del Concesionario"), desc: t("PDR costs a fraction of what dealers charge for lease return dents.", "El PDR cuesta una fracción de lo que cobran los concesionarios.") },
    { icon: ShieldCheck, title: t("Factory Paint Preserved", "Pintura de Fábrica Preservada"), desc: t("No body work, no repainting — nothing shows on vehicle history.", "Sin trabajo de carrocería — nada aparece en el historial del vehículo.") },
    { icon: Clock, title: t("Fast Turnaround", "Respuesta Rápida"), desc: t("Most repairs completed in 1–3 hours. Done before your turn-in day.", "La mayoría de reparaciones en 1–3 horas.") },
    { icon: CalendarCheck, title: t("Mobile Service Available", "Servicio Móvil Disponible"), desc: t("We come to you — home, office, or wherever is convenient.", "Vamos a usted — casa, oficina o donde sea conveniente.") },
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

    return () => { killed = true; };
  }, []);

  return (
    <>
      <ServiceJsonLd name="Lease Return Dent Repair" description="Fix dents before your lease return in Orlando and avoid dealer excess wear fees." url="/lease-return" />
      <FAQJsonLd faqs={faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t(
              "Fix Dents Before Lease Return — Avoid Dealer Fees in Orlando",
              "Repara Abolladuras Antes de Devolver tu Auto en Arrendamiento"
            )}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl mb-8">
            {t(
              "Dealers charge body shop rates for lease return dents — often $300–$500 per ding. PDR fixes the same damage for less, preserves your factory paint, and leaves nothing on the vehicle history report.",
              "Los concesionarios cobran tarifas de taller de carrocería por abolladuras al devolver el auto. El PDR repara el mismo daño por menos y preserva la pintura de fábrica."
            )}
          </p>
          <div className="hero-anim flex flex-wrap gap-4">
            <Link href="/contact" className="btn-hero-primary">{t("Get My Free Estimate", "Obtener Estimado Gratis")}</Link>
            <a href={BUSINESS.phoneHref} className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20">{BUSINESS.phone}</a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container" ref={benefitsRef}>
          <h2 className="sr-only">{t("Lease return dent repair benefits", "Beneficios de la reparación antes de devolver el auto")}</h2>
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
          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("Why Dealers Charge So Much for Lease Return Dents", "Por Qué los Concesionarios Cobran Tanto por Abolladuras")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t(
                "When you return a leased vehicle, the dealer inspects it using strict excess wear and tear guidelines. Any dent larger than a dime — even a minor parking lot ding — can be classified as chargeable damage. The dealer sends the car to a body shop, pays full body shop rates, and passes the cost directly to you on your final bill.",
                "Cuando devuelve un vehículo arrendado, el concesionario lo inspecciona usando pautas estrictas de desgaste excesivo. Cualquier abolladura más grande que una moneda puede ser daño cobrable."
              )}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t(
                "Those charges can easily total $500–$1,500 or more — for damage that PDR could fix in a few hours for a fraction of the cost. Get a free estimate before you turn the car in and you keep that money.",
                "Esos cargos pueden sumar $500–$1,500 o más — por daños que el PDR podría reparar en pocas horas por una fracción del costo."
              )}
            </p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("The 2–3 Week Rule", "La Regla de 2–3 Semanas")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t(
                "We recommend scheduling your lease return dent assessment 2–3 weeks before your turn-in date. This gives you time to get a free estimate, schedule the repair at your convenience, and return the vehicle confidently. Waiting until the week of your return risks rushed scheduling or — worse — returning the car with damage you didn't budget for.",
                "Recomendamos programar su evaluación 2–3 semanas antes de la fecha de devolución. Esto le da tiempo para obtener un estimado gratuito, programar la reparación y devolver el vehículo con confianza."
              )}
            </p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("What PDR Fixes Before Your Lease Return", "Qué Repara el PDR Antes de Devolver su Auto")}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80 leading-relaxed">
              <li>{t("Door dings from parking lots", "Golpes de puerta en estacionamientos")}</li>
              <li>{t("Shopping cart dents", "Abolladuras de carritos de compras")}</li>
              <li>{t("Minor hood and trunk dents", "Abolladuras menores en capó y maletero")}</li>
              <li>{t("Small hail damage", "Daño menor por granizo")}</li>
              <li>{t("Fender dings and minor body line dents", "Golpes en guardafangos y líneas de carrocería")}</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              {t(
                "If the paint is intact, PDR can almost certainly fix it — and fix it for less than the dealer will charge you.",
                "Si la pintura está intacta, el PDR casi con certeza puede repararlo — y por menos de lo que le cobrará el concesionario."
              )}
            </p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">{t("Frequently Asked Questions", "Preguntas Frecuentes")}</h2>
            <FAQSection faqs={faqs} />
          </div>

          <div className="content-section bg-accent/50 rounded-xl p-8 mb-12">
            <h2 className="text-xl font-bold text-foreground mb-3 font-heading">{t("Get a Free Lease Return Estimate", "Obtenga un Estimado Gratis para Devolución de Arrendamiento")}</h2>
            <p className="text-foreground/80 mb-6">
              {t(
                "Send photos of your dents and we'll tell you exactly what each repair costs — before the dealer does. Mobile service available across Orlando and Central Florida.",
                "Envíe fotos de sus abolladuras y le diremos exactamente cuánto cuesta cada reparación — antes de que lo haga el concesionario."
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">{t("Get My Free Estimate", "Obtener Estimado Gratis")}</Link>
              <a href={BUSINESS.phoneHref} className="btn-secondary">{BUSINESS.phone}</a>
            </div>
          </div>

          <div className="content-section">
            <p className="text-sm text-muted-foreground">
              {t(
                "Related: ",
                "Relacionado: "
              )}
              <Link href="/blog/pdr-vs-body-shop-lease-return" className="text-primary hover:underline">
                {t("PDR vs Body Shop for Lease Returns →", "PDR vs Taller de Carrocería para Devoluciones →")}
              </Link>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
