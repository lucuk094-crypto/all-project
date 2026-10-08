'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Eye, EyeOff, KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GridBackground } from '@/components/GridBackground';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Kata sandi wajib diisi.');
      return;
    }

    setLoading(true);

    // Brief delay so the transition feels deliberate, not abrupt.
    window.setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('admin_authenticated', 'true');
        toast.success('Berhasil masuk');
        router.push('/admin/dashboard');
      } else {
        setError('Kata sandi salah. Silakan coba lagi.');
        setLoading(false);
      }
    }, 420);
  };

  return (
    <div className="relative flex min-h-[78vh] items-center overflow-hidden px-4 py-16 sm:px-6">
      <GridBackground />

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="spotlight-card overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)]/85 p-8 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="mb-8 text-center">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--foreground)]">
              <Lock className="h-6 w-6 text-[var(--background)]" strokeWidth={2} />
            </span>
            <h1 className="text-display text-2xl">
              <span className="text-gradient">Admin</span>
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Masukkan kata sandi untuk mengelola konten.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">Kata sandi</Label>
              <div className="relative">
                <KeyRound
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]"
                  strokeWidth={1.75}
                />
                <Input
                  id="password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 pl-10 pr-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[var(--faint)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && (
                <p className="text-[0.8125rem] text-red-500" role="alert">
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Memverifikasi...' : 'Masuk'}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-[0.6875rem] text-[var(--faint)]">
            <ShieldCheck className="h-3 w-3" strokeWidth={1.75} />
            Hanya untuk administrator
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Kembali ke beranda
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
