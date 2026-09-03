# 🎨 Modern Portfolio Website

A beautiful, modern portfolio website built with Next.js 15, featuring Vercel-style dark mode, glassmorphism effects, and a full-featured admin panel.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

---

## ✨ Features

### 🎯 Core Features
- ✅ **Modern UI/UX** - Vercel-inspired design with glassmorphism
- ✅ **Dark Mode** - Pure black (#000000) dark theme with smooth transitions
- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- ✅ **Animations** - Smooth Framer Motion animations throughout
- ✅ **Admin Panel** - Full CRUD operations for projects
- ✅ **Image Upload** - Drag & drop with Supabase Storage
- ✅ **SEO Optimized** - Meta tags and structured data

### 🎨 Design Features
- Modern glassmorphism effects
- Animated Python code card on homepage
- Interactive project cards with 3D tilt
- Smooth page transitions
- Custom scrollbars
- Loading states and skeletons

### 🔐 Admin Features
- Secure authentication
- Create, edit, delete projects
- Image upload with preview
- Draft/Published status
- Featured projects management
- Category & technology tagging

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes

### Backend
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Custom localStorage-based (admin only)

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier (recommended)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Supabase account (free tier works)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Supabase Setup

**⚡ Quick Start (10 menit):**
Lihat file: **`QUICK_START.md`**

**📖 Panduan Lengkap:**
Lihat file: **`SETUP_SUPABASE.md`**

**Ringkasan:**
1. Buat project Supabase
2. Copy API keys → update `.env`
3. Jalankan `SUPABASE_SETUP.sql` di SQL Editor
4. Buat storage bucket `project-banners` (public)
5. Restart server & test

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📱 Responsive Breakpoints

```css
Mobile:  320px - 767px   (sm:)
Tablet:  768px - 1023px  (md:)
Laptop:  1024px - 1279px (lg:)
Desktop: 1280px - 1535px (xl:)
Large:   1536px+         (2xl:)
```

All pages are fully tested on:
- iPhone (portrait & landscape)
- iPad (portrait & landscape)
- Windows desktop (1920x1080, 1366x768)
- 4K displays (3840x2160)

---

## 🎨 Color Palette

### Light Mode
- Background: `#FFFFFF` (White)
- Text: `#000000` (Black)
- Accent: Various shades of gray

### Dark Mode (Vercel Style)
- Background: `#000000` (Pure Black)
- Text: `#FFFFFF` (Pure White)
- Cards: `rgba(255, 255, 255, 0.05)` (Glass effect)
- Borders: `rgba(255, 255, 255, 0.1)`

---

## 📂 Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   │   ├── dashboard/     # Project management
│   │   ├── new/           # Create project
│   │   ├── edit/[id]/     # Edit project
│   │   └── login/         # Admin login
│   ├── projects/          # Public projects pages
│   │   ├── page.tsx       # Projects list
│   │   └── [slug]/        # Project detail
│   ├── about/             # About page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ProjectCard.tsx   # Project display card
│   ├── ImageDropzone.tsx # File upload component
│   └── ...               # Other components
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── supabaseProjectService.ts
│   └── supabaseStorageService.ts
├── public/               # Static assets
│   ├── images/          # Project images
│   ├── next.svg         # Next.js logo
│   └── vercel.svg       # Vercel logo
├── .env.example         # Environment template
├── DEPLOYMENT_GUIDE.md  # Deployment instructions
└── package.json         # Dependencies
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Cleanup
rm -rf .next         # Clear Next.js cache
rm -rf node_modules  # Remove dependencies
npm install          # Reinstall dependencies
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Set Environment Variables**
   Add all variables from `.env` in Vercel dashboard

📖 **Detailed guide**: See `DEPLOYMENT_GUIDE.md`

---

## 📄 Pages Overview

### Public Pages
- **`/`** - Homepage with hero section and Python code animation
- **`/projects`** - Project gallery with filter & search
- **`/projects/[slug]`** - Individual project details
- **`/about`** - About page with skills and tech stack

### Admin Pages (Protected)
- **`/admin`** - Admin landing/redirect
- **`/admin/login`** - Login page
- **`/admin/dashboard`** - Project management dashboard
- **`/admin/new`** - Create new project
- **`/admin/edit/[id]`** - Edit existing project

---

## 🎯 Features in Detail

### Dark Mode
- System preference detection
- Manual toggle
- Persistent theme (localStorage)
- Smooth color transitions
- Pure black for OLED optimization

### Admin Panel
- Password-protected access
- Project CRUD operations
- Image upload with drag & drop
- Real-time preview
- Draft/Published workflow
- Featured projects toggle
- Category & tech stack management

### Project Management
- Rich text descriptions
- Multiple images per project
- Live URL & GitHub links
- Technology badges
- Status indicators (draft/published)
- Featured flag

---

## 🔒 Security

- Environment variables for sensitive data
- Server-side API route protection
- Input sanitization
- SQL injection prevention (Supabase RLS)
- XSS protection (React escaping)
- CSRF protection (Next.js built-in)

---

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Dark Mode Not Working
- Clear browser cache
- Check localStorage `theme` key
- Verify `ThemeProvider` is wrapping app

### Images Not Loading
- Check Supabase bucket permissions
- Verify `project-banners` bucket exists
- Ensure bucket is public

### Admin Can't Login
- Verify `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env`
- Clear localStorage
- Check browser console for errors

---

## 📊 Performance

Lighthouse Scores (Target):
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

Optimization techniques:
- Next.js Image optimization
- Code splitting
- Lazy loading
- Font optimization
- CSS purging (Tailwind)

---

## 🤝 Contributing

This is a personal portfolio template. Feel free to:
- Fork the repository
- Customize for your needs
- Submit issues for bugs
- Suggest improvements

---

## 📝 License

MIT License - feel free to use this template for your own portfolio!

---

## 👤 Author

**Van-X313**
- Portfolio: [Your Portfolio URL]
- GitHub: [@vanx313](https://github.com/vanx313)
- Email: vanx313@example.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Supabase](https://supabase.com) - Backend platform
- [Vercel](https://vercel.com) - Deployment platform
- [shadcn/ui](https://ui.shadcn.com) - UI components

---

## 📚 Documentation

- [Quick Start Guide](./QUICK_START_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Admin Guide](./ADMIN_GUIDE.md)
- [Getting Started](./GETTING_STARTED.md)

---

**Made with ❤️ and Next.js**
