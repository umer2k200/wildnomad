'use client';

import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { POI_CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';
import {
  Download,
  Fuel,
  MountainSnow,
  Phone,
} from 'lucide-react';
import Image from 'next/image';

const CARDS = [
  {
    icon: Phone,
    title: 'Emergency numbers that work here',
    copy: 'Rescue 1122, Police 15, Motorway Police 130, Edhi 115 — offline, in the app.',
  },
  {
    icon: Fuel,
    title: 'Fuel cost estimates in PKR',
    copy: 'Route cost uses Pakistan fuel prices in rupees — a real number, not a guess in dollars.',
  },
  {
    icon: MountainSnow,
    title: 'Pass status before you leave',
    copy: 'Babusar, Khunjerab, Lowari, Shandur, Burzil and Deosai — seasonal open/closed guidance before you commit.',
  },
  {
    icon: Download,
    title: 'Built for a weak signal',
    copy: 'Seven downloadable regions. The mountains take your bars long before they take your ride.',
  },
] as const;

export function BuiltForPakistan() {
  return (
    <section
      id="pakistan"
      aria-labelledby="pakistan-heading"
      className="relative section-pad overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-deosai.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(18,18,18,0.88)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Not a global app with a flag on it"
          title={
            <span id="pakistan-heading">
              A foreign map doesn&apos;t know these roads.
            </span>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.07}>
                <article
                  className={cn(
                    'h-full rounded-xl border border-border bg-surface/90 p-8 backdrop-blur-sm',
                    'transition-all duration-fast ease-out-expo',
                    'hover:border-border-strong hover:-translate-y-0.5',
                  )}
                >
                  <Icon
                    className="mb-5 size-6 text-primary"
                    aria-hidden
                  />
                  <h3 className="type-h3 mb-3">{card.title}</h3>
                  <p className="type-body text-text-secondary max-w-prose-narrow">
                    {card.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16">
          <Marquee>
            {POI_CATEGORIES.map((cat) => (
              <span
                key={cat.key}
                className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-border px-4 py-2 type-small"
                style={{
                  backgroundColor: `${cat.color}18`,
                  color: cat.color,
                  borderColor: `${cat.color}44`,
                }}
              >
                <span aria-hidden>{cat.emoji}</span>
                {cat.label}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
