import { requireSession } from '../../guard';
import { adminNotConfiguredResponse, supabaseAdmin } from '@/lib/supabaseAdmin';
import { projectToRow, rowToProject } from '@/lib/projectMapper';
import type { Project } from '@/lib/supabaseProjectService';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

/** GET /api/admin/projects/:id */
export async function GET(_request: Request, { params }: Ctx) {
  const denied = await requireSession();
  if (denied) return denied;
  if (!supabaseAdmin) return adminNotConfiguredResponse();

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return Response.json({ error: error.message }, { status: 404 });
  return Response.json({ project: rowToProject(data) });
}

/** PATCH /api/admin/projects/:id */
export async function PATCH(request: Request, { params }: Ctx) {
  const denied = await requireSession();
  if (denied) return denied;
  if (!supabaseAdmin) return adminNotConfiguredResponse();

  const { id } = await params;

  let payload: Partial<Project>;
  try {
    payload = (await request.json()) as Partial<Project>;
  } catch {
    return Response.json({ error: 'Body tidak valid.' }, { status: 400 });
  }

  const row = { ...projectToRow(payload), updated_at: new Date().toISOString() };

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[admin/projects PATCH]', error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ project: rowToProject(data) });
}

/** DELETE /api/admin/projects/:id */
export async function DELETE(_request: Request, { params }: Ctx) {
  const denied = await requireSession();
  if (denied) return denied;
  if (!supabaseAdmin) return adminNotConfiguredResponse();

  const { id } = await params;
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);

  if (error) {
    console.error('[admin/projects DELETE]', error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
