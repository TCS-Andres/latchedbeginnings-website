"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Item = { topic: string; slug: string; card: React.ReactNode };

/**
 * Interactive category filter for the blog index. The cards are rendered on the
 * server (so Photo's build-time file check stays server-side) and passed in as
 * nodes; this client component only manages which category is active.
 */
export function BlogFilter({
  topics,
  items,
}: {
  topics: string[];
  items: Item[];
}) {
  const [active, setActive] = useState<string>("All");

  const countFor = (c: string) =>
    c === "All" ? items.length : items.filter((it) => it.topic === c).length;

  const sorted = [...topics].sort((a, b) => countFor(b) - countFor(a));
  const categories = ["All", ...sorted];
  const shown =
    active === "All" ? items : items.filter((it) => it.topic === active);

  return (
    <div>
      <ul
        className="flex flex-wrap justify-center gap-2.5"
        aria-label="Filter articles by category"
      >
        {categories.map((c) => {
          const isActive = active === c;
          return (
            <li key={c}>
              <button
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "border-coral bg-coral text-white"
                    : "border-blush-200 bg-blush text-coral-deep hover:border-coral/50",
                )}
              >
                {c}{" "}
                <span
                  className={cn(
                    "text-xs",
                    isActive ? "text-white/75" : "text-coral-deep/55",
                  )}
                >
                  {countFor(c)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((it, i) => (
          <Reveal key={it.slug} delay={(i % 3) * 70}>
            {it.card}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
