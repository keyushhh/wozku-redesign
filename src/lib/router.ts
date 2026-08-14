import { play } from 'cuelume';

/**
 * Custom router utility to push state and trigger listeners.
 */
export function navigateTo(path: string) {
  if (window.location.pathname !== path) {
    play('page', { volume: 0.35 });
  }
  window.history.pushState(null, '', path);
  window.dispatchEvent(new CustomEvent('popstate'));
  window.scrollTo({ top: 0 });
}

