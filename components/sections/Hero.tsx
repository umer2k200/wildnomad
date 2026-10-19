'use client';

import { EmailCapture } from '@/components/ui/EmailCapture';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { LAUNCH_STATE, SITE } from '@/lib/config';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const HEADLINE = ['Ride', 'Pakistan', "like", "you've", 'been', 'here', 'before.'];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-hunza-wide.jpg"
          alt="Mountain road through the Hunza valley at golden hour"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        {[
          { src: '/images/hero-hunza.jpg', delay: '0s' },
          { src: '/images/hero-pass.jpg', delay: '8s' },
          { src: '/images/hero-ride.jpg', delay: '16s' },
          { src: '/images/hero-deosai.jpg', delay: '24s' },
        ].map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={i === 0 ? 'Mountain road through the Hunza valley at golden hour' : ''}
            fill
            priority={i === 0}
            quality={90}
            sizes="100vw"
            className={cn(
              'object-cover object-center md:hidden',
              i === 0 ? 'opacity-100' : 'opacity-0',
              !reduceMotion && 'hero-slide',
            )}
            style={!reduceMotion ? { animationDelay: slide.delay } : undefined}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,18,18,0.28) 0%, rgba(18,18,18,0.05) 42%, rgba(18,18,18,0.72) 100%)',
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-start px-5 pb-16 pt-24 sm:pt-28 lg:justify-center lg:px-8 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="type-eyebrow mb-5 inline-flex items-center gap-2 text-primary">
              <span
                className={cn(
                  'inline-block size-1.5 rounded-full bg-primary',
                  !reduceMotion && 'animate-pulse',
                )}
                aria-hidden
              />
              {LAUNCH_STATE === 'prelaunch' ? 'Pre-launch' : 'Live'} · {SITE.launchWindow} · Android
            </p>

            <h1 id="hero-heading" className="type-hero text-balance">
              {HEADLINE.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className={cn(
                    'mr-[0.28em] inline-block last:mr-0',
                    word === 'Pakistan' && 'text-primary',
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <p className="type-lead mx-auto mt-6 max-w-prose-narrow text-text-secondary lg:mx-0">
              Rider-verified stops, mountain routes, and live alerts from
              whoever&apos;s ahead of you. Wild Nomad is the map Pakistan&apos;s
              roads never had.
            </p>

            <div
              id="early-access"
              data-access
              className="mx-auto mt-8 max-w-lg scroll-mt-28 lg:mx-0"
            >
              <EmailCapture source="hero" variant="pill" />
              {LAUNCH_STATE === 'prelaunch' ? (
                <p className="mt-3 type-small text-text-muted">
                  No spam. One email when Android launches in {SITE.launchWindow}.
                  iPhone riders get the same note when iOS follows.
                </p>
              ) : null}
            </div>

            <p className="mt-6 type-mono text-pretty text-text-muted">
              {SITE.stopCount} stops the big maps don&apos;t have · {SITE.passCount}{' '}
              passes · Works offline
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[420px] sm:w-[420px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(217,100,44,0.12) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            <PhoneFrame
              float
              size="hero"
              className="relative z-10"
              src="/screenshots/01-map.png"
              alt="Wild Nomad map showing rider-verified stops in northern Pakistan"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="sr-only">Scroll</span>
          <span
            className="relative h-10 w-px overflow-hidden bg-border-strong"
            aria-hidden
          >
            <span
              className={cn(
                'absolute inset-x-0 top-0 h-1/2 bg-primary',
                !reduceMotion &&
                  'animate-[scroll-line_1.6s_ease-in-out_infinite]',
              )}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
