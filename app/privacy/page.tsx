import { LegalShell } from '@/components/LegalShell';
import type { Metadata } from 'next';
import Link from 'next/link';

const PRIVACY_EMAIL = 'wildnomadpk@gmail.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Wild Nomad collects, uses, and protects your data — including location, ride history, community content, and waitlist email.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="28 October 2026">
      <section>
        <p>
          <strong>Effective date:</strong> 6 August 2026
        </p>
        <p>
          Wild Nomad (&quot;<strong>we</strong>&quot;, &quot;<strong>our</strong>
          &quot;, &quot;<strong>us</strong>&quot;) operates the Wild Nomad
          mobile application (the &quot;<strong>App</strong>&quot;) for riders
          and travelers in Pakistan, and this website. This Privacy Policy
          explains what information we collect, how we use it, who we share it
          with, and your choices.
        </p>
        <p>
          By using the App or this website, you agree to this Privacy Policy. If
          you do not agree, please do not use the App or site.
        </p>
        <p>
          <strong>Contact:</strong>{' '}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          <br />
          <strong>Developer / Data controller:</strong> Wild Nomad, Pakistan
        </p>
      </section>

      <section>
        <h2>1. Who this policy applies to</h2>
        <p>This policy applies to anyone who:</p>
        <ul>
          <li>Creates an account or uses the App</li>
          <li>
            Uses maps, trip planning, ride tracking, mountain-pass status, road
            alerts, community, offline packs, or safety tools
          </li>
          <li>Views a live location share from a signed-in account</li>
          <li>Joins the early-access waitlist on this website</li>
        </ul>
      </section>

      <section>
        <h2>2. Information we collect</h2>

        <h3>2.1 Account information</h3>
        <p>When you sign up, we collect:</p>
        <ul>
          <li>
            <strong>Email address and password</strong> (if you register with
            email)
          </li>
          <li>
            <strong>Name</strong> and optional <strong>phone number</strong>
          </li>
          <li>
            <strong>Profile photo</strong> (if you upload one)
          </li>
          <li>
            <strong>Home city</strong>, <strong>vehicle type</strong> (bike /
            car / both), and optional <strong>bio</strong>
          </li>
          <li>
            Optional <strong>privacy setting</strong> so other riders see your
            city only, not how far away you are
          </li>
          <li>
            If you use <strong>Google Sign-In</strong>, we receive your{' '}
            <strong>Google account email</strong> and{' '}
            <strong>basic profile</strong> (name, picture) through our
            authentication provider
          </li>
        </ul>
        <p>We do <strong>not</strong> receive your Google password.</p>

        <h3>2.2 Website waitlist</h3>
        <p>
          If you join early access on this site, we store your{' '}
          <strong>email</strong> and optional <strong>name</strong> and{' '}
          <strong>city</strong> so we can notify you at launch.
        </p>

        <h3>2.3 Location information</h3>
        <p>With your permission, we collect:</p>
        <ul>
          <li>
            <strong>Precise GPS</strong> when you use the map, plan a route, set
            home city from GPS, report a road alert, add a place, check weather,
            or view nearby stops
          </li>
          <li>
            <strong>Background location</strong> only while you are{' '}
            <strong>actively recording a ride</strong>, so the track continues
            if you switch apps
          </li>
          <li>
            <strong>Last known location</strong> on your device (for a short
            time) so nearby stops and SOS still work if a fresh fix fails
          </li>
          <li>
            <strong>Home-city coordinates</strong> on your device if you choose
            &quot;use my location&quot; when setting your city
          </li>
        </ul>
        <p>
          You can deny or revoke location in device settings. Ride tracking,
          SOS, and nearby stops need location to work.
        </p>
        <p>
          We do <strong>not</strong> read your phone&apos;s address book.
          Emergency contacts are names and numbers <strong>you type in</strong>.
        </p>

        <h3>2.4 Content you create</h3>
        <p>We store content you submit, including:</p>
        <ul>
          <li>
            <strong>Trips and routes</strong> (places, dates, planned path,
            notes, expenses, checklists, who you invite)
          </li>
          <li>
            <strong>Plan drafts</strong> saved on your device and, when you are
            online, on our servers
          </li>
          <li>
            <strong>Recorded rides</strong> (GPS path, distance, speed,
            elevation, duration)
          </li>
          <li>
            <strong>Photos</strong> on trips, rides, alerts, posts, or places
            (camera or photo library, with permission)
          </li>
          <li>
            <strong>Road alerts</strong> (type, location, note, optional photo,
            and optional details such as severity or whether the road is
            passable)
          </li>
          <li>
            <strong>Alert confirmations and flags</strong> (&quot;still
            here&quot; / &quot;not there&quot;) linked to your account
          </li>
          <li>
            <strong>Places / stops</strong> you add (name, category, tips,
            photos, optional contact details). New stops are{' '}
            <strong>reviewed before they appear to everyone</strong>
          </li>
          <li>
            <strong>Reviews</strong> of places
          </li>
          <li>
            <strong>Mountain-pass reports</strong> you submit (proposed status
            and note) for admin review
          </li>
          <li>
            <strong>Community posts</strong>, comments, follows, and{' '}
            <strong>group chat messages</strong>
          </li>
          <li>
            <strong>Emergency contacts</strong> you save
          </li>
          <li>
            <strong>Garage / service records</strong>
          </li>
          <li>
            Optional <strong>&quot;Riding now&quot;</strong> status until it
            expires
          </li>
        </ul>

        <h3>2.5 Live location sharing and SOS</h3>
        <p>
          If you start live sharing or <strong>SOS</strong>, we process your{' '}
          <strong>current location</strong> and may create a{' '}
          <strong>shareable in-app link</strong>. People you send that link to
          can view it <strong>while signed in</strong> for a limited time.
        </p>
        <p>
          SOS can send a message through <strong>SMS</strong> or{' '}
          <strong>WhatsApp</strong> on your device, or copy the text to your
          clipboard. Recipients see the location you chose to send.
        </p>
        <p>
          <strong>
            SOS is an aid only — it is not a substitute for calling official
            emergency services (e.g. 1122, 15).
          </strong>
        </p>

        <h3>2.6 Device, notifications, and on-device storage</h3>
        <p>We may collect or store:</p>
        <ul>
          <li>
            <strong>Push notification token</strong> (trip reminders, fuel-price
            alerts if you opt in, social activity)
          </li>
          <li>
            <strong>Basic device information</strong> (operating system, app
            version)
          </li>
          <li>
            <strong>Offline packs</strong> on your device (stops, alerts, your
            saved routes, emergency numbers for a region)
          </li>
          <li>
            <strong>Local copies</strong> of your trips, rides, garage, and
            drafts so the App still works <strong>offline</strong>; pending
            changes sync when you reconnect
          </li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal information. We do{' '}
          <strong>not</strong> use third-party advertising or analytics SDKs in
          the App at this time.
        </p>

        <h3>2.7 Optional AI trip planner</h3>
        <p>
          If you use the AI itinerary feature (when enabled), the text you type
          and basic context (such as origin, days, budget, vehicle) may be sent
          to <strong>Anthropic</strong> or <strong>OpenAI</strong> to generate a
          draft plan. Do not put other people&apos;s private details in that
          prompt.
        </p>

        <h3>2.8 Information from others</h3>
        <ul>
          <li>
            Other users may mention you in groups, trips, or posts.
          </li>
          <li>
            Admins may review stops, alerts, and pass reports you submitted
            (including hiding or rejecting content that breaks the rules).
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Create and manage your account</li>
          <li>
            Show maps, stops, routes, weather,{' '}
            <strong>mountain-pass status</strong>, and{' '}
            <strong>road alerts</strong>
          </li>
          <li>
            Plan trips, estimate <strong>distance and fuel cost</strong>, and
            save itineraries
          </li>
          <li>Record rides and show history</li>
          <li>
            Download <strong>offline packs</strong> for areas with no signal
          </li>
          <li>Run community features (feed, groups, chat, follows)</li>
          <li>
            Send <strong>push notifications</strong> you opt into (including
            optional <strong>fuel-price</strong> alerts)
          </li>
          <li>
            Provide <strong>safety features</strong> (SOS, emergency contacts,
            live location share)
          </li>
          <li>Email you about launch and early access if you joined the waitlist</li>
          <li>Moderate user-generated content and prevent abuse</li>
          <li>Improve reliability and fix bugs</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. Legal bases (where applicable)</h2>
        <p>Depending on your region, we process data based on:</p>
        <ul>
          <li>
            <strong>Your consent</strong> (location, notifications,
            camera/photos, optional profile fields, waitlist email)
          </li>
          <li>
            <strong>Performance of a service</strong> you request (saving a
            trip, recording a ride, posting an alert)
          </li>
          <li>
            <strong>Legitimate interests</strong> (securing the App, preventing
            fraud, moderating the map)
          </li>
          <li>
            <strong>Legal obligation</strong> where required
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Who we share information with</h2>

        <h3>5.1 Service providers</h3>
        <p>
          We use providers to run the App and website. They process data on our
          behalf under their own policies.
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> — auth, database, file storage, realtime
            chat; account, profile, trips, rides, posts, photos, coordinates you
            submit, and waitlist emails
          </li>
          <li>
            <strong>Google</strong> — optional sign-in; email and basic profile
            from Google
          </li>
          <li>
            <strong>Expo / EAS</strong> — app builds and push delivery; push
            token, device type
          </li>
          <li>
            <strong>Firebase Cloud Messaging</strong> — Android push (when
            configured); push registration
          </li>
          <li>
            <strong>Open-Meteo</strong> — weather and pass-road risk hints;
            latitude/longitude you request
          </li>
          <li>
            <strong>OpenFreeMap, OpenStreetMap, Esri ArcGIS</strong> — map tiles
            in the App; map tile requests (approximate area you are viewing)
          </li>
          <li>
            <strong>Mapbox</strong> (optional) — routing / traffic when enabled;
            route waypoints
          </li>
          <li>
            <strong>OSRM</strong> (public routing) — fallback route geometry;
            start/end/via coordinates
          </li>
          <li>
            <strong>OpenStreetMap Nominatim</strong> — place search and reverse
            geocoding; search text or coordinates (Pakistan-focused)
          </li>
          <li>
            <strong>fuel.trackmate.page</strong> — published Pakistan fuel
            prices; no account data; we fetch public prices
          </li>
          <li>
            <strong>Anthropic or OpenAI</strong> (optional) — AI itinerary
            drafts; the prompt and planning context you submit
          </li>
          <li>
            <strong>Vercel</strong> — hosting for this website
          </li>
        </ul>

        <h3>5.2 Other users and the public</h3>
        <p>Depending on your actions:</p>
        <ul>
          <li>
            <strong>Community posts</strong>, <strong>approved stops</strong>,{' '}
            <strong>road alerts</strong>, and <strong>reviews</strong> may be{' '}
            <strong>visible to other App users</strong>.
          </li>
          <li>
            <strong>Mountain-pass status</strong> on the map is visible in the
            App; your written report is reviewed before it changes a pass.
          </li>
          <li>
            <strong>Live location</strong> is visible to people you share with
            who can open it in the App.
          </li>
          <li>
            <strong>Rider profile</strong> (name, city, vehicle, bio, avatar)
            may be visible in the community. Distance to you is hidden if you
            turn on city-only.
          </li>
        </ul>

        <h3>5.3 Legal and safety</h3>
        <p>
          We may disclose information if required by law, or to protect the
          safety of users or the public.
        </p>
        <p>We do <strong>not</strong> sell personal information to data brokers.</p>
      </section>

      <section>
        <h2>6. Data storage and security</h2>
        <ul>
          <li>
            Account and cloud data are stored on <strong>Supabase</strong>{' '}
            (region depends on project configuration).
          </li>
          <li>
            Passwords are handled by Supabase Auth; we do not store plain-text
            passwords.
          </li>
          <li>
            We use <strong>HTTPS</strong> in transit and{' '}
            <strong>Row Level Security</strong> on the database where
            applicable.
          </li>
          <li>
            Offline copies and packs live <strong>on your device</strong> until
            you delete them or uninstall the App.
          </li>
          <li>No transmission or storage is 100% secure.</li>
        </ul>
      </section>

      <section>
        <h2>7. Data retention</h2>
        <p>
          We keep your information while your account is active or as needed to
          provide the App. You can delete the account in the App, or email{' '}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> and ask us to
          delete it. See Account deletion below.
        </p>
        <p>
          Waitlist emails are kept until launch notifications are complete or
          you ask us to remove them.
        </p>
        <p>
          Some community content (posts, alerts, approved stops) may remain if
          other riders rely on it, or in anonymized form, until removed by you
          or by moderation.
        </p>
        <p>
          Road alerts typically <strong>expire after 48 hours</strong> unless
          someone confirms they are still there.
        </p>
        <p>
          Offline packs stay on the device until you delete them in the App or
          uninstall.
        </p>
      </section>

      <section>
        <h2>8. Your choices and rights</h2>
        <p>You can:</p>
        <ul>
          <li>
            <strong>Access and update</strong> your profile in the App
          </li>
          <li>
            <strong>Hide distance</strong> from other riders (city only)
          </li>
          <li>
            <strong>Turn off location</strong> or <strong>notifications</strong>{' '}
            in device settings
          </li>
          <li>
            <strong>Delete</strong> content you created where the App allows
            (trips, rides, your posts, your alerts, packs)
          </li>
          <li>
            <strong>Delete your account</strong> in the App from your profile
            (<strong>Delete account</strong>), or by emailing{' '}
            <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          </li>
          <li>
            <strong>Ask us to remove</strong> your waitlist email
          </li>
          <li>
            <strong>Revoke Google access</strong> in your Google Account
            settings
          </li>
        </ul>
        <p>
          Depending on your country, you may have additional rights (access,
          correction, deletion, objection). Contact us to exercise them.
        </p>
      </section>

      <section>
        <h2>9. Account deletion</h2>
        <p>
          You can delete your account in the App. Open your profile and choose{' '}
          <strong>Delete account</strong>. You need an internet connection. The
          App asks you to confirm before anything is removed. Deletion is
          permanent and cannot be undone.
        </p>
        <p>When deletion succeeds, we remove:</p>
        <ul>
          <li>Your sign-in and profile</li>
          <li>Your trips, recorded rides, and other personal data tied to the account</li>
          <li>Posts and other content owned by the account, where they are removed with it</li>
        </ul>
        <p>
          Map stops you added can stay on the map so other riders can still use
          them. Your name is cleared from those stops.
        </p>
        <p>
          Offline packs and other files stored only on the phone stay on the
          device until you delete them in the App or uninstall it.
        </p>
        <p>
          If deletion in the App does not complete, email{' '}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> from the
          address on the account and we will delete it.
        </p>
      </section>

      <section>
        <h2>10. Children&apos;s privacy</h2>
        <p>
          Wild Nomad is <strong>not directed at children under 13</strong> (or
          the minimum age in your country). We do not knowingly collect personal
          information from children. If you believe a child has provided us
          data, contact us and we will delete it.
        </p>
      </section>

      <section>
        <h2>11. International users</h2>
        <p>
          The App is designed for <strong>Pakistan</strong> but may be used from
          other countries. Your data may be processed where our providers
          operate. By using the App, you consent to this transfer where
          permitted by law.
        </p>
      </section>

      <section>
        <h2>12. Third-party links and apps</h2>
        <p>
          The App may open <strong>Google Maps</strong>,{' '}
          <strong>WhatsApp</strong>, <strong>phone / SMS</strong>, or other
          apps on your device. We are not responsible for their privacy
          practices.
        </p>
      </section>

      <section>
        <h2>13. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The new version
          will show a new &quot;Last updated&quot; date. Continued use of the
          App or website after changes means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2>14. Google Play Data safety (summary)</h2>
        <p>Summary for Play Console → Data safety:</p>
        <ul>
          <li>
            <strong>Email, name, user IDs</strong> — collected; shared with
            Supabase (processor); account
          </li>
          <li>
            <strong>Phone number</strong> — optional; Supabase; profile / SOS
            contacts you save
          </li>
          <li>
            <strong>Photos</strong> — yes; Supabase; visible per feature; user
            content
          </li>
          <li>
            <strong>Precise location</strong> — yes; Supabase; live share you
            start; maps, rides, alerts, safety
          </li>
          <li>
            <strong>App activity</strong> (trips, rides, posts, alerts) — yes;
            Supabase; app functionality
          </li>
          <li>
            <strong>Device IDs</strong> (push token) — yes; Expo / FCM;
            notifications
          </li>
          <li>
            <strong>Other user content</strong> (messages, reports) — yes;
            Supabase; visible per feature; community and moderation
          </li>
        </ul>
        <p>
          Data is <strong>encrypted in transit</strong>. Users can{' '}
          <strong>delete their account in the App</strong>, or request deletion
          by emailing{' '}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.{' '}
          <strong>No advertising SDK. No sale of personal data.</strong>
        </p>
      </section>

      <section>
        <h2>15. Contact us</h2>
        <p>Questions about this Privacy Policy or your data:</p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          </li>
          <li>
            <strong>App name:</strong> Wild Nomad
          </li>
          <li>
            <strong>Package name:</strong> com.wildnomad.app
          </li>
        </ul>
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
