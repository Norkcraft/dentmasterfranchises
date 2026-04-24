import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/pages/CityPage";
import { cities, getCityBySlug } from "@/data/cities";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/seo";

// Map English city slugs to their Spanish URL counterparts
const spanishAlternates: Record<string, string> = {
  "paintless-dent-repair-kissimmee-fl": "/reparacion-abolladuras-kissimmee",
};

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const base = buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/service-areas/${city.slug}`,
    ogType: "article",
  });

  const esPath = spanishAlternates[slug];
  if (!esPath) return base;

  return {
    ...base,
    alternates: {
      ...base.alternates,
      languages: {
        en: `${siteConfig.url}/service-areas/${slug}`,
        es: `${siteConfig.url}${esPath}`,
      },
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  return <CityPage slug={slug} />;
}
