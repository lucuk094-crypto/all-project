import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  className?: string;
  muted?: boolean;
}

export default function TechBadge({ name, className = '', muted = false }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[0.6875rem] font-medium leading-none tracking-tight transition-colors duration-300',
        muted
          ? 'border-[var(--hairline)] bg-transparent text-[var(--faint)]'
          : 'border-[var(--hairline)] bg-[var(--surface)] text-[var(--muted)]',
        className,
      )}
    >
      {name}
    </span>
  );
}
