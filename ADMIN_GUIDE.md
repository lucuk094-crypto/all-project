# 🔐 Panduan Admin Panel - Portfolio Van-X313

Dokumentasi lengkap untuk menggunakan Admin Panel website portfolio.

---

## 📋 Daftar Isi

1. [Cara Login](#cara-login)
2. [Dashboard Overview](#dashboard-overview)
3. [Menambah Project Baru](#menambah-project-baru)
4. [Mengedit Project](#mengedit-project)
5. [Menghapus Project](#menghapus-project)
6. [Upload Banner dengan Drag & Drop](#upload-banner)
7. [Tips & Best Practices](#tips--best-practices)

---

## 🔑 Cara Login

### Akses Halaman Login

1. Buka browser dan akses: `http://localhost:3000/admin`
2. Anda akan otomatis diredirect ke halaman login: `/admin/login`

### Login Credentials

```
Password: admin123
```

⚠️ **PENTING**: Setelah deploy, ganti password di file:
`app/admin/login/page.tsx` (line 13)

```typescript
const ADMIN_PASSWORD = 'password_baru_anda';
```

### Setelah Login

- Session disimpan di `localStorage`
- Tetap login sampai Anda klik tombol "Keluar"
- Jika mencoba akses dashboard tanpa login, akan redirect ke login page

---

## 📊 Dashboard Overview

### URL Dashboard
```
http://localhost:3000/admin/dashboard
```

### Fitur Dashboard

#### 1. **Stats Cards**
Menampilkan statistik real-time:
- **Total Project**: Semua project (published + draft)
- **Published**: Project yang sudah dipublikasi
- **Draft**: Project yang masih draft
- **Featured**: Project yang ditandai sebagai unggulan

#### 2. **Project List**
Tabel lengkap semua project dengan informasi:
- Thumbnail banner
- Judul & tagline
- Status (Published/Draft)
- Badge Featured (jika ada)
- Kategori
- Teknologi yang digunakan (maksimal 3 ditampilkan)

#### 3. **Action Buttons**
Setiap project memiliki 4 tombol aksi:
- 🌐 **External Link**: Buka live website (jika ada)
- 👁️ **View**: Preview project di website
- ✏️ **Edit**: Edit project
- 🗑️ **Delete**: Hapus project (dengan konfirmasi)

#### 4. **Navigation**
- **Lihat Website**: Buka website portfolio di tab baru
- **Keluar**: Logout dari admin panel

---

## ➕ Menambah Project Baru

### Langkah-langkah

1. Klik tombol **"Tambah Project"** di dashboard
2. URL akan berubah ke `/admin/new`
3. Isi semua field yang diperlukan

### Form Sections

#### 1. **Informasi Dasar** ✅ WAJIB

| Field | Wajib | Deskripsi |
|-------|-------|-----------|
| Judul Project | Ya | Nama project (contoh: "Portfolio Website") |
| Kategori | Ya | Pilih dari dropdown (Web App, Landing Page, dll) |
| Tagline | Ya | Deskripsi singkat 1 kalimat |
| Deskripsi Lengkap | Ya | Penjelasan detail project |

**Kategori yang Tersedia:**
- Web Application
- Landing Page
- Dashboard
- E-Commerce
- Portfolio
- Blog
- Mobile App
- Other

#### 2. **Banner Project** 🖼️

**Cara Upload dengan Drag & Drop:**

1. **Drag & Drop:**
   - Drag file gambar dari komputer
   - Drop ke area upload
   - Preview langsung muncul

2. **Klik untuk Upload:**
   - Klik area upload
   - Pilih file dari komputer
   - Preview langsung muncul

3. **Ganti Gambar:**
   - Hover pada preview
   - Klik tombol "Ganti"
   - Pilih gambar baru

4. **Hapus Gambar:**
   - Hover pada preview
   - Klik tombol "Hapus"

**Spesifikasi Banner:**
- Format: PNG, JPG, WEBP
- Ukuran Maksimal: 10MB
- Ukuran Recommended: 1200 x 630 px (16:9 ratio)
- Untuk hasil optimal di social media sharing

#### 3. **Link Project** 🔗

| Field | Deskripsi |
|-------|-----------|
| Live Website URL | URL website yang sudah online (optional) |
| GitHub Repository | URL GitHub repo project (optional) |
| Durasi Pengembangan | Waktu pengerjaan (contoh: "2 minggu") |

#### 4. **Teknologi yang Digunakan** 💻

1. Ketik nama teknologi di input field
2. Tekan Enter atau klik tombol (+)
3. Badge teknologi akan muncul
4. Klik (X) pada badge untuk menghapus
5. Tambahkan sebanyak yang diperlukan

**Contoh:**
- React
- TypeScript
- Tailwind CSS
- Firebase
- Next.js

#### 5. **Fitur Utama** ⚙️

1. Ketik fitur project di input field
2. Tekan Enter atau klik tombol (+)
3. Fitur ditampilkan dalam list
4. Klik (X) untuk menghapus fitur
5. Tambahkan minimal 3-5 fitur

**Contoh:**
- User Authentication
- Real-time Chat
- Responsive Design
- Dark Mode Support
- API Integration

#### 6. **Source Code** 💾 (Optional)

Upload source code project untuk ditampilkan dengan syntax highlighting:

| Field | Deskripsi |
|-------|-----------|
| HTML Code | Paste kode HTML |
| CSS Code | Paste kode CSS |
| JavaScript Code | Paste kode JavaScript |

**Tips:**
- Format kode dengan indentasi yang rapi
- Tidak wajib diisi jika tidak ingin menampilkan code
- Kode akan ditampilkan dengan syntax highlighting di project detail page

#### 7. **Informasi Tambahan** 📝 (Optional)

| Field | Deskripsi |
|-------|-----------|
| Tantangan yang Dihadapi | Ceritakan kesulitan saat development |
| Pelajaran yang Didapat | Apa yang dipelajari dari project ini |

**Tips:**
- Bagus untuk storytelling
- Menunjukkan problem-solving skills
- Membuat portfolio lebih personal

#### 8. **Pengaturan Project** ⚙️

| Setting | Opsi | Deskripsi |
|---------|------|-----------|
| Project Unggulan | Checkbox | Centang untuk featured (tampil di homepage) |
| Status Publikasi | Dropdown | Draft (belum tampil) / Published (sudah tampil) |

**Status:**
- **Draft**: Project disimpan tapi tidak tampil di website
- **Published**: Project langsung tampil di website public

### Menyimpan Project

1. Setelah semua field diisi, klik **"Simpan Project"**
2. Tunggu proses upload banner (jika ada)
3. Pop-up konfirmasi akan muncul
4. Otomatis redirect ke dashboard

---

## ✏️ Mengedit Project

### Cara Edit Project

1. Di dashboard, cari project yang ingin diedit
2. Klik tombol **Edit** (icon pensil)
3. URL berubah ke `/admin/edit/[project-id]`
4. Form akan ter-load dengan data project saat ini

### Mengubah Banner

Ada 3 opsi:
1. **Keep Banner**: Jangan upload gambar baru
2. **Replace Banner**: Upload gambar baru (banner lama terhapus)
3. **Remove Banner**: Klik "Hapus" untuk menghapus banner

### Update Project

1. Ubah field yang diperlukan
2. Klik **"Update Project"**
3. Konfirmasi akan muncul
4. Redirect ke dashboard

---

## 🗑️ Menghapus Project

### Cara Menghapus

1. Di dashboard, cari project yang ingin dihapus
2. Klik tombol **Delete** (icon tempat sampah)
3. Konfirmasi pop-up akan muncul:
   ```
   Apakah Anda yakin ingin menghapus "[Nama Project]"?
   ```
4. Klik **OK** untuk konfirmasi
5. Project akan dihapus permanen

⚠️ **WARNING**: 
- Penghapusan bersifat **PERMANEN**
- Tidak bisa di-undo
- Banner dan data project akan hilang dari database

---

## 🖼️ Upload Banner dengan Drag & Drop

### Fitur Drag & Drop

Admin panel ini dilengkapi dengan **ImageDropzone** component yang powerful:

#### Cara Menggunakan

1. **Drag & Drop**
   ```
   Drag file → Drop ke area → Preview muncul
   ```

2. **Click to Upload**
   ```
   Klik area → File picker → Pilih file → Preview muncul
   ```

3. **Visual Feedback**
   - Area berubah warna saat drag over
   - Border hitam muncul
   - Icon berubah
   - Text berubah: "Lepas file di sini"

4. **Preview & Actions**
   - Preview image full width
   - Hover untuk menampilkan actions
   - Tombol "Ganti" untuk replace
   - Tombol "Hapus" untuk remove

#### Validation

- ✅ Hanya menerima file image (PNG, JPG, WEBP)
- ✅ File non-image akan ditolak dengan alert
- ✅ Preview langsung setelah select
- ✅ Max file size: 10MB (handled by Firebase)

#### Design

- Clean minimalist design
- Black & white theme (sesuai portfolio)
- Smooth transitions
- Responsive di semua device

---

## 💡 Tips & Best Practices

### Banner Images

1. **Ukuran Optimal**: 1200 x 630 px
2. **Aspect Ratio**: 16:9
3. **Format**: PNG untuk quality, JPG untuk size
4. **Kompres**: Gunakan TinyPNG sebelum upload
5. **Brand Consistent**: Gunakan color scheme yang sama

### Project Descriptions

1. **Tagline**: Maksimal 80 karakter, jelas & menarik
2. **Deskripsi**: 2-3 paragraf, jelaskan:
   - Apa projectnya
   - Kenapa dibuat
   - Fitur utama
   - Tech stack
3. **Bullet Points**: Gunakan list untuk features
4. **Call to Action**: Tambahkan live URL & GitHub

### Technologies

1. **Relevant Only**: Hanya tech yang benar-benar digunakan
2. **Popular First**: Urutkan dari yang paling penting
3. **Max 8**: Jangan terlalu banyak (max 8 tech)
4. **Consistent Naming**: "React" bukan "ReactJS"

### SEO & Marketing

1. **Featured Projects**: Pilih 3-5 best projects
2. **Published Status**: Draft dulu, review, baru publish
3. **Live URL**: Wajib ada untuk credibility
4. **GitHub URL**: Show your code (jika open source)

### Organization

1. **Categories**: Gunakan kategori yang konsisten
2. **Status Draft**: Untuk project yang belum selesai
3. **Regular Update**: Update project berkala
4. **Archive Old**: Hapus project lama yang sudah outdated

---

## 🔒 Security

### Password Management

1. **Ganti Default Password**
   ```typescript
   // app/admin/login/page.tsx
   const ADMIN_PASSWORD = 'your_secure_password_here';
   ```

2. **Strong Password**
   - Min 12 karakter
   - Kombinasi huruf, angka, symbol
   - Tidak mudah ditebak
   - Update berkala

3. **Environment Variable** (Recommended)
   ```env
   ADMIN_PASSWORD=your_secure_password
   ```
   
   ```typescript
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
   ```

### Session Management

- Session tersimpan di `localStorage`
- Clear browser cache = logout
- Private/Incognito mode = harus login ulang

---

## 🚀 Deployment

Setelah deploy ke production (Vercel/Netlify):

1. **Update Password**
   - Ganti dari `admin123` ke password kuat

2. **Test Login**
   - Akses `https://your-domain.com/admin`
   - Test login dengan password baru

3. **Backup**
   - Export data dari Firebase Console
   - Backup regular untuk keamanan

4. **Monitor**
   - Check admin access logs
   - Monitor unauthorized access attempts

---

## 📞 Troubleshooting

### "Password Salah"
- Pastikan caps lock off
- Check typo
- Verify password di source code

### "Gagal Upload Banner"
- Check file size < 10MB
- Check format (PNG/JPG/WEBP)
- Check Firebase Storage rules
- Check internet connection

### "Project Tidak Muncul"
- Check status = "Published"
- Refresh halaman projects
- Check Firebase Firestore data
- Verify .env credentials

### "Tidak Bisa Login"
- Clear browser cache
- Check `localStorage`
- Verify password di code
- Try different browser

---

## 📚 Resource Links

- Firebase Console: https://console.firebase.google.com
- Vercel Dashboard: https://vercel.com/dashboard
- Image Compression: https://tinypng.com
- Next.js Docs: https://nextjs.org/docs

---

## ✅ Checklist untuk Project Baru

Sebelum publish project, pastikan:

- [ ] Banner uploaded (1200x630px)
- [ ] Judul clear & concise
- [ ] Tagline menarik (< 80 char)
- [ ] Deskripsi lengkap (2-3 paragraf)
- [ ] Min 3-5 technologies
- [ ] Min 3-5 features
- [ ] Live URL tested (jika ada)
- [ ] GitHub URL tested (jika ada)
- [ ] Category sesuai
- [ ] Featured jika project bagus
- [ ] Status "Published"

---

**Admin Panel dibuat dengan ❤️ untuk Portfolio Van-X313**

*Last Updated: 2026-08-04*
