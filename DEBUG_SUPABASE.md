# 🔍 Debug Supabase Error

## Error yang Muncul:
```
[createProject] Object
[NewProject - handleSubmit] Object
```

## 🎯 Cara Lihat Detail Error:

### Di Browser Console (F12):

1. **Expand error object:**
   - Klik **"Object"** di sebelah `[createProject]`
   - Atau klik **arrow/triangle** untuk expand

2. **Lihat properties:**
   ```
   ▼ Object
     ├─ message: "..."  ← INI YANG PENTING!
     ├─ code: "..."
     ├─ details: "..."
     └─ hint: "..."
   ```

3. **Screenshot atau copy** detail error message

---

## 🔧 Kemungkinan Error & Solusinya:

### Error 1: "relation 'projects' does not exist"
**Penyebab:** Tabel `projects` belum dibuat

**Solusi:**
1. Buka Supabase SQL Editor
2. Jalankan `SUPABASE_SETUP.sql`

---

### Error 2: "new row violates row-level security policy"
**Penyebab:** RLS policies belum di-setup

**Solusi:**
1. Jalankan SQL policies dari `SUPABASE_SETUP.sql`
2. Atau jalankan ini:
```sql
DROP POLICY IF EXISTS "Allow insert" ON projects;
CREATE POLICY "Allow insert"
    ON projects FOR INSERT
    WITH CHECK (true);
```

---

### Error 3: "Bucket not found: project-banners"
**Penyebab:** Storage bucket belum dibuat

**Solusi:**
1. Buka Supabase > Storage
2. Create bucket: `project-banners`
3. Set sebagai **Public**

---

### Error 4: "Invalid API key" / "Failed to fetch"
**Penyebab:** API keys salah atau project belum ready

**Solusi:**
1. Cek `.env` - pastikan API keys benar
2. Tunggu 2-3 menit - Supabase project mungkin masih starting
3. Restart server: `npm run dev`

---

### Error 5: "column 'xxx' does not exist"
**Penyebab:** Schema table tidak match

**Solusi:**
1. Drop table lama:
```sql
DROP TABLE IF EXISTS projects CASCADE;
```
2. Jalankan ulang `SUPABASE_SETUP.sql`

---

## ✅ Quick Fix All-in-One:

Jalankan SQL ini di Supabase SQL Editor:

```sql
-- 1. Drop semua yang lama
DROP TABLE IF EXISTS projects CASCADE;
DROP POLICY IF EXISTS "Public read published" ON projects;
DROP POLICY IF EXISTS "Allow all read" ON projects;
DROP POLICY IF EXISTS "Allow insert" ON projects;
DROP POLICY IF EXISTS "Allow update" ON projects;
DROP POLICY IF EXISTS "Allow delete" ON projects;

-- 2. Create table baru
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    banner TEXT,
    screenshots TEXT[] DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    technologies TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    code JSONB DEFAULT '{"html": "", "css": "", "javascript": ""}',
    featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
    features TEXT[] DEFAULT '{}',
    challenges TEXT,
    learnings TEXT,
    duration TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 4. Create policies
CREATE POLICY "Allow all read"
    ON projects FOR SELECT
    USING (true);

CREATE POLICY "Allow insert"
    ON projects FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow update"
    ON projects FOR UPDATE
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete"
    ON projects FOR DELETE
    USING (true);

-- 5. Verify
SELECT COUNT(*) as table_created FROM projects;
```

---

## 🧪 Test Setelah Fix:

1. **Restart server:**
   ```bash
   npm run dev
   ```

2. **Test koneksi:**
   ```
   http://localhost:3000/test-supabase
   ```
   Harus semua ✅

3. **Coba tambah project:**
   ```
   http://localhost:3000/admin/new
   ```

4. **Lihat console** - seharusnya tidak ada error lagi

---

## 📸 Yang Perlu Anda Lakukan:

1. **Expand error di console** (klik "Object")
2. **Screenshot** atau **copy** error message lengkap
3. **Beritahu saya** error message-nya apa
4. Atau **langsung jalankan** "Quick Fix All-in-One" SQL di atas

---

**Atau coba ini dulu:** Buka http://localhost:3000/test-supabase dan screenshot hasilnya!
