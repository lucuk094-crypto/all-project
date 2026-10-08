'use client';

import { useEffect, useRef } from 'react';

/**
 * AuroraBackground — 3D layered gradient-mesh background.
 *
 * • Fixed, GPU-composited (transform/opacity only) — never triggers layout.
 * • Subtle mouse + scroll parallax written straight to the DOM via refs,
 *   so there are zero React re-renders while animating.
 * • Automatically degrades on small screens and honours
 *   `prefers-reduced-motion: reduce`.
 */
export default function AuroraBackground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const layer = layerRef.current;
    const grid = gridRef.current;
    if (!scene || !layer) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.matchMedia('(max-width: 767px)').matches;

    if (reduce) {
      layer.style.transform = 'translate3d(0,0,0)';
      return;
    }

    let raf = 0;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let sy = 0;
    let csy = 0;

    // Heavier travel on desktop, gentler on mobile (cheaper + less dizzying)
    const depth = isSmall ? 12 : 34;

    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      sy = window.scrollY;
    };

    const tick = () => {
      cx += (mx - cx) * 0.045;
      cy += (my - cy) * 0.045;
      csy += (sy - csy) * 0.08;

      layer.style.transform = `translate3d(${(-cx * depth).toFixed(2)}px, ${(-cy * depth - csy * 0.035).toFixed(2)}px, 0)`;
      if (grid) {
        grid.style.transform = `rotateX(72deg) translate3d(${(cx * 8).toFixed(2)}px, ${(csy * 0.06).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={sceneRef} className="aurora-scene" aria-hidden="true">
      <div ref={layerRef} className="aurora-layer">
        {/* Blob 01 — cool white, top-left */}
        <div
          className="aurora-blob animate-aurora-a animate-breathe"
          style={{
            width: '52vw',
            height: '52vw',
            top: '-12%',
            left: '-8%',
            background: 'radial-gradient(circle at 30% 30%, rgba(226,232,255,0.55), rgba(150,160,190,0.22) 45%, transparent 70%)',
          }}
        />
        {/* Blob 02 — blue-grey, top-right */}
        <div
          className="aurora-blob animate-aurora-b"
          style={{
            width: '46vw',
            height: '46vw',
            top: '-6%',
            right: '-10%',
            background: 'radial-gradient(circle at 60% 40%, rgba(176,190,225,0.45), rgba(110,120,155,0.18) 48%, transparent 72%)',
            animationDelay: '-6s',
          }}
        />
        {/* Blob 03 — silver, mid-center */}
        <div
          className="aurora-blob animate-aurora-c animate-breathe"
          style={{
            width: '58vw',
            height: '58vw',
            top: '28%',
            left: '18%',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.32), rgba(130,140,175,0.16) 42%, transparent 68%)',
            animationDelay: '-3s',
          }}
        />
        {/* Blob 04 — deep slate, bottom */}
        <div
          className="aurora-blob animate-aurora-a"
          style={{
            width: '44vw',
            height: '44vw',
            bottom: '-14%',
            right: '4%',
            background: 'radial-gradient(circle at 40% 60%, rgba(120,132,170,0.4), rgba(70,78,110,0.16) 46%, transparent 70%)',
            animationDelay: '-14s',
          }}
        />
      </div>

      {/* 3D perspective floor grid */}
      <div ref={gridRef} className="aurora-grid animate-grid-march" />

      {/* Depth vignette + grain */}
      <div className="aurora-vignette" />
      <div className="aurora-noise" />
    </div>
  );
}
