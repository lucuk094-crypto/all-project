'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

/**
 * Icon visibility is driven purely by CSS (`.dark` class), so there is no
 * `mounted` state and therefore no hydration mismatch or setState-in-effect.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti tema tampilan"
      title="Ganti tema tampilan"
      className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
    >
      <Sun
        className="h-4 w-4 rotate-0 scale-100 transition-transform duration-500 group-hover:rotate-90 dark:-rotate-90 dark:scale-0"
        strokeWidth={1.9}
      />
      <Moon
        className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100"
        strokeWidth={1.9}
      />
    </button>
  );
}
