import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS } from "@/data/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/dent-master-logo.png";

const serviceLinks = [
  { en: "Paintless Dent Repair", es: "Reparación Sin Pintura", to: "/services/paintless-dent-repair" },
  { en: "Hail Damage Repair", es: "Reparación de Granizo", to: "/services/hail-damage-repair" },
  { en: "Minor Dent & Ding Removal", es: "Abolladuras Menores", to: "/services/minor-dent-ding-removal" },
  { en: "Collision Repair", es: "Reparación de Colisión", to: "/services/collision-repair" },
  { en: "Fender Repair", es: "Reparación de Guardafango", to: "/services/fender-repair" },
];

const quickLinks = [
  { en: "About Us", es: "Nosotros", to: "/about" },
  { en: "Before & After", es: "Antes y Después", to: "/before-after" },
  { en: "Reviews", es: "Reseñas", to: "/reviews" },
  { en: "Service Areas", es: "Áreas de Servicio", to: "/service-areas" },
  { en: "Dealerships & Fleet", es: "Concesionarios", to: "/dealerships-fleet" },
  { en: "Learn PDR", es: "Aprende PDR", to: "/learn-pdr" },
  { en: "Contact", es: "Contacto", to: "/contact" },
];

export default function Footer() {
  const { t, lang } = useLanguage();
  const label = (l: { en: string; es: string }) => lang === "es" ? l.es : l.en;

  return (
    <footer className="bg-charcoal text-white/90">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="Dent Master Franchise logo" className="h-16 w-auto mb-4" />
            <p className="text-sm text-white/60 mb-4">
              {t("Orlando's #1 trusted paintless dent repair specialists. Fast, affordable, and guaranteed.", "Especialistas #1 en reparación de abolladuras sin pintura en Orlando. Rápido, asequible y garantizado.")}
            </p>
            <p className="text-sm font-semibold text-accent">Hablamos Español</p>
            <div className="flex gap-3 mt-4">
              <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">Facebook</a>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">Instagram</a>
              <a href={BUSINESS.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm">TikTok</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("Services", "Servicios")}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-sm text-white/60 hover:text-primary transition-colors">{label(l)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("Quick Links", "Enlaces Rápidos")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-sm text-white/60 hover:text-primary transition-colors">{label(l)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("Contact Us", "Contáctenos")}</h3>
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
                <a href={BUSINESS.googleMaps} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-primary transition-colors">
                  {t("Orlando, FL — View on Google Maps", "Orlando, FL — Ver en Google Maps")}
                </a>
              </li>
            </ul>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 btn-primary text-sm">WhatsApp</a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Dent Master Franchise. {t("All rights reserved.", "Todos los derechos reservados.")}</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="text-xs text-white/40 hover:text-white/60 transition-colors">{t("Privacy Policy", "Política de Privacidad")}</Link>
            <Link to="/terms-of-service" className="text-xs text-white/40 hover:text-white/60 transition-colors">{t("Terms of Service", "Términos de Servicio")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
