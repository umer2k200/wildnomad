import { NAV_LINKS, SITE } from '@/lib/config';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-bg-elevated border-t border-border overflow-hidden">
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-surface"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 80 L120 55 L240 72 L360 40 L480 65 L600 30 L720 58 L840 25 L960 50 L1080 35 L1200 60 L1320 42 L1440 55 L1440 120 L0 120 Z"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Wild Nomad"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />
              <span
                className="font-[family-name:var(--font-sora)] font-bold tracking-[0.08em] text-sm uppercase"
                aria-hidden="true"
              >
                Wild Nomad
              </span>
            </div>
            <p className="mt-4 type-eyebrow text-text-muted">{SITE.tagline}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-small text-text-secondary hover:text-primary transition-colors duration-fast"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 text-center md:items-end md:text-right">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 type-small text-text-secondary hover:text-primary transition-colors duration-fast"
            >
              <InstagramIcon className="size-4 shrink-0" />
              <span>{SITE.instagram}</span>
            </a>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="inline-flex items-center gap-2 type-small text-text-secondary hover:text-primary transition-colors duration-fast"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              <span>{SITE.contactEmail}</span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left type-small text-text-muted">
          <p>© 2026 Wild Nomad</p>
          <div className="flex justify-center gap-5">
            <Link
              href="/privacy"
              className="hover:text-text transition-colors duration-fast"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-text transition-colors duration-fast"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
