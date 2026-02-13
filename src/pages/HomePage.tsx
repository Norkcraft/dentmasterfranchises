import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Clock, Award, Star, ChevronRight, Wrench, Zap, Car, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessJsonLd, FAQJsonLd } from "@/components/JsonLd";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FAQSection from "@/components/FAQSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import QuoteForm from "@/components/QuoteForm";
import TrainingForm from "@/components/TrainingForm";
import VideoAssistant from "@/components/VideoAssistant";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUSINESS, DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import heroImg from "@/assets/hero-workshop.jpg";
import beforeDoor from "@/assets/before-after/door-before.jpeg";
import afterDoor from "@/assets/before-after/door-after.jpeg";
import beforeHood from "@/assets/before-after/hood-before.jpeg";
import afterHood from "@/assets/before-after/hood-after.jpeg";
import beforeBack from "@/assets/before-after/grey-back-before.jpeg";
import afterBack from "@/assets/before-after/grey-back-after.jpeg";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = [Wrench, Zap, Car, Shield, Wrench];
const topCities = cities.slice(0, 6);

const homeFaqsEn = [
  { q: "How much does paintless dent repair cost in Orlando?", a: "Costs vary by dent size and location. Small door dings start at $75-$150. Contact us for a free, no-obligation estimate." },
  { q: "Do you offer on-site dent repair service?", a: "Yes! We provide PDR throughout Orlando and Central Florida. We come to your home, office, or dealership." },
  { q: "How long does PDR take?", a: "Most single-dent repairs take 30-90 minutes. Hail damage or multiple dents may take 1-5 days." },
  { q: "Do you work with insurance companies?", a: "Yes, we work with all major insurance providers and can help you file and manage your claim." },
  { q: "Is paintless dent repair permanent?", a: "Absolutely. PDR restores the metal to its original shape permanently. There's no filler to crack or shrink." },
  { q: "Do you offer service in Spanish?", a: "¡Sí! Hablamos Español. Our team includes Spanish-speaking staff ready to assist you." },
];

