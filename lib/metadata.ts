import type { Metadata } from 'next';
import { buildCanonical, siteConfig } from './seo';
import { fitMetaDescription } from './copy';

type OgType = 'website' | 'article';

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogType?: OgType;
  ogImage?: string;
  noIndex?: boolean;
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const canonical = buildCanonical(input.path);
  const ogImage = input.ogImage ?? siteConfig.ogImage;
  const description = fitMetaDescription(input.description);
  const brandSuffix = '| Dent Master';

  let title = input.title.trim();
  title = title.replace(/\|\s*Dent Master(?:\s+Franchise)?\s*$/i, brandSuffix);
  if (!/Dent Master/i.test(title)) {
    title = `${title} ${brandSuffix}`;
  }

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
    },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: input.ogType ?? 'website',
      siteName: siteConfig.name,
      title: input.title,
      description,
      url: canonical,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      title: input.title,
      description,
      images: [ogImage],
    },
  };
}
