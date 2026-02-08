import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SEOHead from "@/components/SEOHead";
import { FAQJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import TrainingForm from "@/components/TrainingForm";
import FAQSection from "@/components/FAQSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BUSINESS, TRAINING_PRICING } from "@/data/constants";
import { BookOpen, Wrench, Award, Target } from "lucide-react";

const faqs = [
  { q: "Do I need prior experience for PDR training?", a: "No! Our training program is designed for total beginners with no experience, as well as intermediate technicians looking to improve their skills." },
  { q: "What does the training include?", a: "Our hands-on training covers PDR fundamentals, tool usage, damage assessment, repair techniques, business basics, and advanced methods for complex repairs." },
  { q: "Where is training held?", a: "Training is conducted in-person at our Orlando, FL facility with real vehicles and professional-grade tools." },
  { q: "Which training option should I choose?", a: "Daily training is great for introductions. Weekly training provides solid foundations. Monthly training offers the most comprehensive skill development for career-ready preparation." },
  { q: "What tools do I need?", a: "All tools and materials are provided during training. We'll also advise you on building your own professional toolkit." },
  { q: "Can I start working after training?", a: "Many graduates begin working independently or with established PDR companies after completing our training program." },
];

const features = [
  { icon: BookOpen, title: "Expert Instruction", desc: "Learn from PDR professionals with thousands of repairs under their belt." },
  { icon: Wrench, title: "Hands-On Practice", desc: "Work on real vehicles with professional-grade tools from day one." },
  { icon: Target, title: "All Skill Levels", desc: "Programs for total beginners and intermediate technicians alike." },
  { icon: Award, title: "Career Ready", desc: "Graduate with the skills and confidence to start earning immediately." },
];

export default function LearnPDRPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useScrollReveal<HTMLDivElement>({ childSelector: ".feature-card", stagger: 0.1, y: 30, scale: 0.95 });
  const pricingRef = useScrollReveal<HTMLDivElement>({ childSelector: ".pricing-card", stagger: 0.12, y: 30 });

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
        title="Learn PDR — Professional Training Orlando, FL | Dent Master Franchise"
        description="Learn paintless dent repair with hands-on training from Dent Master Franchise in Orlando, FL. Daily, weekly, and monthly options. No experience required."
        path="/learn-pdr"
      />
      <ServiceJsonLd name="PDR Training" description="Hands-on paintless dent repair training in Orlando, FL. Daily, weekly, and monthly options." url="/learn-pdr" />
      <FAQJsonLd faqs={faqs} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24" ref={heroRef}>
          <h1 className="hero-anim text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Learn Paintless Dent Repair</h1>
          <p className="hero-anim text-lg text-white/70 max-w-3xl">Hands-on, in-person PDR training in Orlando, FL. No experience required. Start your career in one of the fastest-growing automotive repair fields.</p>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="section-container" ref={featuresRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="feature-card card-elevated text-center group hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="section-container max-w-5xl">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Professional PDR Training Program</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Dent Master Franchise offers comprehensive, hands-on paintless dent repair training for aspiring technicians at every skill level. Whether you're a complete beginner with no automotive experience or an intermediate technician looking to sharpen your skills, our training program provides the knowledge, technique, and confidence you need to succeed.</p>
            <p className="text-foreground/80 leading-relaxed mb-4">Our training takes place in-person at our Orlando, FL facility, using real vehicles and professional-grade PDR tools. You'll learn directly from experienced PDR professionals who have repaired thousands of vehicles and understand what it takes to deliver consistent, high-quality results.</p>
            <p className="text-foreground/80 leading-relaxed">The paintless dent repair industry is growing rapidly, with increasing demand from consumers, dealerships, insurance companies, and fleet operators. PDR technicians enjoy excellent earning potential, flexible schedules, and the satisfaction of mastering a skilled trade. Our training program gives you the foundation to build a successful career in this rewarding field.</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" ref={pricingRef}>
            {TRAINING_PRICING.map((tier, i) => (
              <div key={tier.label} className={`pricing-card card-elevated text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${i === 2 ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/30"}`}>
                {i === 2 && <span className="highlight-badge mb-4 inline-block">Most Comprehensive</span>}
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{tier.label}</h3>
                <p className="text-5xl font-bold text-primary mb-1 font-heading">{tier.price}</p>
                <p className="text-sm text-muted-foreground mb-6">{tier.unit}</p>
                <ul className="text-sm text-foreground/80 space-y-2 mb-6 text-left">
                  <li>✓ Hands-on instruction</li>
                  <li>✓ Real vehicle practice</li>
                  <li>✓ Professional tools provided</li>
                  <li>✓ Beginner & intermediate levels</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">What You'll Learn</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Our PDR training curriculum covers everything from the fundamentals to advanced techniques. You'll learn proper damage assessment — understanding which dents can be repaired with PDR and developing accurate repair estimates. Tool selection and usage — mastering the full range of PDR tools including metal rods, whale tails, knockdowns, and glue pulling systems.</p>
            <p className="text-foreground/80 leading-relaxed">Repair technique — developing the precise touch and pressure control needed for flawless repairs. Panel access — learning how to efficiently access the back side of every body panel on different vehicle makes and models. Quality control — using LED reflection boards and other inspection methods to verify perfect results. Business fundamentals — understanding pricing, customer communication, insurance processes, and building a client base.</p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Frequently Asked Questions</h2>
            <FAQSection faqs={faqs} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Enroll in PDR Training</h2>
              <TrainingForm />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Questions?</h2>
              <p className="text-foreground/80 mb-4">Call us directly to discuss training options and availability.</p>
              <a href={BUSINESS.phoneHref} className="btn-primary">{BUSINESS.phone}</a>
              <p className="text-sm text-muted-foreground mt-4">Hablamos Español — Spanish-speaking support available.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
