'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AdminShell from '@/components/admin/AdminShell';
import ProjectForm, { type ProjectFormValues } from '@/components/admin/ProjectForm';
import { Skeleton } from '@/components/ui/badge';
import { fetchProject, updateProjectApi, uploadBannerApi } from '@/lib/adminApi';
import type { Project } from '@/lib/supabaseProjectService';

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
        const data = await fetchProject(id);
        if (alive) setProject(data);
      } catch (error) {
        if (alive) {
          toast.error(error instanceof Error ? error.message : 'Gagal memuat data project');
        }
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
        bannerUrl = await uploadBannerApi(bannerFile, project.slug);
      }

      await updateProjectApi(project.id, {
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
