import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import { Wrench, Zap, Car, Shield, ChevronRight } from "lucide-react";

const icons = [Wrench, Zap, Car, Shield, Wrench];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useScrollReveal<HTMLDivElement>({ childSelector: ".service-card", stagger: 0.1, y: 30, scale: 0.95 });
  const { t, lang } = useLanguage();

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
        title={t("Premier PDR Services Orlando, FL | Dent Master Franchise", "Servicios PDR Premier Orlando, FL | Dent Master Franchise")}
        description={t("Explore all paintless dent repair services from Dent Master Franchise in Orlando, FL.", "Explore todos los servicios de reparación sin pintura de Dent Master Franchise en Orlando, FL.")}
        path="/services"
      />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t("Our PDR Services", "Nuestros Servicios PDR")}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">
            {t("Comprehensive paintless dent repair solutions for every type of vehicle damage. 35+ years of experience.", "Soluciones integrales de reparación sin pintura para todo tipo de daño vehicular. Más de 35 años de experiencia.")}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={gridRef}>
            {services.map((s, i) => {
              const Icon = icons[i];
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="service-card card-elevated group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 font-heading">{lang === "es" ? s.titleEs : s.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{lang === "es" ? s.heroDescriptionEs : s.heroDescription}</p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("Learn More", "Ver Más")} <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
