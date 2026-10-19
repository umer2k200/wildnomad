import { SoftwareApplicationJsonLd } from '@/components/SoftwareApplicationJsonLd';
import { SITE } from '@/lib/config';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Outfit, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const heading = Outfit({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const body = Source_Sans_3({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

const description =
  "Pakistan's rider-verified map for mountain roads. Android launches October 2026 — leave your email and you'll get it the day it's live.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
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
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE.url,
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
        <link rel="preconnect" href="https://server.arcgisonline.com" />
        <link rel="dns-prefetch" href="https://server.arcgisonline.com" />
      </head>
      <body
        className={`${heading.variable} ${body.variable} ${jetbrains.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary focus:outline-none focus:shadow-lift"
        >
          Skip to content
        </a>
        <SoftwareApplicationJsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
