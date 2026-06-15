import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, CalendarCheck, Heart } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { HeartMark } from "@/components/brand/HeartMark";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Appointments",
  description:
    "Contact Latched Beginnings in Austin, TX to schedule a gentle tongue-tie consultation with Dr. Kacie Culotta. Call, email, or book your 1-on-1 visit today.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <PageHero
        eyebrow="We&apos;re Here to Help"
        title="Let&apos;s talk about your baby"
        intro="Whether you have questions about feeding, a possible tongue-tie, or simply need a reassuring next step, we would love to hear from you. Reach out by phone, email, or schedule a visit whenever you&apos;re ready."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <Section tone="white">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
            {/* LEFT: contact details */}
            <Reveal>
              <div className="flex h-full flex-col">
                <p className="eyebrow mb-3">Reach Out</p>
                <h2 className="text-3xl leading-[1.12] sm:text-4xl">
                  Caring guidance, just a message away
                </h2>
                <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
                  Every consultation is one-on-one and never rushed. We take the time to
                  listen, answer your questions, and help you feel confident in the next
                  step for your little one.
                </p>

                <ul className="mt-8 space-y-4">
                  <li>
                    <a
                      href={site.phoneHref}
                      className="group flex items-start gap-4 rounded-[1.75rem] border border-blush-200 bg-white p-5 transition-colors hover:border-coral/40"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-stone">Call or text</span>
                        <span className="block text-lg font-semibold text-charcoal transition-colors group-hover:text-coral-deep">
                          {site.phone}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={site.emailHref}
                      className="group flex items-start gap-4 rounded-[1.75rem] border border-blush-200 bg-white p-5 transition-colors hover:border-coral/40"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-stone">Email us</span>
                        {/* TODO: confirm email + hours */}
                        <span className="block break-words text-lg font-semibold text-charcoal transition-colors group-hover:text-coral-deep">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={site.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-[1.75rem] border border-blush-200 bg-white p-5 transition-colors hover:border-coral/40"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-stone">Visit the office</span>
                        <span className="block text-lg font-semibold text-charcoal transition-colors group-hover:text-coral-deep">
                          {site.address.full}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <div className="flex items-start gap-4 rounded-[1.75rem] border border-blush-200 bg-white p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                        <Clock className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-stone">Office hours</span>
                        {/* TODO: confirm email + hours */}
                        <dl className="mt-2 space-y-1.5">
                          {site.hours.map((h) => (
                            <div
                              key={h.day}
                              className="flex items-baseline justify-between gap-4 text-charcoal"
                            >
                              <dt className="font-medium">{h.day}</dt>
                              <dd className="text-stone">
                                {h.close ? `${h.open} to ${h.close}` : h.open}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="mt-8">
                  <Button href={site.bookingUrl} size="lg">
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    {site.bookingLabel}
                  </Button>
                </div>

                <p className="mt-5 flex items-center gap-2 text-sm leading-relaxed text-stone">
                  <Heart className="h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                  Prefer to talk it through first? Call or email and a mom on our team will
                  walk you through what to expect.
                </p>
              </div>
            </Reveal>

            {/* RIGHT: map */}
            <Reveal delay={120}>
              <div className="h-full">
                <div className="h-full min-h-80 overflow-hidden rounded-[1.75rem] border border-blush-200">
                  <iframe
                    title="Map to Latched Beginnings"
                    src="https://www.google.com/maps?q=1701%20Simond%20Ave%20Suite%20107A%20Austin%20TX&output=embed"
                    className="h-full min-h-80 w-full rounded-[1.75rem] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="blush">
        <Container size="wide">
          <div className="relative isolate overflow-hidden">
            <HeartMark className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 text-coral/10" />
            <SectionHeading
              align="center"
              eyebrow="Greater Austin"
              title="Proudly serving Greater Austin"
              intro="Families come to us from across the Austin area because finding the right provider is worth the drive. If you&apos;re nearby, we would be honored to care for your baby."
            />

            <Reveal delay={80}>
              <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
                {site.serviceArea.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-blush-200 bg-white px-4 py-1.5 text-sm font-medium text-coral-deep"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-stone">
                Driving in from a little farther out? You&apos;re always welcome. Reach out and
                we&apos;ll help you plan a visit that works for your family.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
