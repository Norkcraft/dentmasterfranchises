import type { Metadata } from "next";
import SpanishCityLanding from "@/components/pages/SpanishCityLanding";
import { getCityBySlug } from "@/data/cities";
import { siteConfig } from "@/lib/seo";
import { fitMetaDescription } from "@/lib/copy";
import { notFound } from "next/navigation";

const ENGLISH_SLUG = "paintless-dent-repair-kissimmee-fl";
const SPANISH_PATH = "/reparacion-abolladuras-kissimmee";

export function generateMetadata(): Metadata {
  const city = getCityBySlug(ENGLISH_SLUG);
  if (!city) return {};

  return {
    title: `Reparación de Abolladuras sin Pintura Kissimmee FL | Dent Master`,
    description: fitMetaDescription(
      `Reparación de abolladuras sin pintura en Kissimmee, FL para golpes de puerta, daño por granizo y abolladuras menores. Preservamos la pintura de fábrica y cotizamos desde fotos.`
    ),
    alternates: {
      canonical: `${siteConfig.url}${SPANISH_PATH}`,
      languages: {
        en: `${siteConfig.url}/service-areas/${ENGLISH_SLUG}`,
        es: `${siteConfig.url}${SPANISH_PATH}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `Reparación de Abolladuras sin Pintura Kissimmee FL | Dent Master`,
      description: `Reparación de abolladuras sin pintura en Kissimmee, FL. Hablamos Español. Protegemos la pintura de fábrica y cotizamos desde fotos.`,
      url: `${siteConfig.url}${SPANISH_PATH}`,
      locale: "es_US",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Reparación de abolladuras sin pintura en Kissimmee, FL — Dent Master Franchise" }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      title: `Reparación de Abolladuras sin Pintura Kissimmee FL | Dent Master`,
      description: `Reparación de abolladuras sin pintura en Kissimmee, FL. Hablamos Español.`,
    },
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  const city = getCityBySlug(ENGLISH_SLUG);
  if (!city) notFound();
  return <SpanishCityLanding city={city} englishSlug={ENGLISH_SLUG} />;
}
