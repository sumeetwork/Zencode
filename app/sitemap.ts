import type { MetadataRoute } from 'next';
import { projects } from './data/projects';

export const dynamic = 'force-static';

const SITE_URL = 'https://zencode.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
