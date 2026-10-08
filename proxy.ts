// proxy.ts — Next.js 16 middleware
//
// Melindungi:
//   • /admin/*  (kecuali /admin/login)  → butuh sesi admin
//   • /test-supabase                    → butuh sesi admin
//   • /api/admin/*                      → divalidasi ulang di tiap handler
//
// Catatan: middleware ini adalah lapis pertama. Setiap route handler
// tetap memanggil requireSession() sendiri (defense in depth).

import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth =
    pathname === '/test-supabase' ||
    (pathname.startsWith('/admin') && pathname !== '/admin/login');

  if (!needsAuth) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (await verifySessionToken(token)) return NextResponse.next();

  // Halaman → redirect, API → 401 JSON
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Sesi tidak valid.' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', req.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path kecuali:
     * - _next/static, _next/image
     * - favicon.ico
     * - berkas statis (svg, png, jpg, jpeg, gif, webp, ico)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
