import { supabase, isSupabaseConfigured } from './supabase';
import { logError, logWarning } from './errorLogger';

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

// Create new project
export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!supabase || !isSupabaseConfigured) {
    const error = new Error('Supabase not configured. Please check your environment variables.');
    logError('createProject', error);
    throw error;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        slug: projectData.slug,
        title: projectData.title,
        tagline: projectData.tagline,
        description: projectData.description,
        banner: projectData.banner,
        screenshots: projectData.screenshots,
        live_url: projectData.liveUrl, // Convert camelCase to snake_case
        github_url: projectData.githubUrl, // Convert camelCase to snake_case
        technologies: projectData.technologies,
        category: projectData.category,
        code: projectData.code,
        featured: projectData.featured,
        status: projectData.status,
        features: projectData.features,
        challenges: projectData.challenges,
        learnings: projectData.learnings,
        duration: projectData.duration,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      // Log the actual Supabase error for debugging
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
      }
      
      // Convert Supabase error to Error object with better message
      const enhancedError = new Error(
        `Failed to create project: ${error.message || 'Unknown error'}${error.hint ? ` (Hint: ${error.hint})` : ''}`
      );
      (enhancedError as any).supabaseError = error; // Attach original error for debugging
      throw enhancedError;
    }

    if (!data || !data.id) {
      throw new Error('Project created but no ID returned');
    }

    return data.id;
  } catch (error) {
    // Ensure we're logging/throwing proper Error objects
    const finalError = error instanceof Error ? error : new Error(String(error));
    logError('createProject', finalError);
    throw finalError;
  }
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  if (!supabase || !isSupabaseConfigured) {
    logWarning('supabaseProjectService', 'Supabase not configured. Returning empty projects array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      banner: item.banner,
      screenshots: item.screenshots || [],
      liveUrl: item.liveUrl || item.live_url,
      githubUrl: item.githubUrl || item.github_url,
      technologies: item.technologies || [],
      category: item.category,
      code: item.code || { html: '', css: '', javascript: '' },
      featured: item.featured || false,
      status: item.status || 'draft',
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      features: item.features,
      challenges: item.challenges,
      learnings: item.learnings,
      duration: item.duration,
    }));
  } catch (error) {
    logError('getAllProjects', error);
    return [];
  }
}

// Get published projects only
export async function getPublishedProjects(): Promise<Project[]> {
  if (!supabase || !isSupabaseConfigured) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      banner: item.banner,
      screenshots: item.screenshots || [],
      liveUrl: item.liveUrl || item.live_url,
      githubUrl: item.githubUrl || item.github_url,
      technologies: item.technologies || [],
      category: item.category,
      code: item.code || { html: '', css: '', javascript: '' },
      featured: item.featured || false,
      status: item.status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      features: item.features,
      challenges: item.challenges,
      learnings: item.learnings,
      duration: item.duration,
    }));
  } catch (error) {
    logError('getPublishedProjects', error);
    return [];
  }
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  if (!supabase || !isSupabaseConfigured) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      banner: item.banner,
      screenshots: item.screenshots || [],
      liveUrl: item.liveUrl || item.live_url,
      githubUrl: item.githubUrl || item.github_url,
      technologies: item.technologies || [],
      category: item.category,
      code: item.code || { html: '', css: '', javascript: '' },
      featured: item.featured,
      status: item.status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      features: item.features,
      challenges: item.challenges,
      learnings: item.learnings,
      duration: item.duration,
    }));
  } catch (error) {
    logError('getFeaturedProjects', error);
    return [];
  }
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      banner: data.banner,
      screenshots: data.screenshots || [],
      liveUrl: data.liveUrl || data.live_url,
      githubUrl: data.githubUrl || data.github_url,
      technologies: data.technologies || [],
      category: data.category,
      code: data.code || { html: '', css: '', javascript: '' },
      featured: data.featured || false,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      features: data.features,
      challenges: data.challenges,
      learnings: data.learnings,
      duration: data.duration,
    };
  } catch (error) {
    logError('getProjectBySlug', error);
    return null;
  }
}

// Get project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      banner: data.banner,
      screenshots: data.screenshots || [],
      liveUrl: data.liveUrl || data.live_url,
      githubUrl: data.githubUrl || data.github_url,
      technologies: data.technologies || [],
      category: data.category,
      code: data.code || { html: '', css: '', javascript: '' },
      featured: data.featured || false,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      features: data.features,
      challenges: data.challenges,
      learnings: data.learnings,
      duration: data.duration,
    };
  } catch (error) {
    logError('getProjectById', error);
    return null;
  }
}

// Update project
export async function updateProject(id: string, projectData: Partial<Project>): Promise<void> {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  try {
    // Convert camelCase to snake_case for database
    const dbData: any = {};
    
    if (projectData.slug !== undefined) dbData.slug = projectData.slug;
    if (projectData.title !== undefined) dbData.title = projectData.title;
    if (projectData.tagline !== undefined) dbData.tagline = projectData.tagline;
    if (projectData.description !== undefined) dbData.description = projectData.description;
    if (projectData.banner !== undefined) dbData.banner = projectData.banner;
    if (projectData.screenshots !== undefined) dbData.screenshots = projectData.screenshots;
    if (projectData.liveUrl !== undefined) dbData.live_url = projectData.liveUrl;
    if (projectData.githubUrl !== undefined) dbData.github_url = projectData.githubUrl;
    if (projectData.technologies !== undefined) dbData.technologies = projectData.technologies;
    if (projectData.category !== undefined) dbData.category = projectData.category;
    if (projectData.code !== undefined) dbData.code = projectData.code;
    if (projectData.featured !== undefined) dbData.featured = projectData.featured;
    if (projectData.status !== undefined) dbData.status = projectData.status;
    if (projectData.features !== undefined) dbData.features = projectData.features;
    if (projectData.challenges !== undefined) dbData.challenges = projectData.challenges;
    if (projectData.learnings !== undefined) dbData.learnings = projectData.learnings;
    if (projectData.duration !== undefined) dbData.duration = projectData.duration;
    
    dbData.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('projects')
      .update(dbData)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    logError('updateProject', error);
    throw error;
  }
}

// Delete project
export async function deleteProject(id: string): Promise<void> {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    logError('deleteProject', error);
    throw error;
  }
}

// Search projects
export async function searchProjects(searchTerm: string): Promise<Project[]> {
  if (!supabase || !isSupabaseConfigured) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${searchTerm}%,tagline.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      banner: item.banner,
      screenshots: item.screenshots || [],
      liveUrl: item.liveUrl || item.live_url,
      githubUrl: item.githubUrl || item.github_url,
      technologies: item.technologies || [],
      category: item.category,
      code: item.code || { html: '', css: '', javascript: '' },
      featured: item.featured || false,
      status: item.status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      features: item.features,
      challenges: item.challenges,
      learnings: item.learnings,
      duration: item.duration,
    }));
  } catch (error) {
    logError('searchProjects', error);
    return [];
  }
}
