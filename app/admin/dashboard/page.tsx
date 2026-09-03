'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  FolderOpen, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  ExternalLink,
  LogOut,
  Terminal,
  CheckCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, getAllProjects, deleteProject } from '@/lib/supabaseProjectService';
import toast from 'react-hot-toast';

import { logError } from '@/lib/errorLogger';

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check authentication
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin_authenticated');
      if (isAuth !== 'true') {
        router.push('/admin/login');
        return;
      }
      setAuthenticated(true);
      loadProjects();
    }
  }, [router]);

  async function loadProjects() {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      logError('AdminDashboard - loadProjects', error);
      toast.error('Gagal memuat project');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      return;
    }

    const toastId = toast.loading('Menghapus project...');
    
    try {
      await deleteProject(id!);
      toast.success('Project berhasil dihapus!', { id: toastId });
      loadProjects();
    } catch (error) {
      logError('AdminDashboard - handleDelete', error);
      toast.error('Gagal menghapus project', { id: toastId });
    }
  }

  function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_authenticated');
      }
      toast.success('Berhasil keluar');
      router.push('/admin/login');
    }
  }

  // Prevent hydration mismatch
  if (!mounted || !authenticated) {
    return null;
  }

  const publishedProjects = projects.filter(p => p.status === 'published');
  const draftProjects = projects.filter(p => p.status === 'draft');
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white dark:text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black dark:text-white font-heading">Dashboard Admin</h1>
                <p className="text-xs text-gray-600 dark:text-white/70">Kelola Portfolio Anda</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" target="_blank">
                <Button variant="ghost" className="text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Lihat Website
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-gray-600 dark:text-white/70 hover:text-red-600 dark:hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2 font-heading">
                Selamat Datang Kembali! 👋
              </h2>
              <p className="text-gray-600 dark:text-white/70">
                Kelola semua project portfolio Anda dengan mudah
              </p>
            </div>
            <Link href="/admin/new">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 h-auto rounded-full transition-all duration-300">
                  <Plus className="w-5 h-5 mr-2" />
                  <span className="font-bold">Tambah Project</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white/90 dark:bg-black backdrop-blur-xl border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Total</span>
                  </div>
                  <p className="text-3xl font-bold text-black dark:text-white mb-1">{projects.length}</p>
                  <p className="text-sm text-gray-600 dark:text-white/70 font-medium">Total Project</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Published */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/90 dark:bg-black backdrop-blur-xl border border-gray-200/50 dark:border-white/10 hover:border-green-600 dark:hover:border-green-500 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Aktif</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{publishedProjects.length}</p>
                  <p className="text-sm text-gray-600 dark:text-white/70 font-medium">Sudah Dipublikasi</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Drafts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white/90 dark:bg-black backdrop-blur-xl border border-gray-200/50 dark:border-white/10 hover:border-yellow-600 dark:hover:border-yellow-500 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-600 dark:bg-yellow-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Draft</span>
                  </div>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{draftProjects.length}</p>
                  <p className="text-sm text-gray-600 dark:text-white/70 font-medium">Masih Draft</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-white/90 dark:bg-black backdrop-blur-xl border border-gray-200/50 dark:border-white/10 hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Unggulan</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{featuredProjects.length}</p>
                  <p className="text-sm text-gray-600 dark:text-white/70 font-medium">Project Unggulan</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Projects Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-black backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
              <div className="p-6 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white font-heading">Semua Project</h3>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Kelola, edit, atau hapus project Anda</p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-white/70">
                    Total: <span className="font-bold text-black dark:text-white">{projects.length}</span> project
                  </div>
                </div>
              </div>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-12 text-center">
                    <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-white/70 font-medium">Memuat project...</p>
                  </div>
                ) : projects.length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-white/10">
                    <AnimatePresence>
                      {projects.map((project, index) => (
                        <motion.div 
                          key={project.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors duration-200"
                        >
                      <div className="flex items-start gap-4">
                        {/* Banner Thumbnail */}
                        {project.banner && (
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                            <img 
                              src={project.banner} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-lg font-bold text-black dark:text-white font-heading">
                                  {project.title}
                                </h4>
                                {project.featured && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 text-xs font-bold rounded">
                                    <Star className="w-3 h-3" />
                                    Featured
                                  </span>
                                )}
                                <span className={`px-2 py-1 text-xs font-bold rounded ${
                                  project.status === 'published'
                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400'
                                    : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-400'
                                }`}>
                                  {project.status === 'published' ? 'Published' : 'Draft'}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-white/70 text-sm mb-3 line-clamp-2">{project.tagline}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded">
                                  {project.category}
                                </span>
                                {project.technologies.slice(0, 3).map((tech, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white text-xs font-medium rounded">
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/70 text-xs font-medium rounded">
                                    +{project.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                              title="Lihat live site"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </motion.a>
                          )}
                          <Link href={`/projects/${project.slug}`} target="_blank">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          </Link>
                          <Link href={`/admin/edit/${project.id}`}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-white/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          </Link>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(project.id!, project.title)}
                              className="text-gray-600 dark:text-white/70 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="w-10 h-10 text-gray-400 dark:text-white/50" />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-heading">Belum Ada Project</h3>
                    <p className="text-gray-600 dark:text-white/70 mb-6">Mulai tambahkan project pertama Anda</p>
                    <Link href="/admin/new">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 rounded-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Tambah Project Pertama
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
