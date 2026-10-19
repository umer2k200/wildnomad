import { SectionHeading } from '@/components/ui/SectionHeading';

const RIDES = [
  {
    title: 'KKH to Hunza',
    meta: '640 km · 7 days',
    path: 'M 4 42 C 28 40, 40 18, 62 16 S 96 36, 120 28 S 150 8, 176 14',
  },
  {
    title: 'Makran coast',
    meta: 'Karachi → Gwadar · 5 days',
    path: 'M 4 28 C 30 26, 48 30, 70 24 S 110 18, 140 22 S 160 20, 176 16',
  },
  {
    title: 'Galiyat overnight',
    meta: 'Nathia Gali · 2 days',
    path: 'M 4 36 C 24 34, 36 14, 58 12 S 90 30, 120 22 S 150 10, 176 18',
  },
] as const;

export function RideJournal() {
  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="section-pad border-y border-border bg-bg-elevated scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="After you get home"
          title={<span id="journal-heading">The rides stay on the phone.</span>}
          lead="Timeline keeps every planned trip and every recorded ride — kilometres, photos, and the line you actually rode."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {RIDES.map((ride) => (
            <article
              key={ride.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <svg viewBox="0 0 180 56" className="h-14 w-full" aria-hidden>
                <path
                  d={ride.path}
                  fill="none"
                  stroke="#D9642C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="type-h3 mt-3 text-[1.15rem]">{ride.title}</h3>
              <p className="mt-1 type-mono text-text-muted">{ride.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
