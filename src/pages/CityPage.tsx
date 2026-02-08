import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { getCityBySlug } from "@/data/cities";
import { BUSINESS } from "@/data/constants";

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug || "");

  if (!city) {
    return <div className="section-container section-padding text-center"><h1 className="text-2xl font-bold font-heading">City not found</h1></div>;
  }

  return (
    <>
      <SEOHead title={city.metaTitle} description={city.metaDescription} path={`/service-areas/${city.slug}`} />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">{city.h1}</h1>
          <p className="text-lg text-white/70 max-w-3xl mb-8">{city.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-hero-primary">Get Instant Quote</Link>
            <a href={BUSINESS.phoneHref} className="btn-hero bg-white/10 text-white border-2 border-white/20 hover:bg-white/20">{BUSINESS.phone}</a>
          </div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          {city.sections.map((s, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">{s.heading}</h2>
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
