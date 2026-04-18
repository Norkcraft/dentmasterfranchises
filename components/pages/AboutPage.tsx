"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { LocalBusinessJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import FAQSection from "@/components/FAQSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { Shield, Users, Award, Heart } from "lucide-react";

const faqsEn = [
  { q: "What is Dent Master Franchise?", a: "Dent Master Franchise is Orlando's leading paintless dent repair company with over 35 years of experience, specializing in hail damage repair, door ding removal, collision repair, and fender repair — all without repainting." },
  { q: "How long has Dent Master Franchise been in business?", a: "With 35+ years of experience in the PDR industry, we've built a reputation for excellence, honesty, and outstanding results." },
  { q: "Are your technicians certified?", a: "Yes, all our PDR technicians are professionally trained and certified with years of hands-on experience repairing thousands of vehicles." },
  { q: "Do you offer training for new technicians?", a: "Yes! We offer in-person PDR training for beginners and intermediate technicians. Daily, weekly, and monthly options are available." },
  { q: "What areas do you serve?", a: "We serve Orlando and 25+ cities across Central Florida, including Kissimmee, Winter Park, Sanford, Lake Mary, Oviedo, and many more." },
  { q: "Do you provide Spanish-language support?", a: "¡Sí! Hablamos Español. Our team includes Spanish-speaking staff ready to assist you with any service needs." },
];

