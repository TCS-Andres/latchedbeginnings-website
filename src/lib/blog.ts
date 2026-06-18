import postsData from "@/content/blog.json";

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  topic: string;
  excerpt: string;
  readingTime: number;
  content: string;
};

const posts = postsData as BlogPost[];

/** Today's date (YYYY-MM-DD) in the practice's timezone (Austin / Central). */
function today(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
  }).format(new Date());
}

/**
 * A post is published once its scheduled date has arrived. Future-dated posts
 * stay hidden (drafts) everywhere: the index, the sitemap, related posts, and
 * direct URLs (404). They auto-publish on their date when the page revalidates.
 */
function isPublished(p: BlogPost): boolean {
  return p.date <= today();
}

export function getAllPosts(): BlogPost[] {
  return posts.filter(isPublished);
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug && isPublished(p));
}

export function getTopics(): string[] {
  return [...new Set(getAllPosts().map((p) => p.topic))].sort();
}

/** Related posts: same topic first, then most recent, excluding the current post. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const all = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameTopic = all.filter(
    (p) => p.slug !== slug && p.topic === current.topic,
  );
  const others = all.filter(
    (p) => p.slug !== slug && p.topic !== current.topic,
  );
  return [...sameTopic, ...others].slice(0, limit);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
