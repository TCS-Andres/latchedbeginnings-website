import type { Metadata } from "next";
import Image from "next/image";
import {
  Heart,
  Users,
  Baby,
  Stethoscope,
  GraduationCap,
  Handshake,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Dr. Kacie Culotta",
  description:
    "Meet Dr. Kacie Culotta, the only Austin TX dentist who is also a certified lactation counselor, plus the all-mom Latched Beginnings team and our whole-baby philosophy.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description:
      "We meet every family where they are, with patience and zero judgment. Feeding struggles are tender, and you deserve to feel held through every step.",
  },
  {
    icon: Users,
    title: "Moms Helping Moms",
    description:
      "Our whole team has lived the late-night worries and the lactation appointments. We care for your family the way we would want ours cared for.",
  },
  {
    icon: Baby,
    title: "Whole-Baby Care",
    description:
      "We look at the full picture of feeding, comfort, and development, not just a single symptom, so your baby gets care that truly fits.",
  },
  {
    icon: Stethoscope,
    title: "Evidence-Based, Heart-Led",
    description:
      "Our recommendations follow current research and AAP guidance, delivered with the warmth and honesty every parent deserves.",
  },
  {
    icon: GraduationCap,
    title: "Empowerment Through Education",
    description:
      "We explain the why behind every option in plain language so you can make confident, informed choices for your baby.",
  },
  {
    icon: Handshake,
    title: "Collaboration Over Prescription",
    description:
      "Not every baby needs a release. We work alongside your lactation and pediatric team to find what is genuinely right for you.",
  },
  {
    icon: Sparkles,
    title: "Excellence in Care",
    description:
      "From our LightScalpel CO2 laser to thoughtful post-op support, we hold ourselves to a high standard at every visit.",
  },
];

const team = [
  {
    name: "Dr. Kacie M. Culotta",
    role: "Founder, Dentist & Lactation Counselor",
    src: "/images/dr-kacie-culotta.png",
    slot: "Dr. Kacie Culotta headshot",
    bio: "A mom of two and the heart behind Latched Beginnings. As the only dentist in Austin certified in both laser tongue-tie releases and lactation counseling, Dr. Kacie blends clinical skill with the empathy of someone who has walked this road herself.",
  },
  {
    name: "Sheila Falloon",
    role: "Care Team & Family Support",
    src: "/images/team/sheila-falloon.jpg",
    slot: "Sheila Falloon headshot",
    bio: "A mom on our all-mom team, Sheila helps families feel calm and cared for from the very first hello. She makes sure every parent leaves a visit feeling heard, supported, and a little more confident.",
  },
  {
    name: "Savannah Taylor",
    role: "Care Team & Family Support",
    src: "/images/team/savannah-taylor.jpg",
    slot: "Savannah Taylor headshot",
    bio: "Also a mom on our team, Savannah brings warmth and steady reassurance to each appointment. She loves helping families navigate their next steps with patience and genuine encouragement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      <PageHero
        eyebrow="Our Story"
        title="Moms helping moms, from the very first latch"
        intro="Latched Beginnings was born from lived experience and built on compassionate, evidence-based care. We are here to support your baby and you, with patience, honesty, and heart."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        cta={{ label: site.bookingLabel, href: site.bookingUrl }}
      />

      {/* Founder section */}
      <Section tone="white">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="mx-auto w-full max-w-md">
              <Image
                src="/images/dr-kacie-culotta.png"
                alt="Dr. Kacie Culotta, DDS"
                width={1706}
                height={2560}
                className="h-auto w-full rounded-[1.75rem] rounded-tr-[8rem] object-cover"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
            </Reveal>

            <Reveal delay={120}>
              <p className="eyebrow mb-3">Hey There, Momma</p>
              <h2 className="text-3xl leading-[1.12] sm:text-4xl">
                Why I Founded Latched Beginnings
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-stone">
                <p>
                  When my foster son needed a tongue-tie release, I learned just
                  how hard it can be to find a provider who truly listens. Later,
                  when my own daughter and I faced our share of breastfeeding
                  struggles, I felt that same ache as a mom: wanting answers,
                  wanting comfort, and not always knowing where to turn.
                </p>
                <p>
                  Those experiences changed everything. I saw a gap between
                  skilled dental care and compassionate feeding support, and I
                  knew families deserved both in one gentle place. So I founded
                  Latched Beginnings, where clinical expertise and a mother&apos;s
                  understanding live side by side.
                </p>
                <p>
                  Today I am the only dentist in Austin who holds both a laser
                  certification for tongue-tie releases and a lactation counselor
                  certification. That dual training lets me care for your baby and
                  your feeding journey together, never one without the other,
                  always grounded in what the evidence supports and what your
                  instincts are telling you.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-display text-2xl text-coral-deep">
                  Dr. Kacie Culotta
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-stone">
                  Founder of Latched Beginnings
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Credentials */}
      <Section tone="blush">
        <Container size="wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Credentials</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              Training You Can Trust
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
              More than ten years of experience, paired with specialized
              certifications in laser dentistry and lactation support, so your
              family is in steady, qualified hands.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {site.credentials.map((credential, i) => (
              <Reveal as="div" key={credential.abbr} delay={i * 70}>
                <div className="flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-6 text-center">
                  <span className="font-display text-2xl text-coral-deep">
                    {credential.abbr}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-stone">
                    {credential.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="white">
        <Container size="wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Our Values</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              What We Believe
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
              These principles guide every consultation, every release, and every
              conversation we have with the families we serve.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal as="article" key={value.title} delay={i * 70}>
                  <div className="flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush text-coral-deep">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* All-mom team */}
      <Section tone="blush">
        <Container size="wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Our All-Mom Team</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              Meet the Team
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
              Every member of our team is a mom. We bring both professional care
              and personal understanding to your baby&apos;s feeding journey.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {team.map((member, i) => (
              <Reveal as="article" key={member.name} delay={i * 90}>
                <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white">
                  <Photo
                    src={member.src}
                    alt={member.name}
                    slot={member.slot}
                    aspect="aspect-[4/5]"
                    shape="soft"
                    className="rounded-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-xl text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-coral-deep">
                      {member.role}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-stone">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center" delay={120}>
            <p className="text-base leading-relaxed text-stone">
              Have questions, or ready to take the next step? We would love to
              meet you and your little one.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href={site.bookingUrl} size="lg">
                {site.bookingLabel}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
