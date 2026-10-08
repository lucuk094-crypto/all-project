'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridBackground } from '@/components/GridBackground';
import { Skeleton } from '@/components/ui/badge';
import { checkSession, logoutAdmin } from '@/lib/adminApi';

interface AdminShellProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Shared admin chrome.
 * The session lives in an HttpOnly cookie — the client only asks the server
 * whether it is still valid. Nothing sensitive is stored in localStorage.
 */
export default function AdminShell({ title, subtitle, action, children }: AdminShellProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const ok = await checkSession();
      if (!alive) return;
      setAllowed(ok);
      setReady(true);
      if (!ok) router.replace('/admin/login');
    })();
    return () => {
      alive = false;
    };
  }, [router]);

  const logout = async () => {
    await logoutAdmin();
    router.replace('/admin/login');
    router.refresh();
  };

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-3 h-4 w-72" />
        <Skeleton className="mt-10 h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!allowed) return null;

  return (
    <div className="relative min-h-[70vh]">
      <GridBackground fade />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Breadcrumb + session bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Kembali ke situs
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              <ShieldCheck className="h-3 w-3 text-emerald-400" strokeWidth={2} />
              Sesi aktif
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-3.5 w-3.5" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-display text-[1.75rem] sm:text-4xl">
              <span className="text-gradient">{title}</span>
            </h1>
            {subtitle && <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            </Button>
            <Button asChild size="sm" className="group">
              <Link href="/admin/new">
                <PlusCircle className="h-3.5 w-3.5" />
                Project baru
              </Link>
            </Button>
            {action}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
