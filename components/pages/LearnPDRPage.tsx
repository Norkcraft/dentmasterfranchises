"use client";

import { useEffect, useRef } from "react";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import TrainingForm from "@/components/TrainingForm";
import FAQSection from "@/components/FAQSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUSINESS, TRAINING_PRICING } from "@/data/constants";
import { BookOpen, Wrench, Award, Target } from "lucide-react";

const faqsEn = [
  { q: "Do I need prior experience for PDR training?", a: "No! Our training program is designed for total beginners as well as intermediate technicians." },
  { q: "What does the training include?", a: "Hands-on training covers PDR fundamentals, tool usage, damage assessment, repair techniques, and business basics." },
  { q: "Where is training held?", a: "Training is conducted in-person at our Orlando, FL facility with 35+ years of industry expertise behind the curriculum." },
  { q: "Which training option should I choose?", a: "Daily for introductions, weekly for solid foundations, monthly for comprehensive career-ready preparation." },
  { q: "What tools do I need?", a: "All professional-grade PDR tools and materials are provided during training." },
  { q: "Can I start working after training?", a: "Many graduates begin working independently after completing our program." },
];

const faqsEs = [
  { q: "¿Necesito experiencia previa para el entrenamiento PDR?", a: "¡No! Nuestro programa está diseñado tanto para principiantes como para técnicos intermedios." },
  { q: "¿Qué incluye el entrenamiento?", a: "El entrenamiento práctico cubre fundamentos de PDR, uso de herramientas, evaluación de daños, técnicas de reparación y conceptos básicos del negocio." },
  { q: "¿Dónde se realiza el entrenamiento?", a: "El entrenamiento se realiza en persona en nuestras instalaciones de Orlando, FL, con más de 35 años de experiencia en la industria." },
  { q: "¿Qué opción de entrenamiento debo elegir?", a: "Diario para introducción, semanal para bases sólidas, mensual para preparación profesional completa." },
  { q: "¿Qué herramientas necesito?", a: "Todas las herramientas y materiales profesionales de PDR se proporcionan durante el entrenamiento." },
  { q: "¿Puedo empezar a trabajar después del entrenamiento?", a: "Muchos graduados comienzan a trabajar de forma independiente después de completar nuestro programa." },
];

export default function LearnPDRPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useScrollReveal<HTMLDivElement>({ childSelector: ".feature-card", stagger: 0.1, y: 30, scale: 0.95 });
  const pricingRef = useScrollReveal<HTMLDivElement>({ childSelector: ".pricing-card", stagger: 0.12, y: 30 });
  const { t, lang } = useLanguage();

  const features = [
    { icon: BookOpen, title: t("Expert Instruction", "Instrucción Experta"), desc: t("Learn from PDR professionals with thousands of repairs.", "Aprenda de profesionales con miles de reparaciones.") },
    { icon: Wrench, title: t("Hands-On Practice", "Práctica Real"), desc: t("Practice with professional-grade PDR tools and techniques.", "Practique con herramientas y técnicas profesionales de PDR.") },
    { icon: Target, title: t("All Skill Levels", "Todos los Niveles"), desc: t("Programs for total beginners and intermediate technicians.", "Programas para principiantes e intermedios.") },
    { icon: Award, title: t("Career Ready", "Listo para Trabajar"), desc: t("Graduate with skills and confidence to start earning.", "Gradúese con habilidades para comenzar a ganar.") },
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
      <ServiceJsonLd name="PDR Training" description="Hands-on paintless dent repair training in Orlando, FL." url="/learn-pdr" />
      <FAQJsonLd faqs={lang === "es" ? faqsEs : faqsEn} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t(
              "Start a Career With Paintless Dent Repair Training Orlando",
              "Entrenamiento de Reparación sin Pintura en Orlando"
            )}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl">
            {t(
              "Paintless dent repair training in Orlando gives you hands-on reps fast. Learn proven tools, real repairs, and the steps to start earning sooner.",
              "El entrenamiento PDR en Orlando le da práctica real. Aprenda herramientas, reparaciones reales y cómo comenzar a ganar más rápido."
            )}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container" ref={featuresRef}>
          <h2 className="sr-only">{t("Training features", "Características del entrenamiento")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="feature-card card-elevated text-center group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="section-container max-w-5xl">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
              {t("Professional PDR Training Program", "Programa Profesional de Entrenamiento PDR")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("Dent Master Franchise offers comprehensive, hands-on paintless dent repair training for aspiring technicians at every skill level. Our training takes place in-person at our Orlando, FL facility with professional-grade PDR tools and expert instruction.", "Dent Master Franchise ofrece entrenamiento integral y práctico en reparación de abolladuras sin pintura para técnicos aspirantes de todos los niveles. Nuestro entrenamiento es presencial en Orlando, FL con herramientas profesionales.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" ref={pricingRef}>
            {TRAINING_PRICING.map((tier, i) => (
              <div key={tier.label} className={`pricing-card card-elevated text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${i === 2 ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/30"}`}>
                {i === 2 && <span className="highlight-badge mb-4 inline-block">{t("Most Comprehensive", "Más Completo")}</span>}
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{tier.label}</h3>
                <p className="text-5xl font-bold text-primary mb-1 font-heading">{tier.price}</p>
                <p className="text-sm text-muted-foreground mb-6">{tier.unit}</p>
                <ul className="text-sm text-foreground/80 space-y-2 mb-6 text-left">
                  <li>✓ {t("Hands-on instruction", "Instrucción práctica")}</li>
                  <li>✓ {t("Guided practice sessions", "Sesiones de práctica guiada")}</li>
                  <li>✓ {t("Professional tools provided", "Herramientas profesionales incluidas")}</li>
                  <li>✓ {t("Beginner & intermediate levels", "Niveles principiante e intermedio")}</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">{t("Frequently Asked Questions", "Preguntas Frecuentes")}</h2>
            <FAQSection faqs={lang === "es" ? faqsEs : faqsEn} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">{t("Enroll in PDR Training", "Inscríbase en Entrenamiento PDR")}</h2>
              <TrainingForm />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">{t("Questions?", "¿Preguntas?")}</h2>
              <p className="text-foreground/80 mb-4">{t("Call us directly to discuss training options and availability.", "Llámenos directamente para discutir opciones y disponibilidad.")}</p>
              <a href={BUSINESS.phoneHref} className="btn-primary">{BUSINESS.phone}</a>
              <p className="text-sm text-muted-foreground mt-4">Hablamos Español</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
