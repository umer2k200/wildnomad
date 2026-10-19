import { Marquee } from '@/components/ui/Marquee';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { POI_CATEGORIES } from '@/data/categories';
import { SITE } from '@/lib/config';
import { cn } from '@/lib/utils';

const PROBLEMS: { question: string; answer: string }[] = [
  {
    question: 'Landslide. Nobody told us.',
    answer: 'Alerts from riders already on that road.',
  },
  {
    question: '"Last fuel for 80 km." Said by nobody, in time.',
    answer: "Fuel stops on the route, and today's price in rupees.",
  },
  {
    question: 'Is Babusar open — or are we guessing again?',
    answer: 'Pass reports from riders, checked before you climb.',
  },
  {
    question: 'Signal gone after Babusar.',
    answer: 'Download the region before you leave the valley.',
  },
];

const CARDS = [
  {
    title: "Stops the big maps don't have",
    copy: `Fuel, mechanics, dhabas, hospitals, campsites, viewpoints. Rider-pinned, with photos and notes from people who actually stopped. ${SITE.categoryCount} categories, including the spare-tube shop and the dhaba that is really on the road.`,
    src: '/screenshots/02-poi.png',
    alt: 'Verified stop detail with photo, elevation, road condition and directions',
  },
  {
    title: 'Know the pass before you climb it',
    copy: `Landslides, closures and snow, reported by whoever is ahead — and a ping if one hits a route you saved. ${SITE.passCount} northern passes with rider reports. Road-risk weather, and today's OGRA petrol and diesel, sit on the home screen.`,
    src: '/screenshots/07-home.png',
    alt: 'Home screen with ride-risk weather, Pakistan fuel prices and mountain pass status',
  },
  {
    title: "Still there when the signal isn't",
    copy: `Download one of ${SITE.offlineRegionCount} regions. Stops, the route and emergency numbers stay with you past the last tower. Two-tap SOS over SMS and WhatsApp, with 1122, 15, 130 and 115 built in. Live GPS keeps the ride, and a link so someone knows where you are.`,
    src: '/screenshots/10-safety.png',
    alt: 'Safety screen with SOS button and Pakistan emergency numbers',
  },
] as const;

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="section-pad bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The ride you already know"
          title={<span id="features-heading">You&apos;ve had this ride.</span>}
          lead="Somewhere past Mansehra the questions start. Wild Nomad is the answer that stays on the bike."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {PROBLEMS.map((item, i) => (
            <Reveal key={item.question} delay={Math.min(i * 0.05, 0.2)}>
              <article className="h-full rounded-xl border border-border bg-surface p-6">
                <p className="type-h3 text-[1.125rem] sm:text-[1.25rem]">
                  {item.question}
                </p>
                <p className="mt-3 type-body text-text-secondary">{item.answer}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          {CARDS.map((card, i) => (
            <Reveal key={card.src} delay={i * 0.06} className="h-full">
              <article
                className={cn(
                  'group flex h-full flex-col rounded-xl border border-border bg-surface p-5 sm:p-6',
                  'transition-all duration-fast ease-out-expo',
                  'hover:border-border-strong hover:-translate-y-0.5',
                )}
              >
                <h3 className="type-h3 text-[1.125rem] sm:text-[1.25rem]">
                  {card.title}
                </h3>
                <p className="mt-3 type-body text-text-secondary">{card.copy}</p>
                <div className="mt-8 flex flex-1 items-end justify-center">
                  <PhoneFrame tilt={false} src={card.src} alt={card.alt} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center type-body text-text-secondary">
          Plan the day before you turn the key — bike or car, fuel cost, a
          packing list, and who paid for what. Then ride it with people who
          already know the road.
        </p>

        <div className="mt-12">
          <Marquee>
            {POI_CATEGORIES.map((cat) => (
              <span
                key={cat.key}
                className="inline-flex shrink-0 items-center gap-2 rounded-pill border px-4 py-2 type-small"
                style={{
                  backgroundColor: `${cat.color}18`,
                  color: cat.color,
                  borderColor: `${cat.color}44`,
                }}
              >
                <span aria-hidden>{cat.emoji}</span>
                {cat.label}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
