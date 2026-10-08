import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Returns a 401 Response when the request carries no valid session. */
export async function requireSession(): Promise<Response | null> {
  const store = await cookies();
  const valid = await verifySessionToken(store.get(SESSION_COOKIE)?.value);

  if (!valid) {
    return Response.json({ error: 'Sesi tidak valid. Silakan masuk kembali.' }, { status: 401 });
  }
  return null;
}
