'use client';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

type Stop =
  | { kind: 'stop'; emoji: string; name: string }
  | { kind: 'warning'; text: string };

type Leg = {
  n: string;
  title: string;
  distance: string;
  stops: Stop[];
};

const LEGS: Leg[] = [
  {
    n: '01',
    title: 'Islamabad → Mansehra',
    distance: '120 km',
    stops: [
      { kind: 'stop', emoji: '⛽', name: 'Total Fuel Station, Mansehra' },
      { kind: 'stop', emoji: '🔧', name: 'Mansehra Tyre & Tube' },
    ],
  },
  {
    n: '02',
    title: 'Mansehra → Naran',
    distance: '240 km',
    stops: [
      { kind: 'stop', emoji: '☕', name: 'Kaghan Town — trout and paratha' },
      { kind: 'stop', emoji: '🏥', name: 'THQ Hospital, Balakot' },
      { kind: 'stop', emoji: '⛽', name: 'Shell Naran — last proper pump before Babusar' },
      { kind: 'stop', emoji: '🛏️', name: 'Naran Bazaar' },
    ],
  },
  {
    n: '03',
    title: 'Naran → Chilas via Babusar',
    distance: '330 km',
    stops: [
      { kind: 'stop', emoji: '☕', name: 'Babusar Top chai stall — 4,173 m' },
      { kind: 'stop', emoji: '⛽', name: 'PSO Chilas — cash preferred' },
      { kind: 'stop', emoji: '🛏️', name: 'Chilas Bazaar' },
      { kind: 'warning', text: 'Babusar is summer-only' },
    ],
  },
  {
    n: '04',
    title: 'Chilas → Gilgit',
    distance: '460 km',
    stops: [
      { kind: 'stop', emoji: '⛽', name: 'Attock Petroleum, Gilgit' },
      { kind: 'stop', emoji: '🔧', name: 'Jutial Bike Mechanic' },
      { kind: 'stop', emoji: '🏥', name: 'DHQ Gilgit — trauma care and oxygen' },
    ],
  },
  {
    n: '05',
    title: 'Gilgit → Karimabad',
    distance: '560 km',
    stops: [
      { kind: 'stop', emoji: '🛏️', name: 'Hard Rock Hunza' },
      { kind: 'stop', emoji: '☕', name: 'Café de Hunza' },
      { kind: 'stop', emoji: '⛽', name: 'Sost — last reliable fuel before Khunjerab' },
    ],
  },
];

function LegCard({ leg }: { leg: Leg }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5 sm:p-6 h-full">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="type-mono text-primary">LEG {leg.n}</span>
        <span className="type-mono text-text-muted">{leg.distance}</span>
      </div>
      <h3 className="type-h3 mb-4">{leg.title}</h3>
      <ul className="space-y-2.5">
        {leg.stops.map((stop) =>
          stop.kind === 'warning' ? (
            <li
              key={stop.text}
              className="flex items-start gap-2 type-small text-warning"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{stop.text}</span>
            </li>
          ) : (
            <li
              key={stop.name}
              className="flex items-start gap-2 type-small text-text-secondary"
            >
              <span className="shrink-0" aria-hidden>
                {stop.emoji}
              </span>
              <span>{stop.name}</span>
            </li>
          ),
        )}
      </ul>
    </article>
  );
}

export function RouteShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.45'],
  });

  const pathLength = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0, 1],
  );

  return (
    <section
      id="routes"
      ref={sectionRef}
      aria-labelledby="routes-heading"
      className="relative section-pad overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-pass.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg/90" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="One route, mapped"
          title={
            <span id="routes-heading">
              Islamabad → Hunza. Every stop that matters.
            </span>
          }
          lead="Five legs, 560 kilometres, and the stops you'll actually need. All of it is already in the app."
        />

        {/* Desktop horizontal timeline */}
        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-[18px] px-[10%]">
            <svg
              className="h-1 w-full overflow-visible"
              viewBox="0 0 1000 4"
              preserveAspectRatio="none"
              aria-hidden
            >
              <line
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                stroke="rgba(242,239,234,0.08)"
                strokeWidth="2"
              />
              <motion.line
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                stroke="#D9642C"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-5 gap-4 pt-2">
            {LEGS.map((leg, i) => (
              <Reveal key={leg.n} delay={i * 0.07}>
                <div className="flex flex-col items-center gap-5">
                  <span
                    className={cn(
                      'relative z-10 flex size-9 items-center justify-center rounded-full',
                      'border-2 border-primary bg-bg type-mono text-primary text-xs',
                    )}
                  >
                    {leg.n}
                  </span>
                  <LegCard leg={leg} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <div className="relative lg:hidden">
          <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" aria-hidden>
            <motion.div
              className="origin-top w-full bg-primary"
              style={{ scaleY: pathLength, height: '100%' }}
            />
          </div>
          <div className="space-y-6">
            {LEGS.map((leg, i) => (
              <Reveal key={leg.n} delay={i * 0.06}>
                <div className="flex gap-4">
                  <span
                    className={cn(
                      'relative z-10 mt-1 flex size-9 shrink-0 items-center justify-center rounded-full',
                      'border-2 border-primary bg-bg type-mono text-primary text-xs',
                    )}
                  >
                    {leg.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <LegCard leg={leg} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
