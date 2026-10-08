# Modern Portfolio Website

Portfolio website dengan tema **Clean Minimalist Modern Premium** — monokrom, dark-first, berlatar aurora 3D, dan responsif penuh dari mobile hingga desktop.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Live:** https://dashbord-all-project.vercel.app

---

## Fitur

### Tampilan
- **Latar aurora 3D** di setiap halaman — gradient mesh beranimasi, grid lantai perspektif, parallax kursor & scroll
- **Monokrom premium** — near-black berlapis, aksen gradien putih ke abu
- **Kartu project elegan** — banner desaturasi yang berwarna saat hover, spotlight mengikuti kursor, sheen border
- **Navigasi bawah mobile** (auto-hide saat scroll) + navbar mengambang di desktop
- **Tipografi** Inter (display) + Geist Sans (isi) + Geist Mono (label)
- **Ikon Lucide** konsisten di seluruh antarmuka
- Mode gelap & terang, skeleton loading, dan 404 khusus

### Konten
- Panel admin CRUD lengkap dengan form bertab dan unggah banner
- Pencarian + filter kategori & teknologi, tampilan grid / list
- Halaman detail dengan tab Gambaran · Kode · Galeri dan lightbox
- SEO: metadata per project, Open Graph, Twitter Card, `sitemap.xml`, `robots.txt`

### Performa & Aksesibilitas
- Animasi hanya menyentuh `transform` / `opacity` (GPU-composited)
- Parallax diperkecil di perangkat mobile
- Semua animasi nonaktif otomatis saat `prefers-reduced-motion: reduce`
- **ESLint 0 masalah · TypeScript 0 error**

---

## Tech Stack

| Lapisan | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Bahasa | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| Ikon | Lucide React |
| Komponen | Radix UI + shadcn/ui |
| Basis data | Supabase (PostgreSQL + Storage) |
| Tema | next-themes |

---

## Menjalankan

```bash
git clone https://github.com/lucuk094-crypto/all-project.git
cd all-project
npm install
cp .env.example .env.local   # lalu isi kredensial Supabase
npm run dev                  # http://localhost:3000
```

### Variabel environment

Salin `.env.example` menjadi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_ADMIN_PASSWORD=ganti-ini
```

> **Mode demo:** selama variabel di atas belum diisi, situs menampilkan 6 project contoh
> (banner SVG ada di `public/demo/`) lengkap dengan penanda "Mode demo" di halaman.
> Begitu environment terisi, mode demo mati sendiri dan project asli langsung tampil.
> Untuk menonaktifkannya sepenuhnya, hapus `lib/demoProjects.ts` dan `components/DemoNotice.tsx`.

### Script

```bash
npm run dev        # server pengembangan
npm run build      # build production
npm run start      # menjalankan hasil build
npm run lint       # ESLint
npm run typecheck  # pengecekan tipe TypeScript
```

---

## Setup Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Buka **SQL Editor**, jalankan isi `SUPABASE_SETUP.sql`
3. Buat bucket **Storage** bernama `project-banners` dengan akses **Public**
4. Salin URL dan anon key dari *Project Settings → API* ke `.env.local`
5. Buka `/test-supabase` untuk memverifikasi konfigurasi

Login admin ada di `/admin/login`.

---

## Struktur

```
app/
  page.tsx                 beranda
  projects/                daftar + detail project
  about/                   profil
  admin/                   login, dashboard, form project
  test-supabase/           diagnostik koneksi
  sitemap.ts  robots.ts
components/
  AuroraBackground.tsx     latar 3D + parallax
  Navbar.tsx  BottomNav.tsx  Footer.tsx
  ProjectCard.tsx  ProjectDetailView.tsx
  Reveal.tsx  SectionHeading.tsx  CodeShowcase.tsx
  admin/AdminShell.tsx  admin/ProjectForm.tsx
  ui/                      button, card, input, label, badge
lib/
  supabase.ts  supabaseProjectService.ts  supabaseStorageService.ts
  demoProjects.ts  errorLogger.ts  utils.ts
```

---

## ⚠️ Catatan keamanan

Fitur berikut **belum diperbaiki** dan sebaiknya dibereskan sebelum digunakan di produksi:

1. **Password admin terbaca publik** — `NEXT_PUBLIC_ADMIN_PASSWORD` di-inline ke bundle browser
2. **Autentikasi berbasis `localStorage`** — bisa di-bypass dari DevTools; seharusnya memakai Supabase Auth atau cookie HttpOnly
3. **RLS policy `USING (true)`** — siapa pun yang memiliki anon key dapat menambah, mengubah, dan menghapus project
4. **`/test-supabase`** belum dilindungi di produksi
5. Belum ada security headers (CSP, HSTS)

---

## Lisensi

MIT — lihat berkas [LICENSE](LICENSE).
