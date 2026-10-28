export const LAUNCH_STATE: 'prelaunch' | 'live' = 'prelaunch';
export const PLAY_STORE_URL = ''; // filled at launch

export const SITE = {
  name: 'Wild Nomad',
  tagline: 'Ride Pakistan',
  positioning: "Pakistan's rider-verified map and trip planner.",
  launchWindow: 'October 2026',
  url: 'https://wildnomad.vercel.app',
  domain: 'wildnomad.vercel.app',
  contactEmail: 'wildnomadpk@gmail.com',
  instagram: '@thewildnomad.pk',
  instagramUrl: 'https://instagram.com/thewildnomad.pk',
  stopCount: 93,
  categoryCount: 23,
  offlineRegionCount: 7,
  passCount: 12,
} as const;

export const CTA_LABEL =
  LAUNCH_STATE === 'prelaunch' ? 'Get early access' : 'Download on Google Play';

export const NAV_LINKS = [
  { href: '#routes', label: 'Routes' },
  { href: '#features', label: 'Features' },
  { href: '#map', label: 'Map' },
  { href: '#faq', label: 'FAQ' },
] as const;
