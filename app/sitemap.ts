import type { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/lib/supabaseProjectService';

const BASE = 'https://dashbord-all-project.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getPublishedProjects();
    projectRoutes = projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch {
    projectRoutes = [];
  }

  return [...staticRoutes, ...projectRoutes];
}
