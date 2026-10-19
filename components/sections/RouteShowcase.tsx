'use client';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
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

/**
 * Leg lengths are the stretch itself, rounded from published road distances:
 * Islamabad–Naran ~280 km, Naran–Chilas via Babusar ~115 km,
 * Chilas–Gilgit ~135 km, Gilgit–Karimabad ~110 km.
 */
const LEGS: Leg[] = [
  {
    n: '01',
    title: 'Islamabad → Mansehra',
    distance: '155 km',
    stops: [
      { kind: 'stop', emoji: '⛽', name: 'Total Fuel Station, Mansehra' },
      { kind: 'stop', emoji: '🔧', name: 'Mansehra Tyre & Tube' },
    ],
  },
  {
    n: '02',
    title: 'Mansehra → Naran',
    distance: '125 km',
    stops: [
      { kind: 'stop', emoji: '🏥', name: 'THQ Hospital, Balakot' },
      { kind: 'stop', emoji: '☕', name: 'Kaghan Town — trout and paratha' },
      {
        kind: 'stop',
        emoji: '⛽',
        name: 'Shell Naran — last proper pump before Babusar',
      },
      { kind: 'stop', emoji: '🛏️', name: 'Naran Bazaar' },
    ],
  },
  {
    n: '03',
    title: 'Naran → Chilas via Babusar',
    distance: '115 km',
    stops: [
      { kind: 'stop', emoji: '☕', name: 'Babusar Top chai stall — 4,173 m' },
      { kind: 'stop', emoji: '⛽', name: 'PSO Chilas — cash preferred' },
      { kind: 'stop', emoji: '🛏️', name: 'Chilas Bazaar' },
      { kind: 'warning', text: 'Babusar is summer-only. Daylight only.' },
    ],
  },
  {
    n: '04',
    title: 'Chilas → Gilgit',
    distance: '135 km',
    stops: [
      { kind: 'stop', emoji: '⛽', name: 'Attock Petroleum, Gilgit' },
      { kind: 'stop', emoji: '🔧', name: 'Jutial Bike Mechanic' },
      { kind: 'stop', emoji: '🏥', name: 'DHQ Gilgit — trauma care and oxygen' },
    ],
  },
  {
    n: '05',
    title: 'Gilgit → Karimabad',
    distance: '110 km',
    stops: [
      { kind: 'stop', emoji: '🛏️', name: 'Hard Rock Hunza' },
      { kind: 'stop', emoji: '☕', name: 'Café de Hunza' },
      {
        kind: 'stop',
        emoji: '⛽',
        name: 'Sost — last reliable fuel before Khunjerab, past Karimabad',
      },
    ],
  },
];

function LegCard({ leg }: { leg: Leg }) {
  return (
    <article className="h-full rounded-xl border border-border bg-surface/95 p-5 sm:p-6">
      <div className="mb-3 flex items-baseline justify-between gap-3">
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

const ELEVATION = [
  { km: 0, m: 540, label: 'Islamabad' },
  { km: 155, m: 1080, label: 'Mansehra' },
  { km: 280, m: 2400, label: 'Naran' },
  { km: 340, m: 4173, label: 'Babusar' },
  { km: 395, m: 1265, label: 'Chilas' },
  { km: 530, m: 1500, label: 'Gilgit' },
  { km: 640, m: 2500, label: 'Karimabad' },
] as const;

const CHART_W = 640;
const CHART_H = 132;
const MAX_M = 4400;

function chartPoint(km: number, m: number) {
  return {
    x: (km / 640) * CHART_W,
    y: CHART_H - 22 - (m / MAX_M) * (CHART_H - 40),
  };
}

const ELEVATION_PATH = ELEVATION.map((stop, i) => {
  const { x, y } = chartPoint(stop.km, stop.m);
  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(' ');

function ElevationStop({
  progress,
  km,
  m,
  label,
}: {
  progress: MotionValue<number>;
  km: number;
  m: number;
  label: string;
}) {
  const at = km / 640;
  const opacity = useTransform(progress, [Math.max(0, at - 0.06), Math.max(0.02, at)], [0.2, 1]);
  const { x, y } = chartPoint(km, m);
  const showLabel = label === 'Islamabad' || label === 'Babusar' || label === 'Karimabad';
  const labelY = y < 36 ? y + 18 : y - 12;

  return (
    <motion.g style={{ opacity }}>
      <circle cx={x} cy={y} r="5" fill="#121212" stroke="#D9642C" strokeWidth="2" />
      {showLabel ? (
        <text
          x={x}
          y={labelY}
          textAnchor={label === 'Islamabad' ? 'start' : label === 'Karimabad' ? 'end' : 'middle'}
          fill="#a8a29b"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
        >
          {label} · {m.toLocaleString('en-PK')} m
        </text>
      ) : null}
    </motion.g>
  );
}

function ElevationProfile() {
  const chartRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: chartRef,
    offset: ['start 0.85', 'end 0.55'],
  });
  const progress = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0, 1]);

  return (
    <div ref={chartRef} className="mx-auto max-w-3xl">
      <p className="type-eyebrow mb-3 text-text-muted">Elevation along the ride</p>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="h-36 w-full overflow-visible sm:h-44"
        role="img"
        aria-label="Elevation from Islamabad at 540 metres, over Babusar Top at 4,173 metres, to Karimabad"
      >
        <path
          d={ELEVATION_PATH}
          fill="none"
          stroke="rgba(242,239,234,0.16)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d={ELEVATION_PATH}
          fill="none"
          stroke="#D9642C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: progress }}
        />
        {ELEVATION.map((stop) => (
          <ElevationStop
            key={stop.label}
            progress={progress}
            km={stop.km}
            m={stop.m}
            label={stop.label}
          />
        ))}
      </svg>
    </div>
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
      className="relative section-pad overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-pass.jpg"
          alt=""
          fill
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg/55" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="One route, mapped"
          title={
            <span id="routes-heading">
              Islamabad → Hunza. Every stop that matters.
            </span>
          }
          lead="Five legs, about 640 kilometres. Each distance is that stretch of road. All of it is already in the app."
        />

          <ElevationProfile />

        <div className="relative mx-auto mt-14 max-w-xl">
          <div
            className="absolute bottom-2 left-[17px] top-2 w-px bg-border"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top bg-primary"
              style={{ scaleY: pathLength }}
            />
          </div>
          <div className="space-y-6">
            {LEGS.map((leg, i) => (
              <Reveal key={leg.n} delay={i * 0.05}>
                <div className="flex gap-4">
                  <span
                    className={cn(
                      'relative z-10 mt-1 flex size-9 shrink-0 items-center justify-center rounded-full',
                      'border-2 border-primary bg-bg type-mono text-xs text-primary',
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
