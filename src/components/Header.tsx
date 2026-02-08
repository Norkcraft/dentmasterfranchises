import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/dent-master-logo.png";
import { BUSINESS } from "@/data/constants";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Services", to: "/services", children: [
      { label: "Paintless Dent Repair", to: "/services/paintless-dent-repair" },
      { label: "Hail Damage Repair", to: "/services/hail-damage-repair" },
      { label: "Minor Dent & Ding Removal", to: "/services/minor-dent-ding-removal" },
      { label: "Collision Repair", to: "/services/collision-repair" },
      { label: "Fender Repair", to: "/services/fender-repair" },
    ]
  },
  { label: "Before & After", to: "/before-after" },
  { label: "Reviews", to: "/reviews" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "Dealerships & Fleet", to: "/dealerships-fleet" },
  { label: "Learn PDR", to: "/learn-pdr" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Dent Master Franchise logo" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.to} className="relative group">
              <Link
                to={link.to}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === link.to ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
                  <div className="bg-surface rounded-lg shadow-xl border border-border py-2 min-w-[220px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={BUSINESS.phoneHref} className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" /> {BUSINESS.phone}
          </a>
          <Link to="/contact" className="btn-primary text-sm">Get Instant Quote</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-surface border-t border-border">
          <nav className="section-container py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => { if (!link.children) setOpen(false); else setServicesOpen(!servicesOpen); }}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
                {link.children && servicesOpen && (
                  <div className="pl-6 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a href={BUSINESS.phoneHref} className="btn-secondary text-center">{BUSINESS.phone}</a>
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary text-center">Get Instant Quote</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
