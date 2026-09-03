'use client';

import { CategoryFilter } from '@/components/map/CategoryFilter';
import { PoiCard } from '@/components/map/PoiCard';
import {
  CATEGORY_MAP,
  type PoiCategory,
  type WebsitePoi,
} from '@/data/categories';
import { AnimatePresence } from 'framer-motion';
import {
  GeoJSONSource,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  type StyleSpecification,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * Dark raster basemap (no API key).
 * Carto watermarks without a key; OpenFreeMap vector dark can hang before `load`.
 */
const MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'Esri Dark Gray',
  sources: {
    esri: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution:
        'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS',
    },
    esriRef: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'esri-tiles',
      type: 'raster',
      source: 'esri',
      minzoom: 0,
      maxzoom: 16,
    },
    {
      id: 'esri-labels',
      type: 'raster',
      source: 'esriRef',
      minzoom: 0,
      maxzoom: 16,
    },
  ],
};

function createMarkerEl(poi: WebsitePoi, onClick: (poi: WebsitePoi) => void) {
  const meta = CATEGORY_MAP[poi.category];

  // Outer node is owned by MapLibre (it sets transform for map position).
  // Never set transform on this element — hover scale goes on the inner pill.
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'wn-map-marker';
  el.setAttribute('aria-label', poi.name);
  el.style.cssText = `
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const pill = document.createElement('span');
  pill.setAttribute('aria-hidden', 'true');
  pill.style.cssText = `
    width: 28px;
    height: 28px;
    border-radius: 999px;
    border: 2px solid #121212;
    background: ${meta.color};
    box-shadow: 0 0 0 4px ${meta.color}33, 0 4px 12px rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 1;
    transition: transform 140ms cubic-bezier(0.22, 1, 0.36, 1);
    transform: scale(1);
    pointer-events: none;
  `;
  pill.textContent = meta.emoji;
  el.appendChild(pill);

  el.addEventListener('mouseenter', () => {
    pill.style.transform = 'scale(1.15)';
  });
  el.addEventListener('mouseleave', () => {
    pill.style.transform = 'scale(1)';
  });
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick(poi);
  });
  return el;
}

function toGeoJSON(pois: WebsitePoi[]) {
  return {
    type: 'FeatureCollection' as const,
    features: pois.map((poi) => ({
      type: 'Feature' as const,
      properties: {
        id: poi.id,
        category: poi.category,
        color: CATEGORY_MAP[poi.category]?.color ?? '#D9642C',
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [poi.lng, poi.lat] as [number, number],
      },
    })),
  };
}

export function MapView({ pois }: { pois: WebsitePoi[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const poisRef = useRef(pois);
  const filteredRef = useRef<WebsitePoi[]>(pois);
  const onSelectRef = useRef<(poi: WebsitePoi) => void>(() => {});

  const [ready, setReady] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [filter, setFilter] = useState<PoiCategory | 'all'>('all');
  const [selected, setSelected] = useState<WebsitePoi | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const filtered = useMemo(
    () => (filter === 'all' ? pois : pois.filter((p) => p.category === filter)),
    [pois, filter],
  );

  useEffect(() => {
    poisRef.current = pois;
  }, [pois]);

  useEffect(() => {
    filteredRef.current = filtered;
  }, [filtered]);

  useEffect(() => {
    onSelectRef.current = (poi) => setSelected(poi);
  }, []);

  function clearMarkers() {
    for (const m of markersRef.current) m.remove();
    markersRef.current = [];
  }

  function paintStops(list: WebsitePoi[]) {
    const map = mapRef.current;
    if (!map) return;

    clearMarkers();

    const source = map.getSource('pois') as GeoJSONSource | undefined;
    if (source) {
      source.setData(toGeoJSON(list));
    }

    // HTML markers for every stop — reliable at all zooms
    for (const poi of list) {
      const el = createMarkerEl(poi, (p) => onSelectRef.current(p));
      const marker = new Marker({ element: el, anchor: 'center' })
        .setLngLat([poi.lng, poi.lat])
        .addTo(map);
      markersRef.current.push(marker);
    }
  }

  // Init map once
  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = new MapLibreMap({
      container,
      style: MAP_STYLE,
      center: [74.5, 35.5],
      zoom: 6.2,
      attributionControl: { compact: true },
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      scrollZoom: false,
      maxZoom: 16,
    });

    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');
    map.touchZoomRotate.disableRotation();
    mapRef.current = map;

    map.on('load', () => {
      map.addSource('pois', {
        type: 'geojson',
        data: toGeoJSON(filteredRef.current),
      });

      // Canvas circles under the HTML markers (backup if DOM markers lag)
      map.addLayer({
        id: 'poi-dots',
        type: 'circle',
        source: 'pois',
        paint: {
          'circle-color': '#D9642C',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#121212',
          'circle-opacity': 0.9,
        },
      });

      paintStops(filteredRef.current);
      setReady(true);
      map.resize();
    });

    map.on('error', (e) => {
      console.error('[map]', e.error?.message ?? e);
    });

    const ro = new ResizeObserver(() => {
      map.resize();
    });
    if (rootRef.current) ro.observe(rootRef.current);

    const t1 = window.setTimeout(() => map.resize(), 50);
    const t2 = window.setTimeout(() => map.resize(), 300);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
      clearMarkers();
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once
  }, []);

  // Filter changes
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    paintStops(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, ready]);

  function enableInteraction() {
    const map = mapRef.current;
    if (!map || interactive) return;
    map.scrollZoom.enable();
    map.resize();
    setInteractive(true);
  }

  return (
    <div ref={rootRef} className="relative h-full w-full min-h-[640px]">
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full [&_.maplibregl-canvas-container]:!h-full [&_.maplibregl-map]:!h-full [&_.maplibregl-map]:!w-full"
      />

      {!ready ? (
        <div className="absolute inset-0 z-10 bg-surface animate-pulse" aria-hidden />
      ) : null}

      <CategoryFilter active={filter} onChange={setFilter} />

      {!interactive && ready ? (
        <button
          type="button"
          onClick={enableInteraction}
          className="absolute inset-0 z-[15] flex cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.15)] transition-opacity duration-base"
          aria-label="Click to interact with the map"
        >
          <span className="pointer-events-none rounded-pill border border-border-strong bg-[rgba(18,18,18,0.9)] px-4 py-2 type-small text-text backdrop-blur-md">
            Click to interact
          </span>
        </button>
      ) : null}

      <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-md border border-border bg-[rgba(18,18,18,0.9)] px-3 py-2 type-mono text-text-secondary backdrop-blur-md">
        {filtered.length} stop{filtered.length === 1 ? '' : 's'} in this sample
      </div>

      <AnimatePresence>
        {selected && !isMobile ? (
          <PoiCard
            key={selected.id}
            poi={selected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>

      {typeof document !== 'undefined' && selected && isMobile
        ? createPortal(
            <>
              <button
                type="button"
                className="fixed inset-0 z-[60] bg-overlay cursor-pointer border-0"
                aria-label="Dismiss stop details"
                onClick={() => setSelected(null)}
              />
              <AnimatePresence>
                <PoiCard
                  key={selected.id}
                  poi={selected}
                  mobile
                  onClose={() => setSelected(null)}
                />
              </AnimatePresence>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
