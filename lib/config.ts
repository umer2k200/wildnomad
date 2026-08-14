export const LAUNCH_STATE: 'prelaunch' | 'live' = 'prelaunch';
export const PLAY_STORE_URL = ''; // filled at launch

export const SITE = {
  name: 'Wild Nomad',
  tagline: 'Ride Pakistan',
  positioning: "Pakistan's rider-verified map and trip planner.",
  launchWindow: 'Summer 2026',
  url: 'https://wildnomad.vercel.app',
  domain: 'wildnomad.vercel.app',
  contactEmail: 'umarzeeshan709@gmail.com',
  instagram: '@thewildnomad.pk',
  instagramUrl: 'https://instagram.com/thewildnomad.pk',
  earlyRiderCap: 1000,
} as const;

export const CTA_LABEL =
  LAUNCH_STATE === 'prelaunch' ? 'Get early access' : 'Download on Google Play';

export const NAV_LINKS = [
  { href: '#map', label: 'Map' },
  { href: '#features', label: 'Features' },
  { href: '#routes', label: 'Routes' },
  { href: '#faq', label: 'FAQ' },
] as const;
