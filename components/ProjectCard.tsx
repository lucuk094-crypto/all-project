'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, Code, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import TechBadge from './TechBadge';
import type { Project } from '@/lib/supabaseProjectService';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Glassmorphism Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-white/30 dark:from-white/5 dark:via-transparent dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-600 to-black dark:from-white dark:via-gray-400 dark:to-white opacity-10 blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* Banner Image with Parallax Effect */}
        {project.banner && (
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.img
              src={project.banner}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Gradient Overlay with Animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
            
            {/* Featured Badge with Glow */}
            {project.featured && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                Unggulan
              </motion.div>
            )}

            {/* Floating Code Icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4"
            >
              <div className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/50">
                <Code className="w-5 h-5 text-black" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Content with Glass Effect */}
        <div className="p-6 relative">
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/50 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            {/* Category Badge */}
            <motion.div 
              className="mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-black to-gray-800 text-white text-xs font-bold rounded-full shadow-md">
                {project.category}
              </span>
            </motion.div>

            {/* Title with Gradient on Hover */}
            <motion.h3 
              className="text-2xl font-bold text-black mb-2 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text group-hover:text-transparent transition-all duration-300"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.title}
            </motion.h3>

            {/* Tagline */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {project.tagline}
            </p>

            {/* Technologies with Stagger Animation */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                >
                  <TechBadge tech={tech} />
                </motion.div>
              ))}
              {project.technologies.length > 3 && (
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-md"
                >
                  +{project.technologies.length - 3}
                </motion.span>
              )}
            </motion.div>

            {/* Actions with Hover Effects */}
            <div className="flex items-center gap-3">
              <Link 
                href={`/projects/${project.slug}`}
                className="flex-1"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  Lihat Detail
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
              
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full hover:border-black dark:hover:border-white/30 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 shadow-md hover:shadow-lg"
                  title="Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
              
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full hover:border-black dark:hover:border-white/30 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 shadow-md hover:shadow-lg"
                  title="Source Code"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Corner Accent */}
      <motion.div
        className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      ></motion.div>
    </motion.div>
  );
}
