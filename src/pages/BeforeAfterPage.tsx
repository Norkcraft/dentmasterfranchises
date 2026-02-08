import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import beforeDoor from "@/assets/before-after/door-before.jpeg";
import afterDoor from "@/assets/before-after/door-after.jpeg";
import beforeHood from "@/assets/before-after/hood-before.jpeg";
import afterHood from "@/assets/before-after/hood-after.jpeg";
import beforeBack from "@/assets/before-after/grey-back-before.jpeg";
import afterBack from "@/assets/before-after/grey-back-after.jpeg";
import beforeBack2 from "@/assets/before-after/back-before.jpeg";
import afterBack2 from "@/assets/before-after/back-after.jpeg";

const gallery = [
  { before: beforeDoor, after: afterDoor, label: "Door Dent Repair", alt: "Door dent repair in Orlando, FL by Dent Master Franchise" },
  { before: beforeHood, after: afterHood, label: "Hood Dent Repair", alt: "Hood dent repair in Orlando, FL by Dent Master Franchise" },
  { before: beforeBack, after: afterBack, label: "Rear Panel Repair", alt: "Rear panel dent repair in Orlando, FL by Dent Master Franchise" },
  { before: beforeBack2, after: afterBack2, label: "Trunk Lid Repair", alt: "Trunk lid dent repair in Orlando, FL by Dent Master Franchise" },
];

export default function BeforeAfterPage() {
  return (
    <>
      <SEOHead
        title="Before & After PDR Results Orlando, FL | Dent Master Franchise"
        description="See real before and after paintless dent repair results from Dent Master Franchise in Orlando, FL. Professional results with no repainting."
        path="/before-after"
      />

      <section className="bg-charcoal">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Before & After Gallery</h1>
          <p className="text-lg text-white/70 max-w-2xl">Real results from real repairs — see the Dent Master Franchise difference.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gallery.map((item) => (
              <div key={item.label} className="card-elevated p-0 overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src={item.before} alt={`Before: ${item.alt}`} className="w-full h-56 object-cover" />
                    <span className="absolute bottom-2 left-2 bg-charcoal/80 text-white text-xs px-2 py-1 rounded">Before</span>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt={`After: ${item.alt}`} className="w-full h-56 object-cover" />
                    <span className="absolute bottom-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">After</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground font-heading">{item.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Paintless dent repair — no repainting, no fillers.</p>
                </div>
              </div>
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
