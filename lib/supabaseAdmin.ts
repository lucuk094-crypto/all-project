import { createClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 * Bypasses RLS — never import this from a Client Component, and never
 * prefix the env var with NEXT_PUBLIC_.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isAdminConfigured = Boolean(url && serviceKey);

export const supabaseAdmin = isAdminConfigured
  ? createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

/** Returns a 503 Response when the service role key is missing. */
export function adminNotConfiguredResponse(): Response {
  return Response.json(
    {
      error:
        'SUPABASE_SERVICE_ROLE_KEY belum diisi. Tambahkan di environment variable (Vercel → Settings → Environment Variables), lalu redeploy.',
    },
    { status: 503 },
  );
}
