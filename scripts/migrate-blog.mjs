/**
 * Convert the extracted WordPress export (/tmp/lb_blog_posts.json) into a clean
 * blog data module for the rebuilt site. Run with: node scripts/migrate-blog.mjs
 * - strips Gutenberg block comments
 * - removes em dashes (brand rule) by converting to commas
 * - derives a topic, excerpt, and reading time
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "/tmp/lb_blog_posts.json";
const OUT = path.join(process.cwd(), "src/content/blog.json");

const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#8216;/g, "’")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&hellip;/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanContent(html) {
  return (
    html
      // remove Gutenberg block comments
      .replace(/<!--\s*\/?wp:[^>]*-->/g, "")
      // remove em dashes (brand rule): convert to comma + space, tidy spacing
      .replace(/\s*—\s*/g, ", ")
      // collapse leftover blank lines
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

function topicFor(title) {
  const t = title.toLowerCase();
  if (t.includes("aftercare") || t.includes("post-frenectomy") || t.includes("post op") || t.includes("after a") || t.includes("healing") || t.includes("recovery"))
    return "Aftercare & Recovery";
  if (t.includes("lip tie")) return "Lip Tie";
  if (t.includes("tongue tie") || t.includes("tongue-tie")) return "Tongue Tie";
  if (t.includes("buccal")) return "Buccal Tie";
  if (t.includes("frenectomy")) return "Frenectomy";
  if (t.includes("sleep")) return "Sleep";
  if (t.includes("speech") || t.includes("development") || t.includes("dental"))
    return "Development";
  if (t.includes("tylenol") || t.includes("dosage")) return "Parent Tips";
  if (
    t.includes("feed") ||
    t.includes("breastfeed") ||
    t.includes("bottle") ||
    t.includes("reflux") ||
    t.includes("colic") ||
    t.includes("gas") ||
    t.includes("latch") ||
    t.includes("pacifier") ||
    t.includes("solid")
  )
    return "Feeding";
  return "Parent Education";
}

function readingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

const posts = raw
  .map((p) => {
    const content = cleanContent(p.content);
    const plain = stripTags(content);
    let excerpt = plain.slice(0, 175);
    if (plain.length > 175) excerpt = excerpt.replace(/\s+\S*$/, "") + "...";
    const title = p.title
      .replace(/&amp;/g, "&")
      .replace(/&#8217;/g, "’");
    return {
      title,
      slug: p.slug,
      date: p.date ? p.date.slice(0, 10) : "",
      topic: topicFor(title),
      excerpt,
      readingTime: readingTime(plain),
      content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(posts, null, 1));
console.log(`Wrote ${posts.length} posts to ${OUT}`);
console.log("Topics:", [...new Set(posts.map((p) => p.topic))].join(", "));
