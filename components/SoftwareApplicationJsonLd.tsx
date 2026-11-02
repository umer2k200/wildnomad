import { SITE_LINKS } from '@/data/links';
import { PLAY_STORE_URL, SITE } from '@/lib/config';

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
    downloadUrl: PLAY_STORE_URL,
    installUrl: PLAY_STORE_URL,
    image: `${SITE.url}/icon.png`,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      email: SITE.contactEmail,
      sameAs: SITE_LINKS.map((link) => link.href),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
