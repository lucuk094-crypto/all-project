'use client';

import { Info } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

/** Shown only while Supabase credentials are missing. */
export default function DemoNotice() {
  if (isSupabaseConfigured) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
      <div className="flex items-start gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/70 px-4 py-3 backdrop-blur-md">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" strokeWidth={1.75} />
        <p className="text-[0.8125rem] leading-relaxed text-[var(--muted)]">
          <span className="font-medium text-[var(--foreground)]">Mode demo.</span> Supabase belum
          dikonfigurasi, jadi data contoh yang ditampilkan. Isi{' '}
          <code className="font-mono text-[0.6875rem]">.env.local</code> untuk memuat project asli.
        </p>
      </div>
    </div>
  );
}

export { DemoNotice };
