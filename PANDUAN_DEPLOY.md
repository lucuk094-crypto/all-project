# Panduan Deploy — Portfolio Van-X313

Ikuti dari atas ke bawah. Total waktu sekitar **10 menit**.

**Yang Anda butuhkan:** akun Vercel, akun Supabase, dan browser. Tidak perlu terminal.

---

## Ringkasan

| # | Tempat | Yang dilakukan |
|---|---|---|
| 1 | Supabase | Ambil **service role key** |
| 2 | Vercel | Tambah 3 environment variable |
| 3 | Vercel | **Redeploy** |
| 4 | Supabase | Jalankan `SECURITY_FIX.sql` |
| 5 | Browser | Cek hasilnya |

> ⚠️ Urutan nomor 3 dan 4 penting.
> Redeploy **dulu**, baru jalankan SQL. Kalau dibalik, panel admin akan
> sebentar tidak bisa menyimpan data.

---

## 1. Ambil service role key dari Supabase

1. Buka **https://supabase.com/dashboard** → pilih project Anda
2. Klik **Project Settings** (ikon roda gigi, kiri bawah)
3. Klik menu **API**
4. Cari bagian **Project API keys**
5. Pada baris **`service_role`**, klik **Reveal** lalu **Copy**

```
┌──────────────────────────────────────────────┐
│  service_role    eyJhbGciOi...    [Reveal]   │
│                                   [Copy]     │
└──────────────────────────────────────────────┘
```

> Kunci ini **melewati semua pengamanan database**. Simpan baik-baik,
> jangan dibagikan, jangan dipasang di kode yang terlihat pengunjung.
> Di Vercel nanti nilainya akan disembunyikan otomatis.

---

## 2. Tambahkan environment variable di Vercel

1. Buka **https://vercel.com/dashboard**
2. Klik project **`dashbord-all-project`**
3. Tab **Settings** → menu **Environment Variables**
4. Tambahkan tiga baris berikut satu per satu:

### Baris 1
| Kolom | Isi |
|---|---|
| Key | `SUPABASE_SERVICE_ROLE_KEY` |
| Value | *(paste service role key dari langkah 1)* |

### Baris 2
| Kolom | Isi |
|---|---|
| Key | `ADMIN_PASSWORD` |
| Value | kata sandi pilihan Anda, misalnya `Portfolio2026!Kuat` |

> Ini kata sandi untuk masuk ke `/admin/login`. **Bukan** kata sandi akun
> Supabase atau GitHub — bebas Anda tentukan sendiri.

### Baris 3
| Kolom | Isi |
|---|---|
| Key | `SESSION_SECRET` |
| Value | `7ae3dde999c8c51137e5fe61c8fe220c71debc28f9ecdc59a59c1e26c3e656f7` |

5. Pada setiap baris, **centang ketiganya**: `Production`, `Preview`, `Development`
6. Klik **Save**

### Hapus variable lama

Masih di halaman yang sama, cari `NEXT_PUBLIC_ADMIN_PASSWORD` → klik **⋯** → **Remove**.

> Variable ini **sudah tidak dipakai** dan berbahaya kalau dibiarkan,
> karena nilainya ikut terkirim ke browser siapa pun yang membuka situs Anda.

---

## 3. Redeploy

1. Buka tab **Deployments**
2. Klik deployment paling atas
3. Klik **⋯** (titik tiga) → **Redeploy**
4. Centang **Use existing Build Cache** *boleh* dibiarkan
5. Klik **Redeploy**, tunggu sampai statusnya **Ready** (hijau)

---

## 4. Jalankan skrip pengamanan database

1. Kembali ke **https://supabase.com/dashboard** → project Anda
2. Klik **SQL Editor** di menu kiri
3. Klik **+ New query**
4. Buka file **`SECURITY_FIX.sql`** (ada di repo GitHub Anda), salin seluruh isinya
5. Paste ke editor, klik **Run** (atau tekan `Ctrl` + `Enter`)
6. Tunggu muncul pesan **Success. No rows returned**

### Verifikasi

Masih di SQL Editor, jalankan query ini:

```sql
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname IN ('public','storage')
ORDER BY schemaname, tablename, cmd;
```

**Hasil yang benar:**

```
tablename  policyname             cmd
objects    banner_public_read     SELECT
projects   public_read_published  SELECT
```

