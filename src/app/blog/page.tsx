import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getTopics } from "@/lib/blog";

// Re-render hourly so scheduled (future-dated) posts auto-publish on their date.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog: Tongue-Tie & Infant Feeding Education",
  description:
    "Gentle, evidence-based articles on tongue-tie, lip-tie, infant feeding, aftercare, and oral development from Dr. Kacie Culotta, DMD at Latched Beginnings in Austin, TX.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const topics = getTopics();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      <PageHero
        eyebrow="Parent Education"
        title="The Latched Beginnings Blog"
        intro="Trustworthy, gentle guidance on tongue-tie, lip-tie, feeding, and your baby's development. Written to inform and reassure, never to alarm."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <Section tone="white">
        <Container size="wide">
          <BlogFilter
            topics={topics}
            items={posts.map((post) => ({
              topic: post.topic,
              slug: post.slug,
              card: <BlogCard post={post} />,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
