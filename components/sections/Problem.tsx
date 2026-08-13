'use client';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import {
  Coffee,
  Fuel,
  MapPinned,
  MessageSquare,
  Mountain,
  MountainSnow,
  Receipt,
  SignalLow,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const PROBLEMS: { icon: LucideIcon; text: string }[] = [
  {
    icon: Mountain,
    text: 'Landslide. Nobody told us.',
  },
  {
    icon: Fuel,
    text: '"Last fuel for 80 km." Said by nobody, in time.',
  },
  {
    icon: SignalLow,
    text: 'Signal gone after Babusar.',
  },
  {
    icon: Wrench,
    text: 'Nearest mechanic? Nearest hospital?',
  },
  {
    icon: MountainSnow,
    text: 'Is Babusar open — or are we guessing again?',
  },
  {
    icon: MessageSquare,
    text: 'The plan is buried in three WhatsApp groups.',
  },
  {
    icon: MapPinned,
    text: 'Nearest famous spot — or just Instagram bait?',
  },
  {
    icon: Coffee,
    text: 'Which dhaba is actually on the route?',
  },
  {
    icon: Receipt,
    text: 'Who paid for what?',
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="section-pad bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The problem"
          title={<span id="problem-heading">You&apos;ve had this ride.</span>}
          lead="Every rider in Pakistan has. Somewhere past Mansehra, the questions start and nobody in the group has an answer."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {PROBLEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.text} delay={Math.min(i * 0.05, 0.35)}>
                <article
                  className={cn(
                    'group h-full rounded-xl border border-border bg-surface p-6 sm:p-8',
                    'transition-all duration-fast ease-out-expo',
                    'hover:border-border-strong hover:-translate-y-0.5',
                  )}
                >
                  <Icon
                    className="mb-5 size-6 text-text-muted transition-colors duration-fast group-hover:text-primary"
                    aria-hidden
                  />
                  <p className="type-h3">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-12 text-center type-body text-text-muted">
          So we built the toolkit that answers them.
        </p>
      </div>
    </section>
  );
}
