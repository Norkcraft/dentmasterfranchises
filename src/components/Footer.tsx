import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS } from "@/data/constants";
import logo from "@/assets/dent-master-logo.png";

const serviceLinks = [
  { label: "Paintless Dent Repair", to: "/services/paintless-dent-repair" },
  { label: "Hail Damage Repair", to: "/services/hail-damage-repair" },
  { label: "Minor Dent & Ding Removal", to: "/services/minor-dent-ding-removal" },
  { label: "Collision Repair", to: "/services/collision-repair" },
  { label: "Fender Repair", to: "/services/fender-repair" },
];

const quickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Before & After", to: "/before-after" },
  { label: "Reviews", to: "/reviews" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "Dealerships & Fleet", to: "/dealerships-fleet" },
  { label: "Learn PDR", to: "/learn-pdr" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/90">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Dent Master Franchise logo" className="h-16 w-auto mb-4" />
            <p className="text-sm text-white/60 mb-4">
              Orlando's #1 trusted paintless dent repair specialists. Fast, affordable, and guaranteed.
            </p>
            <p className="text-sm font-semibold text-accent">Hablamos Español</p>
            <div className="flex gap-3 mt-4">
              <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">Facebook</a>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">Instagram</a>
              <a href={BUSINESS.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">TikTok</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-sm text-white/60 hover:text-primary transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-sm text-white/60 hover:text-primary transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <a href={BUSINESS.phoneHref} className="text-sm text-white/60 hover:text-primary transition-colors">{BUSINESS.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <a href={`mailto:${BUSINESS.email}`} className="text-sm text-white/60 hover:text-primary transition-colors">{BUSINESS.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-primary transition-colors">Orlando, FL — View on Google Maps</a>
              </li>
            </ul>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 btn-primary text-sm">WhatsApp Us</a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Dent Master Franchise. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="text-xs text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-xs text-white/40 hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
