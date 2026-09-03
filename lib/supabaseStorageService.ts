import { supabase, isSupabaseConfigured } from './supabase';
import { logError } from './errorLogger';

// Upload project banner to Supabase Storage
export async function uploadProjectBanner(file: File, projectSlug: string): Promise<string> {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectSlug}-${Date.now()}.${fileExt}`;
    const filePath = `banners/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('project-banners')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-banners')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    logError('uploadProjectBanner', error);
    throw error;
  }
}

// Upload project screenshots to Supabase Storage
export async function uploadProjectScreenshot(file: File, projectSlug: string): Promise<string> {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectSlug}-screenshot-${Date.now()}.${fileExt}`;
    const filePath = `screenshots/${fileName}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from('project-banners')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-banners')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    logError('uploadProjectScreenshot', error);
    throw error;
  }
}

// Delete file from Supabase Storage
export async function deleteProjectImage(fileUrl: string): Promise<void> {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  try {
    // Extract file path from URL
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/project-banners/');
    if (pathParts.length < 2) return;
    
    const filePath = pathParts[1];

    const { error } = await supabase.storage
      .from('project-banners')
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    logError('deleteProjectImage', error);
    // Don't throw error, just log it
  }
}
