'use client';

import { motion } from 'framer-motion';
import { CircleDashed, Terminal } from 'lucide-react';

const LINES: React.ReactNode[] = [
  <>
    <span className="text-[#7c7f8a]">{'// craft.ts — philosophy'}</span>
  </>,
  <>
    <span className="text-[#c0a9ff]">import</span> <span className="text-[#e6e6ea]">{'{ build }'}</span>{' '}
    <span className="text-[#c0a9ff]">from</span> <span className="text-[#9fd6a0]">&apos;./craft&apos;</span>
    <span className="text-[#7c7f8a]">;</span>
  </>,
  <br key="b1" />,
  <>
    <span className="text-[#c0a9ff]">export const</span>{' '}
    <span className="text-[#8ec8ff]">engineer</span> <span className="text-[#7c7f8a]">=</span>{' '}
    <span className="text-[#e6e6ea]">{'{'}</span>
  </>,
  <>
    &nbsp;&nbsp;name: <span className="text-[#9fd6a0]">&apos;Van-X313&apos;</span>
    <span className="text-[#7c7f8a]">,</span>
  </>,
  <>
    &nbsp;&nbsp;stack: <span className="text-[#e6e6ea]">[</span>
    <span className="text-[#9fd6a0]">&apos;Next.js&apos;</span>
    <span className="text-[#7c7f8a]">,</span> <span className="text-[#9fd6a0]">&apos;TypeScript&apos;</span>
    <span className="text-[#7c7f8a]">,</span> <span className="text-[#9fd6a0]">&apos;Supabase&apos;</span>
    <span className="text-[#e6e6ea]">]</span>
    <span className="text-[#7c7f8a]">,</span>
  </>,
  <>
    &nbsp;&nbsp;<span className="text-[#8ec8ff]">async</span>{' '}
    <span className="text-[#f0d18a]">ship</span>
    <span className="text-[#e6e6ea]">()</span> <span className="text-[#e6e6ea]">{'{'}</span>
  </>,
  <>
    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c0a9ff]">return</span>{' '}
    <span className="text-[#c0a9ff]">await</span> <span className="text-[#f0d18a]">build</span>
    <span className="text-[#e6e6ea]">(</span>
    <span className="text-[#e6e6ea]">{'{'}</span> fast: <span className="text-[#f0a68a]">true</span>
    <span className="text-[#7c7f8a]">,</span> accessible: <span className="text-[#f0a68a]">true</span>{' '}
    <span className="text-[#e6e6ea]">{'}'}</span>
    <span className="text-[#e6e6ea]">)</span>
    <span className="text-[#7c7f8a]">;</span>
  </>,
  <>
    &nbsp;&nbsp;<span className="text-[#e6e6ea]">{'}'}</span>
    <span className="text-[#7c7f8a]">,</span>
  </>,
  <>
    <span className="text-[#e6e6ea]">{'}'}</span>
    <span className="text-[#7c7f8a]">;</span>
  </>,
  <br key="b2" />,
  <>
    <span className="text-[#7c7f8a]">{'// '}</span>
    <span className="text-[#e6e6ea]">engineer</span>
    <span className="text-[#7c7f8a]">.</span>
    <span className="text-[#f0d18a]">ship</span>
    <span className="text-[#e6e6ea]">()</span>
    <span className="text-[#7c7f8a]">;</span>
  </>,
];

export default function CodeShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: '1200px' }}
    >
      {/* Soft glow behind the card */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--foreground)_12%,transparent),transparent_70%)] blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/80 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-[var(--surface-2)]/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-[var(--faint)]">
            <Terminal className="h-3 w-3" strokeWidth={1.8} />
            craft.ts
          </div>
          <div className="flex items-center gap-1.5">
            <CircleDashed className="h-3 w-3 animate-spin text-[var(--faint)]" strokeWidth={1.8} />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--faint)]">
              live
            </span>
          </div>
        </div>

        {/* Code body */}
        <div className="relative h-[19rem] overflow-hidden px-5 py-4 font-mono text-[0.8125rem] leading-[1.85] sm:h-[21rem] sm:text-[0.875rem]">
          <div className="animate-scroll-code">
            {LINES.map((line, i) => (
              <div key={`a-${i}`} className="whitespace-pre">
                {line}
              </div>
            ))}
            {LINES.map((line, i) => (
              <div key={`b-${i}`} className="whitespace-pre" aria-hidden="true">
                {line}
              </div>
            ))}
          </div>
          {/* Fades top & bottom so the loop looks seamless */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[var(--surface)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/80 to-transparent" />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-[var(--hairline)] bg-[var(--surface-2)]/40 px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--faint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            running
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--faint)]">
            TypeScript · 0 errors
          </span>
        </div>
      </div>
    </motion.div>
  );
}
