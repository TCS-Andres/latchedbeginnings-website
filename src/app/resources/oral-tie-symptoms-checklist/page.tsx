import type { Metadata } from "next";
import Image from "next/image";
import {
  Check,
  Download,
  ClipboardCheck,
  Heart,
  CalendarCheck,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Oral Tie Symptoms Checklist (Free Download)",
  description:
    "A free, downloadable checklist to help Austin, TX parents spot tongue, lip, and buccal tie signs in their baby and themselves, plus what to do next.",
  alternates: { canonical: "/resources/oral-tie-symptoms-checklist" },
};

const checklistUrl = "/downloads/oral-tie-symptoms-checklist.pdf";

const infantSigns = [
  "Clicking or smacking sounds while nursing",
  "A shallow latch that slips off the breast",
  "Slow or stalled weight gain",
  "Frequent reflux, spit-up, gas, or fussiness",
  "Falling asleep at the breast before finishing",
  "Long feeds that leave baby still hungry",
];

const parentSigns = [
  "Nipple pain or soreness that lingers between feeds",
  "Creased, flattened, or lipstick-shaped nipples after nursing",
  "A dip in milk supply or feeling like baby never empties the breast",
];

const nextSteps = [
  "Note which signs feel familiar so you can describe them clearly",
  "Trust your instincts: you know your baby’s feeding better than anyone",
  "Bring the checklist to a consultation for a gentle, whole-baby evaluation",
];

const howToUse = [
  {
    icon: ClipboardCheck,
    title: "Print or open it",
    body: "Download the checklist and keep it nearby for the next few feeds. There is no rush and nothing to diagnose on your own.",
  },
  {
    icon: Heart,
    title: "Check what you notice",
    body: "Mark the infant and parent signs that match your experience. Even a few checked boxes are worth talking through.",
  },
  {
    icon: CalendarCheck,
    title: "Bring it to us",
    body: "Share your notes at a consultation. Not every baby needs a release, and we will help you understand what your signs may mean.",
  },
];

export default function OralTieSymptomsChecklistPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          {
            name: "Oral Tie Symptoms Checklist",
            url: "/resources/oral-tie-symptoms-checklist",
          },
        ]}
      />
      <PageHero
        eyebrow="Free Download"
        title="The Oral Tie Symptoms Checklist"
        intro="Feeding struggles can leave you second-guessing yourself. This free checklist helps you spot the most common signs of tongue, lip, and buccal ties, in your baby and in you, so you can walk into a consultation feeling informed and heard."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          {
            name: "Oral Tie Symptoms Checklist",
            href: "/resources/oral-tie-symptoms-checklist",
          },
        ]}
        cta={{ label: "Download the Checklist", href: checklistUrl }}
      />

      <Section tone="white">
        <Container size="wide">
          <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What’s inside"
                  title="The Signs We Look For, in Plain Language"
                  intro="No heavy jargon and no fear. Just the everyday clues that something might be making feeding harder than it needs to be."
                />

                <div className="mt-10 space-y-9">
                  <div>
                    <h3 className="font-display text-xl text-ink">
                      Infant Feeding Signs
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {infantSigns.map((sign) => (
                        <li key={sign} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-sm leading-relaxed text-stone">
                            {sign}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display text-xl text-ink">
                      Signs for Parents
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {parentSigns.map((sign) => (
                        <li key={sign} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-sm leading-relaxed text-stone">
                            {sign}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display text-xl text-ink">
                      What to Do Next
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {nextSteps.map((step) => (
                        <li key={step} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-sm leading-relaxed text-stone">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              {/* Checklist shown on a tablet mockup */}
              <div className="mx-auto w-full max-w-[340px] lg:sticky lg:top-28">
                <div className="relative rounded-[2.2rem] bg-ink p-3 shadow-[0_40px_70px_-35px_rgba(45,45,45,0.6)]">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src="/images/resources/oral-tie-checklist.jpg"
                      alt="The Latched Beginnings oral tie symptoms checklist shown on a tablet"
                      width={696}
                      height={900}
                      className="h-auto w-full"
                      sizes="(max-width: 1024px) 70vw, 340px"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="blush">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="How to use it"
            title="Three Gentle Steps From Worry to Clarity"
            intro="You do not have to have the answers before you reach out. The checklist is simply a starting point for a conversation."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {howToUse.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal as="article" key={step.title} delay={i * 90}>
                  <div className="flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* TODO: add real checklist PDF at /public/downloads/ and confirm whether email capture is wanted */}
          <Reveal delay={180}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={checklistUrl} size="lg">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download the Checklist
              </Button>
              <Button href={site.bookingUrl} size="lg" variant="outline">
                {site.bookingLabel}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
