import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { services, getService } from "@/lib/content/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | ${site.name}`,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.shortTitle, url: `/services/${service.slug}` },
        ]}
      />
      <FaqJsonLd items={service.faqs} />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        intro={service.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.shortTitle, href: `/services/${service.slug}` },
        ]}
        cta={{ label: site.bookingLabel, href: site.bookingUrl }}
      />

      {/* Highlights with photo */}
      <Section tone="white">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Photo
                src={`/images/photos/service-${service.slug}.jpg`}
                alt={service.shortTitle}
                slot={service.photoSlot}
                aspect="aspect-[4/5]"
                shape="arch"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
            <div>
              <p className="eyebrow mb-3">What sets this apart</p>
              <h2 className="text-3xl leading-[1.12] sm:text-4xl">
                Care designed around your baby
              </h2>
              <ul className="mt-8 space-y-6">
                {service.highlights.map((h, i) => (
                  <Reveal as="li" key={h.title} delay={i * 80}>
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-ink">
                          {h.title}
                        </h3>
                        <p className="mt-1 text-base leading-relaxed text-stone">
                          {h.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="blush">
        <Container size="wide">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">Questions, Answered</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <Faq items={service.faqs} />
          <div className="mt-10 flex justify-center">
            <Button href={site.bookingUrl} size="lg">
              {site.bookingLabel}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
