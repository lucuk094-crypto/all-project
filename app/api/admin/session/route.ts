import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Lets the client check whether the HttpOnly session is still valid. */
export async function GET() {
  const store = await cookies();
  const valid = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  return Response.json({ authenticated: valid }, { status: valid ? 200 : 401 });
}
