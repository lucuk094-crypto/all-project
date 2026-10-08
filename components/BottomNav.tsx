'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { House, LayoutGrid, User, LayoutDashboard, type LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const ITEMS: NavItem[] = [
  { href: '/', label: 'Home', icon: House },
  { href: '/projects', label: 'Projects', icon: LayoutGrid },
  { href: '/about', label: 'About', icon: User },
  { href: '/admin/dashboard', label: 'Admin', icon: LayoutDashboard },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  // Auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    let prev = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 120 || y < prev);
      setLastY(y);
      prev = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 md:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          aria-label="Navigasi utama"
        >
          <div className="glass mx-auto flex max-w-md items-stretch justify-around gap-1 rounded-2xl p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]">
            {ITEMS.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className="relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2.5 transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="bottom-nav-pill"
                      className="absolute inset-0 rounded-xl bg-[var(--foreground)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 h-[1.15rem] w-[1.15rem] transition-colors ${
                      active ? 'text-[var(--background)]' : 'text-[var(--muted)]'
                    }`}
                    strokeWidth={active ? 2.2 : 1.8}
                  />
                  <span
                    className={`relative z-10 text-[0.625rem] font-medium tracking-wide transition-colors ${
                      active ? 'text-[var(--background)]' : 'text-[var(--faint)]'
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
