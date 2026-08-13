'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import type { WebsitePoi } from '@/data/categories';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const MapView = dynamic(
  () => import('@/components/map/MapView').then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[640px] w-full bg-surface animate-pulse rounded-none" />
    ),
  },
);

export function LiveMap({ pois }: { pois: WebsitePoi[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="map"
      ref={sectionRef}
      aria-labelledby="map-heading"
      className="section-pad bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Live data"
          title={<span id="map-heading">Pan the map. Open a stop.</span>}
          lead="A sample of real stops from the app. Filter it, zoom it, tap one. The full map lives in Wild Nomad."
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-0 sm:px-5 lg:px-8">
        <div className="overflow-hidden border-y border-border sm:rounded-xl sm:border h-[70vh] min-h-[420px] sm:h-[85vh] sm:min-h-[640px]">
          {shouldLoad ? (
            <MapView pois={pois} />
          ) : (
            <div
              className="h-full min-h-[420px] w-full bg-surface sm:min-h-[640px]"
              aria-hidden
            />
          )}
        </div>

        <div className="mt-4 space-y-2 px-5 text-center">
          <p className="type-mono text-text-muted">
            Sample on this site · 7 offline packs in the app · Community
            submitted, admin verified
          </p>
          <p className="type-small text-text-secondary max-w-prose-narrow mx-auto">
            Not every stop is on this page. For all 100+ verified stops,
            filters, and offline packs — use the Wild Nomad app.
          </p>
        </div>
      </div>
    </section>
  );
}
