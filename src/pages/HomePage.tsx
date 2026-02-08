import { Link } from "react-router-dom";
import { Shield, Clock, Award, Star, ChevronRight, Phone, Wrench, Zap, Car, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ReviewCard from "@/components/ReviewCard";
import FAQSection from "@/components/FAQSection";
import QuoteForm from "@/components/QuoteForm";
import { reviews } from "@/data/reviews";
import { BUSINESS, TRAINING_PRICING, DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import beforeDoor from "@/assets/before-after/door-before.jpeg";
import afterDoor from "@/assets/before-after/door-after.jpeg";
import beforeHood from "@/assets/before-after/hood-before.jpeg";
import afterHood from "@/assets/before-after/hood-after.jpeg";
import beforeBack from "@/assets/before-after/grey-back-before.jpeg";
import afterBack from "@/assets/before-after/grey-back-after.jpeg";

const serviceIcons = [Wrench, Zap, Car, Shield, Wrench];

const topCities = cities.slice(0, 6);

const homeFaqs = [
  { q: "How much does paintless dent repair cost in Orlando?", a: "Costs vary by dent size and location. Small door dings start at $75-$150. Contact us for a free, no-obligation estimate." },
  { q: "Do you offer mobile dent repair service?", a: "Yes! We provide mobile PDR throughout Orlando and Central Florida. We come to your home, office, or dealership." },
  { q: "How long does PDR take?", a: "Most single-dent repairs take 30-90 minutes. Hail damage or multiple dents may take 1-5 days." },
  { q: "Do you work with insurance companies?", a: "Yes, we work with all major insurance providers and can help you file and manage your claim." },
  { q: "Is paintless dent repair permanent?", a: "Absolutely. PDR restores the metal to its original shape permanently. There's no filler to crack or shrink." },
  { q: "Do you offer service in Spanish?", a: "¡Sí! Hablamos Español. Our team includes Spanish-speaking staff ready to assist you." },
];

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="#1 Elite Paintless Dent Repair Orlando, FL | Dent Master Franchise"
        description="Paintless dent repair in Orlando, FL by a trusted, top-rated local expert. Fast, professional results with no repainting. Get a free quote today from Dent Master Franchise."
        path="/"
      />

      {/* Hero */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-primary/20" />
        <div className="section-container relative z-10 py-20 md:py-32">
          <div className="max-w-3xl">
            <span className="highlight-badge mb-4 inline-block">🏆 Orlando's #1 PDR Specialist</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Elite Paintless Dent Repair in <span className="text-primary">Orlando, FL</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              Restore your vehicle to factory-perfect condition — no repainting, no fillers, no hassle. Trusted by thousands of Central Florida drivers, dealerships, and fleet managers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-hero-primary">Get Instant Quote</Link>
              <Link to="/learn-pdr" className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20">Learn PDR</Link>
              <a href={BUSINESS.phoneHref} className="btn-hero bg-transparent text-white border-2 border-white/30 hover:bg-white/10">
                <Phone className="w-5 h-5" /> {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-surface border-b border-border">
        <div className="section-container py-6 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            <span className="text-sm font-semibold text-foreground ml-1">5.0 Rated</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Satisfaction Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Same-Day Service</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Certified Technicians</span>
          </div>
          <span className="highlight-badge">🇪🇸 Hablamos Español</span>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Our Paintless Dent Repair Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From minor dings to major hail damage, Dent Master Franchise delivers professional PDR solutions across Central Florida.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="card-elevated group hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.heroDescription.slice(0, 120)}...</p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After Preview */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Before & After Results</h2>
            <p className="text-muted-foreground">See the Dent Master difference — real results from real customers in Orlando, FL.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { before: beforeDoor, after: afterDoor, label: "Door Dent Repair" },
              { before: beforeHood, after: afterHood, label: "Hood Dent Repair" },
              { before: beforeBack, after: afterBack, label: "Rear Panel Repair" },
            ].map((item) => (
              <div key={item.label} className="card-elevated p-0 overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src={item.before} alt={`Before ${item.label} in Orlando, FL by Dent Master Franchise`} className="w-full h-48 object-cover" />
                    <span className="absolute bottom-2 left-2 bg-charcoal/80 text-white text-xs px-2 py-1 rounded">Before</span>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt={`After ${item.label} in Orlando, FL by Dent Master Franchise`} className="w-full h-48 object-cover" />
                    <span className="absolute bottom-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">After</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground font-heading">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/before-after" className="btn-secondary">View All Results</Link>
          </div>
        </div>
      </section>

      {/* Dealer Discount */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-charcoal rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">Dealership & Fleet Discounts</h2>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">{DEALER_DISCOUNT_TEXT}</p>
            <Link to="/dealerships-fleet" className="btn-hero-primary">Learn About Fleet Pricing</Link>
          </div>
        </div>
      </section>

      {/* Training Pricing */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Learn Paintless Dent Repair</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Hands-on, in-person PDR training for beginners and intermediate technicians. No experience required.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TRAINING_PRICING.map((tier) => (
              <div key={tier.label} className="card-elevated text-center hover:shadow-xl hover:border-primary/30 transition-all">
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{tier.label}</h3>
                <p className="text-4xl font-bold text-primary mb-1 font-heading">{tier.price}</p>
                <p className="text-sm text-muted-foreground mb-6">{tier.unit}</p>
                <Link to="/learn-pdr" className="btn-primary w-full justify-center">Learn PDR</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">What Our Customers Say</h2>
            <p className="text-muted-foreground">Real reviews from real customers across Central Florida.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
          <div className="text-center mt-8 flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="btn-primary">View Google Reviews</a>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">View Facebook Reviews</a>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Service Areas We Cover</h2>
            <p className="text-muted-foreground">Proudly serving Orlando and 25+ cities across Central Florida.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {topCities.map((c) => (
              <Link key={c.slug} to={`/service-areas/${c.slug}`} className="card-elevated text-center py-4 hover:border-primary/30 transition-all">
                <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-sm font-semibold text-foreground">{c.city}, FL</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/service-areas" className="btn-secondary">View All Service Areas</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center font-heading">Frequently Asked Questions</h2>
          <FAQSection faqs={homeFaqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-heading">Ready to Remove Those Dents?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote in minutes. Professional PDR by Orlando's most trusted team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-hero bg-white text-primary font-bold hover:bg-white/90">Get Instant Quote</Link>
            <Link to="/learn-pdr" className="btn-hero border-2 border-white text-white hover:bg-white/10">Learn PDR</Link>
          </div>
        </div>
      </section>
    </>
  );
}
