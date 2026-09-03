'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X, Save, Terminal, Code, Link as LinkIcon, Settings, FileText } from 'lucide-react';
import { getProjectById, updateProject } from '@/lib/supabaseProjectService';
import { uploadProjectBanner } from '@/lib/supabaseStorageService';
import ImageDropzone from '@/components/ImageDropzone';
import slugify from 'slugify';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft'>('draft');
  
  // Technologies
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  
  // Features
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  
  // Code
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  
  // Optional fields
  const [challenges, setChallenges] = useState('');
  const [learnings, setLearnings] = useState('');
  
  // Banner
  const [currentBanner, setCurrentBanner] = useState('');
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (isAuth !== 'true') {
      router.push('/admin/login');
      return;
    }
    setAuthenticated(true);
    loadProject();
  }, [router, projectId]);

  async function loadProject() {
    try {
      const project = await getProjectById(projectId);
      if (!project) {
        alert('Project tidak ditemukan');
        router.push('/admin/dashboard');
        return;
      }

      // Set form values
      setTitle(project.title);
      setTagline(project.tagline);
      setDescription(project.description);
      setCategory(project.category);
      setLiveUrl(project.liveUrl || '');
      setGithubUrl(project.githubUrl || '');
      setDuration(project.duration || '');
      setFeatured(project.featured);
      setStatus(project.status);
      setTechnologies(project.technologies || []);
      setFeatures(project.features || []);
      setHtmlCode(project.code?.html || '');
      setCssCode(project.code?.css || '');
      setJsCode(project.code?.javascript || '');
      setChallenges(project.challenges || '');
      setLearnings(project.learnings || '');
      setCurrentBanner(project.banner || '');
      setBannerPreview(project.banner || '');
    } catch (error) {
      console.error('Error loading project:', error);
      alert('Gagal memuat project');
    } finally {
      setLoadingProject(false);
    }
  }

  const handleBannerSelect = (file: File) => {
    setBannerFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerRemove = () => {
    setBannerFile(null);
    setBannerPreview('');
    setCurrentBanner('');
  };

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !tagline || !description || !category) {
      alert('Mohon isi semua field yang wajib');
      return;
    }

    setLoading(true);

    try {
      // Generate slug from title
      const slug = slugify(title, { lower: true, strict: true });
      
      // Upload new banner if exists
      let bannerUrl = currentBanner;
      if (bannerFile) {
        bannerUrl = await uploadProjectBanner(bannerFile, slug);
      }

      // Update project
      await updateProject(projectId, {
        slug,
        title,
        tagline,
        description,
        banner: bannerUrl,
        liveUrl,
        githubUrl,
        technologies,
        category,
        code: {
          html: htmlCode,
          css: cssCode,
          javascript: jsCode,
        },
        featured,
        status,
        features,
        challenges,
        learnings,
        duration,
      });

      alert('Project berhasil diupdate!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Gagal mengupdate project');
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated || loadingProject) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-white/70 font-medium">Memuat project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="mb-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-2 font-heading">Edit Project</h1>
            <p className="text-gray-600 dark:text-white/70">Update informasi project Anda</p>
          </div>
          <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
            <Terminal className="w-6 h-6 text-white dark:text-black" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <FileText className="w-5 h-5" />
                Informasi Dasar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                    Judul Project *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Portfolio Website"
                    className="h-11 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                    Kategori *
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white [&>option]:bg-white [&>option]:dark:bg-black [&>option]:text-black [&>option]:dark:text-white"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Blog">Blog</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="tagline" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  Tagline *
                </Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Deskripsi singkat dalam satu kalimat"
                  className="h-11 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  Deskripsi Lengkap *
                </Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan project Anda secara detail..."
                  className="w-full min-h-32 px-4 py-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Banner Upload */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <Code className="w-5 h-5" />
                Banner Project
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ImageDropzone
                onFileSelect={handleBannerSelect}
                preview={bannerPreview}
                onRemove={handleBannerRemove}
                label="Upload Banner (1200x630 px recommended)"
              />
            </CardContent>
          </Card>

          {/* Links */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <LinkIcon className="w-5 h-5" />
                Link Project
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="liveUrl" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                    Live Website URL
                  </Label>
                  <Input
                    id="liveUrl"
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://project-anda.com"
                    className="h-11 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
                  />
                </div>

                <div>
                  <Label htmlFor="githubUrl" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                    GitHub Repository URL
                  </Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="h-11 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  Durasi Pengembangan
                </Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="contoh: 2 minggu, 1 bulan"
                  className="h-11 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <Code className="w-5 h-5" />
                Teknologi yang Digunakan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-2 mb-4">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  placeholder="contoh: React, TypeScript, Tailwind CSS"
                  className="h-11 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
                />
                <Button 
                  type="button" 
                  onClick={addTechnology}
                  className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span key={tech} className="inline-flex items-center gap-2 px-3 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium">
                      {tech}
                      <button type="button" onClick={() => removeTechnology(tech)} className="hover:text-gray-300 dark:hover:text-gray-700">
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <Settings className="w-5 h-5" />
                Fitur Utama
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-2 mb-4">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="contoh: User Authentication, Real-time Chat"
                  className="h-11 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
                />
                <Button 
                  type="button" 
                  onClick={addFeature}
                  className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {features.length > 0 && (
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-black/50 rounded-lg border-2 border-gray-200 dark:border-white/10">
                      <span className="font-medium text-gray-700 dark:text-white">{feature}</span>
                      <button type="button" onClick={() => removeFeature(index)} className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                        <X className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Source Code */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <Terminal className="w-5 h-5" />
                Source Code (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div>
                <Label htmlFor="html" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  HTML Code
                </Label>
                <textarea
                  id="html"
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  placeholder="Paste HTML code di sini..."
                  className="w-full min-h-32 px-4 py-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg font-mono text-sm focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <Label htmlFor="css" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  CSS Code
                </Label>
                <textarea
                  id="css"
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  placeholder="Paste CSS code di sini..."
                  className="w-full min-h-32 px-4 py-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg font-mono text-sm focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <Label htmlFor="js" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  JavaScript Code
                </Label>
                <textarea
                  id="js"
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  placeholder="Paste JavaScript code di sini..."
                  className="w-full min-h-32 px-4 py-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg font-mono text-sm focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <FileText className="w-5 h-5" />
                Informasi Tambahan (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div>
                <Label htmlFor="challenges" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  Tantangan yang Dihadapi
                </Label>
                <textarea
                  id="challenges"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Ceritakan tantangan apa yang Anda hadapi saat membuat project ini..."
                  className="w-full min-h-24 px-4 py-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <Label htmlFor="learnings" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  Pelajaran yang Didapat
                </Label>
                <textarea
                  id="learnings"
                  value={learnings}
                  onChange={(e) => setLearnings(e.target.value)}
                  placeholder="Apa yang Anda pelajari dari project ini..."
                  className="w-full min-h-24 px-4 py-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="bg-white dark:bg-black/90 border-2 border-gray-200 dark:border-white/10">
            <CardHeader className="border-b-2 border-gray-200 dark:border-white/10">
              <CardTitle className="flex items-center gap-2 font-heading text-black dark:text-white">
                <Settings className="w-5 h-5" />
                Pengaturan Project
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-black/50 rounded-lg border-2 border-gray-200 dark:border-white/10">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 text-black dark:text-white border-2 border-gray-300 dark:border-white/20 rounded focus:ring-black dark:focus:ring-white"
                />
                <Label htmlFor="featured" className="cursor-pointer font-semibold text-gray-700 dark:text-white">
                  Tandai sebagai Project Unggulan
                </Label>
              </div>

              <div>
                <Label htmlFor="status" className="text-sm font-semibold text-gray-700 dark:text-white mb-2 block">
                  Status Publikasi
                </Label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                  className="w-full h-11 px-3 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black dark:focus:ring-white [&>option]:bg-white [&>option]:dark:bg-black [&>option]:text-black [&>option]:dark:text-white"
                >
                  <option value="draft">Draft (Belum Dipublikasi)</option>
                  <option value="published">Published (Sudah Dipublikasi)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black h-14 text-lg font-bold"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Menyimpan Perubahan...
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Update Project
                </>
              )}
            </Button>
            <Link href="/admin/dashboard" className="flex-1">
              <Button type="button" variant="outline" className="w-full h-14 border-2 border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 text-lg font-semibold text-black dark:text-white">
                Batal
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
