"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Branded preloader. Rendered once in the root layout, so it appears on a hard
 * page load and stays dismissed across client-side navigations (which are
 * instant). Shows the logo over a soft blush wash with a slim progress bar,
 * then fades out when the page is ready (with a small minimum display time so
 * it does not flash). Falls back to hidden when JavaScript is unavailable.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Decide when to dismiss.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const minVisible = reduce ? 200 : 1200;
    const start = performance.now();

    const dismiss = () => {
      const wait = Math.max(0, minVisible - (performance.now() - start));
      window.setTimeout(() => setHidden(true), wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }
    // Safety: never trap the user behind the overlay.
    const safety = window.setTimeout(() => setHidden(true), 3500);

    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(safety);
    };
  }, []);

  // Lock scroll while visible; unmount after the fade completes.
  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    const t = window.setTimeout(() => setRemoved(true), 650);
    return () => window.clearTimeout(t);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      role="status"
      aria-label={`${site.name}, loading`}
      className={cn("preloader", hidden && "preloader--hidden")}
    >
      <div className="preloader__inner">
        <Image
          src="/images/brand/logo.png"
          alt={site.name}
          width={1563}
          height={781}
          priority
          className="preloader__logo"
        />
        <div className="preloader__track" role="presentation" />
      </div>
    </div>
  );
}
