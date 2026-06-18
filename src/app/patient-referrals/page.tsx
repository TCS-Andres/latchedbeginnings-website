import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Heart, Stethoscope, Users, Download, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Referrals for Providers",
  description:
    "Refer your patients to Latched Beginnings for gentle, conservative, evidence-based tongue-tie and feeding care in Austin, TX. Dual-certified dentist and lactation counselor.",
  alternates: { canonical: "/patient-referrals" },
};

const reasons = [
  {
    icon: ShieldCheck,
    title: "Conservative, evidence-based evaluation",
    body: "Not every baby needs a release. We evaluate function first and align our recommendations with AAP guidance, so your patients only move forward when it is truly the right call for their feeding goals.",
  },
  {
    icon: Heart,
    title: "Dual-certified dentist and lactation counselor",
    body: "Dr. Kacie Culotta, DMD is the only dentist in Austin with both a laser certification for tongue-tie releases and a lactation counselor certification, so feeding and function are assessed together.",
  },
  {
    icon: Stethoscope,
    title: "LightScalpel CO2 laser, the gold standard",
    body: "Releases are performed with a LightScalpel CO2 laser for precise, gentle treatment, minimal bleeding, and a comfortable experience for the babies and families you send our way.",
  },
  {
    icon: Users,
    title: "Thorough aftercare and clear communication",
    body: "Families leave with hands-on post-op guidance and ongoing support, and you receive timely updates so your care plan and ours stay in step from the first visit through full healing.",
  },
];

const steps = [
  {
    title: "Download and complete the referral form",
    body: "Share your clinical observations and the family's feeding concerns so our team can prepare for a focused, efficient first visit.",
  },
  {
    title: "Send it our way",
    body: "Submit the completed form to our team, or simply give the family our details and encourage them to mention your name when they reach out.",
  },
  {
    title: "We take it from here",
    body: "We schedule the evaluation, walk the family through every option, and keep you informed at each step so you stay part of the baby's care.",
  },
];

export default function PatientReferralsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "For Providers", url: "/providers" },
          { name: "Patient Referrals", url: "/patient-referrals" },
        ]}
      />
      <PageHero
        eyebrow="For Birth &amp; Feeding Professionals"
        title="Refer With Confidence"
        intro="When you send a family to Latched Beginnings, you are partnering with a team that shares your commitment to the best possible outcome for every baby. We evaluate honestly, treat gently, and keep you in the loop the whole way through."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "For Providers", href: "/providers" },
          { name: "Patient Referrals", href: "/patient-referrals" },
        ]}
        cta={{ label: "Download Referral Form", href: "/downloads/client-referral-form.pdf" }}
      />

      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="A Trusted Partner"
            title="Why Providers Refer to Us"
            intro="IBCLCs, pediatricians, chiropractors, midwives, doulas, and SLPs send families our way because they know exactly what those families will find: careful evaluation, gentle care, and steady communication."
          />
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <Reveal as="article" key={reason.title} delay={i * 90}>
                  <div className="flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush text-coral-deep">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">
                      {reason.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="blush">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Simple &amp; Streamlined"
                title="How to Refer"
                intro="We have kept the process light so it fits into your day. Three quick steps connect your patient with the care they need."
                className="max-w-none"
              />
              <Reveal delay={80}>
                <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-blush-200">
                  <Image
                    src="/images/photos/provider-collaboration.jpg"
                    alt="Birth and feeding professionals collaborating on a baby's care"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </Reveal>
            </div>
            <ol className="space-y-5">
              {steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 90}>
                  <div className="flex gap-5 rounded-[1.75rem] border border-blush-200 bg-white p-7">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral font-display text-lg text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/downloads/client-referral-form.pdf" size="lg">
              <Download className="h-5 w-5" aria-hidden="true" />
              Download Referral Form
            </Button>
            <Button href={site.phoneHref} variant="outline" size="lg" external>
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {site.phone}
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cream" spacing="tight">
        <Container size="wide">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-blush-200">
                <Image
                  src="/images/photos/collaborative-care.jpg"
                  alt="A baby in gentle, collaborative care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow mb-3">Collaboration Over Prescription</p>
              <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
                You Stay Part of the Story
              </h2>
              <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
                We believe the best outcomes come from teams that talk to each
                other. After every evaluation and release, we keep referring
                providers informed with clear notes and next steps, so the
                family&apos;s feeding journey stays connected across everyone who
                cares for them. Your relationship with the family is something we
                protect, never replace.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
