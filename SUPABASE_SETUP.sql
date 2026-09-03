-- ====================================
-- SUPABASE DATABASE SETUP - LENGKAP
-- Portfolio Van-X313
-- ====================================
-- 
-- INSTRUKSI:
-- 1. Copy SEMUA isi file ini (Ctrl+A, Ctrl+C)
-- 2. Buka Supabase Dashboard → SQL Editor → New Query
-- 3. Paste & klik "Run"
-- 4. Tunggu "Success" message
-- 5. Buat storage bucket manual di Dashboard (lihat bagian STORAGE di bawah)
--
-- ====================================

-- ====================================
-- 1. CREATE PROJECTS TABLE
-- ====================================

CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    
    -- Media
    banner TEXT,
    screenshots TEXT[] DEFAULT '{}',
    
    -- Links
    live_url TEXT,
    github_url TEXT,
    
    -- Technical Info
    technologies TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    
    -- Code (stored as JSONB)
    code JSONB DEFAULT '{"html": "", "css": "", "javascript": ""}',
    
    -- Metadata
    featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
    
    -- Optional fields
    features TEXT[] DEFAULT '{}',
    challenges TEXT,
    learnings TEXT,
    duration TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- 2. CREATE INDEXES
-- ====================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- ====================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ====================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 4. CREATE RLS POLICIES (PERMISSIVE)
-- ====================================
-- Note: Policies di-set permissive untuk localStorage auth
-- Untuk production multi-user, implementasikan Supabase Auth

-- Drop existing policies jika ada (cleanup)
DROP POLICY IF EXISTS "Anyone can view published projects" ON projects;
DROP POLICY IF EXISTS "Allow read all projects" ON projects;
DROP POLICY IF EXISTS "Allow insert projects" ON projects;
DROP POLICY IF EXISTS "Allow update projects" ON projects;
DROP POLICY IF EXISTS "Allow delete projects" ON projects;
DROP POLICY IF EXISTS "Public can view published projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON projects;

-- Policy: Public dapat melihat published projects
CREATE POLICY "Public read published"
    ON projects
    FOR SELECT
    USING (status = 'published');

-- Policy: Semua user dapat read all (untuk admin dashboard)
CREATE POLICY "Allow all read"
    ON projects
    FOR SELECT
    USING (true);

-- Policy: Allow INSERT
CREATE POLICY "Allow insert"
    ON projects
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow UPDATE
CREATE POLICY "Allow update"
    ON projects
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Policy: Allow DELETE
CREATE POLICY "Allow delete"
    ON projects
    FOR DELETE
    USING (true);

-- ====================================
-- 5. CREATE AUTO-UPDATE TIMESTAMP FUNCTION
-- ====================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- 6. CREATE TRIGGER
-- ====================================

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- 7. STORAGE POLICIES
-- ====================================
-- Note: Bucket 'project-banners' HARUS dibuat manual di Dashboard
-- Dashboard > Storage > Create Bucket > Name: project-banners > Public: YES

-- Drop existing storage policies jika ada (cleanup)
DROP POLICY IF EXISTS "Anyone can view project banners" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload project banners" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project banners" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project banners" ON storage.objects;
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

-- Storage Policy: Public read
CREATE POLICY "Public read banners"
    ON storage.objects 
    FOR SELECT
    USING (bucket_id = 'project-banners');

-- Storage Policy: Allow upload
CREATE POLICY "Allow upload banners"
    ON storage.objects 
    FOR INSERT
    WITH CHECK (bucket_id = 'project-banners');

-- Storage Policy: Allow update
CREATE POLICY "Allow update banners"
    ON storage.objects 
    FOR UPDATE
    USING (bucket_id = 'project-banners')
    WITH CHECK (bucket_id = 'project-banners');

-- Storage Policy: Allow delete
CREATE POLICY "Allow delete banners"
    ON storage.objects 
    FOR DELETE
    USING (bucket_id = 'project-banners');

-- ====================================
-- 8. INSERT SAMPLE DATA (OPTIONAL)
-- ====================================

-- Hapus sample data lama jika ada
DELETE FROM projects WHERE slug = 'portfolio-website';

-- Insert sample project
INSERT INTO projects (
    slug,
    title,
    tagline,
    description,
    category,
    technologies,
    featured,
    status,
    live_url,
    github_url,
    features,
    duration
) VALUES (
    'portfolio-website',
    'Portfolio Website',
    'Modern portfolio website dengan admin panel yang powerful',
    'Website portfolio personal yang dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS. Dilengkapi dengan admin panel lengkap untuk mengelola project, upload gambar, dan customize konten dengan mudah. Menggunakan Supabase sebagai database dan storage.',
    'Portfolio',
    ARRAY['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    true,
    'published',
    'https://portfolio-vanx313.vercel.app',
    'https://github.com/vanx313/portfolio',
    ARRAY[
        'Admin panel dengan CRUD lengkap',
        'Dark mode dengan pure black theme',
        'Drag & drop image upload',
        'Real-time database dengan Supabase',
        'Responsive design untuk semua device',
        'SEO optimized',
        'Fast loading dengan Next.js optimization'
    ],
    '2 minggu'
) ON CONFLICT (slug) DO NOTHING;

-- ====================================
-- 9. VERIFICATION QUERIES
-- ====================================

-- Cek tabel projects
SELECT 'Projects table' AS check_name, 
       CASE WHEN EXISTS (SELECT 1 FROM projects) 
            THEN 'OK - ' || COUNT(*)::TEXT || ' rows' 
            ELSE 'OK - Empty'
       END AS status
FROM projects;

-- Cek RLS enabled
SELECT 'RLS enabled' AS check_name,
       CASE WHEN relrowsecurity THEN 'OK - Enabled' 
            ELSE 'ERROR - Disabled'
       END AS status
FROM pg_class
WHERE relname = 'projects';

-- Cek policies
SELECT 'RLS policies' AS check_name,
       COUNT(*)::TEXT || ' policies active' AS status
FROM pg_policies
WHERE tablename = 'projects';

-- Cek storage policies
SELECT 'Storage policies' AS check_name,
       COUNT(*)::TEXT || ' policies active' AS status
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage';

-- ====================================
-- ✅ SETUP SELESAI!
-- ====================================
--
-- NEXT STEPS:
-- 
-- 1. ✅ SQL sudah dijalankan
-- 
-- 2. 🗄️ BUAT STORAGE BUCKET:
--    - Buka Dashboard > Storage
--    - Klik "Create a new bucket"
--    - Name: project-banners
--    - ✅ CENTANG "Public bucket"
--    - Klik "Create bucket"
--
-- 3. 🔄 RESTART SERVER:
--    npm run dev
--
-- 4. 🧪 TEST:
--    http://localhost:3000/test-supabase
--
-- 5. 🎉 MULAI PAKAI:
--    http://localhost:3000/admin/login
--    Password: admin123
--
-- ====================================
