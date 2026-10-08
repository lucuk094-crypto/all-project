'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    const id = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', update);
    };
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4">
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={[
            'relative flex h-14 items-center justify-between rounded-2xl px-3 transition-all duration-500 sm:px-4',
            scrolled
              ? 'glass shadow-[0_8px_32px_-12px_rgba(0,0,0,0.35)]'
              : 'border border-transparent bg-transparent',
          ].join(' ')}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 rounded-xl px-1.5 py-1">
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[10px] bg-[var(--foreground)]">
              <Command className="h-4 w-4 text-[var(--background)]" strokeWidth={2.25} />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[0.9375rem] font-semibold tracking-tight">Van-X313</span>
              <span className="mt-0.5 hidden text-[0.625rem] tracking-[0.18em] text-[var(--faint)] sm:block">
                PORTFOLIO
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--accent-soft)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            <Link
              href="/admin/dashboard"
              className="group hidden items-center gap-1.5 rounded-xl bg-[var(--foreground)] px-3.5 py-2 text-sm font-medium text-[var(--background)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] sm:flex"
            >
              Dashboard
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile dropdown sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-2 overflow-hidden rounded-2xl p-2 md:hidden"
            >
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)]" />
                  )}
                </Link>
              ))}
              <Link
                href="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between rounded-xl bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)]"
              >
                Dashboard
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
