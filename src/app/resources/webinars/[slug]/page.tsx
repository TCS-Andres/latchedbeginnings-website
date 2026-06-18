import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { webinars, getWebinar } from "@/lib/content/webinars";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return webinars.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) return {};
  return {
    title: w.title,
    description: w.excerpt,
    alternates: { canonical: `/resources/webinars/${w.slug}` },
    openGraph: {
      type: "video.other",
      title: `${w.title} | ${site.name}`,
      description: w.excerpt,
      url: `${site.url}/resources/webinars/${w.slug}`,
    },
  };
}

export default async function WebinarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Webinars", url: "/resources/webinars" },
          { name: w.title, url: `/resources/webinars/${w.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Webinar Replay"
        title={w.title}
        intro={w.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Webinars", href: "/resources/webinars" },
          { name: w.title, href: `/resources/webinars/${w.slug}` },
        ]}
      />

      <Section tone="white">
        <Container size="wide">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <YouTubeEmbed id={w.youtubeId} title={w.title} />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-stone">
              Press play whenever it suits you. The replay is yours to watch at
              your own pace, pause, and return to as questions come up.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="blush">
        <Container size="wide">
          <SectionHeading
            eyebrow="Inside the Replay"
            title="What You'll Learn"
            intro="Dr. Culotta keeps it warm, honest, and free of jargon, so you leave feeling informed and trusting your own instincts."
            align="center"
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            {w.learnings.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80}>
                <div className="flex h-full gap-4 rounded-[1.75rem] border border-blush-200 bg-white p-6">
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/resources/webinars" variant="outline" size="lg">
                See all webinars
              </Button>
              <Button href={site.bookingUrl} variant="primary" size="lg">
                Have questions? Schedule a consultation
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
