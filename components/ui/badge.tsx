import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium leading-normal transition-colors w-fit',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--foreground)] text-[var(--background)]',
        outline: 'border-[var(--hairline)] bg-transparent text-[var(--muted)]',
        soft: 'border-[var(--hairline)] bg-[var(--surface-2)] text-[var(--muted)]',
        success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-500',
        warning: 'border-amber-500/25 bg-amber-500/10 text-amber-500',
        danger: 'border-red-500/25 bg-red-500/10 text-red-500',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-xl bg-[var(--accent-soft)]', className)}
      {...props}
    />
  );
}

export { Badge, Skeleton, badgeVariants };
