import type { Metadata } from "next";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { LeadMagnetForm } from "@/components/forms/LeadMagnetForm";
import { newbornFeedingGuide as guide } from "@/lib/content/newbornFeedingGuide";
import { testimonials } from "@/lib/content/testimonials";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Newborn Feeding Guide: The First 6 Weeks",
  description: guide.description,
  alternates: { canonical: guide.path },
  // Kept out of search until Dr. Culotta approves the guide and it launches.
  robots: guide.launched ? undefined : { index: false, follow: false },
};

const review = testimonials[0];

export default function NewbornFeedingGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: guide.shortTitle, url: guide.path },
        ]}
      />
      <PageHero
        eyebrow="Free Guide"
        title="Your Newborn Feeding Guide: The First 6 Weeks"
        intro="Feeding rhythms, latch basics, and what is normal in the early weeks, in calm and practical language from Dr. Kacie Culotta, a dentist and lactation counselor."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: guide.shortTitle, href: guide.path },
        ]}
        cta={{ label: "Get the Free Guide", href: "#get-the-guide" }}
      />

      <Section tone="white">
        <Container size="wide">
          <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What’s inside"
                  title="Everything You Want to Know in the First Six Weeks"
                  intro="Written for real life with a newborn: short sections, clear answers, and a printable log to keep on the fridge."
                />
                <ul className="mt-8 space-y-3">
                  {guide.inside.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-base leading-relaxed text-stone">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mx-auto w-full max-w-[340px]">
                <div className="relative rounded-[2.2rem] bg-ink p-3 shadow-[0_40px_70px_-35px_rgba(45,45,45,0.6)]">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src={guide.coverImage}
                      alt="The Latched Beginnings Newborn Feeding Guide cover shown on a tablet"
                      width={696}
                      height={900}
                      className="h-auto w-full"
                      sizes="(max-width: 1024px) 70vw, 340px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="blush" id="get-the-guide">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Free download"
            title="Get Your Free Guide"
            intro="Tell us where to send it, and you can download it right away."
          />
          <div className="mx-auto mt-10 max-w-xl">
            <LeadMagnetForm
              source="newborn-feeding-guide"
              resourceName="Newborn Feeding Guide"
              downloadUrl={guide.pdfUrl}
              buttonLabel="Send Me the Guide"
              askBabyStage
              trackLead
            />
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="wide">
          <div className="grid items-center gap-12 md:grid-cols-[2fr_3fr] lg:gap-16">
            <Reveal>
              <Photo
                src="/images/dr-kacie-portrait.jpg"
                alt="Dr. Kacie Culotta, DMD, founder of Latched Beginnings"
                aspect="aspect-[4/5]"
                shape="arch"
                sizes="(max-width: 768px) 90vw, 380px"
              />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <SectionHeading
                  eyebrow="From Dr. Culotta"
                  title="A Dentist and Lactation Counselor in Your Corner"
                  intro="Dr. Kacie Culotta, DMD, founded Latched Beginnings to give Austin families gentle, function first feeding care. As a dentist and certified lactation counselor, she helps parents understand what is normal, what is worth a closer look, and every option in between."
                />
                <figure className="mt-8 rounded-[1.75rem] border border-blush-200 bg-cream p-6">
                  <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-stone">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-charcoal">
                    {review.name}, {review.detail}
                  </figcaption>
                </figure>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href="#get-the-guide" size="lg">
                    Get the Free Guide
                  </Button>
                  <Button href={site.bookingUrl} size="lg" variant="outline">
                    {site.bookingLabel}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
