'use client';

import { EmailCapture } from '@/components/ui/EmailCapture';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { LAUNCH_STATE, SITE } from '@/lib/config';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const HEADLINE = ['Ride', 'Pakistan', "like", "you've", 'been', 'here', 'before.'];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['0%', '15%'],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] sm:min-h-[700px] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background photo + subtle ken burns + parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div
          className={cn(
            'absolute inset-0 scale-[1.02]',
            !reduceMotion && 'animate-[ken-burns_24s_ease-in-out_infinite_alternate]',
          )}
        >
          <Image
            src="/images/hero-hunza-wide.jpg"
            alt="Mountain road through the Hunza valley at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
        </div>
      </motion.div>

      {/* Gradient scrim */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,18,18,0) 0%, rgba(18,18,18,0.75) 55%, #121212 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[rgba(18,18,18,0.35)]" />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] sm:min-h-[700px] max-w-7xl flex-col justify-center px-5 pb-20 pt-24 sm:pb-24 sm:pt-28 lg:px-8">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          {/* Left */}
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="type-eyebrow mb-5 inline-flex items-center gap-2 text-primary">
              <span
                className={cn(
                  'inline-block size-1.5 rounded-full bg-primary',
                  !reduceMotion && 'animate-pulse',
                )}
                aria-hidden
              />
              Pre-launch · {SITE.launchWindow}
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

            <p className="type-lead mt-6 max-w-prose-narrow text-text-secondary mx-auto lg:mx-0">
              Rider-verified stops, mountain routes, and live alerts from
              whoever&apos;s ahead of you.
              <br className="hidden sm:block" />
              {' '}
              Wild Nomad is the map Pakistan&apos;s roads never had.
            </p>

            <div id="early-access" className="mt-8 mx-auto max-w-lg scroll-mt-28 lg:mx-0">
              <EmailCapture source="hero" variant="pill" />
              {LAUNCH_STATE === 'prelaunch' ? (
                <p className="mt-3 type-small text-text-muted">
                  No spam. One email when it launches.
                </p>
              ) : null}
            </div>

            <p className="mt-6 type-mono text-text-muted text-pretty">
              {SITE.stopCount} stops · {SITE.categoryCount} categories · Stops
              work offline · Free
            </p>
          </div>

          {/* Right — phone (below CTA on mobile) */}
          <div className="relative hidden sm:flex justify-center lg:justify-end">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(217,100,44,0.12) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            <PhoneFrame
              float
              className="relative z-10"
              src="/screenshots/01-map.png"
              alt="Wild Nomad map showing rider-verified stops in northern Pakistan"
            />
          </div>
        </div>

        {/* Scroll indicator — desktop / tablet; mobile scrolls into map sooner */}
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
