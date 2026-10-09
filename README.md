# Modern Portfolio Website

Portfolio website dengan tema **Clean Minimalist Modern Premium** — monokrom, dark-first, berlatar aurora 3D, dan responsif penuh dari mobile hingga desktop.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Live:** https://dashbord-all-project.vercel.app

> **Perlu panduan deploy/langkah manual?** Baca **[PANDUAN_DEPLOY.md](PANDUAN_DEPLOY.md)**
> — berisi langkah demi langkah untuk mengatur environment variable di Vercel
> dan menjalankan skrip pengamanan database.

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

| Variabel | Keterangan | Boleh di browser? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase | ✅ ya |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (hanya untuk membaca) | ✅ ya |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — **melewati RLS**, dipakai server untuk menulis | 🚫 tidak |
| `ADMIN_PASSWORD` | Kata sandi panel admin | 🚫 tidak |
| `SESSION_SECRET` | Kunci tanda tangan cookie sesi | 🚫 tidak |

```bash
openssl rand -hex 32   # untuk membuat SESSION_SECRET
```

> Tiga variabel terakhir **tidak** memakai awalan `NEXT_PUBLIC_`.
> Sebelumnya `NEXT_PUBLIC_ADMIN_PASSWORD` dipakai, sehingga kata sandi ikut
> ter-unggah ke dalam bundle dan bisa dibaca siapa pun lewat *View Source*.

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
2. Buka **SQL Editor**, jalankan `SUPABASE_SETUP.sql`
3. Masih di SQL Editor, jalankan **`SECURITY_FIX.sql`** — wajib, ini menutup akses tulis publik
4. Buat bucket **Storage** bernama `project-banners` dengan akses **Public**
5. Salin URL, anon key, dan **service role key** dari *Project Settings → API* ke `.env.local`
6. Masuk ke `/admin/login`, lalu buka `/test-supabase` untuk memverifikasi

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

## Keamanan

Risiko berikut **sudah ditangani**:

| Ancaman | Sebelum | Sesudah |
|---|---|---|
| Siapa pun bisa menulis ke database | RLS `USING (true)` → INSERT/UPDATE/DELETE terbuka untuk anon key | RLS hanya mengizinkan `SELECT` untuk baris `published`. Penulisan wajib lewat server. |
| Kata sandi admin terbaca publik | `NEXT_PUBLIC_ADMIN_PASSWORD` di-inline ke bundle browser | `ADMIN_PASSWORD` hanya ada di server; klien mengirim kata sandi ke `/api/admin/login` |
| Login bisa di-bypass | `localStorage.setItem('admin_authenticated','true')` | Cookie **HttpOnly** bertanda tangan HMAC-SHA256, divalidasi di middleware dan di tiap route handler |
| `/admin` bisa dibuka langsung | Tidak ada pemeriksaan server | `proxy.ts` mengarahkan ke login bila sesi tidak valid |
| Halaman debug terbuka | `/test-supabase` bisa diakses siapa pun | Dilindungi sesi admin yang sama |
| Brute-force kata sandi | Tanpa batas | Maksimal 5 percobaan per menit per IP |
| Unggah berkas sembarangan | Hanya divalidasi di browser | Divalidasi di server: tipe MIME + batas 5 MB |
| Header keamanan | Tidak ada | CSP, `X-Frame-Options: DENY`, HSTS, `nosniff`, Referrer-Policy, Permissions-Policy |

### Yang perlu Anda lakukan

1. **Jalankan `SECURITY_FIX.sql`** di Supabase Dashboard → SQL Editor.
   Ini menutup RLS yang masih terbuka di database Anda.
2. **Tambahkan 3 variabel baru** di Vercel → *Settings → Environment Variables*:
   `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `SESSION_SECRET`
3. **Hapus** `NEXT_PUBLIC_ADMIN_PASSWORD` yang lama dari Vercel.
4. **Redeploy** agar perubahan diterapkan.

### Catatan

- `lib/supabaseProjectService.ts` sekarang **hanya berisi fungsi baca**.
  Semua operasi tulis ada di `app/api/admin/*` dan memakai service role key.
- `lib/supabaseStorageService.ts` sudah dihapus — unggahan kini lewat
  `/api/admin/upload` yang memvalidasi berkas di server.
- Throttle login disimpan di memori per instance. Untuk perlindungan
  tingkat produksi yang lebih kuat, tambahkan Vercel WAF / Upstash Redis.

## Lisensi

MIT — lihat berkas [LICENSE](LICENSE).
