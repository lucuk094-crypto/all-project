import Link from 'next/link';
import {
  ArrowUpRight,
  Command,
  Github,
  Linkedin,
  Mail,
  Twitter,
  type LucideIcon,
} from 'lucide-react';

const SOCIALS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: 'https://github.com/', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/', label: 'X / Twitter', icon: Twitter },
  { href: 'mailto:hello@example.com', label: 'Email', icon: Mail },
];

const NAV = [
  {
    title: 'Navigasi',
    links: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { href: '/about', label: 'About' },
    ],
  },
  {
    title: 'Admin',
    links: [
      { href: '/admin/login', label: 'Login' },
      { href: '/admin/dashboard', label: 'Dashboard' },
      { href: '/admin/new', label: 'Project baru' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-[var(--hairline)] bg-[var(--background)]/60 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-14 sm:px-6 md:pb-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--foreground)]">
                <Command className="h-4 w-4 text-[var(--background)]" strokeWidth={2.25} />
              </span>
              <span className="text-[0.9375rem] font-semibold tracking-tight">Van-X313</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Portfolio yang merangkum eksperimen, produk, dan karya engineering — dibangun dengan
              ketelitian pada detail, performa, dan pengalaman pengguna.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--surface)] text-[var(--muted)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--foreground)] hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {NAV.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-x mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-[var(--faint)] sm:flex-row">
          <p>© {new Date().getFullYear()} Van-X313. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-1.5 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Built with Next.js &amp; Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
