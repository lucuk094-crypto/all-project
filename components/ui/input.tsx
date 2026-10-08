import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full min-w-0 rounded-xl border border-[var(--input)] bg-[var(--surface)] px-3.5 py-2 text-sm text-[var(--foreground)] transition-all duration-300',
        'placeholder:text-[var(--faint)]',
        'hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)]',
        'focus-visible:border-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content flex min-h-24 w-full resize-y rounded-xl border border-[var(--input)] bg-[var(--surface)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--foreground)] transition-all duration-300',
        'placeholder:text-[var(--faint)]',
        'hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)]',
        'focus-visible:border-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function Select({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      data-slot="select"
      className={cn(
        'flex h-10 w-full appearance-none rounded-xl border border-[var(--input)] bg-[var(--surface)] bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'none\' stroke=\'%23888\' stroke-width=\'1.8\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m4 6 4 4 4-4\'/%3E%3C/svg%3E")] bg-[position:right_0.75rem_center] bg-no-repeat px-3.5 py-2 pr-10 text-sm text-[var(--foreground)] transition-all duration-300',
        'hover:border-[color-mix(in_oklab,var(--foreground)_22%,transparent)]',
        'focus-visible:border-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea, Select };
