"use client";

import { useMemo, useSyncExternalStore } from "react";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

// The URL does not change while a form is on screen, so there is nothing to
// subscribe to. Reads happen on the client only; the server sees no tags.
const subscribe = () => () => {};

/** UTM tags from the URL, or the ones saved earlier in this tab, as JSON. */
function readUtm(storageKey: string): string {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value.slice(0, 100);
  }
  if (Object.keys(fromUrl).length) {
    const json = JSON.stringify(fromUrl);
    try {
      sessionStorage.setItem(storageKey, json);
    } catch {}
    return json;
  }
  try {
    return sessionStorage.getItem(storageKey) ?? "{}";
  } catch {
    return "{}";
  }
}

/**
 * Read UTM tags from the landing URL so every form submission records where the
 * visitor came from, even without analytics. Kept for the tab session so the
 * tags survive an in-page scroll or reload.
 */
export function useUtm(storageKey: string): Utm {
  const json = useSyncExternalStore(
    subscribe,
    () => readUtm(storageKey),
    () => "{}",
  );
  return useMemo(() => {
    try {
      return JSON.parse(json) as Utm;
    } catch {
      return {};
    }
  }, [json]);
}
