'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  FolderOpen, 
  ArrowLeft, 
  Sparkles, 
  Github,
  Mail,
  Terminal,
  Rocket,
  Zap,
  Award,
  CheckCircle,
  Code,
  Database,
  Globe
} from 'lucide-react';
import { GridBackground } from '@/components/GridBackground';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AboutPage() {
  const skills = [
    { category: 'Frontend', icon: Globe, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
    { category: 'Backend', icon: Database, items: ['Node.js', 'Express', 'Firebase', 'PostgreSQL', 'REST API'] },
    { category: 'Tools', icon: Terminal, items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'npm/yarn'] },
    { category: 'Others', icon: Code, items: ['Python', 'Responsive Design', 'SEO', 'Web Performance'] },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6 text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold text-black dark:text-white font-heading">Portfolio</span>
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
                <Button className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 dark:from-black to-white dark:to-black overflow-hidden">
        <GridBackground variant="dots" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-black dark:text-white" />
              <span className="text-sm font-bold text-black dark:text-white">Tentang Saya</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-black dark:text-white mb-6 font-heading">
              Van-X313
            </h1>
            <p className="text-2xl text-gray-700 dark:text-white mb-4 font-medium">
              Full Stack Web Developer
            </p>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Passionate about crafting beautiful, functional, and scalable web applications
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Code, number: '15+', label: 'Project Selesai' },
              { icon: Zap, number: '8+', label: 'Teknologi' },
              { icon: Rocket, number: '2+', label: 'Tahun Pengalaman' },
              { icon: Award, number: '100%', label: 'Dedicated' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 text-center hover:border-black dark:hover:border-white/30 transition-all duration-300">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                  <p className="text-3xl font-bold text-black dark:text-white mb-1 font-heading">{stat.number}</p>
                  <p className="text-sm text-gray-600 dark:text-white/70 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4 font-heading">Siapa Saya?</h2>
                <div className="space-y-4 text-gray-700 dark:text-white leading-relaxed">
                  <p>
                    Halo! Saya <span className="font-bold text-black dark:text-white">Van-X313</span>, seorang Full Stack Web Developer yang 
                    berfokus pada pengembangan aplikasi web modern dengan performa tinggi dan user experience yang optimal.
                  </p>
                  <p>
                    Dengan pengalaman lebih dari 2 tahun dalam web development, saya telah membangun berbagai 
                    project mulai dari landing page sederhana hingga aplikasi web kompleks dengan sistem authentication, 
                    database management, dan real-time features.
                  </p>
                  <p>
                    Saya percaya bahwa kode yang baik adalah kode yang <span className="font-semibold text-black dark:text-white">clean, maintainable, dan scalable</span>. 
                    Setiap project yang saya kerjakan selalu mengutamakan best practices dalam coding standards, 
                    security, dan optimization.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10">
                <h3 className="text-xl font-bold text-black dark:text-white mb-4 flex items-center gap-2 font-heading">
                  <Terminal className="w-5 h-5" />
                  Keahlian Utama
                </h3>
                <ul className="space-y-3">
                  {[
                    'Membangun aplikasi web responsif dengan React & Next.js',
                    'Mengembangkan REST API dengan Node.js & Express',
                    'Database design & management (Firebase, PostgreSQL)',
                    'Modern UI/UX dengan Tailwind CSS & custom styling',
                    'Version control dengan Git & GitHub',
                    'Deployment & hosting (Vercel, Netlify, Firebase)',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Skills */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black dark:text-white mb-6 font-heading">Tech Stack</h2>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <div key={idx} className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="w-6 h-6 text-black dark:text-white" />
                          <h3 className="font-bold text-black dark:text-white font-heading">{skill.category}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skill.items.map((item) => (
                            <span key={item} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-black dark:bg-black/90 backdrop-blur-xl border border-transparent dark:border-white/10 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 font-heading">🎯 Fokus Saat Ini</h3>
                <ul className="space-y-3 text-gray-300 dark:text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-white dark:text-white">▸</span>
                    <span>Mendalami Next.js 15 & Server Components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white dark:text-white">▸</span>
                    <span>Belajar Web Performance Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white dark:text-white">▸</span>
                    <span>Eksplorasi AI Integration dalam Web Apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white dark:text-white">▸</span>
                    <span>Membangun portfolio project yang lebih kompleks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Logos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-12 font-heading">
            Teknologi yang Saya Kuasai
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* JavaScript */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 bg-[#F7DF1E] rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 256 256" className="w-12 h-12">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000" fontSize="180" fontWeight="bold" fontFamily="sans-serif">JS</text>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">JavaScript</span>
            </div>

            {/* TypeScript */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 bg-[#3178C6] rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 256 256" className="w-12 h-12">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFF" fontSize="180" fontWeight="bold" fontFamily="sans-serif">TS</text>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">TypeScript</span>
            </div>

            {/* React */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg viewBox="-11.5 -10.232 23 20.463" className="w-full h-full">
                  <circle r="2.05" fill="#61dafb"/>
                  <g stroke="#61dafb" fill="none">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                  </g>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">React</span>
            </div>

            {/* Next.js */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 180 180" className="w-full h-full">
                  <mask id="mask0_408_134" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="black"/>
                  </mask>
                  <g mask="url(#mask0_408_134)">
                    <circle cx="90" cy="90" r="90" fill="black"/>
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/>
                    <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">Next.js</span>
            </div>

            {/* Node.js */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 256 289" className="w-full h-full">
                  <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.326 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346c0-7.95 4.24-15.37 11.13-19.61L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 63.736c6.89 4.24 11.13 11.66 11.13 19.61v122.17c0 7.95-4.24 15.37-11.13 19.344L139.13 286.08c-3.445 1.59-7.42 2.385-11.13 2.385zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.916 1.06 2.916 2.65 2.12 14.041 8.215 20.936 36.306 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.372-28.887-2.915-46.907-9.275-46.907-32.33 0-21.467 18.02-34.186 48.232-34.186 33.921 0 50.617 11.66 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571z" fill="#539E43"/>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">Node.js</span>
            </div>

            {/* Python */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 256 255" className="w-full h-full">
                  <defs>
                    <linearGradient x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%" id="pythonA">
                      <stop stopColor="#387EB8" offset="0%"/>
                      <stop stopColor="#366994" offset="100%"/>
                    </linearGradient>
                    <linearGradient x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%" id="pythonB">
                      <stop stopColor="#FFE052" offset="0%"/>
                      <stop stopColor="#FFC331" offset="100%"/>
                    </linearGradient>
                  </defs>
                  <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pythonA)"/>
                  <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pythonB)"/>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">Python</span>
            </div>

            {/* Tailwind CSS */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 256 154" className="w-full h-full">
                  <defs>
                    <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="tailwindA">
                      <stop stopColor="#2298BD" offset="0%"/>
                      <stop stopColor="#0ED7B5" offset="100%"/>
                    </linearGradient>
                  </defs>
                  <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="url(#tailwindA)"/>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">Tailwind CSS</span>
            </div>

            {/* Firebase */}
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-black dark:hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 256 351" className="w-full h-full">
                  <defs>
                    <path id="firebaseA" d="M1.253 280.732l1.605-3.131 99.353-188.518-44.15-83.475C54.392-1.283 45.074.474 43.87 8.188L1.253 280.732z"/>
                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="firebaseB">
                      <feGaussianBlur stdDeviation="17.5" in="SourceAlpha" result="shadowBlurInner1"/>
                      <feOffset in="shadowBlurInner1" result="shadowOffsetInner1"/>
                      <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"/>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" in="shadowInnerInner1"/>
                    </filter>
                    <path id="firebaseC" d="M134.417 148.974l32.039-32.812-32.039-61.007c-3.042-5.791-10.433-6.398-13.443-.59l-17.705 34.109-.53 1.744 31.678 58.556z"/>
                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="firebaseD">
                      <feGaussianBlur stdDeviation="3.5" in="SourceAlpha" result="shadowBlurInner1"/>
                      <feOffset dx="1" dy="-9" in="shadowBlurInner1" result="shadowOffsetInner1"/>
                      <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"/>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" in="shadowInnerInner1"/>
                    </filter>
                  </defs>
                  <path d="M0 282.998l2.123-2.972L102.527 89.512l.212-2.017L58.48 4.358C54.77-2.606 44.33-.845 43.114 6.951L0 282.998z" fill="#FFC24A"/>
                  <use fill="#FFA712" fillRule="evenodd" xlinkHref="#firebaseA"/>
                  <use filter="url(#firebaseB)" xlinkHref="#firebaseA"/>
                  <path d="M135.005 150.38l32.955-33.75-32.965-62.93c-3.129-5.957-11.866-5.975-14.962 0L102.42 87.287v2.86l32.584 60.233z" fill="#F4BD62"/>
                  <use fill="#FFA50E" fillRule="evenodd" xlinkHref="#firebaseC"/>
                  <use filter="url(#firebaseD)" xlinkHref="#firebaseC"/>
                  <path fill="#F6820C" d="M0 282.998l.962-.968 3.496-1.42L128.477 128 64.86 57.762z"/>
                  <path fill="#FDE068" d="M139.121 347.551l116.275-64.847-33.204-204.495c-1.039-6.398-8.888-8.927-13.468-4.34L0 282.998l115.608 64.548a24.126 24.126 0 0 0 23.513.005"/>
                  <path fill="#FCCA3F" d="M254.354 282.16L221.402 79.218c-1.03-6.35-7.558-8.977-12.103-4.424L1.29 282.6l114.339 63.908a23.943 23.943 0 0 0 23.334.006l115.392-64.355z"/>
                  <path fill="#EEAB37" d="M139.12 345.64a24.126 24.126 0 0 1-23.512-.005L.931 282.015l-.93.983 115.607 64.548a24.126 24.126 0 0 0 23.513.005l116.275-64.847-.285-1.752-115.99 64.689z"/>
                </svg>
              </div>
              <span className="font-bold text-black dark:text-white text-sm group-hover:text-black dark:group-hover:text-white transition-colors">Firebase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black dark:bg-black/90 backdrop-blur-xl border border-transparent dark:border-white/10 text-white rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 font-heading">Mari Berkolaborasi!</h2>
            <p className="text-xl text-gray-300 dark:text-white mb-8 max-w-2xl mx-auto">
              Tertarik untuk bekerja sama atau punya pertanyaan? Jangan ragu untuk menghubungi saya!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/vanx313" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-white/10 text-black dark:text-white rounded-full font-bold hover:bg-gray-100 dark:hover:bg-white/20 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                GitHub Profile
              </a>
              <a 
                href="mailto:vanx313@example.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white dark:border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-black dark:hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email Saya
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-300 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-white/60">
                💡 Tip: Lihat portfolio project saya untuk melihat skill dalam action!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4 font-heading">
            Lihat Project Saya
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/70 mb-8">
            Jelajahi koleksi lengkap project yang telah saya kerjakan
          </p>
          <Link href="/projects">
            <Button size="lg" className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-12 py-6 text-lg font-bold rounded-full transition-all duration-300">
              Lihat Semua Project
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-heading">Portfolio</span>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors">
                Semua Project
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors">
                Tentang Saya
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
              © {new Date().getFullYear()} Van-X313. Crafted with <span className="text-red-500">❤️</span> using Next.js & TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
