import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getTopics } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog: Tongue-Tie & Infant Feeding Education",
  description:
    "Gentle, evidence-based articles on tongue-tie, lip-tie, infant feeding, aftercare, and oral development from Dr. Kacie Culotta, DDS at Latched Beginnings in Austin, TX.",
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
          <ul className="flex flex-wrap justify-center gap-2.5">
            {topics.map((t) => (
              <li
                key={t}
                className="rounded-full border border-blush-200 bg-blush px-4 py-1.5 text-sm font-medium text-coral-deep"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 80}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
