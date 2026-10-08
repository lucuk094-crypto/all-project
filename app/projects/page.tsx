'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  FolderOpen,
  Github,
  LayoutGrid,
  Rows3,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/badge';
import ProjectCard from '@/components/ProjectCard';
import { GridBackground } from '@/components/GridBackground';
import Reveal from '@/components/Reveal';
import type { Project } from '@/lib/supabaseProjectService';
import { getPublishedProjects } from '@/lib/supabaseProjectService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { DEMO_PROJECTS } from '@/lib/demoProjects';
import DemoNotice from '@/components/DemoNotice';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [tech, setTech] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = isSupabaseConfigured ? await getPublishedProjects() : DEMO_PROJECTS;
        if (alive) setProjects(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [projects],
  );
  const technologies = useMemo(
    () => ['all', ...Array.from(new Set(projects.flatMap((p) => p.technologies ?? [])))].sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        (p.technologies ?? []).some((t) => t.toLowerCase().includes(q));
      const matchCategory = category === 'all' || p.category === category;
      const matchTech = tech === 'all' || (p.technologies ?? []).includes(tech);
      return matchQuery && matchCategory && matchTech;
    });
  }, [projects, query, category, tech]);

  const hasFilter = query !== '' || category !== 'all' || tech !== 'all';
  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setTech('all');
  };

  return (
    <div className="relative">
      <DemoNotice />

      {/* ── Header ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10">
        <GridBackground />
        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface)]/70 px-3 py-1.5 backdrop-blur-md">
              <FolderOpen className="h-3.5 w-3.5 text-[var(--muted)]" strokeWidth={1.75} />
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Koleksi karya
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-display text-[2.25rem] sm:text-5xl lg:text-6xl">
              <span className="text-gradient">Semua Project</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              Kumpulan aplikasi web, eksperimen, dan produk digital yang pernah saya bangun. Gunakan
              pencarian atau filter untuk menemukan yang Anda butuhkan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Filters ────────────────────────────────────── */}
      <section className="sticky top-[4.5rem] z-30 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="glass flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]"
                strokeWidth={1.75}
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari project, teknologi, atau kata kunci..."
                className="h-11 border-transparent bg-transparent pl-10 hover:border-transparent"
                aria-label="Cari project"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[var(--faint)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="hidden h-4 w-4 text-[var(--faint)] sm:block" strokeWidth={1.75} />
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full sm:w-40"
                aria-label="Filter kategori"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'Semua kategori' : c}
                  </option>
                ))}
              </Select>

              <Select
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                className="h-11 w-full sm:w-40"
                aria-label="Filter teknologi"
              >
                {technologies.map((t) => (
                  <option key={t} value={t}>
                    {t === 'all' ? 'Semua teknologi' : t}
                  </option>
                ))}
              </Select>

              {/* View toggle */}
              <div className="hidden items-center gap-1 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-1 sm:flex">
                {(
                  [
                    { key: 'grid', icon: LayoutGrid, label: 'Grid' },
                    { key: 'list', icon: Rows3, label: 'List' },
                  ] as const
                ).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setView(key)}
                    aria-label={`Tampilan ${label}`}
                    aria-pressed={view === key}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      view === key
                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                        : 'text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────── */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--faint)]">
              {loading ? 'Memuat...' : `${filtered.length} project ditemukan`}
            </p>
            {hasFilter && !loading && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-[0.8125rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <X className="h-3.5 w-3.5" />
                Reset filter
              </button>
            )}
          </div>

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
          ) : filtered.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--surface)]/50 px-6 py-24 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--surface-2)]">
                  <Search className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.75} />
                </span>
                <h3 className="text-base font-semibold">Tidak ada hasil</h3>
                <p className="max-w-sm text-sm text-[var(--muted)]">
                  Tidak ada project yang cocok dengan filter Anda. Coba kata kunci lain atau reset
                  filter.
                </p>
                <Button variant="outline" size="sm" onClick={resetFilters} className="mt-2">
                  Reset filter
                </Button>
              </div>
            </Reveal>
          ) : view === 'grid' ? (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectCard project={project} index={i} showIndex priority={i < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div layout className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="spotlight-card group flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)] sm:gap-5 sm:p-4"
                      onMouseMove={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                      }}
                    >
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-2)] sm:h-24 sm:w-40">
                        {project.banner ? (
                          <Image
                            src={project.banner}
                            alt={project.title}
                            fill
                            sizes="160px"
                            className="object-cover opacity-90 saturate-[0.35] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Sparkles className="h-4 w-4 text-[var(--faint)]" strokeWidth={1.5} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--faint)]">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--foreground)] px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-[var(--background)]">
                              <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                              Unggulan
                            </span>
                          )}
                        </div>
                        <h3 className="truncate text-[0.9375rem] font-semibold tracking-tight sm:text-base">
                          {project.title}
                        </h3>
                        <p className="mt-1 line-clamp-1 text-[0.8125rem] text-[var(--muted)]">
                          {project.tagline}
                        </p>
                      </div>

                      <div className="hidden shrink-0 items-center gap-2 lg:flex">
                        {(project.technologies ?? []).slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-[var(--hairline)] bg-[var(--surface-2)] px-2 py-1 font-mono text-[0.625rem] text-[var(--muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        {project.githubUrl && (
                          <span
                            role="button"
                            tabIndex={-1}
                            aria-hidden="true"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                            }}
                            className="hidden h-9 w-9 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:flex"
                          >
                            <Github className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                        )}
                        {project.liveUrl && (
                          <span
                            role="button"
                            tabIndex={-1}
                            aria-hidden="true"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                            }}
                            className="hidden h-9 w-9 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:flex"
                          >
                            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                        )}
                        <ArrowUpRight className="h-4 w-4 text-[var(--faint)] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
