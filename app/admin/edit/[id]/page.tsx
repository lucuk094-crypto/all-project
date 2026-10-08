'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AdminShell from '@/components/admin/AdminShell';
import ProjectForm, { type ProjectFormValues } from '@/components/admin/ProjectForm';
import { Skeleton } from '@/components/ui/badge';
import { getProjectById, updateProject, type Project } from '@/lib/supabaseProjectService';
import { uploadProjectBanner } from '@/lib/supabaseStorageService';
import { logError } from '@/lib/errorLogger';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getProjectById(id);
        if (alive) setProject(data);
      } catch (error) {
        logError('EditProjectPage', error);
        toast.error('Gagal memuat data project');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const handleSubmit = async (values: ProjectFormValues, bannerFile: File | null) => {
    if (!project?.id) return;
    setSubmitting(true);

    try {
      let bannerUrl = project.banner;
      if (bannerFile) {
        bannerUrl = await uploadProjectBanner(bannerFile, project.slug);
      }

      await updateProject(project.id, {
        title: values.title,
        tagline: values.tagline,
        description: values.description,
        banner: bannerUrl,
        liveUrl: values.liveUrl,
        githubUrl: values.githubUrl,
        technologies: values.technologies,
        category: values.category,
        code: values.code,
        featured: values.featured,
        status: values.status,
        features: values.features,
        challenges: values.challenges,
        learnings: values.learnings,
        duration: values.duration,
      });

      toast.success('Perubahan tersimpan');
      router.push('/admin/dashboard');
    } catch (error) {
      logError('EditProjectPage - handleSubmit', error);
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
      toast.error(`Gagal menyimpan: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminShell
      title="Edit project"
      subtitle={project ? `Sedang mengubah: ${project.title}` : 'Memuat data project...'}
    >
      {loading ? (
        <div className="space-y-4 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10 w-48" />
        </div>
      ) : project ? (
        <ProjectForm
          initialValues={{
            title: project.title ?? '',
            tagline: project.tagline ?? '',
            description: project.description ?? '',
            category: project.category ?? '',
            liveUrl: project.liveUrl ?? '',
            githubUrl: project.githubUrl ?? '',
            duration: project.duration ?? '',
            featured: Boolean(project.featured),
            status: project.status ?? 'draft',
            technologies: project.technologies ?? [],
            features: project.features ?? [],
            code: project.code ?? { html: '', css: '', javascript: '' },
            challenges: project.challenges ?? '',
            learnings: project.learnings ?? '',
            banner: project.banner ?? '',
          }}
          submitting={submitting}
          submitLabel="Simpan perubahan"
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin/dashboard')}
        />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--surface)]/50 px-6 py-20 text-center">
          <h3 className="text-base font-semibold">Project tidak ditemukan</h3>
          <p className="max-w-sm text-sm text-[var(--muted)]">
            Data tidak tersedia. Pastikan Supabase sudah dikonfigurasi dan ID project benar.
          </p>
        </div>
      )}
    </AdminShell>
  );
}
