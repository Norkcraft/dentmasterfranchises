import { Helmet } from "react-helmet-async";
import { BUSINESS } from "@/data/constants";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
}

export default function SEOHead({ title, description, path, type = "website" }: SEOHeadProps) {
  const url = `${BUSINESS.canonical}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${BUSINESS.canonical}/og-default.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
