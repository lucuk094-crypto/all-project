'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import slugify from 'slugify';
import AdminShell from '@/components/admin/AdminShell';
import ProjectForm, { type ProjectFormValues } from '@/components/admin/ProjectForm';
import { createProjectApi, uploadBannerApi } from '@/lib/adminApi';

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = async (values: ProjectFormValues, bannerFile: File | null) => {
    try {
      const slug = slugify(values.title, { lower: true, strict: true });

      let bannerUrl = '';
      if (bannerFile) {
        try {
          bannerUrl = await uploadBannerApi(bannerFile, slug);
        } catch (uploadError) {
          const message =
            uploadError instanceof Error ? uploadError.message : 'Gagal mengunggah banner';
          toast.error(`Gagal mengunggah banner: ${message}`);
          return;
        }
      }

      await createProjectApi({
        slug,
        title: values.title,
        tagline: values.tagline,
        description: values.description,
        banner: bannerUrl,
        screenshots: [],
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

      toast.success('Project berhasil dibuat');
      router.push('/admin/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
      toast.error(`Gagal membuat project: ${message}`);
    }
  };

  return (
    <AdminShell
      title="Project baru"
      subtitle="Lengkapi informasi di bawah untuk menambahkan project ke portfolio."
    >
      <ProjectForm
        submitLabel="Buat project"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/dashboard')}
      />
    </AdminShell>
  );
}
