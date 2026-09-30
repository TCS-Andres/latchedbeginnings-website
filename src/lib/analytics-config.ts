/**
 * Where analytics is allowed to run.
 *
 * Latched Beginnings is a healthcare practice, so tracking is opt-out by route
 * rather than blanket-on. Any page where a parent might describe a baby's
 * symptoms is excluded: nothing about that visit reaches a tracker, not even
 * the URL.
 *
 * This mirrors the same mechanism on the Austin Sleep site, so both practices
 * behave the same way and there is one pattern to reason about.
 */

/** A route is excluded when the path starts with any of these. */
export const EXCLUDED_PREFIXES = ["/resources/oral-tie-symptoms-checklist"] as const;

export function isTrackingAllowed(pathname: string | null): boolean {
  if (!pathname) return false;
  return !EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
