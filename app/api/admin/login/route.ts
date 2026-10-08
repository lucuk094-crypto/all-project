import { cookies } from 'next/headers';
import {
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from '@/lib/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** In-memory throttle — slows brute-force on a warm instance. */
const ATTEMPTS = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

function throttled(ip: string): boolean {
  const now = Date.now();
  const entry = ATTEMPTS.get(ip);

  if (!entry || now > entry.reset) {
    ATTEMPTS.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (throttled(ip)) {
      return Response.json(
        { error: 'Terlalu banyak percobaan. Tunggu satu menit lalu coba lagi.' },
        { status: 429 },
      );
    }

    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return Response.json(
        { error: 'ADMIN_PASSWORD belum diisi di environment variable server.' },
        { status: 500 },
      );
    }

    let password = '';
    try {
      const body = (await request.json()) as { password?: unknown };
      if (typeof body.password === 'string') password = body.password;
    } catch {
      // Malformed request body is a client error, not a server error.
      return Response.json({ error: 'Format permintaan tidak valid.' }, { status: 400 });
    }

    if (!constantTimeEqual(password, expected)) {
      // Uniform response — do not reveal which part failed.
      return Response.json({ error: 'Kata sandi salah.' }, { status: 401 });
    }

    const token = await createSessionToken();
    const store = await cookies();
    store.set(SESSION_COOKIE, token, sessionCookieOptions());

    ATTEMPTS.delete(ip);
    return Response.json({ ok: true });
  } catch (error) {
    console.error('[admin/login]', error);
    return Response.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
