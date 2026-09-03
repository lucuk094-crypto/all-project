# 🚀 Deployment Guide - Portfolio Website

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup
Sebelum deploy, pastikan Anda sudah setup Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

### 2. Database Setup
1. Buat project di [Supabase](https://supabase.com)
2. Jalankan SQL dari `SUPABASE_SETUP.sql` di SQL Editor Supabase
3. Aktifkan Storage bucket `project-banners` dengan public access

---

## 📦 Deploy ke Vercel

### Step 1: Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit - Portfolio website"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

### Step 2: Import ke Vercel
1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New"** → **"Project"**
3. Import repository GitHub Anda
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Environment Variables
Di Vercel dashboard, tambahkan environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

### Step 4: Deploy
Klik **"Deploy"** dan tunggu prosesnya selesai!

---

## 🎯 Post-Deployment

### 1. Custom Domain (Optional)
1. Di Vercel Dashboard → Settings → Domains
2. Tambahkan domain custom Anda
3. Update DNS records sesuai instruksi

### 2. Test Website
✅ Homepage: Cek animasi dan dark mode
✅ Projects: Test filter dan pagination
✅ About: Cek responsive layout
✅ Admin: Login dan test CRUD operations

### 3. Mobile Testing
- iOS Safari
- Android Chrome
- Responsive breakpoints: 320px, 768px, 1024px, 1440px

---

## 📱 Responsive Design

Website sudah fully responsive untuk:
- ✅ **Mobile** (320px - 767px)
- ✅ **Tablet** (768px - 1023px)  
- ✅ **Desktop** (1024px+)
- ✅ **4K** (1440px+)

### Breakpoints Used:
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

---

## 🎨 Features

### ✅ Dark Mode
- Pure black (#000000) Vercel-style
- Smooth transitions
- Persistent theme (localStorage)

### ✅ Animations
- Framer Motion animations
- Scroll animations
- Hover effects
- Loading states

### ✅ Admin Panel
- Secure login (localStorage)
- CRUD operations
- Image upload (Supabase Storage)
- Rich form validation

### ✅ Performance
- Next.js 15 App Router
- Image optimization
- Code splitting
- Lazy loading

---

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Environment Variables Not Working
- Pastikan prefix `NEXT_PUBLIC_` untuk client-side vars
- Restart development server setelah update `.env`

### Image Upload Issues
- Cek Supabase Storage bucket permissions
- Pastikan bucket `project-banners` bersifat public

### Dark Mode Not Working
- Clear browser cache (Ctrl + Shift + R)
- Check localStorage for `theme` key

---

## 📊 Performance Metrics

Target Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## 🔒 Security

### Admin Protection
- Password-based auth (localStorage)
- Server-side validation
- CSRF protection via Next.js

### Database Security
- Row Level Security (RLS) enabled
- Service role key for admin operations
- Public access only for published projects

---

## 📝 Maintenance

### Update Content
1. Login ke `/admin`
2. Manage projects (tambah/edit/hapus)
3. Changes auto-sync dengan database

### Update Code
```bash
git pull origin main
npm install
npm run dev
```

### Monitoring
- Vercel Analytics (optional)
- Supabase Dashboard untuk database monitoring
- Error tracking via Vercel logs

---

## 🎉 Success!

Website Anda sekarang live dan siap digunakan!

**Default URLs:**
- Homepage: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin`
- Projects: `https://your-project.vercel.app/projects`
- About: `https://your-project.vercel.app/about`

---

## 💡 Tips

1. **SEO**: Update metadata di `app/layout.tsx`
2. **Analytics**: Tambahkan Vercel Analytics atau Google Analytics
3. **Custom Domain**: Lebih profesional daripada `.vercel.app`
4. **Regular Backups**: Export database dari Supabase secara berkala
5. **Content Updates**: Gunakan admin panel, bukan edit langsung di database

---

## 🆘 Support

Jika ada masalah:
1. Cek Vercel deployment logs
2. Cek Supabase database connection
3. Cek browser console untuk errors
4. Pastikan semua environment variables sudah benar

**Happy Deploying! 🚀**
