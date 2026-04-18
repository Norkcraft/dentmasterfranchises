import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { blogPosts, getBlogPost } from "@/data/blog";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const baseMetadata = buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    ogType: "article",
  });

  return {
    ...baseMetadata,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      images: [{ url: `${siteConfig.url}/og/default.jpg` }],
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [siteConfig.url],
      tags: post.tags,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}/og/default.jpg`,
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteConfig.url,
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostPage slug={slug} />
    </>
  );
}
