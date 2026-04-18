import type { Metadata } from "next";
import BlogIndexPage from "@/components/pages/BlogIndexPage";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/seo";
import { blogPosts } from "@/data/blog";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Blog — Tips That Save | Dent Master",
    description:
      "Paintless dent repair blog that answers cost, hail claims, and lease return questions. Get clear tips you can use today. Read the latest guides in minutes.",
    path: "/blog",
  });
}

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: blogPosts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteConfig.url}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogIndexPage />
    </>
  );
}
