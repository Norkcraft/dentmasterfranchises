import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { BUSINESS, DEALER_DISCOUNT_TEXT } from "@/data/constants";

const faqs = [
  { q: "What types of businesses qualify for fleet discounts?", a: "Dealerships, auto lots, wholesalers, fleet management companies, rental car agencies, and businesses with multiple vehicles may all qualify for our professional discount." },
  { q: "How much is the professional discount?", a: "Qualifying clients may receive 10%–20% off our standard pricing, depending on job scope and volume." },
  { q: "Do I need to bring an existing estimate?", a: "Yes, we encourage you to bring your existing paintless dent repair estimate for review. This helps us provide the most competitive pricing." },
  { q: "Can you service our vehicles on-site?", a: "Yes, we offer on-site PDR service at your dealership, lot, or fleet location. This minimizes disruption to your operations." },
  { q: "How fast is turnaround for fleet repairs?", a: "Turnaround depends on the volume and type of damage, but we prioritize fleet clients and can often complete repairs within 1-3 business days." },
  { q: "Do you offer ongoing service agreements?", a: "Yes, we can establish ongoing service arrangements with regular scheduling to keep your inventory and fleet vehicles looking their best." },
];

export default function DealershipsFleetPage() {
  return (
    <>
      <SEOHead
        title="Elite Dealership & Fleet PDR Discounts Orlando, FL | Dent Master Franchise"
        description="Professional PDR discounts for dealerships, auto lots, wholesalers, and fleet clients in Orlando, FL. 10%–20% off with Dent Master Franchise."
        path="/dealerships-fleet"
      />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Dealership & Fleet PDR Services</h1>
          <p className="text-lg text-white/70 max-w-3xl">Professional paintless dent repair for dealerships, auto lots, wholesalers, and fleet clients across Central Florida.</p>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Professional PDR for Business Clients</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Dent Master Franchise is the preferred paintless dent repair provider for dealerships, auto lots, wholesalers, and fleet operators throughout the Orlando metropolitan area and Central Florida. We understand that for commercial clients, vehicle appearance directly impacts sales, customer perception, and business success.</p>
            <p className="text-foreground/80 leading-relaxed mb-4">Our professional PDR service helps dealerships maximize lot vehicle appeal, auto lots prepare inventory for sale, wholesalers increase vehicle value before auction, and fleet managers maintain professional vehicle appearance. We deliver fast, consistent, high-quality results that help our business clients succeed.</p>
          </div>

          <div className="bg-accent/50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">Professional Discount Program</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">{DEALER_DISCOUNT_TEXT}</p>
            <div className="mt-6">
              <Link to="/contact" className="btn-primary">Get Fleet Quote</Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Why Dealerships Choose Dent Master Franchise</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">In the competitive Orlando auto market, every dent on a lot vehicle represents lost value and reduced buyer interest. Traditional body shop repairs are slow, expensive, and leave evidence of work that savvy buyers notice. PDR eliminates all of these concerns.</p>
            <p className="text-foreground/80 leading-relaxed mb-4">Our dealership clients appreciate our fast turnaround — most vehicles are completed same-day — our on-site service that minimizes disruption, our consistent quality across every repair, and our competitive pricing that maximizes their margin on every vehicle. We also provide detailed before-and-after documentation for your records.</p>
            <p className="text-foreground/80 leading-relaxed">Whether you need a single vehicle repaired or regular service for your entire lot, Dent Master Franchise delivers the quality, speed, and value that commercial clients demand. Hablamos Español — our team is ready to serve your diverse customer base.</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">Fleet Vehicle Maintenance</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Fleet vehicles take a beating. Daily use, parking in commercial areas, and highway driving all lead to accumulating dents and dings that diminish your company's professional image. Regular PDR maintenance keeps your fleet looking sharp, projects professionalism to your customers, and protects your vehicle investment.</p>
            <p className="text-foreground/80 leading-relaxed">We offer flexible scheduling, volume pricing, and priority service for fleet clients. Our mobile technicians can service your vehicles at your facility, minimizing downtime and maximizing convenience. Contact us to discuss a maintenance program tailored to your fleet's needs.</p>
          </div>

          <div className="mb-12">
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
