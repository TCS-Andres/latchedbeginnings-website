import type { Metadata } from "next";
import Link from "next/link";
import { PlayCircle, Clock, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { webinars } from "@/lib/content/webinars";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Webinars with Dr. Kacie Culotta",
  description:
    "Watch Dr. Kacie Culotta's free on-demand webinars on tongue-tie, oral ties, pacifiers, and infant feeding, from Latched Beginnings in Austin, TX.",
  alternates: { canonical: "/resources/webinars" },
};

export default function WebinarsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Webinars", url: "/resources/webinars" },
        ]}
      />
      <PageHero
        eyebrow="Webinars"
        title="Free On-Demand Webinars"
        intro="Watch Dr. Kacie Culotta's free webinars whenever it suits you. Warm, honest, and jargon-free guidance on the questions parents ask most, ready to pause and revisit anytime."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Webinars", href: "/resources/webinars" },
        ]}
        cta={{ label: site.bookingLabel, href: site.bookingUrl }}
      />

      <Section tone="white">
        <Container size="wide">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map((w, i) => (
              <Reveal as="article" key={w.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/resources/webinars/${w.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(196,110,120,0.6)]"
                >
                  <div className="relative aspect-video overflow-hidden bg-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${w.youtubeId}/maxresdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors duration-300 group-hover:bg-ink/40">
                      <PlayCircle
                        className="h-14 w-14 text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-white">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {w.duration}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow mb-2">Webinar Replay</p>
                    <h2 className="font-display text-xl leading-snug text-ink">
                      {w.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
                      {w.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-coral-deep">
                      Watch the webinar
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
