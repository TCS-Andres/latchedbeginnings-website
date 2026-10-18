import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  HandHeart,
  Hand,
  MapPin,
  Baby,
  Ticket,
  Users,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/ui/Faq";
import { HeartMark } from "@/components/brand/HeartMark";
import {
  WorkshopCheckoutButton,
  WorkshopForm,
  type WorkshopFormMode,
} from "@/components/forms/WorkshopForm";
import {
  BreadcrumbJsonLd,
  EventJsonLd,
  FaqJsonLd,
} from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { isWorkshopPast, workshop } from "@/lib/content/workshop";

// Re-render hourly so the page flips to its "next session" state on its own
// once the workshop date passes.
export const revalidate = 3600;

const description = `A small-group, hands-on oral tie workshop for Austin doulas, IBCLCs, and midwives, led by Dr. Kacie Culotta. ${workshop.dateLabel}, ${workshop.timeLabel}. Limited to ${workshop.capacity} seats.`;

export const metadata: Metadata = {
  title: "Oral Tie Workshop for Birth Professionals in Austin",
  description,
  alternates: { canonical: "/workshop" },
  openGraph: {
    title: `${workshop.title} | ${workshop.dateLabel}`,
    description,
    url: "/workshop",
    images: [{ url: "/images/photos/provider-cohort.jpg" }],
  },
};

const audience = [
  {
    icon: HandHeart,
    title: "Doulas",
    body: "You are often the first to notice a feeding struggle at home. Learn what to look for and how to guide families toward the right next step.",
  },
  {
    icon: Baby,
    title: "IBCLCs & lactation professionals",
    body: "Sharpen your functional assessment, triage with confidence, and collaborate smoothly with release providers before and after a procedure.",
  },
  {
    icon: Users,
    title: "Midwives",
    body: "Spot early signs of tongue, lip, and buccal ties in the first days and weeks, and know when a family needs a referral for evaluation.",
  },
];

const learn = [
  "Recognize and triage early signs of tongue, lip, and buccal ties",
  "Support families before, during, and after a release",
  "Understand the basics of functional oral development",
  "Guide families compassionately through the emotional side of feeding struggles",
  "Identify when a family should be referred for evaluation",
  "Collaborate with release providers for whole-family care",
];

const breakouts = [
  {
    title: "Post-op wound care stretches",
    body: "Step-by-step guidance on aftercare so you can coach families with clarity and calm.",
  },
  {
    title: "Glove fitting and safety protocol",
    body: "Proper technique for hands-on oral assessment and aftercare support.",
  },
  {
    title: "Positioning for feeding and healing",
    body: "Practical positioning techniques that support feeding and recovery after a release.",
  },
];

const whyItMatters = [
  "The clarity to identify potential symptoms",
  "The confidence to triage and guide families",
  "The skills to support healing after a release",
  "The language to communicate effectively with providers",
];

const takeaways = [
  {
    icon: Check,
    title: "Confident identification",
    body: "Know what potential oral ties look like, and what they do not.",
  },
  {
    icon: Hand,
    title: "Skills you can use right away",
    body: "Hands-on techniques you can bring to your very next client.",
  },
  {
    icon: HandHeart,
    title: "Language for families",
    body: "Words that build trust and clarity when a family feels unsure.",
  },
  {
    icon: Baby,
    title: "The full oral tie journey",
    body: "A clear view of assessment, release, healing, and follow-up.",
  },
  {
    icon: Users,
    title: "A professional community",
    body: "Connections with fellow Austin birth professionals who share your values.",
  },
  {
    icon: Award,
    title: "Certificate of completion",
    body: "Recognition of your training to share with the families you serve.",
  },
];

