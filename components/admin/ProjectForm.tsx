'use client';

import { useState } from 'react';
import {
  Braces,
  FileText,
  ImageIcon,
  Link2,
  Plus,
  Save,
  Tag,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageDropzone from '@/components/ImageDropzone';

export interface ProjectFormValues {
  title: string;
  tagline: string;
  description: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  duration: string;
  featured: boolean;
  status: 'published' | 'draft';
  technologies: string[];
  features: string[];
  code: { html: string; css: string; javascript: string };
  challenges: string;
  learnings: string;
}

interface ProjectFormProps {
  initialValues?: Partial<ProjectFormValues> & { banner?: string };
  submitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: ProjectFormValues, bannerFile: File | null) => void | Promise<void>;
  onCancel: () => void;
}

const TABS = [
  { id: 'info', label: 'Informasi', icon: FileText },
  { id: 'media', label: 'Media', icon: ImageIcon },
  { id: 'code', label: 'Kode', icon: Braces },
  { id: 'notes', label: 'Catatan', icon: Tag },
] as const;

type TabId = (typeof TABS)[number]['id'];

const EMPTY: ProjectFormValues = {
  title: '',
  tagline: '',
  description: '',
  category: '',
  liveUrl: '',
  githubUrl: '',
  duration: '',
  featured: false,
  status: 'draft',
  technologies: [],
  features: [],
  code: { html: '', css: '', javascript: '' },
  challenges: '',
  learnings: '',
};

/** Reusable chip/tag input used for technologies and feature lists. */
function ChipInput({
  label,
  placeholder,
  values,
  onChange,
}: {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (!v || values.includes(v)) {
      setDraft('');
      return;
    }
    onChange([...values, v]);
    setDraft('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <Button type="button" variant="outline" onClick={add} className="shrink-0">
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-xs text-[var(--muted)]"
            >
              {v}
              <button
                type="button"
                onClick={() => onChange(values.filter((x) => x !== v))}
                aria-label={`Hapus ${v}`}
                className="text-[var(--faint)] transition-colors hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectForm({
  initialValues,
  submitting = false,
  submitLabel = 'Simpan project',
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [tab, setTab] = useState<TabId>('info');
  const [values, setValues] = useState<ProjectFormValues>({ ...EMPTY, ...initialValues });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState(initialValues?.banner ?? '');
  const [error, setError] = useState('');

  const set = <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.title.trim() || !values.tagline.trim() || !values.description.trim()) {
      setError('Judul, tagline, dan deskripsi wajib diisi.');
      setTab('info');
      return;
    }
    setError('');
    void onSubmit(values, bannerFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
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

      {/* Panel */}
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
        {tab === 'info' && (
          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Judul project</Label>
                <Input
                  id="title"
                  value={values.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Mis. Dashboard Analitik Real-time"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={values.tagline}
                  onChange={(e) => set('tagline', e.target.value)}
                  placeholder="Satu kalimat yang menjelaskan project"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={values.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={6}
                  placeholder="Ceritakan latar belakang, tujuan, dan solusi yang dibangun"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={values.category}
                  onChange={(e) => set('category', e.target.value)}
                  placeholder="Web App"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durasi pengerjaan</Label>
                <Input
                  id="duration"
                  value={values.duration}
                  onChange={(e) => set('duration', e.target.value)}
                  placeholder="3 minggu"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  value={values.status}
                  onChange={(e) => set('status', e.target.value as 'published' | 'draft')}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Dipublikasikan</option>
                </Select>
              </div>

              <div className="flex items-end">
                <label className="flex h-10 cursor-pointer items-center gap-3 rounded-xl border border-[var(--input)] bg-[var(--surface)] px-3.5 transition-colors hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)]">
                  <input
                    type="checkbox"
                    checked={values.featured}
                    onChange={(e) => set('featured', e.target.checked)}
                    className="h-4 w-4 accent-black dark:accent-white"
                  />
                  <span className="text-sm">Jadikan project unggulan</span>
                </label>
              </div>
            </div>

            <div className="divider-x" />

            <ChipInput
              label="Teknologi"
              placeholder="Mis. Next.js lalu tekan Enter"
              values={values.technologies}
              onChange={(next) => set('technologies', next)}
            />

            <ChipInput
              label="Fitur utama"
              placeholder="Mis. Autentikasi OAuth lalu tekan Enter"
              values={values.features}
              onChange={(next) => set('features', next)}
            />
          </div>
        )}

        {tab === 'media' && (
          <div className="space-y-6">
            <ImageDropzone
              label="Banner project"
              preview={bannerPreview}
              onRemove={() => {
                setBannerPreview('');
                setBannerFile(null);
              }}
              onFileSelect={(file) => {
                setBannerFile(file);
                setBannerPreview(URL.createObjectURL(file));
              }}
            />

            <div className="divider-x" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Tautan live demo</Label>
                <div className="relative">
                  <Link2
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]"
                    strokeWidth={1.75}
                  />
                  <Input
                    id="liveUrl"
                    value={values.liveUrl}
                    onChange={(e) => set('liveUrl', e.target.value)}
                    placeholder="https://..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">Tautan repository</Label>
                <div className="relative">
                  <Link2
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]"
                    strokeWidth={1.75}
                  />
                  <Input
                    id="githubUrl"
                    value={values.githubUrl}
                    onChange={(e) => set('githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'code' && (
          <div className="space-y-6">
            {(
              [
                { key: 'html' as const, label: 'HTML', placeholder: '<section>...</section>' },
                { key: 'css' as const, label: 'CSS', placeholder: '.card { ... }' },
                { key: 'javascript' as const, label: 'JavaScript', placeholder: 'const init = () => {}' },
              ]
            ).map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`code-${key}`}>{label}</Label>
                <Textarea
                  id={`code-${key}`}
                  value={values.code[key]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, code: { ...v.code, [key]: e.target.value } }))
                  }
                  rows={8}
                  placeholder={placeholder}
                  className="font-mono text-[0.8125rem]"
                />
              </div>
            ))}
          </div>
        )}

        {tab === 'notes' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="challenges">Tantangan</Label>
              <Textarea
                id="challenges"
                value={values.challenges}
                onChange={(e) => set('challenges', e.target.value)}
                rows={6}
                placeholder="Hambatan teknis yang dihadapi dan bagaimana mengatasinya"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learnings">Pembelajaran</Label>
              <Textarea
                id="learnings"
                value={values.learnings}
                onChange={(e) => set('learnings', e.target.value)}
                rows={6}
                placeholder="Hal baru yang dipelajari dari project ini"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Batal
        </Button>
        <Button type="submit" disabled={submitting} className="group">
          <Save className="h-4 w-4" />
          {submitting ? 'Menyimpan...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
