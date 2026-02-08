import { Helmet } from "react-helmet-async";
import { BUSINESS } from "@/data/constants";

interface LocalBusinessProps {
  name?: string;
  description?: string;
}

export function LocalBusinessJsonLd({ name, description }: LocalBusinessProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: name || BUSINESS.name,
    description: description || "Professional paintless dent repair in Orlando, FL. Hail damage, door dings, collision dents — restored to factory condition without repainting.",
    url: BUSINESS.canonical,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.5383",
      longitude: "-81.3792",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "6",
      bestRating: "5",
    },
    sameAs: [
      BUSINESS.facebook,
      BUSINESS.instagram,
      BUSINESS.tiktok,
      BUSINESS.yelp,
    ],
    image: `${BUSINESS.canonical}/og-default.png`,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

interface FAQJsonLdProps {
  faqs: { q: string; a: string }[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${BUSINESS.canonical}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Orlando",
      "@id": "https://en.wikipedia.org/wiki/Orlando,_Florida",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
