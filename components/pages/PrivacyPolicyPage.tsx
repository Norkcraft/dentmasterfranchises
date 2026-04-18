"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8 font-heading">
            {t("Dent Master Franchise Privacy Policy", "Política de Privacidad de Dent Master Franchise")}
          </h1>
          <div className="prose prose-sm text-foreground/80 space-y-6">
            <p>{t('Dent Master Franchise ("we," "us," or "our") respects your privacy and is committed to protecting your personal information.', 'Dent Master Franchise ("nosotros") respeta su privacidad y se compromete a proteger su información personal.')}</p>
            <h2 className="text-xl font-bold text-foreground font-heading">{t("Information We Collect", "Información que Recopilamos")}</h2>
            <p>{t("We may collect personal information you voluntarily provide, including your name, phone number, email address, vehicle information, and photos of vehicle damage.", "Podemos recopilar información personal que usted proporcione voluntariamente, incluyendo nombre, teléfono, correo electrónico, información del vehículo y fotos.")}</p>
            <h2 className="text-xl font-bold text-foreground font-heading">{t("How We Use Your Information", "Cómo Usamos su Información")}</h2>
            <p>{t("We use the information to respond to inquiries, provide quotes, communicate about services, and improve our website.", "Usamos la información para responder consultas, proporcionar cotizaciones, comunicarnos sobre servicios y mejorar nuestro sitio web.")}</p>
            <h2 className="text-xl font-bold text-foreground font-heading">{t("Contact Us", "Contáctenos")}</h2>
            <p>{t("If you have questions about this Privacy Policy, contact us at", "Si tiene preguntas sobre esta Política de Privacidad, contáctenos en")} <a href="mailto:Support@dentmasterfranchise.com" className="text-primary hover:underline">Support@dentmasterfranchise.com</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
