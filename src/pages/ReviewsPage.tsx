import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import ReviewCard from "@/components/ReviewCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { reviews } from "@/data/reviews";
import { BUSINESS } from "@/data/constants";

export default function ReviewsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useScrollReveal<HTMLDivElement>({ childSelector: ".review-item", stagger: 0.1, y: 30 });

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
        title="Top-Rated Customer Reviews — Dent Master Franchise Orlando, FL"
        description="Read real customer reviews for Dent Master Franchise in Orlando, FL. 5-star rated paintless dent repair service trusted by Central Florida drivers."
        path="/reviews"
      />
      <LocalBusinessJsonLd />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Customer Reviews</h1>
          <p className="hero-anim text-lg text-white/70 max-w-2xl">Real reviews from real customers — see why Orlando trusts Dent Master Franchise for paintless dent repair.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" ref={gridRef}>
            {reviews.map((r) => (
              <div key={r.name} className="review-item">
                <ReviewCard {...r} />
              </div>
            ))}
          </div>
          <div className="text-center flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="btn-primary">View Google Reviews</a>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">View Facebook Reviews</a>
          </div>
          <div className="text-center mt-8">
            <Link to="/contact" className="btn-secondary">Get Your Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
