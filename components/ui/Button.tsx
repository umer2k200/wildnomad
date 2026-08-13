import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import {
  ButtonHTMLAttributes,
  forwardRef,
} from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'md' | 'lg' | 'pill';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-dark border border-transparent',
  secondary:
    'bg-surface-alt text-text border border-border hover:border-border-strong',
  ghost: 'bg-transparent text-text-secondary hover:text-text hover:bg-surface',
  outline:
    'bg-transparent text-text border border-border hover:border-border-strong',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm font-semibold rounded-md',
  lg: 'h-12 px-6 text-sm font-semibold rounded-md',
  pill: 'h-12 px-6 text-sm font-semibold rounded-pill',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-[family-name:var(--font-inter)]',
          'transition-all duration-fast ease-out-expo',
          'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          'cursor-pointer',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
