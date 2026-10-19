'use client';

import { POI_CATEGORIES, type PoiCategory } from '@/data/categories';
import { cn } from '@/lib/utils';

export function CategoryFilter({
  active,
  onChange,
}: {
  active: PoiCategory | 'all';
  onChange: (key: PoiCategory | 'all') => void;
}) {
  return (
    <div
      className="absolute left-3 top-3 z-20 right-3 md:right-auto md:max-w-[min(100%,560px)]"
      role="toolbar"
      aria-label="Filter stops by category"
    >
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage:
            'linear-gradient(to right, #000 0, #000 calc(100% - 2.25rem), transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, #000 0, #000 calc(100% - 2.25rem), transparent)',
        }}
      >
        <button
          type="button"
          onClick={() => onChange('all')}
          className={cn(
            'shrink-0 rounded-pill px-3 py-1.5 type-small border transition-all duration-fast ease-out-expo cursor-pointer',
            active === 'all'
              ? 'bg-primary border-primary text-on-primary'
              : 'bg-[rgba(18,18,18,0.85)] border-border text-text-secondary hover:border-border-strong backdrop-blur-md',
          )}
        >
          All
        </button>
        {POI_CATEGORIES.map((cat) => {
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onChange(cat.key)}
              className={cn(
                'shrink-0 rounded-pill px-3 py-1.5 type-small border transition-all duration-fast ease-out-expo cursor-pointer inline-flex items-center gap-1.5',
                isActive
                  ? 'border-transparent text-[#FFF7F2]'
                  : 'bg-[rgba(18,18,18,0.85)] border-border text-text-secondary hover:border-border-strong backdrop-blur-md',
              )}
              style={isActive ? { backgroundColor: cat.color } : undefined}
            >
              <span aria-hidden>{cat.emoji}</span>
              {cat.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
