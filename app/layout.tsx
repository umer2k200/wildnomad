import { SoftwareApplicationJsonLd } from '@/components/SoftwareApplicationJsonLd';
import { SITE } from '@/lib/config';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';
import './globals.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

const description =
  "Pakistan's rider-verified map for mountain roads. Get early access — free for the first 1,000 riders after launch.";

export const metadata: Metadata = {
  metadataBase: new URL('https://wildnomad.pk'),
  title: {
    default: 'Wild Nomad — Ride Pakistan',
    template: '%s · Wild Nomad',
  },
  description,
  keywords: [
    'Wild Nomad',
    'Pakistan motorcycle',
    'KKH',
    'Hunza',
    'road trip planner',
    'rider map Pakistan',
    'Babusar',
    'offline maps Pakistan',
  ],
  authors: [{ name: SITE.name, url: 'https://wildnomad.pk' }],
  creator: SITE.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://wildnomad.pk',
    siteName: SITE.name,
    title: 'Wild Nomad — Ride Pakistan',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wild Nomad — Ride Pakistan',
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/icon.png' }],
  },
  category: 'travel',
};

export const viewport: Viewport = {
  themeColor: '#121212',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://b.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://basemaps.cartocdn.com" />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary focus:outline-none focus:shadow-lift"
        >
          Skip to content
        </a>
        <SoftwareApplicationJsonLd />
        {children}
      </body>
    </html>
  );
}
