/**
 * Session helpers — HMAC-signed cookie, edge-runtime safe.
 *
 * Uses only Web Crypto (no `node:crypto`) so the exact same code works in
 * `proxy.ts` (Edge runtime), Route Handlers (Node runtime) and Server
 * Components.
 */

export const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret =
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    '';

  if (!secret) {
    throw new Error(
      'SESSION_SECRET atau ADMIN_PASSWORD belum diisi di environment variable.',
    );
  }
  return secret;
}

async function hmac(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Timing-safe-ish string comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Create a signed session token. */
export async function createSessionToken(): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const signature = await hmac(getSecret(), `admin:${expires}`);
  return `${expires}.${signature}`;
}

/** Verify a session token. Returns true when valid and not expired. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const [expiryRaw, signature] = token.split('.');
  if (!expiryRaw || !signature) return false;

  const expires = Number(expiryRaw);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return false;

  let expected: string;
  try {
    expected = await hmac(getSecret(), `admin:${expires}`);
  } catch {
    return false;
  }

  return safeEqual(signature, expected);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  };
}
