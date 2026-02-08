import { useEffect, useRef } from "react";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BUSINESS } from "@/data/constants";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useScrollReveal<HTMLDivElement>({ childSelector: ".contact-card", stagger: 0.1, y: 20, x: 20 });

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
        title="Get Instant Quote — Contact Dent Master Franchise Orlando, FL"
        description="Contact Dent Master Franchise for a free paintless dent repair quote in Orlando, FL. Call, email, or submit your request online. Fast response guaranteed."
        path="/contact"
      />
      <LocalBusinessJsonLd />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Get Your Instant Quote</h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">Tell us about your dent and we'll provide a fast, accurate estimate. Most quotes within minutes.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Submit Your Quote Request</h2>
              <QuoteForm />
            </div>
            <div ref={cardsRef}>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Other Ways to Reach Us</h2>
              <div className="space-y-6">
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">Call Us</h3>
                    <a href={BUSINESS.phoneHref} className="text-primary hover:underline">{BUSINESS.phone}</a>
                  </div>
                </div>
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">Email Us</h3>
                    <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a>
                  </div>
                </div>
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">WhatsApp</h3>
                    <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Message us on WhatsApp</a>
                  </div>
                </div>
                <div className="contact-card card-elevated flex items-start gap-4 group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading">Location</h3>
                    <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on Google Maps</a>
                    <p className="text-sm text-muted-foreground mt-1">Orlando, FL</p>
                  </div>
                </div>
                <div className="highlight-badge text-sm">🇪🇸 Hablamos Español — Spanish-speaking support available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
