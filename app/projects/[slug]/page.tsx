import type { Metadata } from 'next';
import ProjectDetailView from '@/components/ProjectDetailView';
import { getProjectBySlug } from '@/lib/supabaseProjectService';
import { getDemoBySlug } from '@/lib/demoProjects';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Per-project SEO metadata, resolved on the server. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjectBySlug(slug)) ?? getDemoBySlug(slug);

  if (!project) {
    return {
      title: 'Project tidak ditemukan',
      description: 'Project yang Anda cari tidak tersedia.',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: project.title,
    description: project.tagline || project.description?.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.tagline || project.description?.slice(0, 160),
      type: 'article',
      images: project.banner ? [{ url: project.banner }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.tagline || project.description?.slice(0, 160),
      images: project.banner ? [project.banner] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = (await getProjectBySlug(slug)) ?? getDemoBySlug(slug);

  return <ProjectDetailView project={project} />;
}
