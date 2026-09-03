'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CodeViewer from '@/components/CodeViewer';
import TechBadge from '@/components/TechBadge';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Clock,
  CheckCircle,
  FolderOpen,
  Sparkles
} from 'lucide-react';
import { Project, getProjectBySlug } from '@/lib/supabaseProjectService';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'code'>('overview');

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button className="bg-black hover:bg-gray-800 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FolderOpen className="w-6 h-6 text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold text-black dark:text-white">Portfolio</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Projects
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-full">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/projects">
            <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>

          {/* Banner Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
            {project.banner ? (
              <Image
                src={project.banner}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FolderOpen className="w-24 h-24 text-white opacity-50" />
              </div>
            )}
            
            {project.featured && (
              <div className="absolute top-6 right-6 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Featured
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Description */}
              <Card className="bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white/90 dark:bg-white/10 border border-gray-200/50 dark:border-white/10 text-black dark:text-white text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                    {project.title}
                  </h1>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    {project.tagline}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Site
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="border border-gray-200 dark:border-white/10 hover:border-black dark:hover:border-white/30 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-full transition-all duration-300">
                          <Github className="w-4 h-4 mr-2" />
                          View Source Code
                        </Button>
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                      <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Challenges & Learnings */}
                  {(project.challenges || project.learnings) && (
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 space-y-6">
                      {project.challenges && (
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white mb-3">Challenges</h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.challenges}</p>
                        </div>
                      )}
                      {project.learnings && (
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white mb-3">What I Learned</h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.learnings}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tabs: Overview / Code */}
              <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-white/10">
                <div className="border-b border-gray-200 dark:border-white/10">
                  <div className="flex gap-4 px-6">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`py-4 px-4 font-semibold border-b-2 transition-all duration-300 ${
                        activeTab === 'overview'
                          ? 'border-black dark:border-white text-black dark:text-white'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`py-4 px-4 font-semibold border-b-2 transition-all duration-300 ${
                        activeTab === 'code'
                          ? 'border-black dark:border-white text-black dark:text-white'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Source Code
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' ? (
                    <div className="space-y-6">
                      {/* Screenshots */}
                      {project.screenshots && project.screenshots.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white mb-4">Screenshots</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {project.screenshots.map((screenshot, index) => (
                              <div key={index} className="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300">
                                <Image
                                  src={screenshot}
                                  alt={`Screenshot ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <CodeViewer code={project.code} theme="dark" />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card className="bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">Project Info</h3>
                  
                  <div className="space-y-4">
                    {project.duration && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="font-medium text-black dark:text-white">{project.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.createdAt && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                          <p className="font-medium text-black dark:text-white">
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <TechBadge key={index} tech={tech} size="md" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Links */}
              <Card className="bg-black dark:bg-white/5 backdrop-blur-xl text-white dark:text-white border-0 dark:border dark:border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Like this project?</h3>
                  <p className="text-gray-300 dark:text-gray-400 mb-4">
                    Check out more of my work or get in touch!
                  </p>
                  <Link href="/projects">
                    <Button className="w-full bg-white dark:bg-white/10 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 mb-2 rounded-full transition-all duration-300">
                      View All Projects
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" className="w-full border-white dark:border-white/30 text-white hover:bg-white hover:text-black dark:hover:bg-white/10 rounded-full transition-all duration-300">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