const faqItems = [
  {
    question: "Who is this workshop designed for?",
    answer:
      "This workshop is built exclusively for birth professionals, including doulas, IBCLCs and other lactation professionals, and midwives. Postpartum and L&D nurses and other birth workers who support families through early feeding are welcome too.",
  },
  {
    question: "Do I need prior experience with oral ties?",
    answer:
      "No. Dr. Culotta starts with the foundations of functional oral development and builds from there, so newer and experienced birth professionals both leave with something practical.",
  },
  {
    question: "Why is the workshop limited to 8 people?",
    answer:
      "The hands-on breakout sessions only work in a small group. Keeping it to 8 seats means everyone gets time to practice, ask questions, and get personal feedback from Dr. Culotta.",
  },
  {
    question: "What happens if the workshop fills up?",
    answer:
      "Join the waitlist. If a seat opens, waitlisted professionals are contacted first, and if there is enough interest we will add a second session.",
  },
  {
    question: "How do I pay and confirm my seat?",
    answer: workshop.registrationUrl
      ? `Registration is $${workshop.price} per person, paid securely online through Stripe when you register. Seats are confirmed in the order registrations come in.`
      : `Registration is $${workshop.price} per person. Request your seat on this page and our team will send you a secure payment link. Your seat is confirmed once payment is received, in the order payments come in.`,
  },
  {
    question: "Where is the workshop held?",
    answer: `At the Latched Beginnings office, ${site.address.full}. You will receive arrival details by email before the workshop.`,
  },
];

const details = [
  { icon: CalendarDays, label: "Date", value: workshop.dateLabel },
  { icon: Clock, label: "Time", value: workshop.timeLabel },
  {
    icon: MapPin,
    label: "Location",
    value: `Latched Beginnings, ${site.address.full}`,
  },
  { icon: Ticket, label: "Registration", value: `$${workshop.price} per person` },
  {
    icon: Users,
    label: "Group size",
    value: `Limited to ${workshop.capacity} birth professionals`,
  },
];

function formMode(): WorkshopFormMode {
  if (isWorkshopPast()) return "next";
  if (workshop.status === "full") return "waitlist";
  return "reserve";
}