const faqsEs = [
  { q: "¿Qué es Dent Master Franchise?", a: "Dent Master Franchise es la empresa líder de reparación de abolladuras sin pintura en Orlando, con más de 35 años de experiencia." },
  { q: "¿Cuánto tiempo lleva Dent Master Franchise en el negocio?", a: "Con más de 35 años de experiencia en la industria PDR, hemos construido una reputación de excelencia y resultados sobresalientes." },
  { q: "¿Sus técnicos están certificados?", a: "Sí, todos nuestros técnicos de PDR están profesionalmente entrenados y certificados con años de experiencia." },
  { q: "¿Ofrecen entrenamiento para nuevos técnicos?", a: "¡Sí! Ofrecemos entrenamiento presencial de PDR para principiantes e intermedios. Opciones diarias, semanales y mensuales disponibles." },
  { q: "¿Qué áreas atienden?", a: "Servimos a Orlando y más de 25 ciudades en Florida Central, incluyendo Kissimmee, Winter Park, Sanford, Lake Mary, Oviedo y más." },
  { q: "¿Ofrecen soporte en español?", a: "¡Sí! Hablamos Español. Nuestro equipo incluye personal hispanohablante listo para ayudarle." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useScrollReveal<HTMLDivElement>({ childSelector: ".value-card", stagger: 0.1, y: 30, scale: 0.95 });
  const counterRef = useScrollReveal<HTMLDivElement>({ childSelector: ".counter-item", stagger: 0.15, y: 30 });
  const contentRef = useScrollReveal<HTMLDivElement>({ childSelector: ".content-section", stagger: 0.12, y: 30 });
  const { t, lang } = useLanguage();

  const values = [
    { icon: Shield, title: t("Quality Guaranteed", "Calidad Garantizada"), desc: t("Every repair backed by our satisfaction guarantee. We don't stop until it's perfect.", "Cada reparación respaldada por nuestra garantía de satisfacción.") },
    { icon: Users, title: t("Customer First", "Cliente Primero"), desc: t("Transparent pricing, honest assessments, and clear communication every step of the way.", "Precios transparentes, evaluaciones honestas y comunicación clara.") },
    { icon: Award, title: t("Certified Experts", "Expertos Certificados"), desc: t("Our technicians are trained professionals with thousands of successful repairs.", "Nuestros técnicos son profesionales con miles de reparaciones exitosas.") },
    { icon: Heart, title: t("Community Driven", "Comprometidos"), desc: t("Proudly serving Orlando's diverse community. Hablamos Español.", "Sirviendo con orgullo a la comunidad diversa de Orlando.") },
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
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={lang === "es" ? faqsEs : faqsEn} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t(
              "Meet Orlando Paintless Dent Repair Experts You Can Trust",
              "Conozca a Expertos de Reparación sin Pintura en Orlando"
            )}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl">
            {t(
              "Paintless dent repair in Orlando should feel simple. We fix dents without repainting, protect factory paint, and keep pricing clear from the start.",
              "La reparación sin pintura en Orlando debe ser simple. Reparamos sin pintar, protegemos la pintura de fábrica y damos precios claros."
            )}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container" ref={valuesRef}>
          <h2 className="sr-only">{t("Our values", "Nuestros valores")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="value-card card-elevated text-center group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="section-container" ref={counterRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="counter-item"><AnimatedCounter end={35} suffix="+" label={t("Years Experience", "Años de Experiencia")} /></div>
            <div className="counter-item"><AnimatedCounter end={5000} suffix="+" label={t("Vehicles Repaired", "Vehículos Reparados")} /></div>
            <div className="counter-item"><AnimatedCounter end={25} suffix="+" label={t("Cities Served", "Ciudades Atendidas")} /></div>
            <div className="counter-item"><AnimatedCounter end={100} suffix="%" label={t("Satisfaction Rate", "Satisfacción")} /></div>
          </div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl" ref={contentRef}>
          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("Orlando's Premier Paintless Dent Repair Team", "El Equipo Premier de Reparación sin Pintura de Orlando")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("Dent Master Franchise was founded with a simple mission: to provide Orlando and Central Florida with the highest quality paintless dent repair at fair, transparent prices. We believe every vehicle owner deserves access to professional dent removal that preserves their factory finish, saves them money, and delivers results that exceed expectations.", "Dent Master Franchise fue fundada con una misión simple: proporcionar a Orlando y Florida Central la más alta calidad en reparación de abolladuras sin pintura a precios justos y transparentes.")}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t("What sets Dent Master Franchise apart isn't just our technical skill — it's our dedication to the customer experience. We provide honest assessments, transparent pricing with no hidden fees, and clear communication throughout the repair process.", "Lo que distingue a Dent Master Franchise no es solo nuestra habilidad técnica — es nuestra dedicación a la experiencia del cliente.")}
            </p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("Why We're Trusted Across Central Florida", "Por Qué Confían en Nosotros en Florida Central")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("Our reputation is built on consistent quality and genuine customer care. We serve Orlando, Kissimmee, Winter Park, Altamonte Springs, Sanford, Lake Mary, Oviedo, Apopka, Winter Garden, Clermont, and 15+ additional cities. Hablamos Español — we're proud to serve Central Florida's diverse community.", "Nuestra reputación está construida sobre calidad consistente y cuidado genuino del cliente. Servimos a Orlando, Kissimmee, Winter Park y más de 15 ciudades adicionales. Hablamos Español.")}
            </p>
          </div>

          <div className="content-section bg-accent/50 rounded-xl p-6 mb-12 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{t("Dealership & Fleet Services", "Servicios para Concesionarios")}</h3>
            <p className="text-sm text-foreground/80">{DEALER_DISCOUNT_TEXT}</p>
            <Link href="/dealerships-fleet" className="text-sm font-semibold text-primary mt-3 inline-block hover:underline">{t("Learn about fleet services →", "Conozca nuestros servicios para flotas →")}</Link>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">{t("Frequently Asked Questions", "Preguntas Frecuentes")}</h2>
            <FAQSection faqs={lang === "es" ? faqsEs : faqsEn} />
          </div>

          <div className="text-center">
            <Link href="/contact" className="btn-primary">{t("Get Instant Quote", "Cotización Gratis")}</Link>
            <span className="mx-3 text-muted-foreground">{t("or", "o")}</span>
            <Link href="/learn-pdr" className="btn-secondary">{t("Learn PDR", "Aprende PDR")}</Link>
          </div>
        </div>
      </article>
    </>
  );
}
