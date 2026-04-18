"use client";

import { useEffect, useRef } from "react";
import QuoteForm from "@/components/QuoteForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUSINESS } from "@/data/constants";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useScrollReveal<HTMLDivElement>({ childSelector: ".contact-card", stagger: 0.1, y: 20, x: 20 });
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
      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t(
              "Get a Paintless Dent Repair Quote in Orlando in Minutes",
              "Obtenga una cotización de reparación sin pintura en Orlando en minutos"
            )}
          </h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">
            {t(
              "Upload photos, share a few details, and get clear pricing for paintless dent repair — no pressure and no repainting when your factory paint is intact.",
              "Suba fotos, comparta algunos detalles y reciba precios claros para reparación sin pintura — sin presión y sin repintar cuando la pintura esté intacta."
            )}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
                {t("Submit Your Quote Request", "Envíe su Solicitud de Cotización")}
              </h2>
              <QuoteForm />
            </div>
            <div ref={cardsRef}>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
                {t("Other Ways to Reach Us", "Otras Formas de Contactarnos")}
              </h2>
              <div className="space-y-6">
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">{t("Call Us", "Llámenos")}</h3>
                    <a href={BUSINESS.phoneHref} className="text-primary hover:underline">{BUSINESS.phone}</a>
                  </div>
                </div>
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">{t("Email Us", "Escríbanos")}</h3>
                    <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a>
                  </div>
                </div>
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">WhatsApp</h3>
                    <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {t("Message Us for a Faster Quote", "Envíenos un Mensaje y Cotice Más Rápido")}
                    </a>
                  </div>
                </div>
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">{t("Location", "Ubicación")}</h3>
                    <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {t("Get Directions on Google Maps", "Ver Ruta en Google Maps")}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">{BUSINESS.address}</p>
                  </div>
                </div>
                <div className="highlight-badge text-sm">{t("Hablamos Español — Spanish support available", "Hablamos Español — Atención en español")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
