import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';

const STATS = [
  { value: 100, suffix: '+', label: 'Verified stops' },
  { value: 21, suffix: '', label: 'Categories' },
  { value: 7, suffix: '', label: 'Offline regions' },
  { value: 6, suffix: '+', label: 'Mountain passes' },
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
