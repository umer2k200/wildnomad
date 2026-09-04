import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/lib/config';

const STATS = [
  { value: SITE.stopCount, suffix: '', label: 'Verified stops' },
  { value: SITE.categoryCount, suffix: '', label: 'Categories' },
  { value: SITE.offlineRegionCount, suffix: '', label: 'Offline regions' },
  { value: SITE.passCount, suffix: '', label: 'Mountain passes' },
] as const;

export function Stats() {
  return (
    <section
      aria-label="Key numbers"
      className="border-y border-border bg-bg-elevated"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 sm:gap-10 lg:grid-cols-4 lg:px-8 lg:py-12">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <div className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 type-eyebrow text-text-muted">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
