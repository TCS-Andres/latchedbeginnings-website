import type { Metadata } from "next";
import { Check, PlayCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pacifier Webinar with Dr. Kacie Culotta",
  description:
    "A free on-demand webinar with Dr. Kacie Culotta on pacifiers: when they help, when they cause challenges, and how to support healthy oral development in Austin, TX.",
  alternates: { canonical: "/resources/pacifier-webinar" },
};

const learnings = [
  {
    title: "When pacifiers genuinely help",
    body: "The soothing and self-regulation benefits a pacifier can offer, and the situations where reaching for one is a thoughtful, supportive choice.",
  },
  {
    title: "When they start to cause challenges",
    body: "Gentle signs that a pacifier may be getting in the way of feeding, sleep, or comfort, so you can respond early and with confidence.",
  },
  {
    title: "How to choose the right pacifier",
    body: "What to look for in shape, size, and material, and how to match a pacifier to your baby's stage rather than the marketing on the package.",
  },
  {
    title: "How to wean gently, on your timeline",
    body: "Calm, low-stress ways to ease away from the pacifier when the time feels right, with no rigid deadlines and no pressure.",
  },
  {
    title: "The link to oral development",
    body: "How sucking habits relate to the way the mouth, palate, and jaw grow, and what the current evidence does and does not say.",
  },
];

export default function PacifierWebinarPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Pacifier Webinar", url: "/resources/pacifier-webinar" },
        ]}
      />
      <PageHero
        eyebrow="Webinar Replay"
        title="Pacifiers Don't Have To Be A Headache"
        intro="In this free on-demand webinar, Dr. Kacie Culotta breaks down everything parents are rarely told about pacifiers, from the moments they truly help to the habits worth watching, all in plain, reassuring language."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Pacifier Webinar", href: "/resources/pacifier-webinar" },
        ]}
        cta={{
          label: "Watch the Webinar",
          href: "/resources/pacifier-webinar#watch",
        }}
      />

      <Section tone="white">
        <Container size="wide">
          <Reveal>
            <div
              id="watch"
              className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-ink"
            >
              {/* TODO: replace with the real webinar embed (YouTube/Vimeo/host) */}
              <Photo
                src="/images/photos/pacifier-webinar-cover.jpg"
                alt="Dr. Kacie Culotta presenting the pacifier webinar"
                slot="Webinar video embed"
                fillParent
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/30">
                <PlayCircle
                  className="h-20 w-20 text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </div>
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
            intro="Dr. Kacie keeps it warm, honest, and free of jargon, so you leave feeling informed and trusting your own instincts."
            align="center"
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            {learnings.map((item, i) => (
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
            <div className="mt-12 text-center">
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
