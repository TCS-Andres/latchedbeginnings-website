import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Download,
  Droplets,
  HandHeart,
  HeartHandshake,
  ListChecks,
  Mail,
  Moon,
  PhoneCall,
  Printer,
  Scale,
  Smile,
  Star,
  Stethoscope,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { HeartMark } from "@/components/brand/HeartMark";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
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

const highlights = ["Free", "11 pages", "8 short chapters", "Printable feeding log"];

const questions = [
  {
    icon: Clock,
    question: "Is it normal that my baby wants to feed every hour?",
    answer: "What frequent feeds and cluster feeding look like in the early weeks.",
  },
  {
    icon: Droplets,
    question: "How do I know my baby is getting enough?",
    answer: "A simple day by day diaper guide and what weight checks tell you.",
  },
  {
    icon: HandHeart,
    question: "Should nursing still hurt?",
    answer: "What a deep, comfortable latch looks like, and small fixes that help.",
  },
  {
    icon: Moon,
    question: "Do I wake my sleepy newborn to feed?",
    answer: "Gentle guidance on rhythms, night feeds, and following your baby's cues.",
  },
];

const chapters = [
  {
    icon: CalendarDays,
    title: "What to expect, week by week",
    body: "From the first days to six weeks, so the changes feel familiar instead of worrying.",
  },
  {
    icon: Clock,
    title: "How often and how much",
    body: "Hunger cues, a typical day, and the signs of a satisfying feed.",
  },
  {
    icon: Scale,
    title: "Is my baby getting enough?",
    body: "Diapers by day, weight checks, and when to call your pediatrician.",
  },
  {
    icon: Baby,
    title: "Latch basics",
    body: "Setting up, what a deep latch looks like, and what a shallow latch may feel like.",
  },
  {
    icon: ListChecks,
    title: "What's normal, what's worth a check",
    body: "A side by side page that separates everyday newborn moments from signs to talk through.",
  },
  {
    icon: HeartHandshake,
    title: "Could it be a tongue tie?",
    body: "A calm, conservative explanation. Not every tie needs a release.",
  },
  {
    icon: Stethoscope,
    title: "When to reach out",
    body: "Who to call and when, from your pediatrician to a lactation professional.",
  },
  {
    icon: Printer,
    title: "Printable feeding and diaper log",
    body: "Two weeks of tracking on one page, made for the fridge and pediatrician visits.",
  },
];

const previews = [
  { src: "/images/resources/guide/page-3.jpg", caption: "Week by week" },
  { src: "/images/resources/guide/page-5.jpg", caption: "Is baby getting enough?" },
  { src: "/images/resources/guide/page-6.jpg", caption: "Latch basics" },
  { src: "/images/resources/guide/page-10.jpg", caption: "Printable log" },
];

const realLife = [
  "Read it in about 10 minutes, then keep it handy",
  "Short sections you can skim during a 3 a.m. feed",
  "Print the log and bring it to pediatrician visits",
  "Share it with a partner or grandparent who is helping",
];

const nextSteps = [
  {
    icon: Download,
    title: "Download instantly",
    body: "Your guide is ready the moment you sign up.",
  },
  {
    icon: Mail,
    title: "A few gentle tips",
    body: "Short emails from Dr. Culotta over the next two weeks. Unsubscribe anytime.",
  },
  {
    icon: PhoneCall,
    title: "Help when you want it",
    body: "If feeding feels harder than it should, book a consultation whenever you're ready.",
  },
];

