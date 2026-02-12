import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsOfServicePage() {
  const { t } = useLanguage();
  return (
    <>
      <SEOHead title={t("Terms of Service | Dent Master Franchise", "Términos de Servicio | Dent Master Franchise")} description={t("Terms of service for Dent Master Franchise.", "Términos de servicio de Dent Master Franchise.")} path="/terms-of-service" />
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8 font-heading">{t("Terms of Service", "Términos de Servicio")}</h1>
          <div className="prose prose-sm text-foreground/80 space-y-6">
            <p>{t("Welcome to Dent Master Franchise. By accessing or using our website and services, you agree to be bound by these Terms of Service.", "Bienvenido a Dent Master Franchise. Al acceder o usar nuestro sitio web y servicios, acepta estar sujeto a estos Términos de Servicio.")}</p>
            <h2 className="text-xl font-bold text-foreground font-heading">{t("Services", "Servicios")}</h2>
            <p>{t("Dent Master Franchise provides paintless dent repair services and PDR training in Orlando, FL and Central Florida.", "Dent Master Franchise proporciona servicios de reparación sin pintura y entrenamiento PDR en Orlando, FL.")}</p>
            <h2 className="text-xl font-bold text-foreground font-heading">{t("Estimates and Pricing", "Presupuestos y Precios")}</h2>
            <p>{t("Estimates provided are based on visible damage assessment and may be adjusted upon closer inspection.", "Los presupuestos se basan en la evaluación visible del daño y pueden ajustarse tras una inspección más detallada.")}</p>
            <h2 className="text-xl font-bold text-foreground font-heading">{t("Contact", "Contacto")}</h2>
            <p>{t("Questions about these terms? Contact us at", "¿Preguntas sobre estos términos? Contáctenos en")} <a href="mailto:Support@dentmasterfranchise.com" className="text-primary hover:underline">Support@dentmasterfranchise.com</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
