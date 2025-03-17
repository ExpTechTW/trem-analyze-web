import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `
          flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent
          px-3 py-1 text-base outline-none transition-[color,box-shadow]
          shadow-xs
          dark:bg-input/30
          disabled:pointer-events-none disabled:cursor-not-allowed
          disabled:opacity-50
          file:inline-flex file:h-7 file:border-0 file:bg-transparent
          file:text-sm file:font-medium file:text-foreground
          md:text-sm
          placeholder:text-muted-foreground
          selection:bg-primary selection:text-primary-foreground
        `,
        `
          focus-visible:border-ring focus-visible:ring-[3px]
          focus-visible:ring-ring/50
        `,
        `
          aria-invalid:ring-destructive/20 aria-invalid:border-destructive
          dark:aria-invalid:ring-destructive/40
        `,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
