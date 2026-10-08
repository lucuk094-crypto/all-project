'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Compass,
  GraduationCap,
  Mail,
  Rocket,
  Sparkles,
  Target,
  Terminal,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SectionHeading from '@/components/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '@/components/Reveal';
import { GridBackground } from '@/components/GridBackground';
import TechBadge from '@/components/TechBadge';

const SKILLS = [
  { group: 'Frontend', level: 95, items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { group: 'Backend', level: 82, items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST API'] },
  { group: 'Design', level: 78, items: ['Figma', 'Design System', 'Motion', 'Accessibility'] },
  { group: 'Tooling', level: 88, items: ['Git', 'Vercel', 'Docker', 'ESLint'] },
];

const TIMELINE = [
  {
    year: '2025',
    icon: Rocket,
    title: 'Product Engineer',
    org: 'Independent / Kolaborasi',
    description:
      'Membangun produk web end-to-end: dari riset kebutuhan, desain sistem, hingga peluncuran dan pemantauan.',
  },
  {
    year: '2023',
    icon: Workflow,
    title: 'Frontend Developer',
    org: 'Berbagai proyek klien',
    description:
      'Fokus pada performa, aksesibilitas, dan konsistensi antarmuka melalui sistem desain yang dapat digunakan ulang.',
  },
  {
    year: '2022',
    icon: GraduationCap,
    title: 'Awal perjalanan',
    org: 'Otodidak',
    description:
      'Mulai mendalami pengembangan web secara mandiri dan merilis eksperimen-eksperimen kecil ke publik.',
  },
];

const VALUES = [
  {
    icon: Target,
    title: 'Berorientasi hasil',
    description: 'Setiap keputusan teknis diukur dari dampaknya pada pengguna dan tujuan produk.',
  },
  {
    icon: Compass,
    title: 'Konsisten & terukur',
    description: 'Standar kode, struktur, dan dokumentasi dijaga agar mudah dikembangkan bersama.',
  },
  {
    icon: Award,
    title: 'Detail matters',
    description: 'Hal kecil — spacing, transisi, states — menentukan kesan keseluruhan sebuah produk.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-10">
        <GridBackground />
        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface)]/70 px-3 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[var(--muted)]" strokeWidth={1.75} />
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Tentang saya
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-display text-[2.3rem] sm:text-5xl lg:text-6xl">
              <span className="text-gradient">Mengubah ide kompleks</span>
              <br />
              <span className="text-gradient-muted">menjadi produk yang sederhana.</span>
            </h1>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal delay={0.12}>
              <div className="space-y-5 text-[0.9375rem] leading-[1.85] text-[var(--muted)] sm:text-base">
                <p>
                  Halo, saya <span className="font-medium text-[var(--foreground)]">Van-X313</span> —
                  seorang pengembang web yang menaruh perhatian besar pada kualitas kode, performa,
                  dan detail antarmuka.
                </p>
                <p>
                  Perjalanan saya dimulai dari rasa ingin tahu tentang bagaimana sebuah halaman web
                  bekerja. Sejak saat itu, saya terus membangun, menghancurkan, dan membangun kembali
                  — sampai setiap elemen terasa tepat.
                </p>
                <p>
                  Kini saya mengerjakan aplikasi web modern dengan React dan Next.js, dipadukan
                  Supabase untuk lapisan data. Saya percaya produk yang baik lahir dari kolaborasi
                  yang jujur dan iterasi yang konsisten.
                </p>
                <p>
                  Di luar layar, saya menikmati eksplorasi tipografi, motion design, dan apa pun yang
                  membuat pengalaman digital terasa hidup.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="group">
                  <Link href="/projects">
                    Lihat karya
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="mailto:hello@example.com">
                    <Mail className="h-4 w-4" />
                    Kirim pesan
                  </a>
                </Button>
              </div>
            </Reveal>

            {/* Identity card */}
            <Reveal delay={0.18} direction="scale">
              <div className="spotlight-card relative overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent_65%)]" />

                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--foreground)]">
                    <Terminal className="h-7 w-7 text-[var(--background)]" strokeWidth={2} />
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight">Van-X313</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">Web Developer &amp; UI Engineer</p>

                  <div className="divider-x my-6" />

                  <dl className="space-y-3.5 text-sm">
                    {[
                      { label: 'Lokasi', value: 'Indonesia' },
                      { label: 'Fokus', value: 'Frontend & Fullstack' },
                      { label: 'Status', value: 'Terbuka untuk kolaborasi' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-4">
                        <dt className="text-[var(--faint)]">{row.label}</dt>
                        <dd className="text-right font-medium">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Next.js', 'TypeScript', 'Supabase', 'Tailwind'].map((t) => (
                      <Badge key={t} variant="soft">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ Skills ══ */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
        <GridBackground fade size={72} />
        <div className="relative mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Keahlian teknis"
            icon={Terminal}
            title="Peralatan yang saya kuasai"
            description="Kombinasi alat dan teknologi yang saya gunakan sehari-hari untuk membangun produk yang cepat dan terawat."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {SKILLS.map(({ group, level, items }) => (
              <RevealItem key={group}>
                <div className="spotlight-card h-full rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                  <div className="mb-4 flex items-baseline justify-between">
                    <h3 className="text-base font-semibold tracking-tight">{group}</h3>
                    <span className="font-mono text-xs text-[var(--faint)]">{level}%</span>
                  </div>

                  <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--accent-soft)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-[var(--foreground)]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {items.map((i) => (
                      <TechBadge key={i} name={i} />
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ══ Timeline ══ */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-4xl">
          <SectionHeading
            eyebrow="Perjalanan"
            icon={Rocket}
            title="Langkah demi langkah"
            description="Titik-titik penting yang membentuk cara saya bekerja hari ini."
          />

          <div className="relative mt-12">
            {/* Rail */}
            <div className="absolute bottom-2 left-[1.4rem] top-2 w-px bg-gradient-to-b from-transparent via-[var(--hairline)] to-transparent sm:left-[1.6rem]" />

            <RevealGroup className="space-y-4">
              {TIMELINE.map(({ year, icon: Icon, title, org, description }) => (
                <RevealItem key={year}>
                  <div className="group relative flex gap-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)] sm:gap-6 sm:p-6">
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--background)] transition-colors duration-500 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] sm:h-12 sm:w-12">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-[var(--faint)]">
                          {year}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[var(--faint)]" />
                        <span className="text-[0.8125rem] text-[var(--muted)]">{org}</span>
                      </div>
                      <h3 className="text-[0.9375rem] font-semibold tracking-tight sm:text-base">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ══ Values ══ */}
      <section className="relative px-4 pb-8 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Prinsip kerja"
            icon={Compass}
            title="Yang saya pegang teguh"
            description="Tiga hal yang selalu saya jaga dalam setiap project."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <RevealItem key={title}>
                <div className="spotlight-card h-full rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)]">
                    <Icon className="h-[1.15rem] w-[1.15rem] text-[var(--muted)]" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}
