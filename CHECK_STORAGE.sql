-- ====================================
-- CEK STORAGE BUCKET & POLICIES
-- ====================================

-- 1. Cek apakah bucket exists
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE name = 'project-banners';

-- Expected result:
-- Harus ada 1 row dengan name = 'project-banners' dan public = true

-- ====================================

-- 2. Cek storage policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'objects' 
  AND schemaname = 'storage';

-- Expected result:
-- Harus ada minimal 4 policies untuk project-banners

-- ====================================

-- 3. JIKA BUCKET ADA TAPI POLICIES TIDAK ADA, JALANKAN INI:

-- Drop old policies jika ada
DROP POLICY IF EXISTS "Public read banners" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload banners" ON storage.objects;
DROP POLICY IF EXISTS "Allow update banners" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete banners" ON storage.objects;

-- Create storage policies
CREATE POLICY "Public read banners"
    ON storage.objects 
    FOR SELECT
    USING (bucket_id = 'project-banners');

CREATE POLICY "Allow upload banners"
    ON storage.objects 
    FOR INSERT
    WITH CHECK (bucket_id = 'project-banners');

CREATE POLICY "Allow update banners"
    ON storage.objects 
    FOR UPDATE
    USING (bucket_id = 'project-banners')
    WITH CHECK (bucket_id = 'project-banners');

CREATE POLICY "Allow delete banners"
    ON storage.objects 
    FOR DELETE
    USING (bucket_id = 'project-banners');

-- ====================================

-- 4. Verify policies created
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%banner%';

-- Expected: 4 policies
