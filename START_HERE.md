# 🎯 START HERE - Portfolio Van-X313

## 📍 Anda Ada di Sini

Project portfolio Next.js dengan Supabase backend.

---

## 🚀 Setup Baru? Mulai Dari Sini

### Option 1: Quick Start (10 menit)
📄 **File: `QUICK_START.md`**

Panduan ringkas 7 langkah untuk setup Supabase dari nol.

---

### Option 2: Panduan Lengkap
📄 **File: `SETUP_SUPABASE.md`**

Panduan detail step-by-step dengan:
- Penjelasan setiap langkah
- Screenshot/instruksi lengkap
- Troubleshooting
- Checklist

---

## 📚 Struktur Dokumentasi

```
📁 Project Root
│
├── 🚀 START_HERE.md          ← Anda di sini
├── ⚡ QUICK_START.md          ← Setup cepat 10 menit
├── 📖 SETUP_SUPABASE.md       ← Panduan lengkap
│
├── 🗄️ SUPABASE_SETUP.sql     ← Script SQL (jalankan di Supabase)
├── 🔧 .env                    ← Konfigurasi (isi API keys di sini)
├── 📝 .env.example            ← Template .env
│
├── 📖 README.md               ← Info project
├── 🚀 DEPLOYMENT_GUIDE.md     ← Deploy ke Vercel
├── 👤 ADMIN_GUIDE.md          ← Cara pakai admin panel
├── 🧪 /app/test-supabase      ← Halaman test koneksi
│
└── 📁 app/, components/, lib/ ← Source code
```

---

## ✅ Checklist Setup

Ikuti urutan ini:

1. [ ] **Install Dependencies**
   ```bash
   npm install
   ```

2. [ ] **Setup Supabase**
   - Buat project baru di https://supabase.com
   - Ikuti `QUICK_START.md` atau `SETUP_SUPABASE.md`

3. [ ] **Update .env**
   - Copy API keys dari Supabase
   - Paste ke file `.env`

4. [ ] **Jalankan SQL**
   - Buka SQL Editor di Supabase
   - Copy isi `SUPABASE_SETUP.sql`
   - Run di SQL Editor

5. [ ] **Buat Storage Bucket**
   - Supabase > Storage > Create bucket
   - Name: `project-banners`
   - Set sebagai Public

6. [ ] **Restart Server**
   ```bash
   npm run dev
   ```

7. [ ] **Test Koneksi**
   - http://localhost:3000/test-supabase
   - Semua harus ✅ hijau

8. [ ] **Login Admin**
   - http://localhost:3000/admin/login
   - Password: `admin123`

9. [ ] **Tambah Project Pertama**
   - Dashboard → Tambah Project Baru
   - Test upload gambar
   - Save

---

## 🎯 Quick Links

| Link | Deskripsi |
|------|-----------|
| http://localhost:3000 | Homepage |
| http://localhost:3000/test-supabase | **Test koneksi** 🧪 |
| http://localhost:3000/admin/login | Login admin 🔐 |
| http://localhost:3000/admin/dashboard | Dashboard admin 📊 |
| http://localhost:3000/admin/new | Tambah project ➕ |
| https://supabase.com/dashboard | Supabase dashboard ⚙️ |

---

## 🆘 Butuh Bantuan?

### Setup Supabase
→ Baca: `SETUP_SUPABASE.md` (ada troubleshooting lengkap)

### Error atau masalah
→ Cek: http://localhost:3000/test-supabase (diagnosa otomatis)

### Cara pakai admin panel
→ Baca: `ADMIN_GUIDE.md`

### Deploy ke production
→ Baca: `DEPLOYMENT_GUIDE.md`

---

## 🎉 Sudah Setup?

Jika sudah selesai setup:

1. ✅ Explore admin panel
2. ✅ Tambah project-project Anda
3. ✅ Customize theme/styling
4. ✅ Deploy ke Vercel

**Selamat menggunakan! 🚀**

---

## 📧 Support

- GitHub Issues: [Report bug](https://github.com/vanx313/portfolio/issues)
- Email: vanx313@example.com

---

**💡 Tip:** Bookmark file `QUICK_START.md` untuk referensi cepat!
