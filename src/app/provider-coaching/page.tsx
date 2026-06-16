import type { Metadata } from "next";
import {
  GraduationCap,
  Stethoscope,
  Users,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/ui/Faq";
import { HeartMark } from "@/components/brand/HeartMark";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Provider Coaching & Mentorship",
  description:
    "Personalized coaching for dentists, lactation pros, and providers who want to grow their expertise in oral ties, CO2 laser technique, airway health, and functional feeding in Austin, TX.",
  alternates: { canonical: "/provider-coaching" },
};

const includes = [
  {
    icon: GraduationCap,
    title: "Hands-on laser training",
    body: "Learn to evaluate and treat tongue, lip, and buccal ties with the LightScalpel CO2 laser, the gold standard, alongside a provider who performs these releases every week.",
  },
  {
    icon: Stethoscope,
    title: "Functional feeding & airway support",
    body: "Connect the dots between oral function, feeding, and airway health so your assessments and treatment plans account for the whole baby, not a single structure.",
  },
  {
    icon: Users,
    title: "Personalized to your goals",
    body: "Coaching is shaped around your goals, experience level, and the patients you already serve, whether you are just starting out or refining an established protocol.",
  },
  {
    icon: Sparkles,
    title: "Collaborative, ongoing mentorship",
    body: "This is a relationship, not a one-time course. You will have a trusted colleague to talk through complex cases and questions as your confidence grows.",
  },
];

const audience = [
  {
    title: "Dentists",
    body: "Dentists who want to add or sharpen CO2 laser tongue-tie, lip-tie, and buccal-tie releases with sound, evidence-based technique and patient selection.",
  },
  {
    title: "Lactation professionals",
    body: "IBCLCs, CLCs, and feeding specialists who want to deepen their understanding of oral function and collaborate more effectively with releasing providers.",
  },
  {
    title: "Allied health providers",
    body: "Bodyworkers, SLPs, OTs, and other allied health providers looking to expand their scope and recognize when an oral-tie evaluation is warranted.",
  },
];

const faqItems = [
  {
    question: "What does the coaching format look like?",
    answer:
      "Coaching is one-on-one and tailored to you. Most providers start with a conversation about their goals and current experience, then move into a blend of case review, hands-on observation, and technique guidance with the LightScalpel CO2 laser. Pacing and focus are set around your schedule and what you most want to grow.",
  },
  {
    question: "Are there prerequisites or a certain experience level required?",
    answer:
      "No specific certification is required to inquire. Coaching is shaped around where you are now, from clinicians who are brand new to oral-tie care to experienced providers refining their protocols. We will discuss your background during your first conversation and build a plan that meets you there.",
  },
  {
    question: "How do I get started?",
    answer:
      "Reach out to share a little about your practice and what you hope to gain. Dr. Kacie Culotta will follow up to talk through your goals and outline a coaching plan that fits. There is no pressure and no obligation, just an honest conversation about whether this is the right next step for you.",
  },
];

export default function ProviderCoachingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "For Providers", url: "/provider-coaching" },
          { name: "Provider Coaching", url: "/provider-coaching" },
        ]}
      />
      <FaqJsonLd items={faqItems} />

      <PageHero
        eyebrow="For Providers"
        title="Grow Your Expertise in Oral-Tie Care"
        intro="Latched Beginnings offers personalized coaching and mentorship for dentists, lactation professionals, and allied health providers who want to advance their skills in oral ties, CO2 laser technique, airway health, and functional feeding."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "For Providers", href: "/provider-coaching" },
          { name: "Provider Coaching", href: "/provider-coaching" },
        ]}
        cta={{ label: "Inquire About Coaching", href: site.bookingUrl }}
      />

      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="The Coaching Experience"
            title="What Coaching Includes"
            intro="Every coaching relationship is built around the same foundation: rigorous, evidence-based technique paired with the heart-led, whole-baby approach that guides our practice."
          />
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {includes.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal as="article" key={item.title} delay={i * 90}>
                  <div className="flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush text-coral-deep">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-stone">
                      {item.body}
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
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Who It's For"
                title="Coaching for Providers Ready to Expand Their Scope"
                intro="If you care for infants and families and want to feel more confident in oral-tie evaluation and treatment, you are exactly who this coaching is for."
              />
              <ul className="mt-8 space-y-4">
                {audience.map((item, i) => (
                  <Reveal as="li" key={item.title} delay={i * 90}>
                    <div className="flex gap-4 rounded-[1.5rem] border border-blush-200 bg-white p-6">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral text-white">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-base leading-relaxed text-stone">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white p-8 sm:p-10">
                <HeartMark className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 text-coral/10" />
                <p className="eyebrow mb-3">Learn From</p>
                <h3 className="font-display text-2xl text-ink">
                  Dr. Kacie Culotta, DMD
                </h3>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  Dr. Kacie is the only dentist in Austin with both a laser
                  certification for tongue-tie releases and a lactation
                  counselor certification, with more than 10 years of clinical
                  experience. As a Breathe Institute Ambassador and an AADSM
                  Qualified Dentist, she brings a rare, integrated view of oral
                  function, feeding, and airway health to every coaching
                  relationship.
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  Her approach is conservative and honest. Not every baby needs
                  a release, and great care begins with sound judgment. That is
                  the same standard she helps every provider she mentors hold to.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="default">
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title="Coaching, Answered"
            intro="A few common questions about how coaching works. If yours is not here, reach out and we will talk it through."
          />
          <div className="mt-12">
            <Faq items={faqItems} />
          </div>
        </Container>
      </Section>

      <Section tone="blush-soft">
        <Container size="default">
          <Reveal className="mx-auto max-w-2xl text-center">
            <HeartMark className="mx-auto h-12 w-12 text-coral" />
            <h2 className="mt-6 text-3xl leading-[1.12] sm:text-4xl">
              Ready to Grow Your Expertise?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
              Let&apos;s start with a conversation about your goals and how
              coaching can support the providers and families you serve.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href={site.bookingUrl} size="lg">
                Inquire About Coaching
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
