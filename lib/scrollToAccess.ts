import { LAUNCH_STATE, PLAY_STORE_URL } from '@/lib/config';

/** Scroll to the next early-access form below the viewport, or the first one. */
export function scrollToAccess() {
  if (typeof window === 'undefined') return;

  if (LAUNCH_STATE === 'live' && PLAY_STORE_URL) {
    window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
    return;
  }

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>('[data-access]'),
  );
  const next =
    nodes.find((el) => el.getBoundingClientRect().top > 120) ?? nodes[0];
  next?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
