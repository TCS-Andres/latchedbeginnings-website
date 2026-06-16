import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        datePublished={post.date}
      />

      <PageHero
        eyebrow={post.topic}
        title={post.title}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.topic, href: "/blog" },
        ]}
      />

      <Section tone="white">
        <Container size="narrow">
          <div className="flex items-center justify-center gap-4 text-sm text-stone">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          </div>

          <article
            className="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-charcoal prose-li:text-charcoal prose-strong:text-ink prose-a:text-coral-deep"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author + CTA */}
          <div className="mt-12 rounded-[1.5rem] bg-blush p-8 text-center">
            <p className="eyebrow mb-2">Written with care by</p>
            <p className="font-display text-2xl text-ink">{site.founder}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Dr. Kacie Culotta is the only dentist in Austin with both a laser
              certification for tongue-tie releases and a lactation counselor
              certification. If something in this article resonates, we are here
              to help.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={site.bookingUrl} size="lg">
                {site.bookingLabel}
              </Button>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-coral-deep transition-colors hover:text-coral"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all articles
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="blush" spacing="tight">
          <Container size="wide">
            <h2 className="text-center font-display text-3xl text-ink">
              Keep Reading
            </h2>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
