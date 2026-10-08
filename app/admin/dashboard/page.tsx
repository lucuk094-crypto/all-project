'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  AlertTriangle,
  Eye,
  EyeOff,
  FolderOpen,
  Pencil,
  PlusCircle,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge, Skeleton } from '@/components/ui/badge';
import AdminShell from '@/components/admin/AdminShell';
import {
  deleteProjectApi,
  fetchProjects,
  updateProjectApi,
} from '@/lib/adminApi';
import type { Project } from '@/lib/supabaseProjectService';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loadError, setLoadError] = useState('');

  const load = async () => {
    try {
      setLoadError('');
      setProjects(await fetchProjects());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal memuat daftar project';
      setLoadError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        (p.technologies ?? []).some((t) => t.toLowerCase().includes(q)),
    );
  }, [projects, query]);

  const stats = useMemo(
    () => [
      { label: 'Total', value: projects.length },
      { label: 'Dipublikasikan', value: projects.filter((p) => p.status === 'published').length },
      { label: 'Draft', value: projects.filter((p) => p.status !== 'published').length },
      { label: 'Unggulan', value: projects.filter((p) => p.featured).length },
    ],
    [projects],
  );

  const toggleFeatured = async (project: Project) => {
    if (!project.id) return;
    try {
      await updateProjectApi(project.id, { featured: !project.featured });
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p)),
      );
      toast.success(project.featured ? 'Dihapus dari unggulan' : 'Ditandai sebagai unggulan');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal memperbarui status unggulan',
      );
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete?.id) return;
    setDeleting(true);
    try {
      await deleteProjectApi(pendingDelete.id);
      setProjects((prev) => prev.filter((p) => p.id !== pendingDelete.id));
      toast.success('Project dihapus');
      setPendingDelete(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal menghapus project');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Kelola seluruh project portfolio dari satu tempat."
      action={
        <Button asChild size="sm" className="group">
          <Link href="/admin/new">
            <PlusCircle className="h-3.5 w-3.5" />
            Project baru
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Server-side error surfaced to the admin */}
        {loadError && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" strokeWidth={1.9} />
            <div className="text-sm">
              <p className="font-medium text-amber-500">Tidak dapat memuat data</p>
              <p className="mt-1 text-[var(--muted)]">{loadError}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
            >
              <p className="text-display text-2xl">{s.value}</p>
              <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--faint)]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]"
            strokeWidth={1.75}
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari project..."
            className="h-11 pl-10"
            aria-label="Cari project"
          />
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--surface)]/50 px-6 py-20 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--surface-2)]">
              <FolderOpen className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.75} />
            </span>
            <h3 className="text-base font-semibold">
              {query ? 'Tidak ada hasil' : 'Belum ada project'}
            </h3>
            <p className="max-w-sm text-sm text-[var(--muted)]">
              {query
                ? 'Coba kata kunci lain untuk menemukan project.'
                : 'Mulai dengan menambahkan project pertama Anda.'}
            </p>
            {!query && (
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/admin/new">Tambah project</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id ?? project.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4 transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--foreground)_20%,transparent)]"
                >
                  {/* Thumb */}
                  <div className="h-14 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-2)]">
                    {project.banner ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.banner}
                        alt=""
                        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FolderOpen className="h-4 w-4 text-[var(--faint)]" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-[0.9375rem] font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      <Badge variant={project.status === 'published' ? 'success' : 'warning'}>
                        {project.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                      {project.featured && (
                        <Badge variant="default">
                          <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                          Unggulan
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-[0.8125rem] text-[var(--muted)]">
                      {project.category || 'Tanpa kategori'}
                      {project.technologies?.length
                        ? ` · ${project.technologies.slice(0, 3).join(', ')}`
                        : ''}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleFeatured(project)}
                      aria-label={project.featured ? 'Hapus dari unggulan' : 'Tandai unggulan'}
                      title={project.featured ? 'Hapus dari unggulan' : 'Tandai unggulan'}
                    >
                      {project.featured ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>

                    <Button asChild variant="ghost" size="icon-sm" title="Lihat">
                      <Link
                        href={`/projects/${project.slug}`}
                        aria-label={`Lihat ${project.title}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button asChild variant="ghost" size="icon-sm" title="Edit">
                      <Link
                        href={`/admin/edit/${project.id}`}
                        aria-label={`Edit ${project.title}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setPendingDelete(project)}
                      aria-label={`Hapus ${project.title}`}
                      title="Hapus"
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {pendingDelete && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Konfirmasi hapus"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setPendingDelete(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-[var(--hairline)] bg-[var(--elevated)] p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight">Hapus project?</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                <span className="font-medium text-[var(--foreground)]">
                  {pendingDelete.title}
                </span>{' '}
                akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="mt-7 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setPendingDelete(null)} disabled={deleting}>
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="bg-red-600 text-white hover:bg-red-500"
                >
                  {deleting ? 'Menghapus...' : 'Hapus'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
