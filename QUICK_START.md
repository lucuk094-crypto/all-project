# ⚡ Quick Start - Setup Supabase (10 Menit)

## 1️⃣ Buat Project Supabase
```
https://supabase.com
→ New Project
→ Name: vanx313-portfolio
→ Password: (simpan!)
→ Region: Southeast Asia
→ Create (tunggu 2-3 menit)
```

## 2️⃣ Copy API Keys
```
Settings ⚙️ → API
→ Copy: Project URL
→ Copy: anon public key
→ Copy: service_role key (klik Reveal)
```

## 3️⃣ Update .env
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

## 4️⃣ Jalankan SQL
```
SQL Editor → New Query
→ Copy isi SUPABASE_SETUP.sql
→ Paste & Run
```

## 5️⃣ Buat Storage Bucket
```
Storage → Create bucket
→ Name: project-banners
→ ✅ Public bucket
→ Create
```

## 6️⃣ Restart & Test
```bash
npm run dev
```
```
http://localhost:3000/test-supabase
→ Semua harus ✅ hijau
```

## 7️⃣ Login Admin
```
http://localhost:3000/admin/login
→ Password: admin123
```

---

## ✅ Done!

Jika test page all green → Website siap dipakai! 🎉

**Detail lengkap:** `SETUP_SUPABASE.md`
