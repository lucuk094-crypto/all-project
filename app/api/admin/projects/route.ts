import { requireSession } from '../guard';
import { adminNotConfiguredResponse, supabaseAdmin } from '@/lib/supabaseAdmin';
import { projectToRow, rowToProject } from '@/lib/projectMapper';
import type { Project } from '@/lib/supabaseProjectService';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/admin/projects — list every project (including drafts). */
export async function GET() {
  const denied = await requireSession();
  if (denied) return denied;
  if (!supabaseAdmin) return adminNotConfiguredResponse();

  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[admin/projects GET]', error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ projects: (data ?? []).map(rowToProject) });
}

/** POST /api/admin/projects — create a project. */
export async function POST(request: Request) {
  const denied = await requireSession();
  if (denied) return denied;
  if (!supabaseAdmin) return adminNotConfiguredResponse();

  let payload: Partial<Project>;
  try {
    payload = (await request.json()) as Partial<Project>;
  } catch {
    return Response.json({ error: 'Body tidak valid.' }, { status: 400 });
  }

  if (!payload.slug || !payload.title) {
    return Response.json({ error: 'Slug dan judul wajib diisi.' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const row = {
    ...projectToRow(payload),
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert([row])
    .select()
    .single();

  if (error) {
    console.error('[admin/projects POST]', error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ project: rowToProject(data) }, { status: 201 });
}