const homeFaqsEs = [
  { q: "¿Cuánto cuesta la reparación de abolladuras sin pintura en Orlando?", a: "Los costos varían según el tamaño y la ubicación de la abolladura. Las pequeñas comienzan en $75-$150. Contáctenos para un presupuesto gratis." },
  { q: "¿Ofrecen servicio de reparación a domicilio?", a: "¡Sí! Brindamos PDR en todo Orlando y Florida Central. Vamos a su hogar, oficina o concesionario." },
  { q: "¿Cuánto tiempo toma el PDR?", a: "La mayoría de las reparaciones de una sola abolladura toman 30-90 minutos. Daño por granizo puede tomar 1-5 días." },
  { q: "¿Trabajan con compañías de seguros?", a: "Sí, trabajamos con todos los principales proveedores de seguros y podemos ayudarle a presentar y gestionar su reclamo." },
  { q: "¿La reparación sin pintura es permanente?", a: "Absolutamente. El PDR restaura el metal a su forma original de manera permanente. No hay relleno que se agriete." },
  { q: "¿Ofrecen servicio en español?", a: "¡Sí! Hablamos Español. Nuestro equipo incluye personal hispanohablante listo para ayudarle." },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useScrollReveal<HTMLDivElement>({ childSelector: ".service-card", stagger: 0.1, y: 30 });
  const baRef = useScrollReveal<HTMLDivElement>({ childSelector: ".ba-card", stagger: 0.15, y: 40 });
  const citiesRef = useScrollReveal<HTMLDivElement>({ childSelector: ".city-card", stagger: 0.05, y: 20, scale: 0.95 });
  const counterRef = useScrollReveal<HTMLDivElement>({ childSelector: ".counter-item", stagger: 0.15, y: 30 });
  const dealerRef = useScrollReveal<HTMLDivElement>({ y: 40, scale: 0.97 });
  const faqRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 30, scale: 0.98 });
  const { t, lang } = useLanguage();

  const [videoChoice, setVideoChoice] = useState<null | "quote" | "training">(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !heroRef.current) return;
    const els = heroRef.current.querySelectorAll(".hero-anim");
    gsap.set(els, { opacity: 0, y: 30 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 });
  }, []);

  const handleVideoChoice = (choice: "quote" | "training") => {
    setVideoChoice(choice);
    // Don't show form yet — wait for Continue
  };

  const handleVideoContinue = (choice: "quote" | "training") => {
    setVideoChoice(choice);
    setShowForm(true);
  };

  return (
    <>
      <SEOHead
        title="#1 Elite Paintless Dent Repair Orlando, FL | Dent Master Franchise"
        description="Paintless dent repair in Orlando, FL by a trusted, top-rated local expert. Fast, professional results with no repainting. Get a free quote today from Dent Master Franchise."
        path="/"
      />
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={homeFaqsEn} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden min-h-[650px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Professional paintless dent repair workshop in Orlando, FL" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_0%_5%/0.95)] via-[hsl(0_0%_5%/0.85)] to-[hsl(0_0%_5%/0.6)]" />
        </div>
        <div className="section-container relative z-10 py-16 md:py-24" ref={heroRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="hero-anim highlight-badge mb-4 inline-block">
                🏆 {t("Orlando's #1 PDR Specialist", "Especialista #1 en PDR de Orlando")}
              </span>
              <h1 className="hero-anim text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] font-heading uppercase">
                {t("Paintless Dent Repair,", "Reparación de Abolladuras,")}
                <br />
                <span className="text-primary">{t("Hail Damage", "Daño por Granizo")}</span>
                <br />
                {t("& Collision Repair", "y Reparación de Colisión")}
              </h1>
              <p className="hero-anim text-lg text-white/70 mb-8 max-w-xl">
                {t(
                  "We've fixed worse. Promise. Restore your vehicle to factory-perfect condition — no repainting, no fillers, no body shop drama.",
                  "Hemos arreglado peores. Prometido. Restaure su vehículo a condiciones de fábrica — sin pintura, sin rellenos, sin drama."
                )}
              </p>
              <div className="hero-anim flex flex-wrap gap-4">
                <Link to="/contact" className="btn-hero-primary uppercase tracking-wider">
                  {t("Get Free Estimate", "Cotización Gratis")}
                </Link>
                <Link to="/before-after" className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 uppercase tracking-wider">
                  {t("See Our Results", "Ver Resultados")}
                </Link>
              </div>
              <p className="hero-anim text-sm text-white/50 mt-6">
                🇪🇸 {t("Hablamos Español — We speak Spanish!", "Hablamos Español — ¡Atención en tu idioma!")}
              </p>
            </div>

            {/* Right — Quote Form */}
            <div className="hero-anim">
              <div className="bg-card rounded-xl p-6 shadow-2xl shadow-black/40 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-1 font-heading">
                  {t("Get Your Free Estimate", "Obtenga su Cotización Gratis")}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("Quick, easy — no obligation.", "Rápido, fácil — sin compromiso.")}
                </p>
                <QuoteForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-secondary border-b border-border">
        <div className="section-container py-5 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            <span className="text-sm font-semibold text-foreground ml-1">{t("5.0 Rated", "5.0 Calificación")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("Satisfaction Guaranteed", "Satisfacción Garantizada")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("Same-Day Service", "Servicio el Mismo Día")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("35+ Years Experience", "35+ Años de Experiencia")}</span>
          </div>
          <span className="highlight-badge">🇪🇸 Hablamos Español</span>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-charcoal">
        <div className="section-container" ref={counterRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="counter-item text-center"><AnimatedCounter end={35} suffix="+" label={t("Years of Experience", "Años de Experiencia")} /></div>
            <div className="counter-item text-center"><AnimatedCounter end={5000} suffix="+" label={t("Dents Repaired", "Abolladuras Reparadas")} /></div>
            <div className="counter-item text-center"><AnimatedCounter end={25} suffix="+" label={t("Cities Served", "Ciudades Atendidas")} /></div>
            <div className="counter-item text-center"><AnimatedCounter end={100} suffix="%" label={t("Satisfaction Rate", "Satisfacción")} /></div>
          </div>
        </div>
      </section>

      {/* Video Assistant Section — Portrait layout */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — headline + trust */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading uppercase">
                {t("How Can We Help You?", "¿Cómo Podemos Ayudarte?")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t(
                  "Watch a quick intro, then choose your path. Whether you need dent repair or want to learn PDR, we've got you covered.",
                  "Mire una introducción rápida y elija su camino. Ya sea que necesite reparación o quiera aprender PDR, estamos aquí para ayudar."
                )}
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  t("✓ Free estimates within minutes", "✓ Presupuestos gratis en minutos"),
                  t("✓ 35+ years of experience", "✓ Más de 35 años de experiencia"),
                  t("✓ Hablamos Español", "✓ Hablamos Español"),
                ].map((item) => (
                  <li key={item} className="text-foreground font-medium">{item}</li>
                ))}
              </ul>

              {/* Form appears here after video choice */}
              {showForm && (
                <div className="animate-fade-up">
                  <div className="bg-card rounded-xl p-6 border border-border shadow-xl shadow-black/20">
                    <h3 className="text-lg font-bold text-foreground mb-4 font-heading">
                      {videoChoice === "quote"
                        ? t("Get Your Free Estimate", "Obtenga su Cotización")
                        : t("Start Your PDR Training", "Comience su Entrenamiento")}
                    </h3>
                    {videoChoice === "quote" ? <QuoteForm compact /> : <TrainingForm />}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Portrait video card */}
            <div className="flex justify-center">
              <div className="w-full max-w-[340px]">
                <VideoAssistant onChoose={handleVideoChoice} onContinue={handleVideoContinue} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading uppercase">
              {t("Our Paintless Dent Repair Services", "Nuestros Servicios de Reparación")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("From minor dings to major hail damage, Dent Master delivers professional PDR solutions.", "Desde abolladuras menores hasta daño por granizo, ofrecemos soluciones profesionales.")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={servicesRef}>
            {services.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="service-card card-elevated group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.heroDescription.slice(0, 120)}...</p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("Learn More", "Ver Más")} <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading uppercase">
              {t("Before & After Results", "Resultados Antes y Después")}
            </h2>
            <p className="text-muted-foreground">{t("See the Dent Master difference — real results from real customers.", "Vea la diferencia — resultados reales de clientes reales.")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={baRef}>
            {[
              { before: beforeDoor, after: afterDoor, label: t("Door Dent Repair", "Reparación de Puerta") },
              { before: beforeHood, after: afterHood, label: t("Hood Dent Repair", "Reparación de Capó") },
              { before: beforeBack, after: afterBack, label: t("Rear Panel Repair", "Reparación Trasera") },
            ].map((item) => (
              <div key={item.label} className="ba-card card-elevated p-0 overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-2 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img src={item.before} alt={`Before ${item.label}`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{t("Before", "Antes")}</span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img src={item.after} alt={`After ${item.label}`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">{t("After", "Después")}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground font-heading">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/before-after" className="btn-secondary">{t("View All Results", "Ver Todos los Resultados")}</Link>
          </div>
        </div>
      </section>

      {/* Dealer Discount */}
      <section className="section-padding bg-charcoal">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center" ref={dealerRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading uppercase">
              {t("Dealership & Fleet Discounts", "Descuentos para Concesionarios")}
            </h2>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">{DEALER_DISCOUNT_TEXT}</p>
            <Link to="/dealerships-fleet" className="btn-hero-primary uppercase tracking-wider">{t("Learn About Fleet Pricing", "Precios para Flotas")}</Link>
          </div>
        </div>
      </section>

      {/* Learn PDR Teaser */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 text-center border border-border shadow-lg shadow-black/20">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading uppercase">
              {t("Want to Learn Paintless Dent Repair?", "¿Quieres Aprender PDR?")}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              {t("Hands-on, in-person PDR training for beginners and intermediate technicians. Start your new career today.", "Entrenamiento práctico y presencial. Comience su nueva carrera hoy.")}
            </p>
            <Link to="/learn-pdr" className="btn-primary uppercase tracking-wider">
              {t("Explore Training Programs", "Ver Programas de Entrenamiento")}
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading uppercase">
              {t("What Our Customers Say", "Lo Que Dicen Nuestros Clientes")}
            </h2>
            <p className="text-muted-foreground">{t("Real reviews from real customers across Central Florida.", "Reseñas reales de clientes en toda la Florida Central.")}</p>
          </div>
          <div className="max-w-5xl mx-auto px-8">
            <ReviewsCarousel />
          </div>
          <div className="text-center mt-8 flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="btn-primary">{t("View Google Reviews", "Ver Reseñas en Google")}</a>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t("View Facebook Reviews", "Ver Reseñas en Facebook")}</a>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading uppercase">
              {t("Service Areas We Cover", "Áreas de Servicio")}
            </h2>
            <p className="text-muted-foreground">{t("Proudly serving Orlando and 25+ cities across Central Florida.", "Sirviendo con orgullo a Orlando y más de 25 ciudades.")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" ref={citiesRef}>
            {topCities.map((c) => (
              <Link key={c.slug} to={`/service-areas/${c.slug}`} className="city-card card-elevated text-center py-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-sm font-semibold text-foreground">{c.city}, FL</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/service-areas" className="btn-secondary">{t("View All Service Areas", "Ver Todas las Áreas")}</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-background" ref={faqRef}>
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center font-heading uppercase">
            {t("Frequently Asked Questions", "Preguntas Frecuentes")}
          </h2>
          <FAQSection faqs={lang === "es" ? homeFaqsEs : homeFaqsEn} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary" ref={ctaRef}>
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-heading uppercase">
            {t("Ready to Remove Those Dents?", "¿Listo para Reparar sus Abolladuras?")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {t("Get a free, no-obligation quote in minutes. Professional PDR by Orlando's most trusted team.", "Obtenga una cotización gratis en minutos. PDR profesional por el equipo más confiable de Orlando.")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-hero bg-white text-primary font-bold hover:bg-white/90 uppercase tracking-wider">
              {t("Get Instant Quote", "Cotización Gratis")}
            </Link>
            <Link to="/learn-pdr" className="btn-hero border-2 border-white text-white hover:bg-white/10 uppercase tracking-wider">
              {t("Learn PDR", "Aprende PDR")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
