import type { Project } from './supabaseProjectService';

/**
 * Sample content shown only while Supabase is not configured.
 * Remove this file (and its two usages) once the real database is connected.
 */
export const DEMO_PROJECTS: Project[] = [
  {
    id: 'demo-1',
    slug: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    tagline: 'Dashboard analitik real-time dengan visualisasi data yang responsif.',
    description:
      'Sebuah dashboard analitik yang menampilkan metrik produk secara real-time. Dibangun dengan fokus pada kecepatan muat dan kemudahan membaca data — mulai dari agregasi, caching bertingkat, hingga rendering grafik yang halus di perangkat apa pun.\n\nTantangan terbesar adalah menjaga performa saat volume data meningkat. Solusinya: agregasi di sisi basis data, streaming bertahap, dan virtualisasi daftar panjang.',
    banner: '/demo/banner-1.svg',
    screenshots: ['/demo/banner-2.svg', '/demo/banner-3.svg'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    category: 'Web App',
    code: {
      html: '<section class="stats">\n  <article class="card">\n    <h3>Active users</h3>\n    <p data-metric="users">—</p>\n  </article>\n</section>',
      css: '.stats {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.card {\n  border-radius: 1rem;\n  padding: 1.5rem;\n  background: var(--surface);\n}',
      javascript: 'async function loadMetrics() {\n  const res = await fetch("/api/metrics");\n  const data = await res.json();\n  render(data);\n}\n\nloadMetrics();',
    },
    featured: true,
    status: 'published',
    createdAt: '2025-08-12T09:00:00.000Z',
    updatedAt: '2025-09-02T09:00:00.000Z',
    features: ['Grafik real-time', 'Filter rentang waktu', 'Ekspor CSV', 'Mode gelap'],
    challenges:
      'Menggambar puluhan ribu titik data tanpa membuat browser tersendat, sambil menjaga animasi tetap halus.',
    learnings:
      'Virtualisasi dan agregasi di sisi server jauh lebih efektif daripada optimasi di sisi klien.',
    duration: '6 minggu',
  },
  {
    id: 'demo-2',
    slug: 'component-library',
    title: 'Design System & Component Library',
    tagline: 'Sistem desain terukur dengan dokumentasi interaktif.',
    description:
      'Satu sumber kebenaran untuk warna, tipografi, spasi, dan komponen. Dibangun agar tim dapat bergerak cepat tanpa mengorbankan konsistensi antarmuka.\n\nSetiap komponen disertai dokumentasi, contoh penggunaan, dan panduan aksesibilitas.',
    banner: '/demo/banner-2.svg',
    screenshots: ['/demo/banner-4.svg'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/',
    technologies: ['React', 'TypeScript', 'Radix UI', 'Storybook'],
    category: 'Design System',
    code: {
      html: '<button class="btn btn-primary" type="button">\n  Simpan perubahan\n</button>',
      css: '.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: .5rem;\n  border-radius: .75rem;\n  padding: .625rem 1rem;\n  font-weight: 500;\n}',
      javascript: 'export const Button = ({ variant = "primary", ...props }) => (\n  <button className={`btn btn-${variant}`} {...props} />\n);',
    },
    featured: true,
    status: 'published',
    createdAt: '2025-06-20T09:00:00.000Z',
    updatedAt: '2025-08-01T09:00:00.000Z',
    features: ['Token warna & spasi', 'Komponen aksesibel', 'Dokumentasi hidup', 'Theming'],
    challenges: 'Menjaga agar sistem tetap sederhana dipakai tanpa kehilangan fleksibilitas.',
    learnings: 'Konvensi yang jelas lebih berharga daripada konfigurasi yang serba bisa.',
    duration: '4 minggu',
  },
  {
    id: 'demo-3',
    slug: 'booking-platform',
    title: 'Booking Platform',
    tagline: 'Platform pemesanan dengan ketersediaan waktu nyata.',
    description:
      'Sistem pemesanan layanan lengkap dengan kalender ketersediaan, konfirmasi otomatis, dan panel admin. Konflik jadwal dicegah langsung di lapisan basis data.',
    banner: '/demo/banner-3.svg',
    screenshots: [],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/',
    technologies: ['Next.js', 'Supabase', 'PostgreSQL', 'Framer Motion'],
    category: 'Web App',
    code: {
      html: '<form id="booking">\n  <input type="date" name="date" required />\n  <button type="submit">Pesan</button>\n</form>',
      css: 'form {\n  display: grid;\n  gap: .75rem;\n  max-width: 24rem;\n}',
      javascript: 'form.addEventListener("submit", async (e) => {\n  e.preventDefault();\n  await fetch("/api/bookings", { method: "POST", body: new FormData(e.target) });\n});',
    },
    featured: false,
    status: 'published',
    createdAt: '2025-04-02T09:00:00.000Z',
    updatedAt: '2025-06-15T09:00:00.000Z',
    features: ['Ketersediaan real-time', 'Konfirmasi email', 'Panel admin', 'Riwayat pesanan'],
    challenges: 'Race condition saat dua pengguna memesan slot yang sama di saat bersamaan.',
    learnings: 'Constraint di basis data adalah lapisan terakhir yang paling bisa diandalkan.',
    duration: '5 minggu',
  },
  {
    id: 'demo-4',
    slug: 'api-gateway',
    title: 'API Gateway & Rate Limiter',
    tagline: 'Gerbang API dengan pembatasan laju dan observabilitas.',
    description:
      'Lapisan gerbang untuk mengamankan dan memantau lalu lintas API internal: autentikasi, pembatasan laju, pencatatan terstruktur, dan dasbor pemantauan.',
    banner: '/demo/banner-4.svg',
    screenshots: [],
    liveUrl: '',
    githubUrl: 'https://github.com/',
    technologies: ['Node.js', 'Redis', 'Docker', 'Grafana'],
    category: 'Backend',
    code: {
      html: '',
      css: '',
      javascript: 'const key = `rl:${req.ip}`;\nconst hits = await redis.incr(key);\nif (hits === 1) await redis.expire(key, 60);\nif (hits > 100) return res.status(429).end();',
    },
    featured: false,
    status: 'published',
    createdAt: '2025-02-10T09:00:00.000Z',
    updatedAt: '2025-03-28T09:00:00.000Z',
    features: ['Rate limiting', 'Autentikasi API key', 'Log terstruktur', 'Dasbor metrik'],
    challenges: 'Menjaga latensi tetap rendah walau setiap permintaan melewati beberapa pemeriksaan.',
    learnings: 'Pencatatan yang baik menghemat waktu debugging berminggu-minggu.',
    duration: '3 minggu',
  },
  {
    id: 'demo-5',
    slug: 'motion-portfolio',
    title: 'Motion Portfolio',
    tagline: 'Eksperimen animasi antarmuka yang halus dan bermakna.',
    description:
      'Kumpulan eksperimen motion: transisi halaman, parallax, dan mikro-interaksi. Semua diuji pada perangkat rendah dan mematuhi prefers-reduced-motion.',
    banner: '/demo/banner-5.svg',
    screenshots: ['/demo/banner-1.svg', '/demo/banner-6.svg'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/',
    technologies: ['Framer Motion', 'React', 'GSAP', 'CSS'],
    category: 'Experiment',
    code: {
      html: '<div class="stage">\n  <div class="layer" data-depth="0.4"></div>\n  <div class="layer" data-depth="0.8"></div>\n</div>',
      css: '.stage { position: relative; perspective: 1200px; }\n.layer { transform: translate3d(0,0,0); will-change: transform; }',
      javascript: 'const onMove = (e) => {\n  const x = (e.clientX / innerWidth - 0.5) * 2;\n  layer.style.transform = `translate3d(${x * 32}px,0,0)`;\n};',
    },
    featured: false,
    status: 'published',
    createdAt: '2025-01-08T09:00:00.000Z',
    updatedAt: '2025-02-20T09:00:00.000Z',
    features: ['Parallax bertingkat', 'Transisi halaman', 'Reduced-motion support', '60fps'],
    challenges: 'Menjaga animasi tetap 60 fps di perangkat kelas menengah.',
    learnings: 'Hanya animasikan transform dan opacity; sisanya biarkan di CSS.',
    duration: '2 minggu',
  },
  {
    id: 'demo-6',
    slug: 'markdown-cms',
    title: 'Headless CMS Ringan',
    tagline: 'CMS berbasis Markdown dengan pratinjau langsung.',
    description:
      'Sistem manajemen konten sederhana untuk blog dan dokumentasi: berkas Markdown, pratinjau langsung, dan prerender statis untuk kecepatan maksimal.',
    banner: '/demo/banner-6.svg',
    screenshots: [],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/',
    technologies: ['Next.js', 'MDX', 'TypeScript', 'Vercel'],
    category: 'Tooling',
    code: {
      html: '<article class="prose">{{{content}}}</article>',
      css: '.prose { max-width: 68ch; line-height: 1.75; }\n.prose h2 { margin-top: 2rem; letter-spacing: -.02em; }',
      javascript: 'const posts = await getAllPosts();\nreturn posts.map((p) => ({ params: { slug: p.slug } }));',
    },
    featured: false,
    status: 'published',
    createdAt: '2024-11-14T09:00:00.000Z',
    updatedAt: '2025-01-05T09:00:00.000Z',
    features: ['Pratinjau langsung', 'Prerender statis', 'Pencarian', 'SEO otomatis'],
    challenges: 'Menyeimbangkan kebebasan menulis dengan struktur konten yang konsisten.',
    learnings: 'Validasi skema di awal mencegah banyak masalah di kemudian hari.',
    duration: '3 minggu',
  },
];

export function getDemoFeatured(): Project[] {
  return DEMO_PROJECTS.filter((p) => p.featured);
}

export function getDemoBySlug(slug: string): Project | null {
  return DEMO_PROJECTS.find((p) => p.slug === slug) ?? null;
}
