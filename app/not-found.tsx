'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FolderOpen, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <FolderOpen className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <div className="text-8xl font-black text-gray-900 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" className="border-gray-300">
              <FolderOpen className="w-4 h-4 mr-2" />
              View Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
