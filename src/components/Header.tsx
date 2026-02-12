import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/dent-master-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { en: "Home", es: "Inicio", to: "/" },
  { en: "About", es: "Nosotros", to: "/about" },
  {
    en: "Services", es: "Servicios", to: "/services", children: [
      { en: "Paintless Dent Repair", es: "Reparación Sin Pintura", to: "/services/paintless-dent-repair" },
      { en: "Hail Damage Repair", es: "Reparación de Granizo", to: "/services/hail-damage-repair" },
      { en: "Minor Dent & Ding Removal", es: "Abolladuras Menores", to: "/services/minor-dent-ding-removal" },
      { en: "Collision Repair", es: "Reparación de Colisión", to: "/services/collision-repair" },
      { en: "Fender Repair", es: "Reparación de Guardafango", to: "/services/fender-repair" },
    ]
  },
  { en: "Before & After", es: "Antes y Después", to: "/before-after" },
  { en: "Reviews", es: "Reseñas", to: "/reviews" },
  { en: "Service Areas", es: "Áreas de Servicio", to: "/service-areas" },
  { en: "Dealerships & Fleet", es: "Concesionarios", to: "/dealerships-fleet" },
  { en: "Contact", es: "Contacto", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => { setOpen(false); setServicesOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isServiceActive = () => location.pathname.startsWith("/services");
  const label = (link: { en: string; es: string }) => lang === "es" ? link.es : link.en;

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
      style={{ backgroundColor: "hsl(0 0% 10%)" }}
    >
      <div className="mx-auto flex items-center justify-between h-[72px] max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Dent Master Franchise logo" className="h-11 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center h-full">
          <ul className="flex items-center gap-0.5 h-full list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.to} className="relative group h-full flex items-center">
                <Link
                  to={link.to}
                  className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium leading-none rounded-md whitespace-nowrap transition-colors duration-200 ${
                    isActive(link.to) || (link.children && isServiceActive())
                      ? "text-primary"
                      : "text-[hsl(0_0%_75%)] hover:text-white"
                  }`}
                >
                  {label(link)}
                  {link.children && (
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>
                {link.children && (
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-border py-2 min-w-[240px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            isActive(child.to)
                              ? "text-primary bg-muted font-medium"
                              : "text-foreground hover:bg-muted hover:text-primary"
                          }`}
                        >
                          {label(child)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="flex items-center gap-1 rounded-full border border-[hsl(0_0%_30%)] px-3 py-1.5 text-xs font-bold text-white hover:border-primary transition-colors"
            aria-label="Toggle language"
          >
            <span className={lang === "en" ? "text-primary" : "text-[hsl(0_0%_60%)]"}>EN</span>
            <span className="text-[hsl(0_0%_40%)]">|</span>
            <span className={lang === "es" ? "text-primary" : "text-[hsl(0_0%_60%)]"}>ES</span>
          </button>
          <Link to="/learn-pdr" className="btn-secondary !border-[hsl(0_0%_40%)] !text-[hsl(0_0%_90%)] hover:!bg-primary hover:!text-white hover:!border-primary text-xs !px-4 !py-2">
            {t("Learn PDR", "Aprende PDR")}
          </Link>
          <Link to="/contact" className="btn-primary text-xs !px-5 !py-2">
            {t("Get Instant Quote", "Cotización Gratis")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="flex items-center gap-1 rounded-full border border-[hsl(0_0%_30%)] px-2.5 py-1 text-xs font-bold text-white"
          >
            <span className={lang === "en" ? "text-primary" : "text-[hsl(0_0%_60%)]"}>EN</span>
            <span className="text-[hsl(0_0%_40%)]">|</span>
            <span className={lang === "es" ? "text-primary" : "text-[hsl(0_0%_60%)]"}>ES</span>
          </button>
          <button onClick={() => setOpen(!open)} className="p-2.5 text-[hsl(0_0%_85%)]" aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden border-t border-[hsl(0_0%_20%)] overflow-y-auto max-h-[calc(100vh-72px)]" style={{ backgroundColor: "hsl(0 0% 10%)" }}>
          <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.to}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex items-center justify-between w-full px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                        isServiceActive() ? "text-primary" : "text-[hsl(0_0%_75%)] hover:text-white"
                      }`}
                    >
                      {label(link)}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="pl-4 space-y-0.5 pb-1">
                        <Link to={link.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-[hsl(0_0%_55%)] hover:text-white">
                          {t("All Services", "Todos los Servicios")}
                        </Link>
                        {link.children.map((child) => (
                          <Link key={child.to} to={child.to} onClick={() => setOpen(false)} className={`block px-3 py-2.5 text-sm transition-colors ${isActive(child.to) ? "text-primary font-medium" : "text-[hsl(0_0%_55%)] hover:text-white"}`}>
                            {label(child)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={link.to} onClick={() => setOpen(false)} className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${isActive(link.to) ? "text-primary" : "text-[hsl(0_0%_75%)] hover:text-white"}`}>
                    {label(link)}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-3 border-t border-[hsl(0_0%_20%)] mt-3">
              <Link to="/learn-pdr" onClick={() => setOpen(false)} className="btn-secondary text-center !border-[hsl(0_0%_40%)] !text-[hsl(0_0%_90%)]">
                {t("Learn PDR", "Aprende PDR")}
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary text-center">
                {t("Get Instant Quote", "Cotización Gratis")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
