import type { Metadata } from "next";
import { FileText, PlayCircle, BookOpen, Users, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Resources for Parents",
  description:
    "Free tongue-tie and feeding resources from Latched Beginnings in Austin, TX: the oral tie symptoms checklist, the pacifier webinar, our parent blog, and provider referrals.",
  alternates: { canonical: "/resources" },
};

const resources = [
  {
    icon: FileText,
    title: "Oral Tie Symptoms Checklist",
    description:
      "A gentle, printable guide to the feeding and comfort signs we look for in babies. Use it to organize what you are noticing before your first visit. It is a starting point, never a diagnosis.",
    href: "/resources/oral-tie-symptoms-checklist",
    cta: "Get the checklist",
  },
  {
    icon: PlayCircle,
    title: "Pacifier Webinar",
    description:
      "Dr. Kacie walks through pacifier choices, timing, and what they can tell you about your baby’s oral function. Watch on your schedule, pause to take notes, and revisit whenever a new question comes up.",
    href: "/resources/pacifier-webinar",
    cta: "Watch the webinar",
  },
  {
    icon: BookOpen,
    title: "The Blog",
    description:
      "Evidence-based, heart-led articles on tongue-tie, lip-tie, feeding, and aftercare. Written to inform and reassure you, so you can trust your instincts and make the call that feels right for your family.",
    href: "/blog",
    cta: "Read the blog",
  },
  {
    icon: Users,
    title: "Patient Referrals",
    description:
      "For pediatricians, lactation consultants, and bodyworkers: a clear path to refer a family our way. We believe in collaboration over prescription and keep you in the loop through every step of care.",
    href: "/patient-referrals",
    cta: "Refer a patient",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />
      <PageHero
        eyebrow="For Parents"
        title="Resources to Help You Feel Confident"
        intro="Clear, compassionate guidance you can return to anytime. Explore our checklist, watch the pacifier webinar, read the blog, and find the support that meets you where you are."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
        ]}
        cta={{ label: site.bookingLabel, href: site.bookingUrl }}
      />

      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            eyebrow="Explore"
            title="Tools and Education for Your Journey"
            intro="Every resource here is rooted in the same belief: informed, supported parents make the best decisions for their babies. Take what helps and leave the rest."
            align="center"
          />

          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {resources.map((resource, i) => {
              const Icon = resource.icon;
              return (
                <Reveal as="article" key={resource.href} delay={i * 80}>
                  <div className="group flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-8 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(196,110,120,0.6)]">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-coral-deep">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl text-ink">
                      {resource.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
                      {resource.description}
                    </p>
                    <div className="mt-7">
                      <Button href={resource.href} variant="outline" size="md">
                        {resource.cta}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
