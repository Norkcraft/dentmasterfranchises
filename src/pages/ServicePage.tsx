import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { getServiceBySlug } from "@/data/services";
import { BUSINESS, DEALER_DISCOUNT_TEXT } from "@/data/constants";
import { cities } from "@/data/cities";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) {
    return <div className="section-container section-padding text-center"><h1 className="text-2xl font-bold font-heading">Service not found</h1></div>;
  }

  return (
    <>
      <SEOHead title={service.metaTitle} description={service.metaDescription} path={`/services/${service.slug}`} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">{service.h1}</h1>
          <p className="text-lg text-white/70 max-w-3xl mb-8">{service.heroDescription}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-hero-primary">Get Instant Quote</Link>
            <a href={BUSINESS.phoneHref} className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20">{BUSINESS.phone}</a>
          </div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          {service.sections.map((s, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">{s.heading}</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}

          <div className="bg-accent/50 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-bold text-foreground mb-2 font-heading">Dealership & Fleet Discount</h3>
            <p className="text-sm text-foreground/80">{DEALER_DISCOUNT_TEXT}</p>
            <Link to="/dealerships-fleet" className="text-sm font-semibold text-primary mt-3 inline-block hover:underline">Learn more →</Link>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Service Areas</h2>
            <div className="flex flex-wrap gap-2">
              {cities.slice(0, 10).map(c => (
                <Link key={c.slug} to={`/service-areas/${c.slug}`} className="text-sm text-primary hover:underline">{c.city}, FL</Link>
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