const faqItems = [
  {
    question: "Is the Newborn Feeding Guide really free?",
    answer:
      "Yes. Share your first name and email and you can download the guide right away. There is no cost and no obligation.",
  },
  {
    question: "Who is the guide for?",
    answer:
      "Expecting parents and families in the first six weeks with a new baby, especially those who are breastfeeding or planning to. It is also helpful for partners and grandparents who are supporting a new family.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No. The guide is general education written by Dr. Kacie Culotta, a dentist and lactation counselor. It does not replace care from your baby's pediatrician. If you are ever worried about your baby, call your pediatrician.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "You get the download immediately, plus a few short emails with feeding tips over the next two weeks. You can unsubscribe at any time, and we never share your email.",
  },
  {
    question: "Do I need to live in Austin to use it?",
    answer:
      "Not at all. Any family can download the guide. If you are in or near Austin and would like a feeding evaluation, our team is happy to help.",
  },
];

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
      <FaqJsonLd items={faqItems} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-soft-hero">
        <HeartMark className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 text-coral/10" />
        <HeartMark className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 text-coral/10" />
        <Container size="wide">
          <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-stone"
              >
                <Link href="/" className="transition-colors hover:text-coral-deep">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-coral/60" aria-hidden="true" />
                <Link href="/resources" className="transition-colors hover:text-coral-deep">
                  Resources
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-coral/60" aria-hidden="true" />
                <span className="text-charcoal">{guide.shortTitle}</span>
              </nav>

              <p className="eyebrow mb-3">Free guide for new parents</p>
              <h1 className="text-4xl leading-[1.1] sm:text-5xl">
                Newborn Feeding Guide: The First 6 Weeks
              </h1>
              <p className="mt-4 font-display text-xl italic text-coral-deep sm:text-2xl">
                Calm, clear answers for the early weeks.
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
                Feeding rhythms, latch basics, what is normal, and when to reach
                out for support, from Dr. Kacie Culotta, a dentist and lactation
                counselor who helps Austin families with feeding every day.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#get-the-guide" size="lg">
                  Get the Free Guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="#inside" size="lg" variant="outline">
                  See What&apos;s Inside
                </Button>
              </div>

              <ul className="mt-7 flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium text-coral-deep"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={100}>
              {/* Guide cover on a tablet, with two inside pages fanned behind it */}
              <div className="relative mx-auto w-full max-w-[420px] py-6">
                <div className="absolute left-0 top-10 w-[46%] -rotate-[8deg] overflow-hidden rounded-xl border border-blush-200 bg-white shadow-[0_24px_50px_-30px_rgba(45,45,45,0.55)]">
                  <Image
                    src="/images/resources/guide/page-3.jpg"
                    alt=""
                    width={620}
                    height={802}
                    className="h-auto w-full"
                    sizes="200px"
                  />
                </div>
                <div className="absolute right-0 top-14 w-[46%] rotate-[8deg] overflow-hidden rounded-xl border border-blush-200 bg-white shadow-[0_24px_50px_-30px_rgba(45,45,45,0.55)]">
                  <Image
                    src="/images/resources/guide/page-6.jpg"
                    alt=""
                    width={620}
                    height={802}
                    className="h-auto w-full"
                    sizes="200px"
                  />
                </div>
                <div className="relative mx-auto w-[66%] rounded-[2rem] bg-ink p-2.5 shadow-[0_40px_70px_-35px_rgba(45,45,45,0.6)]">
                  <div className="overflow-hidden rounded-[1.4rem] bg-white">
                    <Image
                      src={guide.coverImage}
                      alt="The Latched Beginnings Newborn Feeding Guide cover shown on a tablet"
                      width={696}
                      height={900}
                      className="h-auto w-full"
                      sizes="(max-width: 1024px) 60vw, 280px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Sound familiar */}
      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Sound familiar?"
            title="The Questions Every New Parent Asks"
            intro="If you have wondered about any of these, you are in very good company. The guide answers each one in plain, reassuring language."
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {questions.map((q, i) => {
              const Icon = q.icon;
              return (
                <Reveal as="article" key={q.question} delay={i * 80}>
                  <div className="flex h-full gap-5 rounded-[1.75rem] border border-blush-200 bg-cream p-6 sm:p-7">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug text-ink">
                        &ldquo;{q.question}&rdquo;
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone">{q.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* What's inside */}
      <Section tone="blush" id="inside" className="scroll-mt-24">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="What’s inside"
            title="Eight Short Chapters, Everything You Need"
            intro="Each chapter fits on a page or two, so you can find what you need quickly, even with a baby in your arms."
          />
          <ol className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {chapters.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal as="li" key={c.title} delay={(i % 4) * 70}>
                  <div className="flex h-full flex-col rounded-[1.5rem] border border-blush-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-coral-deep">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-2xl text-coral/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg leading-snug text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">{c.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <div className="mx-auto mt-16 max-w-6xl">
            <p className="text-center font-display text-xl italic text-coral-deep">
              A peek inside
            </p>
            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {previews.map((p, i) => (
                <Reveal key={p.src} delay={i * 80}>
                  <figure>
                  <div className="overflow-hidden rounded-2xl border border-blush-200 bg-white shadow-[0_24px_50px_-34px_rgba(196,110,120,0.7)] transition-transform duration-500 hover:-translate-y-1">
                    <Image
                      src={p.src}
                      alt={`${p.caption} page from the Newborn Feeding Guide`}
                      width={620}
                      height={802}
                      className="h-auto w-full"
                      sizes="(max-width: 1024px) 45vw, 260px"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm font-medium text-charcoal">
                    {p.caption}
                  </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button href="#get-the-guide" size="lg">
              Get the Free Guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Made for real life */}
      <Section tone="white">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Photo
                src="/images/resources/guide/support.jpg"
                alt="A new mother smiling down at her newborn at home"
                aspect="aspect-[4/3]"
                shape="rounded"
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <SectionHeading
                  eyebrow="Made for real life"
                  title="Written for the Days That Blur Together"
                  intro="The newborn weeks are tender and tiring. The guide is designed to give you clarity in minutes, not homework."
                />
                <ul className="mt-8 space-y-3">
                  {realLife.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-200 text-coral-deep">
                        <Smile className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-base leading-relaxed text-stone">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Signup */}
      <Section tone="blush-soft" id="get-the-guide" className="scroll-mt-24">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Free download"
                title="Get Your Free Guide"
                intro="Tell us where to send it, and you can download it right away."
              />
              <ol className="mt-8 space-y-6">
                {nextSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <Reveal as="li" key={step.title} delay={i * 80}>
                      <div className="flex gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-coral-deep shadow-sm">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-display text-lg text-ink">{step.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-stone">{step.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
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

      {/* About Dr. Culotta */}
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

      {/* FAQ */}
      <Section tone="blush">
        <Container size="narrow">
          <SectionHeading align="center" eyebrow="Questions" title="About the Guide" />
          <div className="mt-10">
            <Faq items={faqItems} />
          </div>
        </Container>
      </Section>
    </>
  );
}
