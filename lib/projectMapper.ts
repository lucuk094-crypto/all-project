import type { Project } from './supabaseProjectService';

/** Row shape as stored in Supabase (snake_case). */
export interface ProjectRow {
  id?: string;
  slug?: string;
  title?: string;
  tagline?: string;
  description?: string;
  banner?: string;
  screenshots?: string[] | null;
  live_url?: string | null;
  github_url?: string | null;
  technologies?: string[] | null;
  category?: string;
  code?: Project['code'] | null;
  featured?: boolean;
  status?: string;
  features?: string[] | null;
  challenges?: string | null;
  learnings?: string | null;
  duration?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** snake_case row  →  camelCase domain object */
export function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug ?? '',
    title: row.title ?? '',
    tagline: row.tagline ?? '',
    description: row.description ?? '',
    banner: row.banner ?? '',
    screenshots: row.screenshots ?? [],
    liveUrl: row.live_url ?? '',
    githubUrl: row.github_url ?? '',
    technologies: row.technologies ?? [],
    category: row.category ?? '',
    code: row.code ?? { html: '', css: '', javascript: '' },
    featured: Boolean(row.featured),
    status: row.status === 'published' ? 'published' : 'draft',
    features: row.features ?? [],
    challenges: row.challenges ?? '',
    learnings: row.learnings ?? '',
    duration: row.duration ?? '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** camelCase payload  →  snake_case row (undefined keys are left untouched) */
export function projectToRow(patch: Partial<Project>): ProjectRow {
  const row: ProjectRow = {};

  if (patch.slug !== undefined) row.slug = patch.slug;
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.tagline !== undefined) row.tagline = patch.tagline;
  if (patch.description !== undefined) row.description = patch.description;
  if (patch.banner !== undefined) row.banner = patch.banner;
  if (patch.screenshots !== undefined) row.screenshots = patch.screenshots;
  if (patch.liveUrl !== undefined) row.live_url = patch.liveUrl;
  if (patch.githubUrl !== undefined) row.github_url = patch.githubUrl;
  if (patch.technologies !== undefined) row.technologies = patch.technologies;
  if (patch.category !== undefined) row.category = patch.category;
  if (patch.code !== undefined) row.code = patch.code;
  if (patch.featured !== undefined) row.featured = patch.featured;
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.features !== undefined) row.features = patch.features;
  if (patch.challenges !== undefined) row.challenges = patch.challenges;
  if (patch.learnings !== undefined) row.learnings = patch.learnings;
  if (patch.duration !== undefined) row.duration = patch.duration;

  return row;
}
