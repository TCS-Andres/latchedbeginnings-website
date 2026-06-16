import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { services } from "@/lib/content/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Gentle CO2 laser tongue-tie, lip-tie, and buccal-tie releases, 1-on-1 consultations, and post-op care for infants in Austin, TX. Whole-baby care from Latched Beginnings.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      <PageHero
        eyebrow="What We Do"
        title="Whole-baby care, from first visit to full healing"
        intro="Every family who walks through our door is met with patience and expertise. From evaluation to release to recovery, here is how Latched Beginnings supports your baby."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        cta={{ label: site.bookingLabel, href: site.bookingUrl }}
      />

      <Section tone="white">
        <Container size="wide">
          <div className="grid gap-7 md:grid-cols-3">
            {services.map((service, i) => (
              <Reveal as="article" key={service.slug} delay={i * 90}>
                <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(196,110,120,0.6)]">
                  <Photo
                    src={`/images/photos/service-${service.slug}.jpg`}
                    alt={service.shortTitle}
                    slot={service.photoSlot}
                    aspect="aspect-[4/3]"
                    shape="soft"
                    className="rounded-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="font-display text-xl text-ink">
                      {service.shortTitle}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
                      {service.excerpt}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-coral-deep transition-colors hover:text-coral"
                    >
                      Learn more
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
