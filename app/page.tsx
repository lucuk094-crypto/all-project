'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  Github,
  Layers,
  Palette,
  Rocket,
  ServerCog,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import CodeShowcase from '@/components/CodeShowcase';
import Reveal, { RevealGroup, RevealItem } from '@/components/Reveal';
import { GridBackground } from '@/components/GridBackground';
import { Skeleton } from '@/components/ui/badge';
import type { Project } from '@/lib/supabaseProjectService';
import { getFeaturedProjects, getPublishedProjects } from '@/lib/supabaseProjectService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { DEMO_PROJECTS } from '@/lib/demoProjects';
import DemoNotice from '@/components/DemoNotice';

/* ───────────────────────── data ───────────────────────── */

const STATS = [
  { value: '12+', label: 'Project selesai' },
  { value: '4', label: 'Tahun berkarya' },
  { value: '99%', label: 'Skor performa' },
  { value: '24/7', label: 'Siap kolaborasi' },
];

const MARQUEE = [
  'Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase',
  'PostgreSQL', 'Framer Motion', 'Node.js', 'Figma', 'Git',
  'Vercel', 'Docker', 'Prisma', 'GraphQL',
];

const CAPABILITIES = [
  {
    icon: Code2,
    title: 'Web Application',
    description:
      'Aplikasi web modern berbasis React dan Next.js dengan arsitektur yang rapi, cepat, dan mudah dikembangkan.',
    tag: 'Frontend',
  },
  {
    icon: ServerCog,
    title: 'API & Backend',
    description:
      'Desain REST maupun GraphQL, autentikasi, dan integrasi basis data yang aman serta terdokumentasi.',
    tag: 'Backend',
  },
  {
    icon: Database,
    title: 'Database Design',
    description:
      'Skema relasional yang terstruktur, terindeks dengan benar, dan dilindungi kebijakan keamanan berlapis.',
    tag: 'Data',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Antarmuka yang bersih, konsisten, dan menyenangkan digunakan pada berbagai ukuran layar.',
    tag: 'Design',
  },
];

const PROCESS = [
  {
    icon: Layers,
    step: '01',
    title: 'Riset & Perencanaan',
    description: 'Memahami tujuan, pengguna, dan batasan teknis sebelum satu baris kode ditulis.',
  },
  {
    icon: Boxes,
    step: '02',
    title: 'Desain & Arsitektur',
    description: 'Menyusun struktur komponen, aliran data, dan sistem desain yang dapat digunakan ulang.',
  },
  {
    icon: Braces,
    step: '03',
    title: 'Pengembangan',
    description: 'Implementasi bertahap dengan pengecekan tipe, pengujian, dan tinjauan kode rutin.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Peluncuran & Perawatan',
    description: 'Optimasi performa, pemantauan, dan perbaikan berkelanjutan setelah rilis.',
  },
];

/* ───────────────────────── page ───────────────────────── */

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!isSupabaseConfigured) {
          if (alive) setProjects(DEMO_PROJECTS.slice(0, 6));
          return;
        }
        const featured = await getFeaturedProjects();
        const list = featured.length > 0 ? featured : await getPublishedProjects();
        if (alive) setProjects(list.slice(0, 6));
      } catch {
        if (alive) setProjects([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="relative">
      <DemoNotice />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-16">
        <GridBackground />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface)]/70 px-3 py-1.5 backdrop-blur-md"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  Tersedia untuk kolaborasi
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]"
              >
                <span className="text-gradient">Membangun produk</span>
                <br />
                <span className="text-gradient-muted">digital yang presisi.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-[var(--muted)] sm:text-base"
              >
                Saya merancang dan mengembangkan aplikasi web yang cepat, mudah diakses, dan enak
                dipandang — dari ide pertama hingga siap digunakan banyak orang.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Button asChild size="lg" className="group">
                  <Link href="/projects">
                    Lihat karya
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about">Tentang saya</Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.dl
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[var(--hairline)] pt-8 sm:grid-cols-4"
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-display text-2xl sm:text-[1.75rem]">{s.value}</dt>
                    <dd className="mt-1 text-[0.6875rem] leading-snug text-[var(--faint)]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* Right — code showcase */}
            <div className="lg:pl-4">
              <CodeShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <section className="relative border-y border-[var(--hairline)] bg-[var(--surface)]/40 py-5">
        <div className="marquee-track mask-fade-x overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--faint)] transition-colors hover:text-[var(--muted)]"
              >
                <Zap className="h-3 w-3" strokeWidth={1.75} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURED PROJECTS ══════════════ */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Karya pilihan"
            icon={Sparkles}
            title="Project yang menonjol"
            description="Beberapa karya terbaik yang mencerminkan standar kualitas, performa, dan perhatian pada detail."
            action={
              <Button asChild variant="outline" className="group">
                <Link href="/projects">
                  Semua project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            }
            align="left"
          />

          <div className="mt-12">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]"
                  >
                    <Skeleton className="aspect-[16/10] w-full rounded-none" />
                    <div className="space-y-3 p-5">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={i}
                    showIndex
                    priority={i < 3}
                  />
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--surface)]/50 px-6 py-20 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--surface-2)]">
                    <Terminal className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-semibold">Belum ada project</h3>
                  <p className="max-w-sm text-sm text-[var(--muted)]">
                    Hubungkan Supabase lalu tambahkan project pertama Anda melalui panel admin.
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-2">
                    <Link href="/admin/new">Tambah project</Link>
                  </Button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════ CAPABILITIES ══════════════ */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
        <GridBackground fade size={72} />
        <div className="relative mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Keahlian"
            icon={Cpu}
            title="Apa yang saya kerjakan"
            description="Fokus pada kualitas kode, performa, dan pengalaman pengguna yang konsisten di setiap lapisan produk."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map(({ icon: Icon, title, description, tag }) => (
              <RevealItem key={title}>
                <div className="spotlight-card group h-full overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)]">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)] transition-colors duration-500 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]">
                      <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--faint)]">
                      {tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ══════════════ PROCESS ══════════════ */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Alur kerja"
            icon={Layers}
            title="Dari ide menjadi produk"
            description="Pendekatan terstruktur agar setiap keputusan teknis selalu kembali pada kebutuhan pengguna."
            align="left"
          />

          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(({ icon: Icon, step, title, description }) => (
              <RevealItem key={step}>
                <div className="group h-full bg-[var(--surface)] p-6 transition-colors duration-500 hover:bg-[var(--surface-2)]">
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[var(--muted)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                    <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-[var(--faint)]">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-[0.9375rem] font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="relative px-4 pb-4 sm:px-6">
        <Reveal direction="scale">
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,color-mix(in_oklab,var(--foreground)_10%,transparent),transparent_70%)]" />
            <GridBackground fade size={48} />

            <div className="relative">
              <span className="eyebrow">Mari berkolaborasi</span>
              <h2 className="text-display mx-auto mt-5 max-w-2xl text-3xl sm:text-[2.75rem]">
                <span className="text-gradient">Punya ide yang ingin diwujudkan?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                Ceritakan kebutuhan Anda — saya bantu wujudkan menjadi produk digital yang rapi,
                cepat, dan siap berkembang.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="group">
                  <a href="mailto:hello@example.com">
                    Kirim pesan
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
