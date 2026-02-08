import SEOHead from "@/components/SEOHead";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead title="Privacy Policy | Dent Master Franchise" description="Privacy policy for Dent Master Franchise. Learn how we collect, use, and protect your personal information." path="/privacy-policy" />
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8 font-heading">Privacy Policy</h1>
          <div className="prose prose-sm text-foreground/80 space-y-6">
            <p>Dent Master Franchise ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and safeguard information when you visit our website or use our services.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Information We Collect</h2>
            <p>We may collect personal information you voluntarily provide, including your name, phone number, email address, vehicle information, and photos of vehicle damage when you submit a quote request or training inquiry through our forms.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">How We Use Your Information</h2>
            <p>We use the information we collect to respond to your inquiries, provide quotes and service estimates, communicate about our services and training programs, improve our website and customer experience, and comply with legal obligations.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services (such as insurance companies when processing claims with your authorization).</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at {" "}
              <a href="mailto:Support@dentmasterfranchise.com" className="text-primary hover:underline">Support@dentmasterfranchise.com</a> or call <a href="tel:+14077933446" className="text-primary hover:underline">+1 (407) 793-3446</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
