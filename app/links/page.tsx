import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { SITE_LINKS, type SiteLink } from '@/data/links';
import { SITE } from '@/lib/config';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Instagram, YouTube, TikTok, Facebook, LinkedIn, and the Wild Nomad app on Google Play.',
  alternates: { canonical: '/links' },
};

function LinkIcon({ id }: { id: string }) {
  const common = {
    viewBox: '0 0 24 24',
    className: 'size-5 shrink-0',
    'aria-hidden': true as const,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (id === 'instagram' || id === 'instagram-channel') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id === 'play') {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M4.5 3.2v17.6l12.8-8.8L4.5 3.2z" />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10v7M8 7h.01M12 17v-4.5a2 2 0 1 1 4 0V17" />
      </svg>
    );
  }

  if (id === 'tiktok') {
    return (
      <svg {...common}>
        <path d="M14 4v10.2a3.2 3.2 0 1 1-2.4-3.1" />
        <path d="M14 7.2c1.2 1.6 2.6 2.4 4.2 2.6" />
      </svg>
    );
  }

  if (id === 'facebook') {
    return (
      <svg {...common}>
        <path d="M14 8h2V5h-2c-2.2 0-3.5 1.3-3.5 3.6V11H8v3h2.5v6H14v-6h2.2l.5-3H14V9.1c0-.6.2-1.1 1-1.1z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m11 9.5 4 2.5-4 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkRow({ link }: { link: SiteLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-4 transition-colors duration-fast hover:border-primary"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-bg text-primary">
        <LinkIcon id={link.id} />
      </span>
      <span className="min-w-0 text-left">
        <span className="block font-[family-name:var(--font-sora)] text-base font-semibold text-text">
          {link.label}
        </span>
        {link.handle ? (
          <span className="mt-0.5 block truncate type-small text-text-muted">{link.handle}</span>
        ) : null}
      </span>
    </a>
  );
}

export default function LinksPage() {
  return (
    <>
      <Nav />
      <main id="main" className="px-5 pb-28 pt-28">
        <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Wild Nomad"
            width={72}
            height={72}
            className="size-[72px] rounded-full object-cover"
            priority
          />
          <h1 className="mt-5 font-[family-name:var(--font-sora)] text-2xl font-bold tracking-[0.08em] uppercase">
            {SITE.name}
          </h1>
          <p className="mt-2 type-small text-text-secondary">{SITE.tagline}</p>

          <div className="mt-8 flex w-full flex-col gap-3">
            {SITE_LINKS.map((link) => (
              <LinkRow key={link.id} link={link} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
