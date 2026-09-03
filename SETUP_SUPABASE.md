# 🚀 Setup Supabase - Panduan Lengkap

## 📋 Apa yang Harus Dilakukan

Setup Supabase baru dari nol dengan 5 langkah mudah (10 menit).

---

## 🎯 Langkah 1: Buat Project Supabase Baru

### A. Buat Akun & Project

1. Buka https://supabase.com
2. Klik **"Start your project"** / **"Sign Up"**
3. Login dengan GitHub/Google/Email
4. Klik **"New Project"**
5. Isi:
   - **Name**: `vanx313-portfolio` (atau nama bebas)
   - **Database Password**: Buat password kuat & **SIMPAN!**
   - **Region**: **Southeast Asia (Singapore)**
   - **Pricing Plan**: Free
6. Klik **"Create new project"**
7. ⏳ **Tunggu 2-3 menit** sampai status "Active"

---

## 🔑 Langkah 2: Copy API Keys

1. Di Supabase Dashboard, klik **⚙️ Settings** (icon gear di bawah)
2. Klik **"API"**
3. Copy 3 nilai ini ke notepad:

```
📋 Project URL:
https://xxxxxxxxxxxxx.supabase.co

📋 anon public key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

📋 service_role key (klik "Reveal" dulu):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📝 Langkah 3: Update File .env

1. Buka file `.env` di root project
2. Ganti dengan API keys Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

⚠️ **PENTING:** Pastikan tidak ada spasi di awal/akhir baris!

---

## 🗄️ Langkah 4: Setup Database

### A. Jalankan SQL Setup

1. Di Supabase Dashboard, klik **"SQL Editor"**
2. Klik **"New Query"**
3. Buka file `SUPABASE_SETUP.sql` di project
4. Copy **SEMUA** isinya (Ctrl+A, Ctrl+C)
5. Paste di SQL Editor
6. Klik **"Run"** (atau Ctrl+Enter)
7. Tunggu sampai muncul **"Success"**

### B. Buat Storage Bucket

1. Di Supabase Dashboard, klik **"Storage"**
2. Klik **"Create a new bucket"**
3. Isi:
   - **Name**: `project-banners` (PERSIS seperti ini!)
   - ✅ **CENTANG "Public bucket"** ← SANGAT PENTING!
   - **File size limit**: 50MB
   - **Allowed MIME types**: Kosongkan (allow all)
4. Klik **"Create bucket"**

---

## 🔄 Langkah 5: Restart & Test

### A. Restart Development Server

```bash
# Stop server yang sedang running (Ctrl+C di terminal)
# Lalu jalankan lagi:
npm run dev
```

### B. Test Koneksi

Buka browser ke:
```
http://localhost:3000/test-supabase
```

**Hasil yang diharapkan:**
- ✅ Environment variables configured
- ✅ Connected to Supabase
- ✅ Projects table found
- ✅ Storage bucket found

Jika semua ✅ hijau → **SETUP BERHASIL!** 🎉

### C. Test Website

1. Homepage: http://localhost:3000
   - Should load tanpa error
   - Sample project muncul

2. Admin Login: http://localhost:3000/admin/login
   - Password: `admin123`
   - Should berhasil login

3. Admin Dashboard: http://localhost:3000/admin/dashboard
   - Sample project muncul
   - Bisa edit/delete

4. Tambah Project: http://localhost:3000/admin/new
   - Form muncul normal
   - Bisa upload gambar
   - Bisa save tanpa error

---

## ✅ Checklist Setup

Pastikan semua ini sudah:

- [ ] Project Supabase sudah dibuat & status "Active"
- [ ] API keys sudah di-copy
- [ ] File `.env` sudah diupdate
- [ ] SQL sudah dijalankan (no error)
- [ ] Storage bucket `project-banners` sudah dibuat
- [ ] Bucket di-set sebagai **Public**
- [ ] Server sudah di-restart
- [ ] Test page all green (✅✅✅✅)
- [ ] Bisa login admin
- [ ] Bisa tambah project

---

## 🆘 Troubleshooting

### ❌ Error: "Supabase not configured"
**Penyebab:** `.env` belum diisi atau server belum di-restart

**Solusi:**
1. Pastikan `.env` terisi lengkap
2. Pastikan tidak ada spasi atau typo
3. Restart server (`npm run dev`)

---

### ❌ Error: "relation projects does not exist"
**Penyebab:** SQL belum dijalankan

**Solusi:**
1. Buka Supabase SQL Editor
2. Jalankan ulang `SUPABASE_SETUP.sql`
3. Pastikan muncul "Success"

---

### ❌ Error: "Bucket not found"
**Penyebab:** Storage bucket belum dibuat atau nama salah

**Solusi:**
1. Buka Supabase > Storage
2. Pastikan bucket namanya **persis** `project-banners`
3. Pastikan bucket **Public** (ada icon globe)
4. Jika salah, delete & buat ulang

---

### ❌ Error: "new row violates row-level security policy"
**Penyebab:** SQL lama masih aktif atau SQL baru belum dijalankan

**Solusi:**
1. File `SUPABASE_SETUP.sql` yang baru sudah include DROP policies lama
2. Jalankan ulang SQL dari awal
3. Restart server

---

### ❌ Error: "Failed to fetch"
**Penyebab:** Supabase project belum ready atau URL salah

**Solusi:**
1. Tunggu 2-3 menit, Supabase project masih di-build
2. Refresh Supabase dashboard, pastikan status "Active"
3. Cek URL di `.env` sama dengan di Supabase settings

---

## 📚 File Penting

| File | Fungsi |
|------|--------|
| `.env` | Konfigurasi API keys (JANGAN commit ke Git!) |
| `SUPABASE_SETUP.sql` | Script SQL untuk setup database lengkap |
| `SETUP_SUPABASE.md` | Panduan ini |
| `/test-supabase` | Halaman untuk test koneksi |

---

## 🔐 Keamanan

### ⚠️ PENTING:

1. **Jangan commit `.env` ke Git!**
   - File `.env` sudah ada di `.gitignore`
   - Jangan share API keys ke publik

2. **Ganti password admin untuk production:**
   - Edit `NEXT_PUBLIC_ADMIN_PASSWORD` di `.env`
   - Gunakan password yang kuat

3. **RLS Policies:**
   - Setup saat ini permissive untuk localhost auth
   - Untuk production multi-user, implementasikan Supabase Auth

---

## 🎉 Selesai!

Jika semua checklist ✅, website Anda sudah siap digunakan!

### Yang Bisa Dilakukan:

✅ Tambah/edit/delete project di admin panel
✅ Upload gambar untuk project
✅ Publish/unpublish project
✅ Mark project as featured
✅ View projects di homepage
✅ Project detail pages

---

## 🚀 Next Steps

1. Customize homepage di `app/page.tsx`
2. Tambah project-project Anda
3. Customize theme & styling
4. Deploy ke Vercel (lihat `DEPLOYMENT_GUIDE.md`)

---

**Selamat! Project Anda sudah terhubung dengan Supabase! 🎊**
