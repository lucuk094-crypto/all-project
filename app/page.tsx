'use client';

import React, { useState, useEffect } from 'react';
import { FolderOpen, Code, Terminal, ArrowRight, CheckCircle, Github, Menu, X, Sparkles, Play } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GridBackground } from '@/components/GridBackground';
import { TechStackSection } from '@/components/TechStackSection';
import { TiltCard } from '@/components/TiltCard';
import { Project, getFeaturedProjects } from '@/lib/supabaseProjectService';

import { logError } from '@/lib/errorLogger';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadFeaturedProjects() {
      try {
        const projects = await getFeaturedProjects();
        setFeaturedProjects(projects.slice(0, 3));
      } catch (error) {
        logError('HomePage - loadFeaturedProjects', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProjects();
  }, []);

  const stats = [
    { number: '10+', label: 'Project Selesai', icon: Code },
    { number: '5+', label: 'Teknologi', icon: Terminal },
    { number: '1000+', label: 'Baris Kode', icon: Play },
    { number: '100%', label: 'Open Source', icon: Sparkles }
  ];

  const technologies = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Firebase', 'PostgreSQL', 'Git'];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-white/10' 
          : 'bg-white/60 dark:bg-black/60 backdrop-blur-md border-b border-gray-100/50 dark:border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-colors"
              >
                <Terminal className="w-6 h-6 text-white dark:text-black" />
              </motion.div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black dark:text-white">Portfolio</span>
                <span className="px-2.5 py-1 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 text-white dark:text-black text-xs font-bold rounded-md shadow-sm">
                  SHOWCASE
                </span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium">
                Projects
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium">
                About
              </Link>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Link href="/admin">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-semibold shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    Admin Panel
                  </motion.div>
                </Link>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3 pb-4"
            >
              <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors py-2">
                Projects
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors py-2">
                About
              </Link>
              <Link href="/admin" className="block px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-center font-semibold">
                Admin Panel
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-white dark:bg-black relative overflow-hidden transition-colors">
        {/* Grid Background */}
        <GridBackground variant="dots" />
        
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-gray-100 dark:from-white/5 to-transparent rounded-full blur-3xl opacity-50 z-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-gray-100 dark:from-white/5 to-transparent rounded-full blur-3xl opacity-50 z-0"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-full backdrop-blur-xl"
                whileHover={{ scale: 1.05, borderColor: "#000" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Sparkles className="w-4 h-4 text-black dark:text-white" />
                <span className="text-sm font-semibold text-black dark:text-white">Portfolio Web Developer</span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Koleksi Project
                  <motion.span 
                    className="block mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Van-X313.Dev
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Jelajahi koleksi project web development dengan teknologi modern, 
                  kode bersih, dan desain responsif. Dari website sederhana hingga 
                  aplikasi web yang kompleks.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link href="/projects" className="group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                  >
                    Lihat Semua Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
                <motion.a 
                  href="#featured"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white dark:bg-white/5 border-2 border-black dark:border-white/20 text-black dark:text-white rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/10 backdrop-blur-xl transition-all text-center"
                >
                  Project Unggulan
                </motion.a>
              </motion.div>

              <motion.div 
                className="flex flex-wrap items-center gap-6 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                {[
                  { icon: CheckCircle, text: 'Teknologi Modern' },
                  { icon: CheckCircle, text: 'Desain Responsif' },
                  { icon: CheckCircle, text: 'Kode Bersih' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                  >
                    <item.icon className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Modern Glassmorphism Python Code Card */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div 
                className="bg-white/90 dark:bg-white/5 backdrop-blur-2xl rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Modern Window Header */}
                <div className="bg-gray-100/80 dark:bg-black/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500/80"></motion.div>
                      <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500/80"></motion.div>
                      <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500/80"></motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-white/70 font-medium">
                    <Code className="w-4 h-4" />
                    <span>developer.py</span>
                  </div>
                </div>

                {/* Python Code Content with Glassmorphism */}
                <div className="p-8 font-mono text-sm h-96 overflow-hidden relative bg-gradient-to-br from-gray-50/50 via-white/30 to-gray-100/50 dark:from-black/20 dark:via-black/30 dark:to-black/40">
                  <div className="animate-scroll-slow">
                    <pre className="text-gray-800 dark:text-white/90 leading-relaxed">
                      <span className="text-gray-500 dark:text-gray-400"># Developer Profile</span>
                      {'\n'}
                      <span className="text-purple-600 dark:text-purple-400">class</span> <span className="text-yellow-600 dark:text-yellow-300">Developer</span>:{'\n'}
                      {'    '}<span className="text-purple-600 dark:text-purple-400">def</span> <span className="text-blue-600 dark:text-blue-300">__init__</span>(<span className="text-orange-600 dark:text-orange-300">self</span>):{'\n'}
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.name = <span className="text-green-600 dark:text-green-300">"Van-X313"</span>{'\n'}
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.role = <span className="text-green-600 dark:text-green-300">"Full Stack Developer"</span>{'\n'}
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.location = <span className="text-green-600 dark:text-green-300">"Indonesia"</span>{'\n\n'}
                      
                      {'        '}<span className="text-gray-500 dark:text-gray-400"># Tech Stack</span>{'\n'}
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.frontend = [{'\n'}
                      {'            '}<span className="text-green-600 dark:text-green-300">"React"</span>, <span className="text-green-600 dark:text-green-300">"Next.js"</span>,{'\n'}
                      {'            '}<span className="text-green-600 dark:text-green-300">"TypeScript"</span>, <span className="text-green-600 dark:text-green-300">"Tailwind"</span>{'\n'}
                      {'        '}{']'}{'\n\n'}
                      
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.backend = [{'\n'}
                      {'            '}<span className="text-green-600 dark:text-green-300">"Node.js"</span>, <span className="text-green-600 dark:text-green-300">"Python"</span>,{'\n'}
                      {'            '}<span className="text-green-600 dark:text-green-300">"PostgreSQL"</span>, <span className="text-green-600 dark:text-green-300">"Firebase"</span>{'\n'}
                      {'        '}{']'}{'\n\n'}
                      
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.tools = [{'\n'}
                      {'            '}<span className="text-green-600 dark:text-green-300">"Git"</span>, <span className="text-green-600 dark:text-green-300">"VS Code"</span>,{'\n'}
                      {'            '}<span className="text-green-600 dark:text-green-300">"Figma"</span>, <span className="text-green-600 dark:text-green-300">"Vercel"</span>{'\n'}
                      {'        '}{']'}{'\n\n'}
                      
                      {'    '}<span className="text-purple-600 dark:text-purple-400">def</span> <span className="text-blue-600 dark:text-blue-300">get_skills</span>(<span className="text-orange-600 dark:text-orange-300">self</span>):{'\n'}
                      {'        '}<span className="text-purple-600 dark:text-purple-400">return</span> {'\n'}
                      {'            '}<span className="text-cyan-600 dark:text-cyan-300">'frontend'</span>: <span className="text-orange-600 dark:text-orange-300">self</span>.frontend,{'\n'}
                      {'            '}<span className="text-cyan-600 dark:text-cyan-300">'backend'</span>: <span className="text-orange-600 dark:text-orange-300">self</span>.backend,{'\n'}
                      {'            '}<span className="text-cyan-600 dark:text-cyan-300">'tools'</span>: <span className="text-orange-600 dark:text-orange-300">self</span>.tools{'\n'}
                      {'        }'}
                      {'\n\n'}
                      {'    '}<span className="text-purple-600 dark:text-purple-400">def</span> <span className="text-blue-600 dark:text-blue-300">build_projects</span>(<span className="text-orange-600 dark:text-orange-300">self</span>):{'\n'}
                      {'        '}<span className="text-gray-500 dark:text-gray-400"># Create modern web apps</span>{'\n'}
                      {'        '}projects = <span className="text-blue-600 dark:text-blue-300">self</span>.<span className="text-yellow-600 dark:text-yellow-300">design</span>() + <span className="text-blue-600 dark:text-blue-300">self</span>.<span className="text-yellow-600 dark:text-yellow-300">code</span>(){'\n'}
                      {'        '}<span className="text-purple-600 dark:text-purple-400">return</span> <span className="text-blue-600 dark:text-blue-300">self</span>.<span className="text-yellow-600 dark:text-yellow-300">deploy</span>(projects){'\n\n'}
                      
                      <span className="text-gray-500 dark:text-gray-400"># Initialize Developer</span>{'\n'}
                      developer = <span className="text-yellow-600 dark:text-yellow-300">Developer</span>(){'\n'}
                      <span className="text-blue-600 dark:text-blue-300">print</span>(<span className="text-green-600 dark:text-green-300">f"</span><span className="text-green-600 dark:text-green-300">{'{'}</span>developer.name<span className="text-green-600 dark:text-green-300">{'}'}</span> <span className="text-green-600 dark:text-green-300">- </span><span className="text-green-600 dark:text-green-300">{'{'}</span>developer.role<span className="text-green-600 dark:text-green-300">{'}'}</span><span className="text-green-600 dark:text-green-300">"</span>){'\n'}
                      developer.<span className="text-yellow-600 dark:text-yellow-300">build_projects</span>(){'\n\n'}
                      
                      {/* Duplicate for seamless loop */}
                      <span className="text-gray-500 dark:text-gray-400"># Developer Profile</span>
                      {'\n'}
                      <span className="text-purple-600 dark:text-purple-400">class</span> <span className="text-yellow-600 dark:text-yellow-300">Developer</span>:{'\n'}
                      {'    '}<span className="text-purple-600 dark:text-purple-400">def</span> <span className="text-blue-600 dark:text-blue-300">__init__</span>(<span className="text-orange-600 dark:text-orange-300">self</span>):{'\n'}
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.name = <span className="text-green-600 dark:text-green-300">"Van-X313"</span>{'\n'}
                      {'        '}<span className="text-orange-600 dark:text-orange-300">self</span>.role = <span className="text-green-600 dark:text-green-300">"Full Stack Developer"</span>{'\n'}
                    </pre>
                  </div>
                  
                  {/* Enhanced Gradient Overlays */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
                </div>

                {/* Modern Footer Badge */}
                <div className="bg-black/30 dark:bg-black/50 backdrop-blur-xl px-6 py-3 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-white/70 font-medium">Python 3.11</span>
                  </div>
                  <span className="text-xs text-white/50">UTF-8</span>
                </div>
              </motion.div>

              {/* Floating Accent Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <TiltCard key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + idx * 0.1, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-white/10 text-center hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                    </motion.div>
                    <motion.p 
                      className="text-3xl font-bold text-black dark:text-white mb-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                  </motion.div>
                </TiltCard>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured" className="relative py-24 px-6 bg-gray-50 dark:bg-black overflow-hidden transition-colors">
        {/* Grid Background */}
        <GridBackground variant="lines" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Project Unggulan</span>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Project Pilihan
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Lihat beberapa project terbaru dan project personal saya
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-sm animate-pulse border border-gray-200/50 dark:border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="h-48 bg-gray-200 dark:bg-white/10 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
                </motion.div>
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/projects">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block px-8 py-4 bg-white dark:bg-white/5 border-2 border-black dark:border-white/20 text-black dark:text-white rounded-full font-bold hover:bg-gray-50 dark:hover:bg-white/10 backdrop-blur-xl transition-all cursor-pointer"
                  >
                    Lihat Semua Project
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div 
              className="text-center py-16 bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Belum Ada Project Unggulan</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Mulai tambahkan project untuk memamerkan karya Anda!</p>
              <Link href="/admin">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:shadow-lg transition-all cursor-pointer"
                >
                  Tambah Project Pertama
                </motion.div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Types Section */}
      <section className="relative py-24 px-6 bg-white dark:bg-black transition-colors overflow-hidden">
        <GridBackground variant="grid" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Semua Yang Anda Butuhkan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ekosistem portfolio lengkap yang menampilkan berbagai jenis project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Web Applications */}
            <TiltCard>
              <motion.div 
                className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all group h-full shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FolderOpen className="w-7 h-7 text-white dark:text-black" />
                </div>
                <div className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full mb-4">
                  BUILD
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  Aplikasi Web
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Aplikasi web full-stack dengan framework modern seperti React, Next.js, dan Node.js. Sistem CRUD lengkap dengan autentikasi dan integrasi database.
                </p>
              </motion.div>
            </TiltCard>

            {/* Card 2: UI/UX Projects */}
            <TiltCard>
              <motion.div 
                className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all group h-full shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-white dark:text-black" />
                </div>
                <div className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full mb-4">
                  DESIGN
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  Desain UI/UX
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Interface pengguna yang responsif dan indah menggunakan Tailwind CSS, Material-UI, dan custom CSS. Desain mobile-first dengan animasi yang smooth.
                </p>
              </motion.div>
            </TiltCard>

            {/* Card 3: API & Backend */}
            <TiltCard>
              <motion.div 
                className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all group h-full shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-7 h-7 text-white dark:text-black" />
                </div>
                <div className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full mb-4">
                  BACKEND
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  API & Sistem Backend
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  RESTful API, layanan backend Firebase, real-time database, dan cloud functions. Sistem autentikasi dan manajemen data yang aman.
                </p>
              </motion.div>
            </TiltCard>

            {/* Card 4: Open Source */}
            <TiltCard>
              <motion.div 
                className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all group h-full shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Github className="w-7 h-7 text-white dark:text-black" />
                </div>
                <div className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full mb-4">
                  SHARE
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  Project Open Source
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Semua project dengan source code lengkap tersedia di GitHub. Dokumentasi detail, struktur kode yang bersih, dan panduan deployment.
                </p>
              </motion.div>
            </TiltCard>
          </div>

          {/* Stats Bar */}
          <motion.div 
            className="mt-16 bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-white/10 transition-colors shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-black dark:text-white mb-2">15+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Aplikasi Web</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-black dark:text-white mb-2">8+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Teknologi Dikuasai</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-black dark:text-white mb-2">100%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Desain Responsif</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-black dark:text-white mb-2">24/7</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Live Demo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section - NEW with SVG Icons & Grid Background */}
      <TechStackSection />

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-black dark:bg-black text-white overflow-hidden">
        <GridBackground variant="dots" className="opacity-10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interested in My Work?
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Explore all my projects or get in touch to discuss potential collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                View All Projects
              </motion.div>
            </Link>
            <a href="https://github.com/vanx313" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-white/5 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Github className="w-5 h-5" />
                GitHub Profile
              </motion.div>
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Open Source
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Live Demos
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Full Code Access
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-colors">
                <Terminal className="w-6 h-6 text-white dark:text-black" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-black dark:text-white">Portfolio</span>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors">
                All Projects
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors">
                About Me
              </Link>
              <a 
                href="https://github.com/vanx313" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Van-X313. Crafted with <span className="text-red-500">❤️</span> for showcasing amazing projects
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
