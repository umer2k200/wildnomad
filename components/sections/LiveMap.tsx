'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import type { WebsitePoi } from '@/data/categories';
import { SITE } from '@/lib/config';
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
          lead="Every stop below is real, pinned by riders and already in the app. Filter it, zoom it, tap one."
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
            {SITE.stopCount} stops on this map · {SITE.offlineRegionCount}{' '}
            offline packs in the app · Community submitted, admin verified
          </p>
          <p className="type-small text-text-secondary max-w-prose-narrow mx-auto">
            Live alerts, {SITE.passCount} mountain passes, and offline packs
            live in the Wild Nomad app.
          </p>
        </div>
      </div>
    </section>
  );
}
