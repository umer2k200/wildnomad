import { LegalShell } from '@/components/LegalShell';
import { SITE } from '@/lib/config';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms for using Wild Nomad — the rider-verified map and trip planner for Pakistan.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="13 August 2026">
      <section>
        <h2>Agreement</h2>
        <p>
          By using Wild Nomad (the app or this website), you agree to these
          terms. If you do not agree, do not use the service.
        </p>
      </section>

      <section>
        <h2>The service</h2>
        <p>
          Wild Nomad provides a rider-verified map, trip planning tools, road
          alerts, offline packs, ride tracking, and related community features
          for travel in Pakistan. The product is provided as-is while it is in
          active development, including early access builds.
        </p>
      </section>

      <section>
        <h2>Your account</h2>
        <p>
          You are responsible for activity under your account and for keeping
          login details secure. Provide accurate information. Do not create an
          account for someone else without permission.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not submit false, harmful, or abusive content</li>
          <li>Do not attempt to disrupt or scrape the service without permission</li>
          <li>Do not use the app to endanger others on the road</li>
          <li>Respect other riders in groups, chat, and the feed</li>
        </ul>
        <p>
          We may remove content or suspend accounts that violate these rules.
        </p>
      </section>

      <section>
        <h2>Community data</h2>
        <p>
          Stops, alerts, and other contributions you submit may be shown to
          other users after review. You grant us a licence to use that content
          to operate and improve Wild Nomad. You keep ownership of your
          original content.
        </p>
      </section>

      <section>
        <h2>Safety disclaimer</h2>
        <p>
          Maps, routes, alerts, weather, and pass status are aids — not a
          guarantee. Road conditions change. Always ride within your skill,
          check official advisories, and use your own judgement. Wild Nomad is
          not liable for decisions you make on the road.
        </p>
      </section>

      <section>
        <h2>Availability</h2>
        <p>
          We aim for reliability but do not guarantee uninterrupted access.
          Features may change, break, or be withdrawn as we ship updates —
          especially during early access.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>
          How we handle personal data is described in our{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms:{' '}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
      </section>
    </LegalShell>
  );
}