export default function WorkshopPage() {
  const mode = formMode();
  const past = mode === "next";
  const full = mode === "waitlist";
  const useCheckout = mode === "reserve" && Boolean(workshop.registrationUrl);

  const ctaLabel = past
    ? "Get Notified About the Next Workshop"
    : full
      ? "Join the Waitlist"
      : "Reserve Your Seat";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "For Providers", url: "/providers" },
          { name: "Birth Professionals Workshop", url: "/workshop" },
        ]}
      />
      {!past ? (
        <EventJsonLd
          name={workshop.title}
          description={description}
          path="/workshop"
          startDate={`${workshop.date}T${workshop.startTime}:00-06:00`}
          endDate={`${workshop.date}T${workshop.endTime}:00-06:00`}
          image="/images/photos/provider-cohort.jpg"
          price={workshop.price}
          soldOut={full}
        />
      ) : null}
      <FaqJsonLd items={faqItems} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-soft-hero">
        <HeartMark className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 text-coral/10" />
        <HeartMark className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 text-coral/10" />
        <Container size="wide">
          <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-stone"
              >
                <Link href="/" className="transition-colors hover:text-coral-deep">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-coral/60" aria-hidden="true" />
                <Link
                  href="/providers"
                  className="transition-colors hover:text-coral-deep"
                >
                  For Providers
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-coral/60" aria-hidden="true" />
                <span className="text-charcoal">Birth Professionals Workshop</span>
              </nav>

              <p className="eyebrow mb-3">
                {past
                  ? "For Birth Professionals"
                  : `For Birth Professionals · ${workshop.dateShort} in Austin`}
              </p>
              <h1 className="text-4xl leading-[1.1] sm:text-5xl">
                {workshop.title}
              </h1>
              <p className="mt-4 font-display text-xl italic text-coral-deep sm:text-2xl">
                Supporting families through oral tie care starts with you.
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
                A hands-on, small-group workshop led by Dr. Kacie Culotta for
                Austin doulas, IBCLCs, and midwives who want to confidently
                identify oral ties, guide families through a release, and
                support healing with compassionate, evidence-based care.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#register" size="lg">
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="#learn" size="lg" variant="outline">
                  What You&apos;ll Learn
                </Button>
              </div>

              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-coral-deep">
                <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
                {past
                  ? "This session has wrapped. More dates are coming."
                  : full
                    ? "All seats are taken. The waitlist is open."
                    : `Only ${workshop.capacity} seats. A waitlist opens once they fill.`}
              </p>
            </div>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white shadow-[0_30px_60px_-40px_rgba(196,110,120,0.7)]">
                <div className="relative aspect-[16/10] w-full bg-blush-200">
                  <Image
                    src="/images/photos/provider-cohort.jpg"
                    alt="Birth professionals gathered with Dr. Kacie Culotta at a past Latched Beginnings workshop"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
                <dl className="divide-y divide-blush-200 px-6 sm:px-8">
                  {details.map((d) => {
                    const Icon = d.icon;
                    return (
                      <div key={d.label} className="flex gap-4 py-4">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blush text-coral-deep">
                          <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                        </span>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
                            {d.label}
                          </dt>
                          <dd className="mt-0.5 text-base text-ink">{d.value}</dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Who This Workshop Is For"
            title="Built Exclusively for Birth Professionals"
            intro="This small-group training is tailored to your role in supporting families through postpartum feeding and recovery."
          />
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {audience.map((item, i) => {
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

      {/* What you'll learn */}
      <Section tone="blush" id="learn">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Education + Demonstration + Practice = Confidence"
                title="What You'll Learn"
                intro="Three hours of focused teaching from a dentist and lactation counselor who performs releases and supports families every week."
              />
              <ul className="mt-8 space-y-3">
                {learn.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 60}>
                    <div className="flex items-start gap-4 rounded-[1.25rem] border border-blush-200 bg-white px-5 py-4">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral text-white">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-base leading-relaxed text-charcoal">
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white p-8 sm:p-10">
                <HeartMark className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 text-coral/10" />
                <p className="eyebrow mb-3">Hands-On</p>
                <h3 className="font-display text-2xl text-ink">
                  Breakout Sessions Include
                </h3>
                <ol className="mt-7 space-y-6">
                  {breakouts.map((b, i) => (
                    <li key={b.title} className="flex gap-5">
                      <span className="font-display text-3xl leading-none text-coral">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-display text-lg text-ink">{b.title}</h4>
                        <p className="mt-1.5 text-base leading-relaxed text-stone">
                          {b.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 border-t border-blush-200 pt-6 text-sm leading-relaxed text-stone">
                  A workshop built on evidence-based care, compassion, and
                  collaboration.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why it matters */}
      <Section tone="white">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-blush-200">
                <Image
                  src="/images/photos/workshop-attendees.jpg"
                  alt="Dr. Kacie Culotta with two birth professionals outside the Latched Beginnings office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Why It Matters"
                title="You Are a Critical Part of the Postpartum Care Team"
              />
              <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
                Birth professionals are often the first to notice a feeding
                challenge, and the first people families trust when something
                feels off. But oral ties can be subtle, confusing, and easy to
                overlook. This workshop gives you:
              </p>
              <ul className="mt-6 space-y-3">
                {whyItMatters.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <HeartMark className="mt-1 h-4 w-4 shrink-0 text-coral" />
                    <span className="text-base leading-relaxed text-charcoal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-stone">
                Because families deserve informed, compassionate guidance, and
                you deserve the tools to offer it.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Instructor */}
      <Section tone="blush-soft">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-blush-200">
                <Image
                  src="/images/dr-kacie-portrait.jpg"
                  alt="Dr. Kacie Culotta, DMD, founder of Latched Beginnings"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 24rem, 35vw"
                />
              </div>
            </Reveal>
            <div>
              <p className="eyebrow mb-3">Your Instructor</p>
              <h2 className="text-[2.15rem] leading-[1.12] sm:text-[2.5rem]">
                Dr. Kacie Culotta, DMD, CLC
              </h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-coral-deep">
                Dentist · Lactation Counselor · Myofunctional Specialist · Mom of Two
              </p>
              <p className="mt-6 text-base leading-relaxed text-stone sm:text-lg">
                Dr. Culotta is the only dentist in Austin with both a laser
                certification for tongue-tie releases and a lactation counselor
                certification. She blends advanced training in infant oral ties
                with real-life motherhood and years of collaborative practice
                alongside Austin&apos;s birth professionals.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone sm:text-lg">
                She built Latched Beginnings because she was the mom who needed
                this care herself. In this workshop, she bridges science with
                heart, helping you feel confident, supported, and empowered in
                your role.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Takeaways */}
      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Leave Ready"
            title="What You'll Walk Away With"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {takeaways.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal as="article" key={item.title} delay={i * 60}>
                  <div className="flex h-full gap-4 rounded-[1.5rem] border border-blush-200 bg-white p-6">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blush text-coral-deep">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-base leading-relaxed text-stone">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Register */}
      <Section tone="blush" id="register" className="scroll-mt-24">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow mb-3">
                {past ? "Stay in the Loop" : full ? "Waitlist" : "Registration"}
              </p>
              <h2 className="text-[2.15rem] leading-[1.12] sm:text-[2.5rem]">
                {past
                  ? "This Workshop Has Wrapped"
                  : full
                    ? "This Session Is Full"
                    : "Reserve Your Seat"}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
                {past
                  ? "Thank you to every birth professional who joined us. Leave your details and you'll be the first to know when the next workshop is scheduled."
                  : full
                    ? "Every seat has been claimed. Join the waitlist and we'll reach out first if a seat opens up or when we add a second session."
                    : useCheckout
                      ? `Seats are limited to ${workshop.capacity} and are confirmed in the order registrations come in.`
                      : `Seats are limited to ${workshop.capacity}. Request yours below and our team will email you a secure payment link. Your seat is confirmed once payment is received.`}
              </p>

              {!past ? (
                <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                  {details.slice(0, 2).concat(details[3]).map((d) => {
                    const Icon = d.icon;
                    return (
                      <div
                        key={d.label}
                        className="flex items-center gap-3 rounded-[1.25rem] border border-blush-200 bg-white px-4 py-3"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-coral-deep" aria-hidden="true" />
                        <div>
                          <dt className="sr-only">{d.label}</dt>
                          <dd className="text-sm font-medium text-ink">{d.value}</dd>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-blush-200 bg-white px-4 py-3">
                    <MapPin className="h-5 w-5 shrink-0 text-coral-deep" aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Location</dt>
                      <dd className="text-sm font-medium text-ink">
                        <a
                          href={site.address.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-coral-deep"
                        >
                          {site.address.street}, Austin
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              ) : null}
            </div>

            <Reveal delay={80}>
              {useCheckout ? (
                <div className="rounded-[1.75rem] border border-blush-200 bg-white p-8 text-center sm:p-10">
                  <p className="font-display text-5xl text-ink">${workshop.price}</p>
                  <p className="mt-2 text-sm text-stone">per person</p>
                  <div className="mt-8">
                    <WorkshopCheckoutButton href={workshop.registrationUrl} />
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-stone">
                    Secure checkout by Stripe. Questions? Call{" "}
                    <a
                      href={site.phoneHref}
                      className="font-semibold text-coral-deep hover:text-coral"
                    >
                      {site.phone}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <WorkshopForm mode={mode} />
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <Container size="default">
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title="Workshop Details, Answered"
          />
          <div className="mt-12">
            <Faq items={faqItems} />
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="blush-soft">
        <Container size="default">
          <Reveal className="mx-auto max-w-2xl text-center">
            <HeartMark className="mx-auto h-12 w-12 text-coral" />
            <h2 className="mt-6 text-[2.15rem] leading-[1.12] sm:text-[2.5rem]">
              Ready to Support Families With Confidence and Compassion?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
              Join us for an afternoon of education, hands-on practice, and
              community. Seating is very limited, and registration closes once
              the workshop is full.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="#register" size="lg">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
