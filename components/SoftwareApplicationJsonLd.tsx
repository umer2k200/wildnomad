import { LAUNCH_STATE, SITE } from '@/lib/config';

export function SoftwareApplicationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Android',
    description: SITE.positioning,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PKR',
    },
    url: SITE.url,
    image: `${SITE.url}/icon.png`,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      email: SITE.contactEmail,
      sameAs: [SITE.instagramUrl],
    },
    ...(LAUNCH_STATE === 'live'
      ? {}
      : {
          releaseNotes: `Pre-launch. Early access opening ${SITE.launchWindow}.`,
        }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
