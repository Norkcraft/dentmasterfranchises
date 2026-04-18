import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/pages/ServicePage";
import { getServiceBySlug, services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    ogType: "article",
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: 'Orlando, FL',
    description: service.metaDescription,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How We Perform ${service.title}`,
    description: `The step-by-step process we use for ${service.title} in Orlando, FL.`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Damage Assessment',
        text: 'We carefully examine the damage, checking the size, depth, location, and paint condition.',
      },
      {
        '@type': 'HowToStep',
        name: 'Panel Access',
        text: 'We determine the best access point behind the panel to reach the dent.',
      },
      {
        '@type': 'HowToStep',
        name: 'Precision Repair',
        text: 'Using specialized PDR tools, we gently massage the dent from behind, restoring the original shape.',
      },
      {
        '@type': 'HowToStep',
        name: 'Quality Check & Polish',
        text: 'We inspect the repair under LED reflection boards and give the area a final clean and polish.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ServicePage slug={slug} />
    </>
  );
}
