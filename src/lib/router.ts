/**
 * Custom router utility to push state and trigger listeners.
 */
export function navigateTo(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new CustomEvent('popstate'));
  window.scrollTo({ top: 0 });
}
