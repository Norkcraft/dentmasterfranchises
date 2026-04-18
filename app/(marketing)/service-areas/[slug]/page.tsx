import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/pages/CityPage";
import { cities, getCityBySlug } from "@/data/cities";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  return buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/service-areas/${city.slug}`,
    ogType: "article",
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  return <CityPage slug={slug} />;
}
