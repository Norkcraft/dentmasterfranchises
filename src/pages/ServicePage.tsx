import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { ServiceJsonLd, FAQJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getServiceBySlug } from "@/data/services";
import { BUSINESS, DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { cities } from "@/data/cities";
import beforeDoor from "@/assets/before-after/door-before.jpeg";
import afterDoor from "@/assets/before-after/door-after.jpeg";
import beforeHood from "@/assets/before-after/hood-before.jpeg";
import afterHood from "@/assets/before-after/hood-after.jpeg";
import beforeBack from "@/assets/before-after/grey-back-before.jpeg";
import afterBack from "@/assets/before-after/grey-back-after.jpeg";
import beforeBack2 from "@/assets/before-after/back-before.jpeg";
import afterBack2 from "@/assets/before-after/back-after.jpeg";

const serviceGallery: Record<string, { before: string; after: string; label: string }[]> = {
  "paintless-dent-repair": [
    { before: beforeDoor, after: afterDoor, label: "Door Dent Repair" },
    { before: beforeHood, after: afterHood, label: "Hood Dent Repair" },
  ],
  "hail-damage-repair": [
    { before: beforeBack, after: afterBack, label: "Rear Panel Hail Repair" },
    { before: beforeHood, after: afterHood, label: "Hood Hail Repair" },
  ],
  "minor-dent-ding-removal": [
    { before: beforeDoor, after: afterDoor, label: "Door Ding Removal" },
    { before: beforeBack2, after: afterBack2, label: "Trunk Ding Removal" },
  ],
  "collision-repair": [
    { before: beforeBack2, after: afterBack2, label: "Rear Collision Repair" },
    { before: beforeBack, after: afterBack, label: "Panel Collision Repair" },
  ],
  "fender-repair": [
    { before: beforeDoor, after: afterDoor, label: "Fender Dent Repair" },
    { before: beforeBack2, after: afterBack2, label: "Rear Fender Repair" },
  ],
};

function MiniSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!ref.current || !dragging.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  useEffect(() => {
    const up = () => { dragging.current = false; };
    const move = (e: MouseEvent) => handleMove(e.clientX);
    const touch = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchend", up);
    window.addEventListener("touchmove", touch);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("mousemove", move); window.removeEventListener("touchend", up); window.removeEventListener("touchmove", touch); };
  }, []);

  return (
    <div className="card-elevated p-0 overflow-hidden">
      <div ref={ref} className="relative h-56 md:h-72 cursor-col-resize select-none overflow-hidden" onMouseDown={() => { dragging.current = true; }} onTouchStart={() => { dragging.current = true; }}>
        <img src={after} alt={`After: ${label}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={before} alt={`Before: ${label}`} className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: ref.current ? `${ref.current.offsetWidth}px` : "100%" }} />
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
            <span className="text-charcoal font-bold text-xs">↔</span>
          </div>
        </div>
        <span className="absolute top-2 left-2 bg-charcoal/80 text-white text-xs px-2 py-0.5 rounded">Before</span>
        <span className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-0.5 rounded">After</span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-foreground font-heading">{label}</h3>
        <p className="text-xs text-muted-foreground mt-1">Drag to compare — no repainting, no fillers.</p>
      </div>
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useScrollReveal<HTMLDivElement>({ childSelector: ".content-section", stagger: 0.12, y: 30 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !heroRef.current) return;
    const els = heroRef.current.querySelectorAll(".hero-anim");
    gsap.set(els, { opacity: 0, y: 25 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 });
  }, [slug]);

  if (!service) {
    return <div className="section-container section-padding text-center"><h1 className="text-2xl font-bold font-heading">Service not found</h1></div>;
  }

  return (
    <>
      <SEOHead title={service.metaTitle} description={service.metaDescription} path={`/services/${service.slug}`} />
      <ServiceJsonLd name={service.title} description={service.heroDescription} url={`/services/${service.slug}`} />
      <FAQJsonLd faqs={service.faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">{service.h1}</h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl mb-8">{service.heroDescription}</p>
          <div className="hero-anim flex flex-wrap gap-4">
            <Link to="/contact" className="btn-hero-primary">Get Instant Quote</Link>
            <a href={BUSINESS.phoneHref} className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20">{BUSINESS.phone}</a>
          </div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl" ref={sectionsRef}>
          {service.sections.map((s, i) => (
            <div key={i} className="content-section mb-12 group">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading group-hover:text-primary transition-colors duration-300">{s.heading}</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}

          {serviceGallery[service.slug] && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-heading">See Our {service.title} Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceGallery[service.slug].map((item, i) => (
                  <MiniSlider key={i} {...item} />
                ))}
              </div>
              <div className="text-center mt-4">
                <Link to="/before-after" className="text-sm font-semibold text-primary hover:underline">View full gallery →</Link>
              </div>
            </div>
          )}

          <div className="bg-accent/50 rounded-xl p-6 mb-12 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-foreground mb-2 font-heading">Dealership & Fleet Discount</h3>
            <p className="text-sm text-foreground/80">{DEALER_DISCOUNT_TEXT}</p>
            <Link to="/dealerships-fleet" className="text-sm font-semibold text-primary mt-3 inline-block hover:underline">Learn more →</Link>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Service Areas</h2>
            <div className="flex flex-wrap gap-2">
              {cities.slice(0, 10).map(c => (
                <Link key={c.slug} to={`/service-areas/${c.slug}`} className="text-sm px-3 py-1.5 rounded-full bg-muted text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200">{c.city}, FL</Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Frequently Asked Questions</h2>
            <FAQSection faqs={service.faqs} />
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
