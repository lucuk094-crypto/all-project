import { createClient } from '@supabase/supabase-js';
import { logWarning } from './errorLogger';

// Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'your_supabase_url_here' &&
  supabaseAnonKey && 
  supabaseAnonKey !== 'your_supabase_anon_key_here';

// Create Supabase client
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  logWarning('supabase', 'Supabase not configured. Please update .env file with your Supabase credentials.');
}

export default supabase;
