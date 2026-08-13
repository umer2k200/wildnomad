'use client';

import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTA_LABEL, LAUNCH_STATE, PLAY_STORE_URL, SITE } from '@/lib/config';
import Image from 'next/image';

export function FoundingRiders() {
  return (
    <section
      id="after-launch"
      aria-labelledby="founding-heading"
      className="relative section-pad overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-ride.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(18,18,18,0.86)]" />
        <div
          className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(217,100,44,0.22) 0%, transparent 68%)',
          }}
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
        <SectionHeading
          align="center"
          eyebrow="After launch"
          title={
            <span id="founding-heading">
              Free for the first {SITE.earlyRiderCap.toLocaleString('en-PK')}{' '}
              riders.
            </span>
          }
          lead={`When Wild Nomad hits Android in ${SITE.launchWindow}, the first ${SITE.earlyRiderCap.toLocaleString('en-PK')} riders get it free. Leave your email above and you'll hear the day it's live.`}
        />

        {LAUNCH_STATE === 'live' ? (
          <Reveal className="mx-auto max-w-md">
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
          <Reveal>
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
    </section>
  );
}
