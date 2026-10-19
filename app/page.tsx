import { Coverage } from '@/components/sections/Coverage';
import { FAQ } from '@/components/sections/FAQ';
import { Features } from '@/components/sections/Features';
import { Footer } from '@/components/sections/Footer';
import { FoundingRiders } from '@/components/sections/FoundingRiders';
import { Hero } from '@/components/sections/Hero';
import { LiveMap } from '@/components/sections/LiveMap';
import { MorningBriefing } from '@/components/sections/MorningBriefing';
import { NamedRides } from '@/components/sections/NamedRides';
import { Nav } from '@/components/sections/Nav';
import { ProductStory } from '@/components/sections/ProductStory';
import { RideJournal } from '@/components/sections/RideJournal';
import { RouteShowcase } from '@/components/sections/RouteShowcase';
import { SharedTrip } from '@/components/sections/SharedTrip';
import type { WebsitePoi } from '@/data/categories';
import poisJson from '@/data/pois.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Wild Nomad — Ride Pakistan',
  },
  description:
    "Pakistan's rider-verified map for mountain roads. Android launches October 2026 — leave your email and you'll get it the day it's live.",
  alternates: { canonical: '/' },
};

const pois = poisJson as WebsitePoi[];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <NamedRides />
        <RouteShowcase />
        <ProductStory />
        <MorningBriefing />
        <SharedTrip />
        <RideJournal />
        <Features />
        <LiveMap pois={pois} />
        <Coverage />
        <FoundingRiders />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
