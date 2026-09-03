# 🚀 Deployment Guide - GitLab & Vercel

## ✅ Status: Git sudah di-initialize & commit pertama sudah dibuat!

---

## 📋 PART 1: PUSH KE GITLAB

### Step 1: Buat Repository di GitLab

1. **Buka:** https://gitlab.com
2. **Login** dengan akun Anda
3. **Klik "New project"** (tombol hijau atau icon +)
4. **Pilih:** "Create blank project"
5. **Isi:**
   - **Project name:** `portfolio-vanx313` (atau nama lain)
   - **Project slug:** `portfolio-vanx313`
   - **Visibility:** Private (recommended) atau Public
   - ❌ **JANGAN centang** "Initialize repository with a README"
6. **Klik:** "Create project"

---

### Step 2: Copy Git URL

Setelah repository dibuat, akan muncul halaman dengan instruksi.

**Copy URL repository** (pilih salah satu):
- **HTTPS:** `https://gitlab.com/username/portfolio-vanx313.git`
- **SSH:** `git@gitlab.com:username/portfolio-vanx313.git`

**Recommended:** Gunakan HTTPS (lebih mudah untuk pertama kali)

---

### Step 3: Push ke GitLab

Di terminal/PowerShell, jalankan command ini:

```powershell
# 1. Add remote (ganti URL dengan URL repository GitLab Anda)
cd "c:\Users\vanx3\Downloads\dashbord-van-x313-all-project-main"
git remote add origin https://gitlab.com/username/portfolio-vanx313.git

# 2. Set branch name to main
git branch -M main

# 3. Push to GitLab
git push -u origin main
```

**Jika diminta login:**
- Username: username GitLab Anda
- Password: Personal Access Token (bukan password akun!)

---

### Step 4: Buat Personal Access Token (Jika Perlu)

Jika push gagal karena authentication:

1. **Buka:** https://gitlab.com/-/user_settings/personal_access_tokens
2. **Token name:** `portfolio-deploy`
3. **Expiration date:** 1 year dari sekarang
4. **Scopes:** Centang:
   - ✅ `api`
   - ✅ `read_repository`
   - ✅ `write_repository`
5. **Klik:** "Create personal access token"
6. **COPY TOKEN** (simpan di notepad, tidak bisa dilihat lagi!)
7. **Gunakan token** ini sebagai password saat push

---

## 📋 PART 2: DEPLOY KE VERCEL

### Step 1: Buat Akun Vercel

1. **Buka:** https://vercel.com
2. **Klik:** "Sign Up"
3. **Login with GitLab** (recommended) atau GitHub/Email
4. **Authorize** Vercel untuk akses GitLab

---

### Step 2: Import Project

1. **Klik:** "Add New..." → "Project"
2. **Import Git Repository:**
   - Pilih repository: `portfolio-vanx313`
   - Klik **"Import"**

---

### Step 3: Configure Project

Di halaman Configure Project:

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (default)

**Build Command:** 
```
npm run build
```

**Output Directory:** 
```
.next
```

**Install Command:** 
```
npm install
```

---

### Step 4: Environment Variables

**PENTING!** Tambahkan environment variables dari `.env`:

Klik **"Environment Variables"**, lalu tambahkan satu per satu:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mpsvxnlhwaxrqlntvbfn.supabase.co` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJI...` (copy dari .env) | Production, Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJI...` (copy dari .env) | Production, Preview |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `admin123` (atau ganti password baru) | Production, Preview |

**Cara add:**
1. Klik **"Add Another"** untuk setiap variable
2. Paste **Key** dan **Value**
3. Pastikan **Production** dan **Preview** ter-centang

---

### Step 5: Deploy!

1. **Klik:** "Deploy"
2. **Tunggu** 2-5 menit (build process)
3. **Selesai!** Website akan otomatis ter-deploy

---

## 🎉 SETELAH DEPLOY BERHASIL

### Your URLs:

**Production:**
```
https://portfolio-vanx313.vercel.app
```

**Admin:**
```
https://portfolio-vanx313.vercel.app/admin/login
```

---

## 🔄 WORKFLOW UPDATE CODE

Setelah ini, setiap kali Anda update code:

```powershell
# 1. Add changes
git add .

# 2. Commit
git commit -m "Update: deskripsi perubahan"

# 3. Push
git push origin main
```

**Vercel akan otomatis:**
- Detect push baru
- Build & deploy otomatis
- Update website dalam 2-5 menit

---

## 🛠️ TROUBLESHOOTING

### Error: "Failed to push"

**Solusi:**
```powershell
# Check remote
git remote -v

# If wrong, remove and re-add
git remote remove origin
git remote add origin https://gitlab.com/username/portfolio-vanx313.git

# Push again
git push -u origin main
```

---

### Error: "Authentication failed"

**Solusi:**
1. Buat Personal Access Token di GitLab
2. Gunakan token sebagai password
3. Atau setup SSH key

---

### Vercel Build Error

**Solusi:**
1. Check di Vercel Dashboard → Project → Deployments
2. Klik deployment yang error
3. Lihat **Build Logs**
4. Biasanya issue:
   - ❌ Environment variables belum di-set
   - ❌ Type error di code
   - ❌ Missing dependencies

---

## 📝 QUICK COMMANDS REFERENCE

```powershell
# Status
git status

# Add all changes
git add .

# Commit
git commit -m "message"

# Push
git push origin main

# Pull latest
git pull origin main

# Check remotes
git remote -v

# View commit history
git log --oneline
```

---

## 🔒 SECURITY NOTES

✅ **DO:**
- Use environment variables untuk sensitive data
- Ganti admin password untuk production
- Review RLS policies di Supabase

❌ **DON'T:**
- Commit file `.env` ke Git
- Share API keys publicly
- Use weak admin password

---

## 🎯 NEXT STEPS

1. ✅ Push ke GitLab
2. ✅ Deploy ke Vercel
3. ✅ Test website production
4. ✅ Tambah custom domain (optional)
5. ✅ Setup Vercel Analytics (optional)

---

**Good luck! 🚀**
