import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  padding?: 'md' | 'lg' | 'none';
  radius?: 'lg' | 'xl';
};

export function Card({
  className,
  hover = false,
  padding = 'lg',
  radius = 'xl',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border',
        radius === 'xl' ? 'rounded-xl' : 'rounded-lg',
        padding === 'lg' && 'p-8',
        padding === 'md' && 'p-5',
        hover &&
          'transition-all duration-fast ease-out-expo hover:border-border-strong hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
