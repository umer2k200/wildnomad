'use client';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';

const HUNZA_KM = 640;
const BIKE_KM_PER_LITRE = 38;
const PKR_PER_LITRE = 264;
const FUEL_PKR = Math.round((HUNZA_KM / BIKE_KM_PER_LITRE) * PKR_PER_LITRE);

const STEPS = [
  {
    kicker: 'Map',
    title: 'Stops the big maps skip.',
    copy: 'Fuel, dhabas, mechanics, hospitals and viewpoints, pinned by riders and checked before they go live.',
    src: '/screenshots/01-map.png',
    alt: 'Wild Nomad map of northern Pakistan',
    extra: null,
  },
  {
    kicker: 'Plan',
    title: 'Fuel in rupees, before you turn the key.',
    copy: 'Bike or car routing, distance, ETA, and what the petrol will cost on this exact ride.',
    src: '/screenshots/03-plan.png',
    alt: 'Route planner with distance, time and fuel cost',
    extra: 'fuel' as const,
  },
  {
    kicker: 'Ride',
    title: 'Someone at home can watch.',
    copy: 'Live GPS in the background — speed, elevation, moving time. Share a link. They do not need an account to follow the pin.',
    src: '/screenshots/04-ride.png',
    alt: 'Active ride with speed, distance and elevation',
    extra: 'live' as const,
  },
  {
    kicker: 'Riders',
    title: 'The people who already know the road.',
    copy: 'A feed of routes and tips, riders you can follow, and a badge when someone is out riding.',
    src: '/screenshots/09-community.png',
    alt: 'Community feed of rider posts',
    extra: null,
  },
] as const;

const RIDE_PATH =
  'M 8 78 C 40 76, 55 60, 78 58 S 120 40, 150 36 S 190 48, 220 28 S 250 18, 286 22';

function FuelLine() {
  return (
    <div className="mt-3 rounded-xl border border-border bg-surface px-4 py-3 lg:mt-6 lg:px-5 lg:py-4">
      <p className="type-mono text-text-muted">
        Bike · {BIKE_KM_PER_LITRE} km/L · Rs {PKR_PER_LITRE}/L
      </p>
      <p className="mt-1 flex items-baseline gap-2 lg:mt-2">
        <span className="type-small text-text-secondary">About</span>
        <span className="type-small text-text-secondary">Rs</span>
        <AnimatedCounter value={FUEL_PKR} className="!text-[1.75rem] lg:!text-[2.25rem]" />
      </p>
      <p className="type-small text-text-muted">
        Islamabad → Hunza · {HUNZA_KM} km · one bike
      </p>
    </div>
  );
}

function LiveDot({ active, pathId }: { active: boolean; pathId: string }) {
  return (
    <div className="mt-3 rounded-xl border border-border bg-surface p-3 lg:mt-6 lg:p-4">
      <svg viewBox="0 0 300 96" className="h-16 w-full lg:h-24" aria-hidden>
        <path
          d={RIDE_PATH}
          fill="none"
          stroke="rgba(242,239,234,0.16)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          id={pathId}
          d={RIDE_PATH}
          fill="none"
          stroke="#D9642C"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.35 1"
        />
        <circle
          cx={active ? 0 : 150}
          cy={active ? 0 : 36}
          r="6"
          fill="#D9642C"
          stroke="#121212"
          strokeWidth="2"
        >
          {active ? (
            <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          ) : null}
        </circle>
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 type-mono text-text-secondary">
        <span>42 km/h</span>
        <span>2,410 m</span>
        <span className="text-primary">Shared with Sara</span>
      </div>
    </div>
  );
}

function StepCopy({
  step,
  live,
  pathId,
}: {
  step: (typeof STEPS)[number];
  live: boolean;
  pathId: string;
}) {
  return (
    <div>
      <p className="type-eyebrow text-primary">{step.kicker}</p>
      <h3 className="mt-2 text-balance text-[1.65rem] font-bold leading-[1.15] tracking-tight lg:mt-3 lg:text-[clamp(2rem,3.2vw,3rem)] lg:leading-[1.1]">
        {step.title}
      </h3>
      <p className="mt-2 max-w-prose-narrow text-[0.95rem] leading-snug text-text-secondary lg:mt-4 lg:text-[1.25rem] lg:leading-relaxed">
        {step.copy}
      </p>
      {step.extra === 'fuel' ? <FuelLine /> : null}
      {step.extra === 'live' ? <LiveDot active={live} pathId={pathId} /> : null}
    </div>
  );
}

export function ProductStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(STEPS.length - 1, Math.floor(value * STEPS.length));
    setIndex(next);
  });

  const x = useTransform(scrollYProgress, (value) => {
    const clamped = Math.min(1, Math.max(0, value));
    const shift = (clamped * (STEPS.length - 1)) / STEPS.length;
    return `${-shift * 100}%`;
  });

  if (reduceMotion) {
    return (
      <section id="story" aria-labelledby="story-heading" className="section-pad bg-bg">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="In the app"
            title={<span id="story-heading">Map, plan, ride, then the people ahead of you.</span>}
          />
          <div className="space-y-16">
            {STEPS.map((step) => (
              <article key={step.kicker} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <StepCopy step={step} live={false} pathId={`live-ride-${step.kicker}-still`} />
                <PhoneFrame tilt={false} size="story" src={step.src} alt={step.alt} />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="story" aria-labelledby="story-heading" className="bg-bg">
      <div ref={trackRef} className="relative" style={{ height: `${STEPS.length * 100}vh` }}>
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-16 pb-24">
          <h2 id="story-heading" className="sr-only">
            Map, plan, ride, then the people ahead of you.
          </h2>
          <div className="mx-auto hidden w-full max-w-7xl shrink-0 px-8 lg:block">
            <p className="type-eyebrow text-primary">In the app</p>
            <p className="type-h3 mt-2 max-w-xl text-balance">
              Map, plan, ride, then the people ahead of you.
            </p>
          </div>

          <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
            <motion.div className="flex h-full" style={{ width: `${STEPS.length * 100}%`, x }}>
              {STEPS.map((step, i) => (
                <article
                  key={step.kicker}
                  className="flex h-full min-h-0 min-w-0 shrink-0 flex-col gap-3 overflow-hidden px-5 py-3 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:overflow-visible lg:px-8 lg:py-0"
                  style={{ width: `${100 / STEPS.length}%` }}
                  aria-hidden={i !== index}
                >
                  <div className="w-full shrink-0 lg:max-w-xl">
                    <StepCopy
                      step={step}
                      live={i === index && step.extra === 'live'}
                      pathId={`live-ride-${step.kicker}-stage`}
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 items-start justify-center pt-1 lg:items-center lg:justify-end lg:pt-0">
                    <PhoneFrame
                      tilt={false}
                      size="stage"
                      src={step.src}
                      alt={i === index ? step.alt : ''}
                    />
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
