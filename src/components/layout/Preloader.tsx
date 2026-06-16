"use client";

import { useEffect, useState } from "react";
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
        <svg
          className="preloader__mark"
          viewBox="0 0 100 122"
          fill="none"
          aria-hidden="true"
        >
          <g className="preloader__beat">
            <path
              className="preloader__heart"
              pathLength={1}
              d="M48 106 C 26 86, 6 68, 6 46 C 6 33, 16 25, 28 25 C 39 25, 45 33, 48 42 C 51 33, 58 25, 69 25 C 81 25, 91 33, 91 46 C 91 68, 70 86, 48 106"
            />
            <circle className="preloader__head" cx="44" cy="14" r="11" />
            <circle className="preloader__baby" cx="63" cy="64" r="16" />
          </g>
          <path
            className="preloader__ecg"
            pathLength={1}
            d="M10 114 H39 l3.5 -9 l5 18 l4 -11 H90"
          />
        </svg>
        <div className="preloader__word">
          <div className="preloader__latched">Latched</div>
          <div className="preloader__beginnings">Beginnings</div>
        </div>
      </div>
    </div>
  );
}
