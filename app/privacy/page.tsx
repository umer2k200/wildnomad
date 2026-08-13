import { LegalShell } from '@/components/LegalShell';
import { SITE } from '@/lib/config';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Wild Nomad collects, uses, and protects your data — including location, ride history, and waitlist email.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="13 August 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          Wild Nomad (&quot;we&quot;, &quot;us&quot;) is a road-trip companion app
          for riders and travellers in Pakistan. This policy explains what we
          collect, why we collect it, and the choices you have. It covers both
          the mobile app and this website ({SITE.name}).
        </p>
        <p>
          Contact:{' '}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Account information</strong> — name, email, phone (if you
            provide it), vehicle type, home city, and profile details you choose
            to add.
          </li>
          <li>
            <strong>Waitlist email</strong> — if you join early access on this
            site, we store your email and optional name and city so we can
            notify you at launch.
          </li>
          <li>
            <strong>Location</strong> — device location is used to show nearby
            stops, record a ride you start, and share your position only when
            you choose to (for example via a live link or in a group). We do
            not sell location data.
          </li>
          <li>
            <strong>Ride data</strong> — distance, speed, elevation, moving
            time, and GPS tracks for rides you record, so you can review them
            later.
          </li>
          <li>
            <strong>Submitted stops</strong> — places you pin (name, category,
            coordinates, description, photos, and notes), including contact
            details you provide for verification.
          </li>
          <li>
            <strong>Alerts and reports</strong> — road conditions you report
            (for example closures or landslides).
          </li>
          <li>
            <strong>Community content</strong> — posts, comments, group chat
            messages, and expense entries you create in the app.
          </li>
          <li>
            <strong>Device and diagnostics</strong> — basic technical logs
            needed to keep the service reliable (for example crash reports and
            app version). We minimise what we keep.
          </li>
        </ul>
      </section>

      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To operate the map, trip planner, offline packs, and safety features</li>
          <li>To show nearby stops and route-relevant alerts</li>
          <li>To verify community-submitted places before they go live</li>
          <li>To let you share location only when you turn that on</li>
          <li>To email you about launch and early access if you opted in</li>
          <li>To improve reliability and fix bugs</li>
        </ul>
      </section>

      <section>
        <h2>Location sharing</h2>
        <p>
          Location stays on your device and with our servers only as needed for
          the features you use. Live location is shared with others only when
          you explicitly start sharing (link or group). You can stop sharing at
          any time in the app.
        </p>
      </section>

      <section>
        <h2>Third parties</h2>
        <p>We use trusted providers to run the product:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — authentication, database, and storage
            for account and app data
          </li>
          <li>
            <strong>Open-Meteo</strong> — weather and related forecasts used for
            road-risk context
          </li>
          <li>
            <strong>Map tile providers</strong> — map imagery and basemap tiles
            (for example OpenStreetMap-based tiles and CARTO styles). Tile
            requests may include approximate view coordinates.
          </li>
          <li>
            <strong>Hosting</strong> — this website is hosted on Vercel
          </li>
        </ul>
        <p>
          These providers process data only to deliver their service to us.
          They are not given permission to sell your data for advertising.
        </p>
      </section>

      <section>
        <h2>Retention</h2>
        <p>
          We keep account and ride data while your account is active. Waitlist
          emails are kept until launch notifications are complete or you ask us
          to remove them. You can request deletion of your account and
          associated data; we will remove what we no longer need to operate the
          service or meet legal obligations.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your account and related data</li>
          <li>Withdraw consent for optional uses (for example marketing email)</li>
          <li>Export a copy of your data where reasonably available</li>
        </ul>
        <p>
          Email{' '}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> and
          we will respond within a reasonable time.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Wild Nomad is not directed at children under 13. We do not knowingly
          collect personal information from children.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy as the product evolves. The &quot;Last
          updated&quot; date at the top will change when we do. Continued use
          after a material update means you accept the revised policy.
        </p>
      </section>

      <section>
        <h2>Related</h2>
        <p>
          See also our <Link href="/terms">Terms of Service</Link>.
        </p>
      </section>
    </LegalShell>
  );
}
