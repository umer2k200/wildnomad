import { PLAY_STORE_URL as STORE_URL, siteLink } from '@/data/links';

export const LAUNCH_STATE: 'prelaunch' | 'live' = 'live';
export const PLAY_STORE_URL = STORE_URL;

export const SITE = {
  name: 'Wild Nomad',
  tagline: 'Ride Pakistan',
  positioning: "Pakistan's rider-verified map and trip planner.",
  url: 'https://wildnomad.vercel.app',
  domain: 'wildnomad.vercel.app',
  contactEmail: 'wildnomadpk@gmail.com',
  instagram: '@thewildnomad.pk',
  instagramUrl: siteLink('instagram').href,
  stopCount: 93,
  categoryCount: 23,
  offlineRegionCount: 7,
  passCount: 12,
} as const;

export const CTA_LABEL = 'Download on Google Play';

export const NAV_LINKS = [
  { href: '/#routes', label: 'Routes' },
  { href: '/#features', label: 'Features' },
  { href: '/#map', label: 'Map' },
  { href: '/#faq', label: 'FAQ' },
] as const;
