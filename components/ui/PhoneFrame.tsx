import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

export function PhoneFrame({
  children,
  src,
  alt = 'Wild Nomad app screenshot',
  className,
  float = false,
  tilt = true,
  size = 'default',
}: {
  children?: ReactNode;
  src?: string;
  alt?: string;
  className?: string;
  float?: boolean;
  tilt?: boolean;
  size?: 'default' | 'hero' | 'story' | 'stage';
}) {
  return (
    <div
      className={cn(
        'relative mx-auto',
        size === 'hero'
          ? 'w-[180px] sm:w-[280px]'
          : size === 'story'
            ? 'w-[240px] sm:w-[280px]'
            : size === 'stage'
              ? 'w-[136px] sm:w-[156px] lg:w-[250px]'
              : 'w-[220px] sm:w-[260px]',
        float && 'animate-[phone-float_6s_ease-in-out_infinite]',
        className,
      )}
      style={{ perspective: tilt ? '1200px' : undefined }}
    >
      <div
        className="relative rounded-[36px] border border-border-strong bg-[#0a0a0a] p-[10px] shadow-lift"
        style={
          tilt
            ? {
                transform: 'rotateY(-8deg) rotateX(2deg)',
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
      >
        <div className="absolute left-1/2 top-[14px] z-10 h-[22px] w-[80px] -translate-x-1/2 rounded-pill bg-black" />
        <div className="relative overflow-hidden rounded-[26px] bg-surface aspect-[9/19.5]">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="280px"
            />
          ) : (
            children ?? (
              <div className="flex h-full items-center justify-center bg-surface-alt type-mono text-text-muted p-6 text-center">
                TODO: add map screenshot
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
