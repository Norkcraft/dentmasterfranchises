import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { ServiceJsonLd, FAQJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getCityBySlug } from "@/data/cities";
import { BUSINESS } from "@/data/constants";

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug || "");
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useScrollReveal<HTMLDivElement>({ childSelector: ".content-section", stagger: 0.12, y: 30 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !heroRef.current) return;
    const els = heroRef.current.querySelectorAll(".hero-anim");
    gsap.set(els, { opacity: 0, y: 25 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 });
  }, [slug]);

  if (!city) {
    return <div className="section-container section-padding text-center"><h1 className="text-2xl font-bold font-heading">City not found</h1></div>;
  }

  return (
    <>
      <SEOHead title={city.metaTitle} description={city.metaDescription} path={`/service-areas/${city.slug}`} />
      <ServiceJsonLd name={`Paintless Dent Repair in ${city.city}, FL`} description={city.intro} url={`/service-areas/${city.slug}`} />
      <FAQJsonLd faqs={city.faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">{city.h1}</h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl mb-8">{city.intro}</p>
          <div className="hero-anim flex flex-wrap gap-4">
            <Link to="/contact" className="btn-hero-primary">Get Instant Quote</Link>
            <a href={BUSINESS.phoneHref} className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20">{BUSINESS.phone}</a>
          </div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl" ref={sectionsRef}>
          {city.sections.map((s, i) => (
            <div key={i} className="content-section mb-12 group">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading group-hover:text-primary transition-colors duration-300">{s.heading}</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Frequently Asked Questions About PDR in {city.city}</h2>
            <FAQSection faqs={city.faqs} />
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-primary">Get Instant Quote</Link>
            <span className="mx-3 text-muted-foreground">or</span>
            <Link to="/learn-pdr" className="btn-secondary">Learn PDR</Link>
          </div>
        </div>
      </article>
    </>
  );
}