Hanya boleh ada **2 baris**, keduanya `SELECT`.

Kalau masih muncul baris bertuliskan **INSERT**, **UPDATE**, atau **DELETE** —
berarti skrip belum berjalan bersih. Ulangi langkah 4.

---

## 5. Cek hasilnya

Buka **https://dashbord-all-project.vercel.app** dan periksa:

| Yang dicek | Harusnya |
|---|---|
| Tampilan baru (latar aurora, kartu project) | ✅ muncul |
| Halaman `/projects` | ✅ 10 project Anda tampil |
| Buka **`/admin/dashboard`** tanpa login | ✅ otomatis dilempar ke `/admin/login` |
| Login dengan `ADMIN_PASSWORD` baru | ✅ masuk ke dashboard |
| Buka **`/test-supabase`** tanpa login | ✅ dilempar ke halaman login |

### Tes keamanan (opsional, 1 menit)

Setelah login, buka `/test-supabase`. Semua indikator harus hijau.

Lalu coba ini di tab browser lain yang **tidak login**:

```
https://dashbord-all-project.vercel.app/api/admin/projects
```

Harusnya muncul tulisan:

```json
{"error":"Sesi tidak valid."}
```

Kalau yang muncul daftar project Anda, berarti ada yang belum beres —
kembali ke langkah 3 dan 4.

---

## Kalau ada masalah

| Gejala | Kemungkinan & solusi |
|---|---|
| Muncul notifikasi kuning: *"SUPABASE_SERVICE_ROLE_KEY belum diisi"* | Variable belum tersimpan, atau belum redeploy. Ulangi langkah 2 dan 3. |
| Halaman admin kosong / terus loading | Sama seperti di atas. |
| Tidak bisa login padahal kata sandi benar | Masih memakai `NEXT_PUBLIC_ADMIN_PASSWORD` lama. Pastikan variable baru bernama tepat `ADMIN_PASSWORD` (tanpa awalan `NEXT_PUBLIC_`), lalu redeploy. |
| Terkunci: *"Terlalu banyak percobaan"* | Tunggu 1 menit, lalu coba lagi. Ini pengaman anti tebak-kata-sandi. |
| Web masih tampilan lama | Vercel Anda tersambung ke GitLab, bukan GitHub. Lihat bagian berikutnya. |
| Project draft tidak bisa dibuka lewat URL langsung | **Memang benar begitu.** Draft kini hanya bisa dilihat setelah login admin. |

---

## Catatan: kalau web masih versi lama

Repo GitHub sudah berisi semua perubahan, tetapi Vercel Anda kemungkinan
tersambung ke **GitLab** (`affansmith80/dashbord-all-project`), sehingga push
ke GitHub **tidak** memicu deploy.

Pilih salah satu:

**A. Arahkan Vercel ke GitHub** (disarankan, sekali saja)
- Vercel → *Settings* → *Git* → *Connected Git Repository* → **Disconnect**
- Lalu *Connect Git Repository* → pilih GitHub → `lucuk094-crypto/all-project`
- Vercel akan otomatis deploy

**B. Atau minta push juga ke GitLab**
- Butuh token GitLab dengan scope `write_repository`

---

## Yang sudah beres vs yang masih perlu Anda lakukan

**✅ Sudah saya kerjakan (sudah ada di repo):**
- Tutup akses tulis publik ke database (skrip SQL + pemindahan penulisan ke server)
- Kata sandi admin tidak lagi ikut ke browser
- Login memakai cookie terenkripsi, bukan `localStorage`
- Halaman `/admin` dan `/test-supabase` dikunci
- Pengaman anti tebak-kata-sandi (5x/menit)
- Validasi unggah berkas di server
- Header keamanan (CSP, HSTS, dll)

**⏳ Menunggu Anda:** langkah 1–5 di atas.
Sampai langkah 4 selesai, database Anda **masih bisa ditulis orang luar**.

---

## Lampiran: membuat bucket Storage (hanya jika belum pernah)

Cek dulu dengan login ke `/test-supabase`. Kalau baris **Storage bucket**
berwarna hijau, lewati bagian ini.

1. Supabase Dashboard → menu **Storage** (kiri)
2. Klik **New bucket**
3. Name: `project-banners`
4. **Aktifkan "Public bucket"** ← penting
5. Klik **Create bucket**

Tanpa bucket ini, gambar banner project tidak bisa diunggah.
