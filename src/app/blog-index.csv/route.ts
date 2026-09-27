import postsData from "@/content/blog.json";
import type { BlogPost } from "@/lib/blog";

/**
 * Machine-readable blog index, served as CSV so a Google Sheet can pull it live
 * with =IMPORTDATA(). Unlike the site's other blog surfaces, this lists every
 * post, including future-dated ones that have not published yet. A scheduled
 * post shows its date, title, and description with an empty Link cell; the link
 * fills in on its publish date.
 *
 * Re-renders hourly so links appear on schedule without a redeploy.
 */
export const revalidate = 3600;

const BASE = "https://www.latchedbeginnings.com";

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

export function GET() {
  const now = today();
  const posts = (postsData as BlogPost[])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  const rows = [
    ["Date", "Title", "Description", "Link"].map(cell).join(","),
    ...posts.map((post) =>
      [
        post.date,
        cell(post.title),
        cell(post.excerpt),
        cell(post.date <= now ? `${BASE}/blog/${post.slug}` : ""),
      ].join(","),
    ),
  ];

  return new Response(`${rows.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="latched-blog-index.csv"',
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
