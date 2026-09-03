# 🚀 Getting Started - Portfolio Van-X313

Panduan cepat untuk setup dan menjalankan portfolio website.

## 📋 Prerequisites

Sebelum memulai, pastikan sudah terinstall:

- ✅ Node.js 18.x atau lebih baru
- ✅ npm atau yarn
- ✅ Git
- ✅ Firebase account (gratis)
- ✅ Text editor (VS Code recommended)

## 🔧 Installation (5 Menit)

### 1. Clone & Install

```bash
# Clone repository
cd C:\Users\vanx3\Documents\ALL PROJECT VAN-X313\CodeLearn-main

# Install dependencies
npm install
```

### 2. Setup Firebase

**Langkah A: Buat Firebase Project**
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik "Add Project"
3. Beri nama project (contoh: "portfolio-vanx313")
4. Enable Google Analytics (optional)
5. Create Project

**Langkah B: Setup Firestore Database**
1. Di sidebar, klik "Firestore Database"
2. Klik "Create Database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih location (asia-southeast2 untuk Indonesia)
5. Enable

**Langkah C: Setup Storage**
1. Di sidebar, klik "Storage"
2. Klik "Get Started"
3. Start in test mode
4. Done

**Langkah D: Get Config**
1. Di Project Overview, klik gear icon → Project Settings
2. Scroll ke bawah ke "Your apps"
3. Klik icon "</>" (Web)
4. Register app dengan nickname
5. Copy config values

### 3. Setup Environment Variables

Buat file `.env` di root folder:

```env
# Copy dari .env.example
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

**⚠️ PENTING**: Jangan commit file `.env` ke Git!

### 4. Run Development Server

```bash
npm run dev
```

Buka browser ke [http://localhost:3000](http://localhost:3000)

🎉 **Portfolio sudah running!**

---

## 📝 First Time Setup

### Menambah Project Pertama

1. Buka [http://localhost:3000/admin](http://localhost:3000/admin)
2. Klik "Tambah Project Baru"
3. Isi form:
   ```
   Judul: My First Project
   Tagline: A simple landing page
   Kategori: Web Development
   Deskripsi: Deskripsi lengkap project...
   Teknologi: HTML, CSS, JavaScript
   Live URL: https://myproject.com
   GitHub URL: https://github.com/vanx313/myproject
   ```
4. Upload banner image
5. Paste source code (HTML/CSS/JS)
6. Check "Featured" untuk menampilkan di homepage
7. Check "Published"
8. Klik "Simpan Project"

### Upload Banner Image

Ukuran recommended:
- Width: 1200px
- Height: 630px (16:9 ratio)
- Format: JPG atau PNG
- Max size: 2MB

---

## 🎨 Customization

### Mengubah Warna Tema

Edit `app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);        /* White */
  --foreground: oklch(0.141 0.005 285.823);  /* Black */
  /* Ubah values sesuai kebutuhan */
}
```

### Mengubah Fonts

Sudah setup dengan:
- **Inter** untuk headings (h1-h6)
- **Geist** untuk body text
- **Geist Mono** untuk code blocks

Untuk ganti font, edit `app/layout.tsx`

### Menambah Halaman Baru

```bash
# Buat folder & file baru
mkdir app/contact
echo. > app/contact/page.tsx
```

Kemudian edit `app/contact/page.tsx`

---

## 🚢 Deployment

### Deploy ke Vercel (Gratis & Cepat)

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/vanx313/portfolio.git
   git push -u origin main
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "Import Project"
   - Pilih repository
   - Framework Preset: Next.js (auto-detect)

3. **Add Environment Variables**
   - Di Vercel dashboard
   - Settings → Environment Variables
   - Add semua variables dari `.env`

4. **Deploy!**
   - Klik "Deploy"
   - Tunggu 2-3 menit
   - Portfolio sudah live! 🎉

URL akan seperti: `https://portfolio-vanx313.vercel.app`

### Custom Domain (Optional)

1. Beli domain (dari Namecheap, GoDaddy, dll)
2. Di Vercel: Settings → Domains
3. Add domain
4. Update DNS records di provider domain
5. Done!

---

## 🛠️ Development Commands

```bash
# Run development server
npm run dev

# Build untuk production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # 🏠 Homepage
│   ├── about/page.tsx        # 👤 About Me
│   ├── projects/
│   │   ├── page.tsx          # 📂 Projects List
│   │   └── [slug]/page.tsx   # 📄 Project Detail
│   └── admin/
│       ├── page.tsx          # 🔐 Admin Dashboard
│       └── new/page.tsx      # ➕ Add Project
├── components/
│   ├── ui/                   # 🎨 shadcn components
│   ├── ProjectCard.tsx       # 🃏 Project card
│   ├── CodeViewer.tsx        # 💻 Code viewer
│   └── TechBadge.tsx         # 🏷️ Tech badge
├── lib/
│   ├── firebase.ts           # 🔥 Firebase config
│   ├── projectService.ts     # 📊 CRUD operations
│   └── storageService.ts     # 📤 File uploads
└── public/                   # 🖼️ Static assets
```

---

## 🐛 Troubleshooting

### Build Error

```bash
# Clear cache & rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Firebase Connection Error

1. Check `.env` file ada
2. Verify all Firebase credentials correct
3. Check Firebase project settings
4. Ensure Firestore & Storage enabled

### Port 3000 Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Check types
npx tsc --noEmit

# Clear TypeScript cache
rm -rf node_modules/.cache
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🆘 Need Help?

- Check `README.md` untuk dokumentasi lengkap
- Check `FINAL_SUMMARY.md` untuk technical details
- GitHub Issues: [Create Issue]
- Email: vanx313@example.com

---

## ✅ Checklist

Setup Complete:
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Firebase project created
- [ ] `.env` file configured
- [ ] Development server running
- [ ] First project added
- [ ] Ready to deploy!

---

**Happy Coding! 🚀**

Made with ❤️ by Van-X313
