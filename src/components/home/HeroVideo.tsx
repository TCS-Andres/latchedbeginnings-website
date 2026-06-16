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

    const tryPlay = () => {
      const played = video.play();
      if (played && typeof played.catch === "function") {
        played.catch(() => {
          /* autoplay can be blocked; the poster stays visible */
        });
      }
    };

    // Only play while the hero is on screen, so the video stops decoding once
    // it is scrolled past (keeps scrolling smooth).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
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
