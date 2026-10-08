'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        duration: 3200,
        style: {
          background: 'var(--elevated)',
          color: 'var(--foreground)',
          border: '1px solid var(--hairline)',
          borderRadius: '14px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 20px 50px -20px rgba(0,0,0,0.65)',
          backdropFilter: 'blur(16px)',
          maxWidth: '92vw',
        },
        success: { iconTheme: { primary: '#34d399', secondary: 'var(--elevated)' } },
        error: { iconTheme: { primary: '#f87171', secondary: 'var(--elevated)' } },
      }}
    />
  );
}

export default Toaster;
