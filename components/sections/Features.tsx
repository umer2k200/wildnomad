'use client';

import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE } from '@/lib/config';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  ClipboardCheck,
  Construction,
  Snowflake,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function ScreenshotCard({
  title,
  copy,
  src,
  alt,
  delay = 0,
}: {
  title: string;
  copy: string;
  src: string;
  alt: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={cn(
          'group flex h-full flex-col rounded-xl border border-border bg-surface p-5 sm:p-6',
          'transition-all duration-fast ease-out-expo',
          'hover:border-border-strong hover:-translate-y-0.5',
        )}
      >
        <h3 className="type-h3 text-[1.125rem] sm:text-[1.25rem]">{title}</h3>
        <p className="mt-2 type-small text-text-secondary leading-relaxed">
          {copy}
        </p>
        <div className="mt-6 flex flex-1 items-end justify-center">
          <PhoneFrame
            tilt={false}
            className="w-full max-w-[200px]"
            src={src}
            alt={alt}
          />
        </div>
      </article>
    </Reveal>
  );
}

function AlertsVisual() {
  const reduceMotion = useReducedMotion();
  const alerts = [
    { icon: AlertTriangle, label: 'Landslide · Babusar', color: '#D9642C' },
    { icon: Construction, label: 'Closure · Lowari', color: '#E8A33D' },
    { icon: Snowflake, label: 'Snow · Khunjerab', color: '#7EB0D4' },
  ];

  return (
    <div className="mt-6 space-y-2">
      {alerts.map((a, i) => {
        const Icon = a.icon;
        return (
          <motion.div
            key={a.label}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.35 }}
            className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2"
          >
            <span
              className={cn(
                'flex size-7 items-center justify-center rounded-md',
                !reduceMotion && 'animate-pulse',
              )}
              style={{ backgroundColor: `${a.color}22`, color: a.color }}
            >
              <Icon className="size-3.5" aria-hidden />
            </span>
            <span className="type-small text-text-secondary">{a.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function OfflineVisual() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);
      return;
    }
    let frame = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start == null) start = t;
      const p = Math.min(100, ((t - start) % 2800) / 24);
      setProgress(p > 100 ? 100 : p);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;

  return (
    <div className="mt-6 flex items-center justify-center py-2">
      <div className="relative size-24">
        <svg className="size-24 -rotate-90" viewBox="0 0 88 88" aria-hidden>
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="rgba(242,239,234,0.08)"
            strokeWidth="6"
          />
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="#D9642C"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center type-mono text-text">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

const SCREENSHOT_CARDS = [
  {
    title: "Stops the big maps don't have",
    copy: `Fuel, mechanics, dhabas, hospitals, campsites, viewpoints. Rider-pinned, with photos, hours and stars from people who stopped there. ${SITE.categoryCount} categories.`,
    src: '/screenshots/02-poi.png',
    alt: 'Verified stop detail with photo, elevation, road condition and directions',
  },
  {
    title: 'Plan it before you turn the key',
    copy: 'Bike or car routing, distance, ETA, fuel cost, corridor stops, packing checklist, and shared trip expenses that settle themselves.',
    src: '/screenshots/03-plan.png',
    alt: 'Bike route from Islamabad to Hunza with distance, time and fuel cost',
  },
  {
    title: 'Weather, fuel, and whether the pass is open',
    copy: `Road-risk from snow, rain and wind. Today's OGRA petrol and diesel. ${SITE.passCount} northern passes with rider reports, not a calendar.`,
    src: '/screenshots/07-home.png',
    alt: 'Home screen with ride-risk weather, Pakistan fuel prices and mountain pass status',
  },
  {
    title: 'Live GPS, every kilometre',
    copy: 'Track the ride in the background — distance, speed, elevation, moving time. Share a live link so someone always knows where you are.',
    src: '/screenshots/04-ride.png',
    alt: 'Active ride tracking dashboard',
  },
] as const;

const EXTRA_FEATURES: {
  icon: LucideIcon;
  title: string;
  copy: string;
}[] = [
  {
    icon: Star,
    title: 'Rider reviews on every stop',
    copy: 'Stars and notes from people who were there — not a tourist brochure.',
  },
  {
    icon: ClipboardCheck,
    title: 'Trip packing checklist',
    copy: 'Per-trip list by category so the spare tube isn’t still at home.',
  },
  {
    icon: Users,
    title: 'Ride with people who know the road',
    copy: 'Groups, realtime chat, follow riders near you, and a feed of routes and tips that survive past Instagram stories.',
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="section-pad bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What's inside"
          title={
            <span id="features-heading">
              Map, plan, ride, stay safe — the full toolkit.
            </span>
          }
          lead="Stops and routes are the start. Weather, pass status, live fuel prices, tracking and SOS cover the rest of the trip."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {SCREENSHOT_CARDS.map((card, i) => (
            <ScreenshotCard key={card.src} {...card} delay={i * 0.05} />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          <Reveal delay={0.08}>
            <article
              className={cn(
                'group h-full rounded-xl border border-border bg-surface p-6 sm:p-8',
                'transition-all duration-fast ease-out-expo',
                'hover:border-border-strong hover:-translate-y-0.5',
              )}
            >
              <h3 className="type-h3">Know what the road is doing</h3>
              <p className="mt-3 type-body text-text-secondary max-w-prose-narrow">
                Landslides, closures, snow and checkpoints, reported by riders
                ahead of you — and a ping if one hits a route you already saved.
              </p>
              <AlertsVisual />
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article
              className={cn(
                'group h-full rounded-xl border border-border bg-surface p-6 sm:p-8',
                'transition-all duration-fast ease-out-expo',
                'hover:border-border-strong hover:-translate-y-0.5',
              )}
            >
              <h3 className="type-h3">No signal, no problem</h3>
              <p className="mt-3 type-body text-text-secondary max-w-prose-narrow">
                Download a region before you leave. Stops, routes, alerts and
                emergency numbers stay with you past the last tower.
              </p>
              <OfflineVisual />
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article
              className={cn(
                'group h-full rounded-xl border border-border bg-surface p-6 sm:p-8',
                'transition-all duration-fast ease-out-expo',
                'hover:border-border-strong hover:-translate-y-0.5',
              )}
            >
              <h3 className="type-h3">SOS when it matters</h3>
              <p className="mt-3 type-body text-text-secondary max-w-prose-narrow">
                Two-tap SOS over SMS and WhatsApp, emergency contacts, live
                location by link, and Pakistan&apos;s numbers built in.
              </p>
              <div className="mt-6 flex flex-1 flex-col items-center justify-end gap-4">
                <PhoneFrame
                  tilt={false}
                  className="w-full max-w-[200px]"
                  src="/screenshots/10-safety.png"
                  alt="Safety screen with SOS button and Pakistan emergency numbers"
                />
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                  {['1122', '15', '130', '115'].map((n) => (
                    <span
                      key={n}
                      className="type-stat text-[clamp(1.75rem,3vw,2.5rem)] text-primary"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {EXTRA_FEATURES.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={0.08 + i * 0.05}>
                <article
                  className={cn(
                    'group h-full rounded-xl border border-border bg-surface p-6 sm:p-8',
                    'transition-all duration-fast ease-out-expo',
                    'hover:border-border-strong hover:-translate-y-0.5',
                  )}
                >
                  <Icon
                    className="mb-4 size-6 text-text-muted transition-colors duration-fast group-hover:text-primary"
                    aria-hidden
                  />
                  <h3 className="type-h3 text-[1.125rem] sm:text-[1.25rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 type-body text-text-secondary">
                    {item.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
