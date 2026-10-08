import type { LucideIcon } from 'lucide-react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  align?: 'left' | 'center';
  className?: string;
  action?: React.ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = 'center',
  className = '',
  action,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={[
        'flex w-full gap-6',
        centered ? 'flex-col items-center text-center' : 'flex-col items-start md:flex-row md:items-end md:justify-between',
        className,
      ].join(' ')}
    >
      <Reveal className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <div className={`mb-4 flex items-center gap-2.5 ${centered ? 'justify-center' : ''}`}>
            {Icon && (
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--hairline)] bg-[var(--surface)]">
                <Icon className="h-3.5 w-3.5 text-[var(--muted)]" strokeWidth={1.75} />
              </span>
            )}
            <span className="eyebrow">{eyebrow}</span>
          </div>
        )}

        <h2 className="text-display text-3xl sm:text-4xl md:text-[2.75rem]">
          <span className="text-gradient">{title}</span>
        </h2>

        {description && (
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-[1.0625rem]">
            {description}
          </p>
        )}
      </Reveal>

      {action && <Reveal delay={0.12}>{action}</Reveal>}
    </div>
  );
}
