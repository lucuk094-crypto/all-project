'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'loading' | 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

export default function TestSupabasePage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Konfigurasi Environment', status: 'loading', message: 'Checking...' },
    { name: 'Koneksi Supabase', status: 'loading', message: 'Checking...' },
    { name: 'Tabel Projects', status: 'loading', message: 'Checking...' },
    { name: 'Storage Bucket', status: 'loading', message: 'Checking...' },
  ]);

  useEffect(() => {
    runTests();
  }, []);

  const updateTest = (index: number, updates: Partial<TestResult>) => {
    setTests(prev => prev.map((test, i) => i === index ? { ...test, ...updates } : test));
  };

  const runTests = async () => {
    // Test 1: Environment Configuration
    if (!isSupabaseConfigured) {
      updateTest(0, {
        status: 'error',
        message: 'Environment variables tidak dikonfigurasi',
        details: 'File .env belum diisi dengan benar. Periksa NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY'
      });
      
      // Skip other tests
      for (let i = 1; i < tests.length; i++) {
        updateTest(i, { status: 'error', message: 'Skipped (env not configured)' });
      }
      return;
    } else {
      updateTest(0, {
        status: 'success',
        message: 'Environment variables terkonfigurasi dengan benar',
        details: `URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`
      });
    }

    // Test 2: Supabase Connection
    try {
      if (!supabase) throw new Error('Supabase client is null');
      
      const { error } = await supabase.from('projects').select('count', { count: 'exact', head: true });
      
      if (error && error.code === '42P01') {
        // Table doesn't exist
        updateTest(1, {
          status: 'warning',
          message: 'Koneksi berhasil, tapi tabel belum ada',
          details: 'Anda perlu menjalankan SUPABASE_SETUP.sql'
        });
      } else if (error) {
        throw error;
      } else {
        updateTest(1, {
          status: 'success',
          message: 'Koneksi ke Supabase berhasil'
        });
      }
    } catch (error: any) {
      updateTest(1, {
        status: 'error',
        message: 'Gagal terhubung ke Supabase',
        details: error.message || 'Unknown error'
      });
      
      // Skip other tests
      for (let i = 2; i < tests.length; i++) {
        updateTest(i, { status: 'error', message: 'Skipped (connection failed)' });
      }
      return;
    }

    // Test 3: Projects Table
    try {
      if (!supabase) throw new Error('Supabase client is null');
      
      const { data, error, count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (error) {
        if (error.code === '42P01') {
          updateTest(2, {
            status: 'error',
            message: 'Tabel "projects" belum dibuat',
            details: 'Jalankan SQL dari file SUPABASE_SETUP.sql di Supabase SQL Editor'
          });
        } else {
          throw error;
        }
      } else {
        updateTest(2, {
          status: 'success',
          message: `Tabel "projects" ditemukan`,
          details: `Jumlah project: ${count || 0}`
        });
      }
    } catch (error: any) {
      updateTest(2, {
        status: 'error',
        message: 'Error saat cek tabel projects',
        details: error.message
      });
    }

    // Test 4: Storage Bucket
    try {
      if (!supabase) throw new Error('Supabase client is null');
      
      const { data: buckets, error } = await supabase.storage.listBuckets();

      if (error) throw error;

      const projectBannersBucket = buckets?.find(b => b.name === 'project-banners');

      if (!projectBannersBucket) {
        updateTest(3, {
          status: 'error',
          message: 'Storage bucket "project-banners" belum dibuat',
          details: 'Buat bucket di Supabase Dashboard > Storage dengan nama "project-banners" dan set sebagai Public'
        });
      } else {
        updateTest(3, {
          status: 'success',
          message: 'Storage bucket "project-banners" ditemukan',
          details: projectBannersBucket.public ? 'Bucket is public ✓' : '⚠️ Bucket is not public'
        });
      }
    } catch (error: any) {
      updateTest(3, {
        status: 'error',
        message: 'Error saat cek storage bucket',
        details: error.message
      });
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-5 h-5 animate-spin text-gray-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'loading':
        return 'border-gray-300 dark:border-gray-700';
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-950/20';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-950/20';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    }
  };

  const allSuccess = tests.every(t => t.status === 'success');
  const hasError = tests.some(t => t.status === 'error');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
            🔍 Test Koneksi Supabase
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Halaman ini akan mengecek apakah Supabase Anda sudah dikonfigurasi dengan benar
          </p>
        </div>

        {/* Overall Status */}
        <Card className={`mb-6 border-2 ${
          allSuccess ? 'border-green-500 bg-green-50 dark:bg-green-950/20' :
          hasError ? 'border-red-500 bg-red-50 dark:bg-red-950/20' :
          'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              {allSuccess ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white">
                      ✅ Semua Test Berhasil!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Supabase Anda sudah terkonfigurasi dengan benar. Website siap digunakan!
                    </p>
                  </div>
                </>
              ) : hasError ? (
                <>
                  <XCircle className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white">
                      ❌ Ada Masalah yang Harus Diperbaiki
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Periksa detail error di bawah dan ikuti instruksi perbaikannya
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white">
                      ⏳ Sedang Mengecek...
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mohon tunggu sebentar
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Individual Tests */}
        <div className="space-y-4">
          {tests.map((test, index) => (
            <Card key={index} className={`border-2 ${getStatusColor(test.status)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  {getStatusIcon(test.status)}
                  <span className="text-black dark:text-white">{test.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {test.message}
                </p>
                {test.details && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {test.details}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Steps */}
        {hasError && (
          <Card className="mt-6 border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">
                📋 Langkah Selanjutnya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tests.find(t => t.name === 'Tabel Projects' && t.status === 'error') && (
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-bold mb-2 text-black dark:text-white">
                    1. Setup Database
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Buka Supabase Dashboard → SQL Editor</li>
                    <li>Klik "New Query"</li>
                    <li>Copy semua isi file <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">SUPABASE_SETUP.sql</code></li>
                    <li>Paste di SQL Editor dan klik "Run"</li>
                  </ol>
                </div>
              )}

              {tests.find(t => t.name === 'Storage Bucket' && t.status === 'error') && (
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-bold mb-2 text-black dark:text-white">
                    2. Buat Storage Bucket
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Buka Supabase Dashboard → Storage</li>
                    <li>Klik "Create a new bucket"</li>
                    <li>Name: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">project-banners</code></li>
                    <li>✅ Centang "Public bucket"</li>
                    <li>Klik "Create bucket"</li>
                  </ol>
                </div>
              )}

              <div className="p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                <h4 className="font-bold mb-2 text-black dark:text-white">
                  3. Refresh Halaman Ini
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Setelah selesai setup, refresh halaman ini untuk test ulang
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  🔄 Refresh & Test Ulang
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Actions */}
        {allSuccess && (
          <Card className="mt-6 border-2 border-green-500 bg-green-50 dark:bg-green-950/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3 text-black dark:text-white">
                🎉 Setup Selesai!
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Supabase Anda sudah siap digunakan. Anda bisa mulai menggunakan website:
              </p>
              <div className="flex gap-3">
                <a
                  href="/"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  🏠 Ke Homepage
                </a>
                <a
                  href="/admin/login"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  🔐 Login Admin
                </a>
                <a
                  href="/admin/dashboard"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  📊 Dashboard
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
