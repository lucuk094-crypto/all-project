'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/login');
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3 text-[var(--muted)]"
      >
        <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.75} />
        <p className="font-mono text-xs uppercase tracking-[0.16em]">Mengalihkan...</p>
      </motion.div>
    </div>
  );
}
