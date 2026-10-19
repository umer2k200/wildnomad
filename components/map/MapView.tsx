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
 * Satellite basemap, no API key.
 * Vector styles from other hosts have hung before `load`.
 */
const MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'Esri Imagery',
  sources: {
    imagery: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution:
        'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    },
    labels: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'imagery',
      type: 'raster',
      source: 'imagery',
      minzoom: 0,
      maxzoom: 19,
    },
    {
      id: 'labels',
      type: 'raster',
      source: 'labels',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

type Cluster =
  | { kind: 'poi'; poi: WebsitePoi }
  | { kind: 'cluster'; id: string; lat: number; lng: number; count: number };

/** Group nearby stops until the map is close enough to read each pin. */
function clusterPois(pois: WebsitePoi[], zoom: number): Cluster[] {
  if (zoom >= 11) return pois.map((poi) => ({ kind: 'poi', poi }));

  const cell = zoom >= 9 ? 0.12 : zoom >= 7.5 ? 0.28 : 0.55;
  const buckets = new Map<string, WebsitePoi[]>();
  for (const poi of pois) {
    const key = `${Math.floor(poi.lng / cell)}:${Math.floor(poi.lat / cell)}`;
    const list = buckets.get(key);
    if (list) list.push(poi);
    else buckets.set(key, [poi]);
  }

  const items: Cluster[] = [];
  for (const [id, list] of buckets) {
    if (list.length === 1) {
      items.push({ kind: 'poi', poi: list[0] });
      continue;
    }
    const lat = list.reduce((sum, poi) => sum + poi.lat, 0) / list.length;
    const lng = list.reduce((sum, poi) => sum + poi.lng, 0) / list.length;
    items.push({ kind: 'cluster', id, lat, lng, count: list.length });
  }
  return items;
}

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

function createClusterEl(count: number, onClick: () => void) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'wn-map-marker';
  el.setAttribute('aria-label', `${count} stops in this area`);
  el.style.cssText = `
    width: 36px;
    height: 36px;
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
  pill.textContent = String(count);
  pill.style.cssText = `
    width: 36px;
    height: 36px;
    border-radius: 999px;
    border: 2px solid #121212;
    background: #D9642C;
    color: #fff7f2;
    box-shadow: 0 4px 14px rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ui-monospace, monospace;
    font-weight: 700;
    font-size: 12px;
    line-height: 1;
    pointer-events: none;
  `;
  el.appendChild(pill);
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick();
  });
  return el;
}

export function MapView({ pois }: { pois: WebsitePoi[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const filteredRef = useRef<WebsitePoi[]>(pois);
  const onSelectRef = useRef<(poi: WebsitePoi) => void>(() => {});
  const paintRef = useRef<(list: WebsitePoi[]) => void>(() => {});

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
    const zoom = map.getZoom();

    for (const item of clusterPois(list, zoom)) {
      if (item.kind === 'poi') {
        const el = createMarkerEl(item.poi, (poi) => onSelectRef.current(poi));
        markersRef.current.push(
          new Marker({ element: el, anchor: 'center' })
            .setLngLat([item.poi.lng, item.poi.lat])
            .addTo(map),
        );
        continue;
      }

      const nextZoom = Math.min(zoom + 2, 14);
      const el = createClusterEl(item.count, () => {
        map.easeTo({
          center: [item.lng, item.lat],
          zoom: nextZoom,
        });
      });
      markersRef.current.push(
        new Marker({ element: el, anchor: 'center' })
          .setLngLat([item.lng, item.lat])
          .addTo(map),
      );
    }
  }

  paintRef.current = paintStops;

  // Init map once
  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = new MapLibreMap({
      container,
      style: MAP_STYLE,
      center: [74.4, 35.75],
      zoom: 7,
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
      paintRef.current(filteredRef.current);
      setReady(true);
      map.resize();
    });

    map.on('zoomend', () => {
      paintRef.current(filteredRef.current);
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
          aria-label={isMobile ? 'Tap to explore the map' : 'Click to interact with the map'}
        >
          <span className="pointer-events-none rounded-pill border border-border-strong bg-[rgba(18,18,18,0.9)] px-4 py-2 type-small text-text backdrop-blur-md">
            {isMobile ? 'Tap to explore' : 'Click to interact'}
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
