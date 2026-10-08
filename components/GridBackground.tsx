import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
  /** Fades the grid out toward the bottom of the element. */
  fade?: boolean;
  size?: number;
}

/**
 * Lightweight static grid overlay for section-level depth.
 * The animated 3D grid lives in <AuroraBackground/>.
 */
export function GridBackground({ className = '', fade = true, size = 56 }: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--hairline) 1px, transparent 1px), linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)',
          backgroundSize: `${size}px ${size}px`,
          maskImage: fade
            ? 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 100%)'
            : undefined,
          WebkitMaskImage: fade
            ? 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 100%)'
            : undefined,
          opacity: 0.6,
        }}
      />
    </div>
  );
}

export default GridBackground;
