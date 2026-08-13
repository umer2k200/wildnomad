import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'custom';
};

export function Badge({
  className,
  tone = 'muted',
  style,
  children,
  ...props
}: BadgeProps) {
  const tones = {
    primary: 'bg-primary-soft text-primary',
    muted: 'bg-surface-alt text-text-secondary',
    success: 'bg-[rgba(76,175,80,0.16)] text-success',
    warning: 'bg-[rgba(232,163,61,0.16)] text-warning',
    danger: 'bg-[rgba(230,57,70,0.16)] text-danger',
    custom: '',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 type-small',
        tones[tone],
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}
