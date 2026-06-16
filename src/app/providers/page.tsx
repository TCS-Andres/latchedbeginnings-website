import type { Metadata } from "next";
import { FileText, GraduationCap, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Providers",
  description:
    "Resources for healthcare providers in Austin, TX. Refer a patient for gentle, conservative oral tie care or grow your skills with provider coaching from Latched Beginnings.",
  alternates: { canonical: "/providers" },
};

const cards = [
  {
    icon: FileText,
    title: "Patient Referrals",
    description:
      "Have a family who may benefit from an oral tie evaluation? Refer your patients for gentle, conservative care that always begins with a thorough assessment. We collaborate closely with pediatricians, lactation consultants, bodyworkers, and dental colleagues, and we share clear post-visit notes so you stay part of every baby's care team.",
    href: "/patient-referrals",
    cta: "Refer a Patient",
  },
  {
    icon: GraduationCap,
    title: "Provider Coaching",
    description:
      "Ready to deepen your expertise in oral ties and the LightScalpel CO2 laser? Dr. Kacie offers hands-on coaching grounded in evidence and led with heart, from functional assessment through release technique and post-op care. Build the confidence to support more families with skill and compassion.",
    href: "/provider-coaching",
    cta: "Explore Coaching",
  },
];

export default function ProvidersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "For Providers", url: "/providers" },
        ]}
      />
      <PageHero
        eyebrow="For Providers"
        title="Partner with Latched Beginnings"
        intro="Great infant care happens in collaboration. Whether you are referring a family or sharpening your own clinical skills, we partner with providers across Austin to elevate the care every baby receives, with honesty, evidence, and compassion at the center."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "For Providers", href: "/providers" },
        ]}
        cta={{ label: site.bookingLabel, href: site.bookingUrl }}
      />

      <Section tone="white">
        <Container size="wide">
          <div className="grid gap-7 md:grid-cols-2">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal as="article" key={card.href} delay={i * 90}>
                  <div className="flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-8 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(196,110,120,0.6)] sm:p-10">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blush text-coral-deep">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h2 className="mt-6 font-display text-2xl text-ink">
                      {card.title}
                    </h2>
                    <p className="mt-4 flex-1 text-base leading-relaxed text-stone">
                      {card.description}
                    </p>
                    <div className="mt-7">
                      <Button href={card.href} variant="outline">
                        {card.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
