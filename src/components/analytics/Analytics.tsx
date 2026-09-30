"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isTrackingAllowed } from "@/lib/analytics-config";

/*
  GA4 for Latched Beginnings.

  Two properties worth keeping:

  - It renders nothing at all unless NEXT_PUBLIC_GA4_ID is set, so a deployment
    without the variable makes zero tracker requests. That is how the site
    behaves today.
  - On an excluded route this returns null before any <Script> mounts, so gtag.js
    is never injected there, and the route-change effect returns early so a
    client-side navigation into an excluded route sends nothing either.

  The only value ever sent is the path of an allowed page. No form input, no
  symptom detail, nothing a parent typed.
*/

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export function Analytics() {
  const pathname = usePathname();
  const allowed = isTrackingAllowed(pathname);

  // The init script sends the first page view itself, so firing on mount would
  // double count. Skip the first run and report every route change after it.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!allowed) return;
    if (GA4_ID && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname, send_to: GA4_ID });
    }
  }, [pathname, allowed]);

  if (!GA4_ID || !allowed) return null;

  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
