import { Footer } from '@/components/sections/Footer';
import { Nav } from '@/components/sections/Nav';
import { SITE } from '@/lib/config';
import Link from 'next/link';
import { ReactNode } from 'react';

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="type-eyebrow text-primary mb-4">Legal</p>
          <h1 className="type-h2 mb-3">{title}</h1>
          <p className="type-small text-text-muted mb-12">
            Last updated {updated} · {SITE.name}
          </p>
          <div className="legal-prose space-y-8 type-body text-text-secondary [&_h2]:type-h3 [&_h2]:text-text [&_h2]:mb-3 [&_h2]:mt-2 [&_h3]:font-[family-name:var(--font-sora)] [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mb-2 [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:text-text [&_p]:mb-3 [&_p:last-child]:mb-0">
            {children}
          </div>
          <p className="mt-16 type-small text-text-muted">
            <Link href="/" className="text-primary hover:underline underline-offset-2">
              ← Back to Wild Nomad
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
