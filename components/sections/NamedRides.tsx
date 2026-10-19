import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const RIDES = [
  {
    title: 'Karakoram Highway to Hunza',
    days: '7 days',
    season: 'May–September',
    summary: 'Hazara motorway, the Indus gorge, then Hunza and the Khunjerab border.',
    href: '#routes',
  },
  {
    title: 'Kaghan valley weekender',
    days: '3 days',
    season: 'May–September',
    summary: 'A short run up the Kunhar, with Babusar Top as the payoff.',
  },
  {
    title: 'Skardu and Deosai',
    days: '8 days',
    season: 'July–September',
    summary: 'Cold desert, the Deosai plateau, and the road on to Khaplu.',
  },
  {
    title: 'Swat, Kalam and Kumrat',
    days: '5 days',
    season: 'April–October',
    summary: 'Green valleys and deodar forest — the short trip that is not Kaghan.',
  },
  {
    title: 'Neelum and Arang Kel',
    days: '4 days',
    season: 'May–October',
    summary: 'The river road, ending with the climb to Arang Kel.',
  },
  {
    title: 'Makran coastal highway',
    days: '5 days',
    season: 'November–March',
    summary: 'Desert cliffs and empty tarmac beside the Arabian Sea, out to Gwadar.',
  },
  {
    title: 'Galiyat overnighter',
    days: '2 days',
    season: 'All year',
    summary: 'Pine forest and switchbacks — the easiest mountain trip from the capital.',
  },
  {
    title: 'Fairy Meadows',
    days: '5 days',
    season: 'June–September',
    summary: 'Ride to Raikot, then jeep and hike under Nanga Parbat.',
  },
  {
    title: 'Chitral and Shandur',
    days: '7 days',
    season: 'June–September',
    summary: 'Lowari into Chitral, the Kalash valleys, then Shandur.',
  },
] as const;

export function NamedRides() {
  return (
    <section
      id="rides"
      aria-labelledby="rides-heading"
      className="section-pad bg-bg scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Already in the planner"
          title={<span id="rides-heading">Pick the ride you were already planning.</span>}
          lead="Nine hand-written trips, with days and season. The Hunza run is mapped in full just below."
        />
      </div>

      <div className="overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max max-w-none gap-4">
          {RIDES.map((ride) => {
            const className = cn(
              'flex w-[280px] shrink-0 flex-col rounded-xl border border-border bg-surface p-6 text-left',
              'transition-all duration-fast ease-out-expo',
              'href' in ride && 'hover:border-border-strong hover:-translate-y-0.5',
            );
            const body = (
              <>
                <div className="flex items-center justify-between gap-3 type-mono text-primary">
                  <span>{ride.days}</span>
                  <span className="text-text-muted">{ride.season}</span>
                </div>
                <h3 className="type-h3 mt-4 text-[1.15rem]">{ride.title}</h3>
                <p className="mt-3 type-small text-text-secondary">{ride.summary}</p>
              </>
            );
            return 'href' in ride && ride.href ? (
              <a key={ride.title} href={ride.href} className={className}>
                {body}
              </a>
            ) : (
              <article key={ride.title} className={className}>
                {body}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
