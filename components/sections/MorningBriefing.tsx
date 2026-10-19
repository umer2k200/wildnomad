'use client';

import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINES = [
  { tone: 'warning', text: 'Babusar is seasonal — check before you leave.' },
  { tone: 'danger', text: 'Landslide reported near the Naran road.' },
  { tone: 'brand', text: 'Hunza & Skardu streets are not on this phone yet.' },
  { tone: 'neutral', text: 'Petrol is on the home screen, so the fuel estimate is a real number.' },
] as const;

const PASSES = [
  { name: 'Babusar', flip: true },
  { name: 'Khunjerab', status: 'Open' },
  { name: 'Lowari', status: 'Open' },
  { name: 'Shandur', status: 'Seasonal' },
  { name: 'Deosai', status: 'Seasonal' },
  { name: 'Shangla', status: 'Open' },
] as const;

const TONE = {
  warning: 'text-warning',
  danger: 'text-danger',
  brand: 'text-primary',
  neutral: 'text-text-secondary',
} as const;

export function MorningBriefing() {
  const reduceMotion = useReducedMotion();
  const [babusarOpen, setBabusarOpen] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setBabusarOpen((open) => !open), 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="briefing"
      aria-labelledby="briefing-heading"
      className="section-pad bg-bg-elevated scroll-mt-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="The morning you leave"
            title={<span id="briefing-heading">Four lines before the engine starts.</span>}
            lead="Home already reads the pass, the alerts on your route, and whether that corridor is on the phone."
            className="mb-8"
          />
          <ul className="space-y-3">
            {LINES.map((line) => (
              <li
                key={line.text}
                className="rounded-xl border border-border bg-surface px-5 py-4 type-body"
              >
                <span className={TONE[line.tone]}>{line.text}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex max-w-full gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PASSES.map((pass) => {
              const status = 'flip' in pass ? (babusarOpen ? 'Open' : 'Seasonal') : pass.status;
              const open = status === 'Open';
              return (
                <li
                  key={pass.name}
                  className="shrink-0 rounded-pill border border-border bg-surface px-4 py-2"
                >
                  <span className="type-small text-text">{pass.name}</span>
                  <span
                    className={cn(
                      'ml-2 type-mono',
                      open ? 'text-success' : 'text-warning',
                    )}
                  >
                    {status}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-center">
          <PhoneFrame
            tilt={false}
            size="story"
            src="/screenshots/07-home.png"
            alt="Home screen with weather, fuel prices and mountain pass status"
          />
        </div>
      </div>
    </section>
  );
}
