import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects, getProjectBySlug } from '../../data/projects';
import ProjectPageClient from './ProjectPageClient';

const SITE_URL = 'https://zencode.co.za';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  const url = `${SITE_URL}/work/${project.slug}`;
  const imageUrl = project.thumbnailUrl.startsWith('/')
    ? `${SITE_URL}${project.thumbnailUrl}`
    : project.thumbnailUrl;

  return {
    title: project.title,
    description: project.shortDesc,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | ZenCode Portfolio`,
      description: project.shortDesc,
      url,
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ZenCode Portfolio`,
      description: project.shortDesc,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const url = `${SITE_URL}/work/${project.slug}`;
  const imageUrl = project.thumbnailUrl.startsWith('/')
    ? `${SITE_URL}${project.thumbnailUrl}`
    : project.thumbnailUrl;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.fullDesc,
    url,
    image: imageUrl,
    creator: { '@type': 'Organization', name: 'ZenCode Web Solutions', url: SITE_URL },
    ...(project.client && { sourceOrganization: { '@type': 'Organization', name: project.client } }),
    ...(project.siteUrl && { sameAs: project.siteUrl }),
    keywords: project.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPageClient project={project} />
    </>
  );
}
