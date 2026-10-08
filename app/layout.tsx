import type { Metadata, Viewport } from 'next';
import { Inter, Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/Toaster';
import { ScrollProgress } from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import AuroraBackground from '@/components/AuroraBackground';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const SITE_NAME = 'Van-X313 — Portfolio';
const SITE_DESCRIPTION =
  'Portfolio website showcasing web development projects with code examples, live demos, and detailed explanations.';

export const metadata: Metadata = {
  metadataBase: new URL('https://dashbord-all-project.vercel.app'),
  title: {
    default: SITE_NAME,
    template: '%s · Van-X313',
  },
  description: SITE_DESCRIPTION,
  keywords: ['portfolio', 'web development', 'Next.js', 'React', 'TypeScript', 'Supabase'],
  authors: [{ name: 'Van-X313' }],
  creator: 'Van-X313',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#07070a' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuroraBackground />
          <ScrollProgress />

          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-20 md:pt-24">{children}</main>
            <Footer />
          </div>

          <BottomNav />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
