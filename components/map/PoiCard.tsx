'use client';

import { CATEGORY_MAP, type WebsitePoi } from '@/data/categories';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { X, BadgeCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

function formatRegion(region: string | null) {
  if (!region) return null;
  return region
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function PoiCard({
  poi,
  onClose,
  mobile,
}: {
  poi: WebsitePoi;
  onClose: () => void;
  mobile?: boolean;
}) {
  const meta = CATEGORY_MAP[poi.category];
  const reduceMotion = useReducedMotion();
  const region = formatRegion(poi.region);

  return (
    <motion.aside
      role="dialog"
      aria-label={poi.name}
      initial={reduceMotion ? false : { opacity: 0, y: mobile ? 24 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: mobile ? 24 : 12 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'border border-border bg-surface shadow-lift',
        mobile
          ? 'fixed inset-x-0 bottom-0 z-[70] rounded-t-xl p-5 pb-8'
          : 'absolute bottom-4 left-4 z-20 w-[min(340px,calc(100%-2rem))] rounded-xl p-5',
      )}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-text-muted hover:text-text hover:bg-surface-alt transition-colors duration-fast cursor-pointer"
        aria-label="Close"
      >
        <X className="size-4" />
      </button>

      <div className="pr-8">
        <Badge
          tone="custom"
          className="mb-3"
          style={{
            backgroundColor: `${meta.color}22`,
            color: meta.color,
          }}
        >
          <span aria-hidden>{meta.emoji}</span>
          {meta.short}
        </Badge>

        <h3 className="font-[family-name:var(--font-sora)] font-bold text-lg leading-snug tracking-[-0.01em]">
          {poi.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 type-small text-text-secondary">
          {region ? <span>{region}</span> : null}
          {poi.verified ? (
            <span className="inline-flex items-center gap-1 text-success">
              <BadgeCheck className="size-3.5" aria-hidden />
              Verified
            </span>
          ) : null}
          {typeof poi.rating === 'number' ? (
            <span className="type-mono text-text-muted">{poi.rating.toFixed(1)}</span>
          ) : null}
        </div>

        <p className="mt-3 type-body text-text-secondary max-w-prose-narrow">
          {poi.description}
        </p>

        <p className="mt-4 type-mono text-text-muted">
          {poi.lat.toFixed(4)}, {poi.lng.toFixed(4)}
        </p>
      </div>
    </motion.aside>
  );
}
