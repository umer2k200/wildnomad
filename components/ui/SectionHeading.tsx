import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center mx-auto',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'type-eyebrow text-primary mb-4',
            align === 'center' && 'justify-center',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="type-h2 text-balance">{title}</h2>
      {lead ? (
        <p
          className={cn(
            'type-lead text-text-secondary mt-5 max-w-prose-narrow',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </div>
  );
}
