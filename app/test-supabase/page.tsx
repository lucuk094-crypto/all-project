'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, CircleDashed, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridBackground } from '@/components/GridBackground';
import { Reveal } from '@/components/Reveal';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface TestResult {
  name: string;
  status: 'loading' | 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

const INITIAL: TestResult[] = [
  { name: 'Konfigurasi environment', status: 'loading', message: 'Memeriksa...' },
  { name: 'Koneksi Supabase', status: 'loading', message: 'Memeriksa...' },
  { name: 'Tabel projects', status: 'loading', message: 'Memeriksa...' },
  { name: 'Storage bucket', status: 'loading', message: 'Memeriksa...' },
];

const ICONS = {
  loading: CircleDashed,
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
} as const;

const COLORS = {
  loading: 'text-[var(--faint)]',
  success: 'text-emerald-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
} as const;

export default function TestSupabasePage() {
  const [tests, setTests] = useState<TestResult[]>(INITIAL);

  const update = (index: number, patch: Partial<TestResult>) =>
    setTests((prev) => prev.map((t, i) => (i === index ? { ...t, ...patch } : t)));

  useEffect(() => {
    const run = async () => {
      // 1. Environment
      if (!isSupabaseConfigured || !supabase) {
        update(0, {
          status: 'error',
          message: 'Variabel environment belum diisi',
          details:
            'Lengkapi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY pada file .env.local',
        });
        [1, 2, 3].forEach((i) =>
          update(i, { status: 'warning', message: 'Dilewati', details: 'Env belum dikonfigurasi' }),
        );
        return;
      }

      update(0, { status: 'success', message: 'Variabel environment ditemukan' });

      // 2. Connection
      try {
        const { error } = await supabase.from('projects').select('id').limit(1);
        if (error) throw error;
        update(1, { status: 'success', message: 'Berhasil terhubung ke Supabase' });
      } catch (error) {
        update(1, {
          status: 'error',
          message: 'Gagal terhubung',
          details: error instanceof Error ? error.message : 'Kesalahan tidak diketahui',
        });
        [2, 3].forEach((i) =>
          update(i, { status: 'warning', message: 'Dilewati', details: 'Koneksi gagal' }),
        );
        return;
      }

      // 3. Table
      try {
        const { count, error } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        if (error) throw error;
        update(2, {
          status: 'success',
          message: 'Tabel projects tersedia',
          details: `${count ?? 0} baris ditemukan`,
        });
      } catch (error) {
        update(2, {
          status: 'error',
          message: 'Tabel projects bermasalah',
          details: error instanceof Error ? error.message : undefined,
        });
      }

      // 4. Storage
      try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) throw error;
        const has = (data ?? []).some((b) => b.name === 'project-banners');
        update(
          3,
          has
            ? { status: 'success', message: 'Bucket project-banners tersedia' }
            : {
                status: 'warning',
                message: 'Bucket project-banners belum ada',
                details: 'Buat bucket publik bernama project-banners di dashboard Supabase',
              },
        );
      } catch (error) {
        update(3, {
          status: 'error',
          message: 'Gagal memeriksa storage',
          details: error instanceof Error ? error.message : undefined,
        });
      }
    };

    void run();
  }, []);

  return (
    <div className="relative">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6">
        <GridBackground />
        <div className="relative mx-auto w-full max-w-2xl">
          <Reveal>
            <span className="eyebrow mb-4 block">Diagnostik</span>
            <h1 className="text-display text-[2rem] sm:text-[2.5rem]">
              <span className="text-gradient">Status Supabase</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Halaman ini memeriksa konfigurasi, koneksi, tabel, dan storage Supabase Anda.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 space-y-3">
              {tests.map((test) => {
                const Icon = ICONS[test.status];
                return (
                  <div
                    key={test.name}
                    className="flex items-start gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4"
                  >
                    <Icon
                      className={`mt-0.5 h-5 w-5 shrink-0 ${COLORS[test.status]} ${
                        test.status === 'loading' ? 'animate-spin' : ''
                      }`}
                      strokeWidth={1.75}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{test.name}</p>
                      <p className="mt-0.5 text-[0.8125rem] text-[var(--muted)]">{test.message}</p>
                      {test.details && (
                        <p className="mt-1.5 break-words font-mono text-[0.6875rem] text-[var(--faint)]">
                          {test.details}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/admin/dashboard">Ke dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/">Ke beranda</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
