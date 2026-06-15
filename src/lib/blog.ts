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

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getTopics(): string[] {
  return [...new Set(posts.map((p) => p.topic))].sort();
}

/** Related posts: same topic first, then most recent, excluding the current post. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return posts.slice(0, limit);
  const sameTopic = posts.filter(
    (p) => p.slug !== slug && p.topic === current.topic,
  );
  const others = posts.filter(
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
