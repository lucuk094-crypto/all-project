import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.icons8.com",
      // Supabase storage domains
      "wwjxyrlyafuwrbjsysmh.supabase.co", // Your specific project
      // Add generic Supabase domain for future projects
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
