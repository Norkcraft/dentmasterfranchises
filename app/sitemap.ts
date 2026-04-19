import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import { blogPosts } from '@/data/blog';
import { services } from '@/data/services';
import { cities } from '@/data/cities';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/before-after`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/reviews`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/service-areas`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date('2025-03-15'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/dealerships-fleet`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/learn-pdr`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms-of-service`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date('2025-03-01'),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const cityUrls: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${siteConfig.url}/service-areas/${city.slug}`,
    lastModified: new Date('2025-03-01'),
    changeFrequency: 'monthly',
    priority: city.slug === 'paintless-dent-repair-orlando-fl' ? 0.9 : 0.8,
  }));

  return [...staticPages, ...blogUrls, ...serviceUrls, ...cityUrls];
}
