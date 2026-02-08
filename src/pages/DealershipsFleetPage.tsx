import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { FAQJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BUSINESS, DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { Building2, Clock, BadgePercent, Truck } from "lucide-react";

const faqs = [
  { q: "What types of businesses qualify for fleet discounts?", a: "Dealerships, auto lots, wholesalers, fleet management companies, rental car agencies, and businesses with multiple vehicles may all qualify for our professional discount." },
  { q: "How much is the professional discount?", a: "Qualifying clients may receive 10%–20% off our standard pricing, depending on job scope and volume." },
  { q: "Do I need to bring an existing estimate?", a: "Yes, we encourage you to bring your existing paintless dent repair estimate for review. This helps us provide the most competitive pricing." },
  { q: "Can you service our vehicles on-site?", a: "Yes, we offer on-site PDR service at your dealership, lot, or fleet location. This minimizes disruption to your operations." },
  { q: "How fast is turnaround for fleet repairs?", a: "Turnaround depends on the volume and type of damage, but we prioritize fleet clients and can often complete repairs within 1-3 business days." },
  { q: "Do you offer ongoing service agreements?", a: "Yes, we can establish ongoing service arrangements with regular scheduling to keep your inventory and fleet vehicles looking their best." },
];

const benefits = [
  { icon: BadgePercent, title: "10%–20% Discount", desc: "Professional volume pricing for qualifying business clients." },
  { icon: Clock, title: "Same-Day Service", desc: "Priority turnaround to minimize downtime on your lot." },
  { icon: Truck, title: "On-Site Repairs", desc: "We come to your dealership, lot, or fleet facility." },
  { icon: Building2, title: "Ongoing Contracts", desc: "Flexible scheduling and regular maintenance agreements." },
];

export default function DealershipsFleetPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useScrollReveal<HTMLDivElement>({ childSelector: ".benefit-card", stagger: 0.1, y: 30, scale: 0.95 });
  const contentRef = useScrollReveal<HTMLDivElement>({ childSelector: ".content-section", stagger: 0.12, y: 30 });

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
        title="Elite Dealership & Fleet PDR Discounts Orlando, FL | Dent Master Franchise"
        description="Professional PDR discounts for dealerships, auto lots, wholesalers, and fleet clients in Orlando, FL. 10%–20% off with Dent Master Franchise."
        path="/dealerships-fleet"
      />
      <ServiceJsonLd name="Dealership & Fleet PDR Services" description="Professional paintless dent repair discounts for dealerships, auto lots, wholesalers, and fleet clients in Orlando, FL." url="/dealerships-fleet" />
      <FAQJsonLd faqs={faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Dealership & Fleet PDR Services</h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl">Professional paintless dent repair for dealerships, auto lots, wholesalers, and fleet clients across Central Florida.</p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="section-padding bg-background">
        <div className="section-container" ref={benefitsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="benefit-card card-elevated text-center group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <b.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <article className="section-padding bg-muted">
        <div className="section-container max-w-4xl" ref={contentRef}>
          <div className="content-section bg-accent/50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">Professional Discount Program</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">{DEALER_DISCOUNT_TEXT}</p>
            <div className="mt-6">
              <Link to="/contact" className="btn-primary">Get Fleet Quote</Link>
            </div>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Professional PDR for Business Clients</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Dent Master Franchise is the preferred paintless dent repair provider for dealerships, auto lots, wholesalers, and fleet operators throughout the Orlando metropolitan area and Central Florida. We understand that for commercial clients, vehicle appearance directly impacts sales, customer perception, and business success.</p>
            <p className="text-foreground/80 leading-relaxed">Our professional PDR service helps dealerships maximize lot vehicle appeal, auto lots prepare inventory for sale, wholesalers increase vehicle value before auction, and fleet managers maintain professional vehicle appearance. We deliver fast, consistent, high-quality results that help our business clients succeed.</p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Why Dealerships Choose Dent Master Franchise</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">In the competitive Orlando auto market, every dent on a lot vehicle represents lost value and reduced buyer interest. Traditional body shop repairs are slow, expensive, and leave evidence of work that savvy buyers notice. PDR eliminates all of these concerns.</p>
            <p className="text-foreground/80 leading-relaxed mb-4">Our dealership clients appreciate our fast turnaround — most vehicles are completed same-day — our on-site service that minimizes disruption, our consistent quality across every repair, and our competitive pricing that maximizes their margin on every vehicle.</p>
            <p className="text-foreground/80 leading-relaxed">Whether you need a single vehicle repaired or regular service for your entire lot, Dent Master Franchise delivers the quality, speed, and value that commercial clients demand. Hablamos Español — our team is ready to serve your diverse customer base.</p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Fleet Vehicle Maintenance</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Fleet vehicles take a beating. Daily use, parking in commercial areas, and highway driving all lead to accumulating dents and dings that diminish your company's professional image. Regular PDR maintenance keeps your fleet looking sharp, projects professionalism to your customers, and protects your vehicle investment.</p>
            <p className="text-foreground/80 leading-relaxed">We offer flexible scheduling, volume pricing, and priority service for fleet clients. Our mobile technicians can service your vehicles at your facility, minimizing downtime and maximizing convenience. Contact us to discuss a maintenance program tailored to your fleet's needs.</p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Frequently Asked Questions</h2>
            <FAQSection faqs={faqs} />
          </div>

          <div className="text-center">
            <Link to="/contact" className="btn-primary">Get Fleet Quote</Link>
            <span className="mx-3 text-muted-foreground">or call</span>
            <a href={BUSINESS.phoneHref} className="btn-secondary">{BUSINESS.phone}</a>
          </div>
        </div>
      </article>
    </>
  );
}
