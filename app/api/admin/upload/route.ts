import { requireSession } from '../guard';
import { adminNotConfiguredResponse, supabaseAdmin } from '@/lib/supabaseAdmin';
import slugify from 'slugify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET = 'project-banners';
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/avif']);

/** POST /api/admin/upload — server-side banner upload (validated). */
export async function POST(request: Request) {
  const denied = await requireSession();
  if (denied) return denied;
  if (!supabaseAdmin) return adminNotConfiguredResponse();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: 'Form tidak valid.' }, { status: 400 });
  }

  const file = form.get('file');
  const nameRaw = form.get('slug');

  if (!(file instanceof File)) {
    return Response.json({ error: 'Berkas tidak ditemukan.' }, { status: 400 });
  }

  // Server-side validation — never trust what the browser checked.
  if (!ALLOWED.has(file.type)) {
    return Response.json(
      { error: 'Format tidak didukung. Gunakan PNG, JPG, WEBP, GIF, atau AVIF.' },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json({ error: 'Ukuran maksimal 5 MB.' }, { status: 413 });
  }

  const slugBase = typeof nameRaw === 'string' && nameRaw ? nameRaw : file.name;
  const slug = slugify(slugBase.replace(/\.[^.]+$/, ''), { lower: true, strict: true }) || 'project';
  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const path = `banners/${slug}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });

  if (uploadError) {
    console.error('[admin/upload]', uploadError);
    return Response.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

  return Response.json({ url: urlData.publicUrl, path }, { status: 201 });
}

/** DELETE /api/admin/upload?path=... — remove a previously uploaded file. */
export async function DELETE(request: Request) {
  const denied = await requireSession();
  if (denied) return denied;
  if (!supabaseAdmin) return adminNotConfiguredResponse();

  const path = new URL(request.url).searchParams.get('path');
  if (!path || !path.startsWith('banners/')) {
    return Response.json({ error: 'Path tidak valid.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ ok: true });
}
