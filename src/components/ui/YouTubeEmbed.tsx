"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

/**
 * Lightweight YouTube embed. Shows the video thumbnail with a play button and
 * only loads the (heavy) YouTube player after the user clicks, so it does not
 * slow the page. Privacy-friendly (youtube-nocookie).
 */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_30px_60px_-35px_rgba(45,45,45,0.6)]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            }}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors duration-300 group-hover:bg-ink/45">
            <PlayCircle
              className="h-20 w-20 text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </span>
        </button>
      )}
    </div>
  );
}
