import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { services } from "@/data/services";
import { Wrench, Zap, Car, Shield } from "lucide-react";

const icons = [Wrench, Zap, Car, Shield, Wrench];

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Premier PDR Services Orlando, FL | Dent Master Franchise"
        description="Explore all paintless dent repair services from Dent Master Franchise in Orlando, FL. Hail damage, dent removal, collision repair, and more."
        path="/services"
      />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Our PDR Services</h1>
          <p className="text-lg text-white/70 max-w-2xl">Comprehensive paintless dent repair solutions for every type of vehicle damage.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => {
              const Icon = icons[i];
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="card-elevated group hover:shadow-xl hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 font-heading">{s.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{s.heroDescription}</p>
                  <span className="text-sm font-semibold text-primary">Learn More →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
