import { EmailCapture } from '@/components/ui/EmailCapture';
import { LAUNCH_STATE, SITE } from '@/lib/config';
import Image from 'next/image';

export function FoundingRiders() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="relative flex min-h-[36rem] scroll-mt-20 items-center overflow-hidden sm:min-h-[40rem] lg:min-h-[min(100svh,52rem)]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/mine.png"
          alt="A motorcycle parked against the mountains on a northern Pakistan road"
          fill
          className="object-cover object-[68%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.28) 48%, rgba(18,18,18,0.12) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-xl rounded-2xl bg-[rgba(18,18,18,0.72)] p-6 text-center backdrop-blur-sm sm:p-8 sm:text-left">
          <p className="type-eyebrow mb-4 text-primary">{SITE.launchWindow}</p>
          <h2 id="founder-heading" className="type-h2 text-balance">
            On Android this October.
          </h2>
          <p className="type-lead mx-auto mt-5 max-w-prose-narrow text-text-secondary sm:mx-0">
            I built this on these roads — not from a desk. Leave your email
            and you&apos;ll get Wild Nomad the day it&apos;s on the Play Store.
          </p>

          <div id="founder-access" data-access className="mx-auto mt-8 max-w-md sm:mx-0">
            <EmailCapture source="founding" variant="stacked" />
            {LAUNCH_STATE === 'prelaunch' ? (
              <p className="mt-4 type-small text-text-muted">
                Android first. iPhone riders get the same email when iOS is
                ready.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
