import 'server-only';
import { createClient } from '@sanity/client';

export interface Project {
  slug: string;
  title: string;
  client: string;
  categories: string[];
  tags: string[];
  shortDesc: string;
  fullDesc: string;
  thumbnailUrl: string;
  images: string[];
  siteUrl?: string;
  siteText?: string;
  gridSize: 'large' | 'medium' | 'small';
}

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? 'production';

if (!projectId) {
  throw new Error('SANITY_PROJECT_ID is not set. Add it to your environment variables.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  // CDN caching is layered on top of Next's own tag-based cache, which fights
  // the webhook-driven on-demand revalidation this site relies on for instant
  // updates — go straight to the live API and let Next own the caching.
  useCdn: false,
});

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  "slug": slug.current,
  title,
  client,
  categories,
  tags,
  shortDesc,
  fullDesc,
  "thumbnailUrl": thumbnail.asset->url,
  "images": images[].asset->url,
  siteUrl,
  siteText,
  gridSize
}`;

export async function getProjects(): Promise<Project[]> {
  return client.fetch(PROJECTS_QUERY, {}, { next: { tags: ['projects'] } });
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}
