/**
 * Public links. Change a URL here and it updates the /links page,
 * the Play Store buttons, and the footer Instagram link.
 */
export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.wildnomad.app';

export type SiteLink = {
  id: string;
  label: string;
  href: string;
  handle?: string;
};

export const SITE_LINKS: SiteLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@thewildnomad.pk',
    href: 'https://www.instagram.com/thewildnomad.pk',
  },
  {
    id: 'instagram-channel',
    label: 'Instagram channel',
    href: 'https://www.instagram.com/channel/ZQ1fFFOEq2WIhfb0/',
  },
  {
    id: 'play',
    label: 'Google Play',
    handle: 'Download the app',
    href: PLAY_STORE_URL,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/umer-zeeshan-b30234444',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@thewildnomad.pk',
    href: 'https://www.tiktok.com/@thewildnomad.pk',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'wildnomadpk',
    href: 'https://www.facebook.com/wildnomadpk',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@VenomRides-x9p',
    href: 'https://www.youtube.com/channel/UC-CrmV_Ag0ez73TtdQf5XYQ',
  },
];

export function siteLink(id: string) {
  const link = SITE_LINKS.find((item) => item.id === id);
  if (!link) throw new Error(`Missing site link: ${id}`);
  return link;
}
