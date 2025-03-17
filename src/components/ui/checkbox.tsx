'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `
          peer size-4 shrink-0 rounded-[4px] border border-input outline-none
          transition-shadow shadow-xs
          aria-invalid:ring-destructive/20 aria-invalid:border-destructive
          dark:bg-input/30 dark:data-[state=checked]:bg-primary
          dark:aria-invalid:ring-destructive/40
          data-[state=checked]:border-primary data-[state=checked]:bg-primary
          data-[state=checked]:text-primary-foreground
          disabled:cursor-not-allowed disabled:opacity-50
          focus-visible:border-ring focus-visible:ring-[3px]
          focus-visible:ring-ring/50
        `,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={`
          flex items-center justify-center text-current transition-none
        `}
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
