'use client';

import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CTA_LABEL, LAUNCH_STATE, PLAY_STORE_URL, SITE } from '@/lib/config';
import Image from 'next/image';

export function FoundingRiders() {
  return (
    <section
      id="after-launch"
      aria-labelledby="founding-heading"
      className="relative flex scroll-mt-20 items-center overflow-hidden min-h-[36rem] sm:min-h-[42rem] lg:min-h-[min(100svh,56.25vw)]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/mine.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(18,18,18,0.88) 0%, rgba(18,18,18,0.7) 36%, rgba(18,18,18,0.22) 66%, rgba(18,18,18,0.12) 100%)',
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(18,18,18,0.82) 0%, rgba(18,18,18,0.62) 48%, rgba(18,18,18,0.38) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-xl text-center sm:text-left">
          <p className="type-eyebrow text-primary mb-4">After launch</p>
          <h2 id="founding-heading" className="type-h2 text-balance">
            Free for the first {SITE.earlyRiderCap.toLocaleString('en-PK')}{' '}
            riders.
          </h2>
          <p className="type-lead text-text-secondary mt-5 max-w-prose-narrow mx-auto sm:mx-0">
            I built this on these roads — not from a desk. When Wild Nomad hits
            Android in {SITE.launchWindow}, the first{' '}
            {SITE.earlyRiderCap.toLocaleString('en-PK')} riders get it free.
            Leave your email above and you&apos;ll hear the day it&apos;s live.
          </p>

          {LAUNCH_STATE === 'live' ? (
            <Reveal className="mt-8">
              <Button
                size="lg"
                onClick={() => {
                  if (PLAY_STORE_URL) {
                    window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                Download on Google Play
              </Button>
            </Reveal>
          ) : (
            <Reveal className="mt-8">
              <Button
                size="lg"
                onClick={() => {
                  document
                    .getElementById('early-access')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {CTA_LABEL}
              </Button>
              <p className="mt-4 type-small text-text-muted">
                Android first. iOS follows.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
