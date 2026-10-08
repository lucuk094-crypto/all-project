import { supabase, isSupabaseConfigured } from './supabase';
import { logError } from './errorLogger';

export interface Project {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  
  // Media
  banner: string;
  screenshots: string[];
  
  // Links
  liveUrl: string;
  githubUrl?: string;
  
  // Technical Info
  technologies: string[];
  category: string;
  
  // Code
  code: {
    html: string;
    css: string;
    javascript: string;
  };
  
  // Metadata
  featured: boolean;
  status: 'published' | 'draft';
  createdAt?: string;
  updatedAt?: string;
  
  // Optional
  features?: string[];
  challenges?: string;
  learnings?: string;
  duration?: string;
}

// ============================================================
//  READ-ONLY, PUBLIC ACCESS
//
//  Seluruh operasi tulis (create / update / delete) SUDAH PINDAH ke server:
//    • Route handler : app/api/admin/*
//    • Klien         : lib/adminApi.ts
//    • Basis data    : service role key (melewati RLS)
//
//  Modul ini sengaja hanya berisi pembacaan memakai anon key, yang aman
//  karena RLS hanya mengizinkan SELECT untuk baris berstatus published.
//  JANGAN tambahkan fungsi INSERT / UPDATE / DELETE di sini.
// ============================================================

type Row = {
  id?: string;
  slug?: string;
  title?: string;
  tagline?: string;
  description?: string;
  banner?: string | null;
  screenshots?: string[] | null;
  liveUrl?: string | null;
  live_url?: string | null;
  githubUrl?: string | null;
  github_url?: string | null;
  technologies?: string[] | null;
  category?: string;
  code?: Project['code'] | null;
  featured?: boolean | null;
  status?: string;
  features?: string[] | null;
  challenges?: string | null;
  learnings?: string | null;
  duration?: string | null;
  created_at?: string;
  updated_at?: string;
};

function mapRow(item: Row): Project {
  return {
    id: item.id,
    slug: item.slug ?? '',
    title: item.title ?? '',
    tagline: item.tagline ?? '',
    description: item.description ?? '',
    banner: item.banner ?? '',
    screenshots: item.screenshots ?? [],
    liveUrl: item.liveUrl ?? item.live_url ?? '',
    githubUrl: item.githubUrl ?? item.github_url ?? '',
    technologies: item.technologies ?? [],
    category: item.category ?? '',
    code: item.code ?? { html: '', css: '', javascript: '' },
    featured: Boolean(item.featured),
    status: item.status === 'published' ? 'published' : 'draft',
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    features: item.features ?? [],
    challenges: item.challenges ?? '',
    learnings: item.learnings ?? '',
    duration: item.duration ?? '',
  };
}

/** Semua project yang berstatus published. */
export async function getPublishedProjects(): Promise<Project[]> {
  if (!supabase || !isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(mapRow);
  } catch (error) {
    logError('getPublishedProjects', error);
    return [];
  }
}

/** Project published yang ditandai unggulan. */
export async function getFeaturedProjects(): Promise<Project[]> {
  if (!supabase || !isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    const featured = (data ?? []).map(mapRow);

    // Fallback: jika belum ada yang ditandai unggulan, pakai yang terbaru
    if (featured.length === 0) {
      return (await getPublishedProjects()).slice(0, 6);
    }
    return featured;
  } catch (error) {
    logError('getFeaturedProjects', error);
    return [];
  }
}

/** Satu project berdasarkan slug (hanya yang published). */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase || !isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) throw error;
    return data ? mapRow(data) : null;
  } catch (error) {
    logError('getProjectBySlug', error);
    return null;
  }
}
