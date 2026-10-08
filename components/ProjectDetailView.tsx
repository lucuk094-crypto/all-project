'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Github,
  ImageOff,
  Lightbulb,
  ListChecks,
  Mountain,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge, Skeleton } from '@/components/ui/badge';
import CodeViewer from '@/components/CodeViewer';
import TechBadge from '@/components/TechBadge';
import { GridBackground } from '@/components/GridBackground';
import { Reveal } from '@/components/Reveal';
import type { Project } from '@/lib/supabaseProjectService';

type Tab = 'overview' | 'code' | 'gallery';

const TABS: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: 'overview', label: 'Gambaran', icon: ListChecks },
  { id: 'code', label: 'Kode', icon: Sparkles },
  { id: 'gallery', label: 'Galeri', icon: Mountain },
];

const formatDate = (iso?: string) => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

interface Props {
  project: Project | null;
  initialLoading?: boolean;
}

export default function ProjectDetailView({ project, initialLoading = false }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const [zoomed, setZoomed] = useState<string | null>(null);

  if (initialLoading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-6 h-12 w-3/4" />
        <Skeleton className="mt-4 h-4 w-1/2" />
        <Skeleton className="mt-10 aspect-[16/9] w-full rounded-2xl" />
        <div className="mt-8 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]">
          <ImageOff className="h-6 w-6 text-[var(--muted)]" strokeWidth={1.5} />
        </span>
        <h1 className="text-display text-3xl">
          <span className="text-gradient">Project tidak ditemukan</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          Project yang Anda cari mungkin telah dihapus, masih berstatus draft, atau Supabase belum
          dikonfigurasi.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/projects">Kembali ke project</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Ke beranda</Link>
          </Button>
        </div>
      </div>
    );
  }

  const screenshots = (project.screenshots ?? []).filter(Boolean);
  const hasCode =
    Boolean(project.code?.html || project.code?.css || project.code?.javascript);

  return (
    <div className="relative">
      {/* ══ Header ══ */}
      <section className="relative overflow-hidden px-4 pb-10 pt-4 sm:px-6">
        <GridBackground />
        <div className="relative mx-auto w-full max-w-5xl">
          <Link
            href="/projects"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Semua project
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge variant="soft">{project.category}</Badge>
              {project.featured && (
                <Badge variant="default">
                  <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                  Unggulan
                </Badge>
              )}
              <Badge variant={project.status === 'published' ? 'success' : 'warning'}>
                {project.status === 'published' ? 'Dipublikasikan' : 'Draft'}
              </Badge>
            </div>

            <h1 className="text-display text-[2.1rem] sm:text-5xl lg:text-[3.5rem]">
              <span className="text-gradient">{project.title}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--muted)] sm:text-base">
              {project.tagline}
            </p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-[var(--hairline)] py-4">
              {project.duration && (
                <span className="inline-flex items-center gap-2 text-[0.8125rem] text-[var(--muted)]">
                  <Clock className="h-4 w-4 text-[var(--faint)]" strokeWidth={1.75} />
                  {project.duration}
                </span>
              )}
              <span className="inline-flex items-center gap-2 text-[0.8125rem] text-[var(--muted)]">
                <Calendar className="h-4 w-4 text-[var(--faint)]" strokeWidth={1.75} />
                {formatDate(project.createdAt)}
              </span>
              {(project.technologies?.length ?? 0) > 0 && (
                <span className="inline-flex items-center gap-2 text-[0.8125rem] text-[var(--muted)]">
                  <ListChecks className="h-4 w-4 text-[var(--faint)]" strokeWidth={1.75} />
                  {project.technologies?.length} teknologi
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button asChild size="lg" className="group">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live demo
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild size="lg" variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Source code
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Banner ══ */}
      <section className="px-4 sm:px-6">
        <Reveal direction="scale" className="mx-auto w-full max-w-5xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)]">
            {project.banner ? (
              <Image
                src={project.banner}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[var(--faint)]">
                <ImageOff className="h-8 w-8" strokeWidth={1.4} />
                <span className="font-mono text-xs uppercase tracking-[0.2em]">No preview</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
          </div>
        </Reveal>
      </section>

      {/* ══ Tabs ══ */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 flex items-center gap-1 overflow-x-auto rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  tab === id
                    ? 'bg-[var(--foreground)] text-[var(--background)]'
                    : 'text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]'
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
              {/* Main */}
              <div className="space-y-10">
                <Reveal>
                  <h2 className="mb-4 text-xl font-semibold tracking-tight">Tentang project</h2>
                  <p className="whitespace-pre-line text-[0.9375rem] leading-[1.85] text-[var(--muted)]">
                    {project.description}
                  </p>
                </Reveal>

                {project.features && project.features.length > 0 && (
                  <Reveal delay={0.06}>
                    <h2 className="mb-4 text-xl font-semibold tracking-tight">Fitur utama</h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3.5 text-sm text-[var(--muted)]"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--foreground)]"
                            strokeWidth={1.9}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {project.challenges && (
                  <Reveal delay={0.1}>
                    <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold tracking-tight">
                        <Mountain className="h-4 w-4 text-[var(--muted)]" strokeWidth={1.75} />
                        Tantangan
                      </h2>
                      <p className="whitespace-pre-line text-sm leading-[1.85] text-[var(--muted)]">
                        {project.challenges}
                      </p>
                    </div>
                  </Reveal>
                )}

                {project.learnings && (
                  <Reveal delay={0.14}>
                    <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold tracking-tight">
                        <Lightbulb className="h-4 w-4 text-[var(--muted)]" strokeWidth={1.75} />
                        Pembelajaran
                      </h2>
                      <p className="whitespace-pre-line text-sm leading-[1.85] text-[var(--muted)]">
                        {project.learnings}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <Reveal delay={0.08}>
                  <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                    <h3 className="eyebrow mb-4">Teknologi</h3>
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies ?? []).map((t) => (
                        <TechBadge key={t} name={t} />
                      ))}
                      {(project.technologies ?? []).length === 0 && (
                        <p className="text-sm text-[var(--faint)]">Belum ada data.</p>
                      )}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                    <h3 className="eyebrow mb-4">Detail</h3>
                    <dl className="space-y-3.5 text-sm">
                      {[
                        { label: 'Kategori', value: project.category },
                        { label: 'Durasi', value: project.duration ?? '—' },
                        { label: 'Dibuat', value: formatDate(project.createdAt) },
                        { label: 'Diperbarui', value: formatDate(project.updatedAt) },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-4">
                          <dt className="text-[var(--faint)]">{row.label}</dt>
                          <dd className="truncate text-right font-medium">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                    <h3 className="eyebrow mb-4">Tautan</h3>
                    <div className="space-y-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-xl border border-[var(--hairline)] px-3.5 py-2.5 text-sm transition-colors hover:bg-[var(--accent-soft)]"
                        >
                          Live demo
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-xl border border-[var(--hairline)] px-3.5 py-2.5 text-sm transition-colors hover:bg-[var(--accent-soft)]"
                        >
                          Repository
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <p className="text-sm text-[var(--faint)]">Belum ada tautan.</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              </aside>
            </div>
          )}

          {tab === 'code' &&
            (hasCode ? (
              <Reveal>
                <CodeViewer code={project.code} />
              </Reveal>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--surface)]/50 px-6 py-20 text-center">
                <Sparkles className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.5} />
                <p className="text-sm text-[var(--muted)]">Belum ada cuplikan kode untuk project ini.</p>
              </div>
            ))}

          {tab === 'gallery' &&
            (screenshots.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {screenshots.map((src, i) => (
                  <Reveal key={`${src}-${i}`} delay={i * 0.05} direction="scale">
                    <button
                      type="button"
                      onClick={() => setZoomed(src)}
                      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]"
                      aria-label={`Perbesar tangkapan layar ${i + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} — tangkapan layar ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </button>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--surface)]/50 px-6 py-20 text-center">
                <ImageOff className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.5} />
                <p className="text-sm text-[var(--muted)]">Belum ada tangkapan layar.</p>
              </div>
            ))}
        </div>
      </section>

      {/* ══ Lightbox ══ */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau gambar"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setZoomed(null)}
        >
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={zoomed}
              alt="Pratinjau"
              fill
              sizes="100vw"
              className="rounded-2xl object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white backdrop-blur-md"
            aria-label="Tutup pratinjau"
          >
            ✕
          </button>
        </div>
      )}

      {/* ══ Next CTA ══ */}
      <section className="px-4 pb-10 sm:px-6">
        <Reveal direction="scale">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] px-6 py-12 text-center">
            <h2 className="text-display text-2xl sm:text-3xl">
              <span className="text-gradient">Tertarik dengan yang lain?</span>
            </h2>
            <p className="max-w-md text-sm text-[var(--muted)]">
              Jelajahi karya lain atau hubungi saya untuk mendiskusikan project Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="group">
                <Link href="/projects">
                  Project lainnya
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="mailto:hello@example.com">Hubungi saya</a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
