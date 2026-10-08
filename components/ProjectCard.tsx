'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  ImageOff,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { Project } from '@/lib/supabaseProjectService';
import TechBadge from './TechBadge';

interface ProjectCardProps {
  project: Project;
  index?: number;
  /** Editorial numbering, e.g. 3 → "03" */
  showIndex?: boolean;
  priority?: boolean;
}

const CATEGORY_ICON: Record<string, LucideIcon> = {
  web: Sparkles,
};

export default function ProjectCard({
  project,
  index = 0,
  showIndex = false,
  priority = false,
}: ProjectCardProps) {
  const Icon = CATEGORY_ICON[project.category?.toLowerCase()] ?? Sparkles;

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="spotlight-card ring-sheen relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
        }}
      >
        {/* ── Banner ─────────────────────────────────────────── */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-2)]">
          {project.banner ? (
            <Image
              src={project.banner}
              alt={project.title}
              fill
              priority={priority}
              loading={priority ? undefined : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-90 saturate-[0.35] contrast-[1.05] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:opacity-100 group-hover:saturate-100"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--faint)]">
              <ImageOff className="h-6 w-6" strokeWidth={1.5} />
              <span className="font-mono text-[0.6875rem] tracking-wider">NO PREVIEW</span>
            </div>
          )}

          {/* Bottom scrim keeps text legible over any image */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-90" />

          {/* Index number */}
          {showIndex && (
            <span className="pointer-events-none absolute left-4 top-4 font-mono text-[0.6875rem] tracking-[0.2em] text-white/70 mix-blend-difference">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}

          {/* Featured pill */}
          {project.featured && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Unggulan
            </span>
          )}

          {/* Hover quick-links */}
          <div className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
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
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
              </span>
            )}
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
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
              >
                <Github className="h-4 w-4" strokeWidth={1.8} />
              </span>
            )}
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────── */}
        <div className="relative z-[2] flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline)] bg-[var(--surface-2)]">
              <Icon className="h-3.5 w-3.5 text-[var(--muted)]" strokeWidth={1.75} />
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--faint)]">
              {project.category}
            </span>
          </div>

          <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--foreground)]">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {project.tagline}
          </p>

          {/* Tech stack */}
          {project.technologies?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
              {project.technologies.length > 4 && (
                <TechBadge name={`+${project.technologies.length - 4}`} muted />
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]">
              Lihat detail
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            {project.duration && (
              <span className="font-mono text-[0.625rem] tracking-wider text-[var(--faint)]">
                {project.duration}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
