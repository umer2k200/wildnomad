import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Image from 'next/image';

const REGIONS = [
  {
    src: '/images/region-kaghan.jpg',
    name: 'Kaghan',
    note: 'Naran and the road to Babusar',
  },
  {
    src: '/images/region-skardu.jpg',
    name: 'Skardu',
    note: 'The Baltistan road',
  },
  {
    src: '/images/region-galiyat.jpg',
    name: 'Galiyat',
    note: 'A weekend out of the city',
  },
  {
    src: '/images/region-makran.jpg',
    name: 'Makran',
    note: 'The coast, when the ride turns south',
  },
] as const;

export function Coverage() {
  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      className="section-pad bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Where the pins are"
          title={<span id="coverage-heading">Coverage follows the riders.</span>}
          lead="Strongest through Hunza, Gilgit, Skardu, Kaghan, Chitral, Swat and the Galiyat, then Islamabad, Punjab and the Makran coast. Download a pack — Hunza & Skardu, Naran & Kaghan, Chitral, Murree, Punjab, Karachi or Makran — and the streets come with it."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {REGIONS.map((region, i) => (
            <Reveal key={region.name} delay={i * 0.06}>
              <figure className="group overflow-hidden rounded-xl border border-border">
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={region.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.82)] via-[rgba(18,18,18,0.05)] to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-[family-name:var(--font-sora)] text-lg font-semibold">
                      {region.name}
                    </p>
                    <p className="mt-1 type-small text-text-secondary">
                      {region.note}
                    </p>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
