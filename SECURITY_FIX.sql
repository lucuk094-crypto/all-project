-- ============================================================
--  SECURITY_FIX.sql  —  hardening Supabase untuk portfolio
--  Cara pakai: Supabase Dashboard → SQL Editor → paste → Run
--  Aman dijalankan berulang kali (idempotent).
-- ============================================================
--
--  SEBELUM  : siapa pun yang punya anon key bisa INSERT / UPDATE / DELETE
--             seluruh isi tabel projects dan bucket project-banners.
--  SESUDAH  : pengunjung hanya bisa MEMBACA project berstatus published.
--             Semua penulisan wajib lewat server (service role key).
-- ============================================================


-- ============================================================
-- 1. TABEL projects
-- ============================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Bersihkan semua policy lama yang longgar
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'projects'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.projects', pol.policyname);
  END LOOP;
END $$;

-- ✅ BACA: hanya project yang sudah dipublikasikan
CREATE POLICY "public_read_published"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- 🚫 TULIS: tidak ada policy INSERT / UPDATE / DELETE untuk anon.
--    Tanpa policy = otomatis ditolak oleh RLS.
--    Penulisan dilakukan oleh server memakai SUPABASE_SERVICE_ROLE_KEY,
--    yang memang melewati RLS sebagaimana mestinya.


-- ============================================================
-- 2. STORAGE — bucket project-banners
-- ============================================================
-- Catatan: bucket harus sudah ada dan bertipe Public.
-- Jika belum: Dashboard → Storage → New bucket → "project-banners" → Public ON

DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname LIKE 'banner%'
  LOOP
    EXECUTE format('DROP POLICY %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

-- Hapus juga policy lama yang menargetkan bucket ini secara umum
DROP POLICY IF EXISTS "Public read banners"        ON storage.objects;
DROP POLICY IF EXISTS "Allow upload banners"       ON storage.objects;
DROP POLICY IF EXISTS "Allow update banners"       ON storage.objects;
DROP POLICY IF EXISTS "Allow delete banners"       ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view project banners"   ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload project banners" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project banners" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project banners" ON storage.objects;
DROP POLICY IF EXISTS "Public can view project images"    ON storage.objects;

-- ✅ BACA: file di bucket project-banners boleh dilihat publik (untuk banner)
CREATE POLICY "banner_public_read"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'project-banners');

-- 🚫 UNGGAH / UBAH / HAPUS: tidak ada policy → ditolak untuk anon.
--    Unggahan dilakukan oleh server memakai service role key.


-- ============================================================
-- 3. VERIFIKASI — jalankan query ini untuk memastikan hasilnya
-- ============================================================
--
-- SELECT tablename, policyname, cmd
-- FROM pg_policies
-- WHERE schemaname IN ('public','storage')
-- ORDER BY schemaname, tablename, cmd;
--
-- Yang benar, untuk projects HANYA boleh muncul:
--   projects | public_read_published | SELECT
-- Untuk storage.objects HANYA boleh muncul:
--   objects  | banner_public_read    | SELECT
--
-- Kalau masih ada baris bertuliskan INSERT / UPDATE / DELETE,
-- berarti belum bersih — ulangi bagian 1 dan 2.
-- ============================================================
