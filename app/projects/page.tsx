'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderOpen, Search, Filter, ArrowLeft, Grid3X3, List, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { GridBackground } from '@/components/GridBackground';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Project, getPublishedProjects } from '@/lib/supabaseProjectService';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getPublishedProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Extract unique categories and technologies
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const technologies = ['all', ...Array.from(new Set(projects.flatMap(p => p.technologies)))];

  // Filter projects
  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(lower) ||
        p.tagline.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.technologies.some(t => t.toLowerCase().includes(lower))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Technology filter
    if (selectedTech !== 'all') {
      filtered = filtered.filter(p => p.technologies.includes(selectedTech));
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, selectedTech, projects]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6 text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold text-black dark:text-white">Portfolio</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost" className="text-black dark:text-white font-semibold">
                  Projects
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  About
                </Button>
              </Link>
              <ThemeToggle />
              <Link href="/admin">
                <Button className="bg-black dark:bg-white hover:shadow-lg dark:hover:shadow-lg text-white dark:text-black rounded-full">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <GridBackground variant="dots" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Button variant="ghost" className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-4"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              All Projects
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Browse through my collection of {projects.length} web development projects
            </motion.p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/10 p-6 mb-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <motion.div 
                className="md:col-span-2 relative"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white/30 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-full transition-all duration-300"
                />
              </motion.div>

              {/* Category Filter */}
              <motion.select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 border border-gray-200 dark:border-white/10 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl text-black dark:text-white focus:border-black dark:focus:border-white/30 focus:ring-0 transition-all duration-300 [&>option]:bg-white [&>option]:dark:bg-black [&>option]:text-black [&>option]:dark:text-white"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </motion.select>

              {/* Technology Filter */}
              <motion.select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="h-12 px-4 border border-gray-200 dark:border-white/10 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl text-black dark:text-white focus:border-black dark:focus:border-white/30 focus:ring-0 transition-all duration-300 [&>option]:bg-white [&>option]:dark:bg-black [&>option]:text-black [&>option]:dark:text-white"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <option value="all">All Technologies</option>
                {technologies.filter(t => t !== 'all').map((tech) => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </motion.select>
            </div>

            {/* Results and View Toggle */}
            <motion.div 
              className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-black dark:text-white">{filteredProjects.length}</span> of <span className="font-semibold text-black dark:text-white">{projects.length}</span> projects
              </p>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                      : 'bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                      : 'bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="relative pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <GridBackground variant="lines" />
        <div className="max-w-7xl mx-auto relative z-10">
          {loading ? (
            <motion.div 
              className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-sm animate-pulse border border-gray-200/50 dark:border-white/10"
                >
                  <div className="h-48 bg-gray-200 dark:bg-white/10 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${viewMode}-${selectedCategory}-${selectedTech}-${searchTerm}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20 bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-sm"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">No Projects Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters or search term</p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedTech('all');
                  }}
                  variant="outline"
                  className="border-2 border-gray-200 dark:border-white/20 rounded-full"
                >
                  Clear Filters
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
