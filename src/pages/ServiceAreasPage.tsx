import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { cities } from "@/data/cities";
import { MapPin } from "lucide-react";

export default function ServiceAreasPage() {
  return (
    <>
      <SEOHead
        title="Service Areas — Paintless Dent Repair Central Florida | Dent Master Franchise"
        description="Dent Master Franchise serves 25+ cities across Central Florida with professional paintless dent repair. Find your city and get a free quote."
        path="/service-areas"
      />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Our Service Areas</h1>
          <p className="text-lg text-white/70 max-w-2xl">Serving Orlando and 25+ cities across Central Florida with expert paintless dent repair.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cities.map((c) => (
              <Link key={c.slug} to={`/service-areas/${c.slug}`} className="card-elevated text-center py-5 hover:border-primary/30 hover:shadow-lg transition-all group">
                <MapPin className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-foreground">{c.city}, FL</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/contact" className="btn-primary">Get Instant Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
