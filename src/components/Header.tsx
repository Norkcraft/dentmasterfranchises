import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isServiceActive = () => location.pathname.startsWith("/services");

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
      style={{ backgroundColor: "hsl(0 0% 15%)" }}
    >
      <div className="mx-auto flex items-center justify-between h-[72px] max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Logo with contrast badge */}
        <Link to="/" className="flex items-center shrink-0">
          <div className="flex items-center justify-center rounded-lg bg-[hsl(0_0%_12%)] px-2 py-1.5">
            <img
              src={logo}
              alt="Dent Master Franchise logo"
              className="h-11 md:h-12 w-auto"
            />
          </div>
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
                      : "text-[hsl(0_0%_80%)] hover:text-primary-foreground"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>
                {link.children && (
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                    <div className="bg-[hsl(0_0%_100%)] rounded-lg shadow-xl border border-border py-2 min-w-[240px]">
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
                          {child.label}
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
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 text-sm font-semibold text-[hsl(0_0%_85%)] hover:text-primary-foreground transition-colors"
          >
            <Phone className="w-4 h-4" /> {BUSINESS.phone}
          </a>
          <Link to="/learn-pdr" className="btn-secondary !border-[hsl(0_0%_50%)] !text-[hsl(0_0%_90%)] hover:!bg-primary hover:!text-primary-foreground hover:!border-primary text-xs !px-4 !py-2">
            Learn PDR
          </Link>
          <Link to="/contact" className="btn-primary text-xs !px-5 !py-2">
            Get Instant Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2.5 text-[hsl(0_0%_85%)] hover:text-primary-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="xl:hidden border-t border-[hsl(0_0%_22%)] overflow-y-auto max-h-[calc(100vh-72px)]"
          style={{ backgroundColor: "hsl(0 0% 15%)" }}
        >
          <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.to}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex items-center justify-between w-full px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                        isServiceActive()
                          ? "text-primary"
                          : "text-[hsl(0_0%_80%)] hover:text-primary-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="pl-4 space-y-0.5 pb-1">
                        <Link
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2.5 text-sm text-[hsl(0_0%_60%)] hover:text-primary-foreground"
                        >
                          All Services
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setOpen(false)}
                            className={`block px-3 py-2.5 text-sm transition-colors ${
                              isActive(child.to)
                                ? "text-primary font-medium"
                                : "text-[hsl(0_0%_60%)] hover:text-primary-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive(link.to)
                        ? "text-primary"
                        : "text-[hsl(0_0%_80%)] hover:text-primary-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-3 border-t border-[hsl(0_0%_22%)] mt-3">
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[hsl(0_0%_85%)] hover:text-primary-foreground rounded-lg border border-[hsl(0_0%_30%)]"
              >
                <Phone className="w-4 h-4" /> {BUSINESS.phone}
              </a>
              <Link
                to="/learn-pdr"
                onClick={() => setOpen(false)}
                className="btn-secondary text-center !border-[hsl(0_0%_50%)] !text-[hsl(0_0%_90%)]"
              >
                Learn PDR
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary text-center"
              >
                Get Instant Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
