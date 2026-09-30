import postsData from "@/content/blog.json";
import plannedData from "@/content/blog-planned.json";
import reviewDocs from "@/content/blog-review.json";
import type { BlogPost } from "@/lib/blog";

/**
 * Machine-readable blog index, served as CSV so the marketing team's Google
 * Sheet can pull it live with =IMPORTDATA().
 *
 * It merges two sources so the sheet shows the whole editorial calendar:
 *
 *   - blog.json:         posts that are actually written. Published once their
 *                        date arrives, Scheduled until then.
 *   - blog-planned.json: topics committed for a future date but not written
 *                        yet. These are Planned, and their titles are working
 *                        titles that can still change in the final copy.
 *
 * A planned entry is dropped the moment blog.json has a real post on the same
 * date, so the autopilot replaces a Planned row with a Scheduled one just by
 * publishing. Planned topics never reach the site itself: only this route reads
 * blog-planned.json.
 *
 * Two review columns sit after Link: Review Doc (the Google Doc the Latched team
 * reads and approves before a post goes live, keyed by slug in blog-review.json)
 * and Cover (the cover image URL, which the sheet renders with =IMAGE()).
 * Keep them LAST: the sheet's own columns start right after the spill.
 *
 * Optional `?from=YYYY-MM-DD` limits the feed to that date onward, and
 * `?order=desc` returns newest first. The sheet uses only `from`, in date order, so new
 * posts append at the bottom and rows never shift: the team types an Approval status into each
 * row, which must stay next to its post. Adding a post dated before existing ones would shift
 * them. Absent or malformed
 * values fall back to everything, ascending.
 *
 * Re-renders hourly so links appear on schedule without a redeploy.
 */
export const revalidate = 3600;

const BASE = "https://www.latchedbeginnings.com";

type PlannedPost = Pick<BlogPost, "date" | "topic" | "title" | "excerpt">;
type Row = PlannedPost & { status: "Published" | "Scheduled" | "Planned"; slug?: string };

/** Today's date (YYYY-MM-DD) in the practice's timezone, matching lib/blog.ts. */
function today(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
  }).format(new Date());
}

/** Collapse whitespace and escape for CSV. */
function cell(value: string): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return `"${clean.replace(/"/g, '""')}"`;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function GET(request: Request) {
  const now = today();
  const params = new URL(request.url).searchParams;
  const from = params.get("from");
  const cutoff = from && ISO_DATE.test(from) ? from : null;
  const desc = params.get("order") === "desc";

  const written = postsData as BlogPost[];
  const writtenDates = new Set(written.map((post) => post.date));

  const rows: Row[] = [
    ...written.map((post) => ({
      ...post,
      status: (post.date <= now ? "Published" : "Scheduled") as Row["status"],
    })),
    // A planned topic whose date now has a real post has been written; drop it.
    ...(plannedData as PlannedPost[])
      .filter((planned) => !writtenDates.has(planned.date))
      .map((planned) => ({ ...planned, status: "Planned" as const })),
  ]
    .filter((row) => !cutoff || row.date >= cutoff)
    .sort((a, b) =>
      desc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );

  const lines = [
    ["Date", "Status", "Category", "Title", "Description", "Link", "Review Doc", "Cover"]
      .map(cell)
      .join(","),
    ...rows.map((row) =>
      [
        row.date,
        cell(row.status),
        cell(row.topic),
        cell(row.title),
        cell(row.excerpt),
        cell(row.status === "Published" ? `${BASE}/blog/${row.slug}` : ""),
        cell((row.slug && (reviewDocs as Record<string, string>)[row.slug]) || ""),
        cell(row.slug ? `${BASE}/images/blog/${row.slug}.jpg` : ""),
      ].join(","),
    ),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="latched-blog-index.csv"',
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
