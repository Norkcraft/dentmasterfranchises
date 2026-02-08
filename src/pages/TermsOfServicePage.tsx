import SEOHead from "@/components/SEOHead";

export default function TermsOfServicePage() {
  return (
    <>
      <SEOHead title="Terms of Service | Dent Master Franchise" description="Terms of service for Dent Master Franchise. Read our terms and conditions for using our website and services." path="/terms-of-service" />
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8 font-heading">Terms of Service</h1>
          <div className="prose prose-sm text-foreground/80 space-y-6">
            <p>Welcome to Dent Master Franchise. By accessing or using our website and services, you agree to be bound by these Terms of Service.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Services</h2>
            <p>Dent Master Franchise provides paintless dent repair services and PDR training in Orlando, FL and Central Florida. All services are subject to availability and assessment of vehicle damage.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Estimates and Pricing</h2>
            <p>Estimates provided through our website or in person are based on visible damage assessment and may be adjusted upon closer inspection. Final pricing is determined before work begins and requires customer approval.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Training Programs</h2>
            <p>Training fees are as published on our website. Training schedules, content, and availability may vary. Payment terms will be communicated during enrollment.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Limitation of Liability</h2>
            <p>Dent Master Franchise provides services with reasonable care and skill. We are not liable for pre-existing damage, paint defects, or conditions not related to our repair work.</p>
            <h2 className="text-xl font-bold text-foreground font-heading">Contact</h2>
            <p>Questions about these terms? Contact us at {" "}
              <a href="mailto:Support@dentmasterfranchise.com" className="text-primary hover:underline">Support@dentmasterfranchise.com</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
