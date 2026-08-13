import { BuiltForPakistan } from '@/components/sections/BuiltForPakistan';
import { FAQ } from '@/components/sections/FAQ';
import { Features } from '@/components/sections/Features';
import { Footer } from '@/components/sections/Footer';
import { FoundingRiders } from '@/components/sections/FoundingRiders';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { LiveMap } from '@/components/sections/LiveMap';
import { Nav } from '@/components/sections/Nav';
import { Problem } from '@/components/sections/Problem';
import { RouteShowcase } from '@/components/sections/RouteShowcase';
import { Stats } from '@/components/sections/Stats';
import type { WebsitePoi } from '@/data/categories';
import poisJson from '@/data/pois.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Wild Nomad — Ride Pakistan',
  },
  description:
    "Pakistan's rider-verified map for mountain roads. Get early access — free for the first 1,000 riders after launch.",
  alternates: { canonical: '/' },
};

const pois = poisJson as WebsitePoi[];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Problem />
        <LiveMap pois={pois} />
        <Features />
        <RouteShowcase />
        <BuiltForPakistan />
        <HowItWorks />
        <FoundingRiders />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
