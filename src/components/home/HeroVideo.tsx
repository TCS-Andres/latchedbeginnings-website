"use client";

import { useEffect, useRef } from "react";

/**
 * Background hero video. Muted, looping, and plays inline. Guarantees autoplay
 * across browsers by setting muted on the element and calling play() after
 * mount, and honors prefers-reduced-motion by leaving the poster frame in place.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const played = video.play();
    if (played && typeof played.catch === "function") {
      played.catch(() => {
        /* autoplay can be blocked; the poster stays visible */
      });
    }
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      muted
      loop
      playsInline
      preload="auto"
      poster="/images/photos/hero-poster.jpg"
      aria-hidden="true"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
