import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Required for the bundled /public/demo/*.svg placeholders
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },
  poweredByHeader: false,
  // Allow the sandbox preview host during development
  allowedDevOrigins: ['*.e2b.app', '*.arena.ai', 'localhost:3000'],
};

export default nextConfig;
