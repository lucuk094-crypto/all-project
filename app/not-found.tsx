'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, Home, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridBackground } from '@/components/GridBackground';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden px-4 py-20 sm:px-6">
      <GridBackground />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]">
            <Compass className="h-6 w-6 text-[var(--muted)]" strokeWidth={1.5} />
          </span>

          <p className="eyebrow mb-4">Error 404</p>

          <h1 className="text-display text-[5rem] leading-none sm:text-[8rem]">
            <span className="text-gradient">404</span>
          </h1>

          <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
            Halaman tidak ditemukan
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            Tautan yang Anda buka mungkin sudah berpindah, dihapus, atau salah ketik. Mari kembali ke
            jalur yang benar.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="group">
              <Link href="/">
                <Home className="h-4 w-4" />
                Ke beranda
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                <LayoutGrid className="h-4 w-4" />
                Lihat project
              </Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mx-auto mt-6 flex items-center gap-1.5 text-sm text-[var(--faint)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke halaman sebelumnya
          </button>
        </motion.div>
      </div>
    </div>
  );
}
