import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessJsonLd, FAQJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BUSINESS, DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { Shield, Users, Award, Heart } from "lucide-react";

const faqs = [
  { q: "What is Dent Master Franchise?", a: "Dent Master Franchise is Orlando's leading paintless dent repair company, specializing in hail damage repair, door ding removal, collision repair, and fender repair — all without repainting." },
  { q: "How long has Dent Master Franchise been in business?", a: "We've been serving Central Florida for years, building a reputation for excellence, honesty, and outstanding results in the paintless dent repair industry." },
  { q: "Are your technicians certified?", a: "Yes, all our PDR technicians are professionally trained and certified with years of hands-on experience repairing thousands of vehicles." },
  { q: "Do you offer training for new technicians?", a: "Yes! We offer in-person PDR training for beginners and intermediate technicians. Daily, weekly, and monthly options are available." },
  { q: "What areas do you serve?", a: "We serve Orlando and 25+ cities across Central Florida, including Kissimmee, Winter Park, Sanford, Lake Mary, Oviedo, and many more." },
  { q: "Do you provide Spanish-language support?", a: "¡Sí! Hablamos Español. Our team includes Spanish-speaking staff ready to assist you with any service needs." },
];

const values = [
  { icon: Shield, title: "Quality Guaranteed", desc: "Every repair backed by our satisfaction guarantee. We don't stop until it's perfect." },
  { icon: Users, title: "Customer First", desc: "Transparent pricing, honest assessments, and clear communication every step of the way." },
  { icon: Award, title: "Certified Experts", desc: "Our technicians are trained professionals with thousands of successful repairs." },
  { icon: Heart, title: "Community Driven", desc: "Proudly serving Orlando's diverse community. Hablamos Español." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useScrollReveal<HTMLDivElement>({ childSelector: ".value-card", stagger: 0.1, y: 30, scale: 0.95 });
  const counterRef = useScrollReveal<HTMLDivElement>({ childSelector: ".counter-item", stagger: 0.15, y: 30 });
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
        title="Leading Trusted PDR Experts — About Dent Master Franchise Orlando, FL"
        description="Learn about Dent Master Franchise, Orlando's most trusted paintless dent repair company. Certified technicians, honest pricing, and guaranteed results."
        path="/about"
      />
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">About Dent Master Franchise</h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl">Orlando's most trusted paintless dent repair company — delivering flawless results with certified expertise and honest, transparent pricing.</p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section-padding bg-background">
        <div className="section-container" ref={valuesRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="value-card card-elevated text-center group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted">
        <div className="section-container" ref={counterRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="counter-item"><AnimatedCounter end={5000} suffix="+" label="Vehicles Repaired" /></div>
            <div className="counter-item"><AnimatedCounter end={25} suffix="+" label="Cities Served" /></div>
            <div className="counter-item"><AnimatedCounter end={100} suffix="%" label="Satisfaction Rate" /></div>
            <div className="counter-item"><AnimatedCounter end={5} suffix=".0" label="Star Rating" /></div>
          </div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl" ref={contentRef}>
          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Orlando's Premier Paintless Dent Repair Team</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Dent Master Franchise was founded with a simple mission: to provide Orlando and Central Florida with the highest quality paintless dent repair at fair, transparent prices. We believe every vehicle owner deserves access to professional dent removal that preserves their factory finish, saves them money, and delivers results that exceed expectations.</p>
            <p className="text-foreground/80 leading-relaxed mb-4">Our team of certified PDR technicians brings years of hands-on experience to every repair. From single door dings to extensive hail damage, we approach each job with the same commitment to precision and customer satisfaction. We've repaired thousands of vehicles across Central Florida, earning a 5-star reputation and the trust of individual customers, dealerships, and fleet managers alike.</p>
            <p className="text-foreground/80 leading-relaxed">What sets Dent Master Franchise apart isn't just our technical skill — it's our dedication to the customer experience. We provide honest assessments, transparent pricing with no hidden fees, and clear communication throughout the repair process. If PDR isn't the right solution for your damage, we'll tell you honestly and help you find the best alternative. Your trust matters more than any single repair.</p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Why We're Trusted Across Central Florida</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Our reputation is built on consistent quality and genuine customer care. We treat every vehicle as if it were our own, and every customer as a neighbor — because in Central Florida, you are. Our technicians are not only skilled craftsmen but also friendly, professional, and respectful of your time and property.</p>
            <p className="text-foreground/80 leading-relaxed mb-4">We serve Orlando, Kissimmee, Winter Park, Altamonte Springs, Sanford, Lake Mary, Oviedo, Apopka, Winter Garden, Clermont, and 15+ additional cities throughout Central Florida. Our mobile service brings professional PDR directly to your location, making dent repair convenient and hassle-free.</p>
            <p className="text-foreground/80 leading-relaxed">Hablamos Español — we're proud to serve Central Florida's diverse community with Spanish-speaking support available for all customers. No matter your language preference, you'll receive the same outstanding service and results.</p>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Our Commitment to Excellence</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Every repair at Dent Master Franchise comes with our satisfaction guarantee. We use the latest PDR tools, techniques, and training to ensure every dent is removed to the highest standard. Our quality control process includes final inspection under specialized LED lighting to verify a flawless result before returning your vehicle.</p>
            <p className="text-foreground/80 leading-relaxed mb-4">We also invest in the future of the PDR industry through our training program. We offer hands-on PDR training for beginners and intermediate technicians, helping aspiring professionals develop the skills they need to succeed in this growing field. Our training covers everything from basic dent removal to advanced techniques for complex repairs.</p>
            <p className="text-foreground/80 leading-relaxed">Whether you need a single dent removed or comprehensive hail damage repair, Dent Master Franchise is here to help. We're more than a repair shop — we're your partners in keeping your vehicle looking its best. Contact us today for a free estimate or to learn more about our services and training programs.</p>
          </div>

          <div className="content-section bg-accent/50 rounded-xl p-6 mb-12 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-foreground mb-2 font-heading">Dealership & Fleet Services</h3>
            <p className="text-sm text-foreground/80">{DEALER_DISCOUNT_TEXT}</p>
            <Link to="/dealerships-fleet" className="text-sm font-semibold text-primary mt-3 inline-block hover:underline">Learn about fleet services →</Link>
          </div>

          <div className="content-section mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Frequently Asked Questions</h2>
            <FAQSection faqs={faqs} />
          </div>

          <div className="text-center">
            <Link to="/contact" className="btn-primary">Get Instant Quote</Link>
            <span className="mx-3 text-muted-foreground">or</span>
            <Link to="/learn-pdr" className="btn-secondary">Learn PDR</Link>
          </div>
        </div>
      </article>
    </>
  );
}
