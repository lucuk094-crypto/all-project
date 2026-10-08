import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--foreground)] text-[var(--background)] shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset] hover:opacity-90 active:scale-[0.98]',
        outline:
          'border border-[var(--hairline)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-2)] hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] active:scale-[0.98]',
        ghost: 'text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]',
        subtle:
          'bg-[var(--accent-soft)] text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]',
        destructive: 'bg-red-600 text-white hover:bg-red-500 active:scale-[0.98]',
        link: 'text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline',
      },
      size: {
        sm: 'h-8 rounded-lg px-3 text-[0.8125rem]',
        default: 'h-10 px-4',
        lg: 'h-12 rounded-xl px-7 text-[0.9375rem]',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8 rounded-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
