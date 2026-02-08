import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cities } from "@/data/cities";
import { MapPin } from "lucide-react";

export default function ServiceAreasPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useScrollReveal<HTMLDivElement>({ childSelector: ".city-card", stagger: 0.04, y: 20, scale: 0.95 });

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
        title="Service Areas — Paintless Dent Repair Central Florida | Dent Master Franchise"
        description="Dent Master Franchise serves 25+ cities across Central Florida with professional paintless dent repair. Find your city and get a free quote."
        path="/service-areas"
      />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Our Service Areas</h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">Serving Orlando and 25+ cities across Central Florida with expert paintless dent repair.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" ref={gridRef}>
            {cities.map((c) => (
              <Link key={c.slug} to={`/service-areas/${c.slug}`} className="city-card card-elevated text-center py-5 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <MapPin className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-semibold text-foreground">{c.city}, FL</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/contact" className="btn-primary">Get Instant Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
