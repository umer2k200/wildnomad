import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'w-full h-12 px-4 rounded-md bg-surface border text-text type-body',
            'placeholder:text-text-muted',
            'transition-colors duration-fast ease-out-expo',
            'focus:outline-none focus:border-primary',
            error ? 'border-danger' : 'border-border',
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error ? (
          <p className="mt-2 type-small text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
