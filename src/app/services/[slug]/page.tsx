import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Faq } from "@/components/ui/Faq";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ScopeCards } from "@/components/sections/ScopeCards";
import { PingPong } from "@/components/sections/PingPong";
import { ChecklistCta } from "@/components/sections/ChecklistCta";
import { Testimonials } from "@/components/home/Testimonials";
import { Steps } from "@/components/home/Steps";
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

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.shortTitle, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={crumbs.map((c) => ({ name: c.name, url: c.href }))}
      />
      <FaqJsonLd items={service.faqs} />

      <ServiceHero service={service} crumbs={crumbs} />

      <ScopeCards
        eyebrow={service.scope.eyebrow}
        title={service.scope.title}
        intro={service.scope.intro}
        cards={service.scope.cards}
      />

      {service.sections.map((section, i) => (
        <PingPong
          key={section.heading}
          section={section}
          reverse={i % 2 === 1}
          tone={i % 2 === 0 ? "white" : "blush"}
        />
      ))}

      {/* FAQ (SEO enhancement, with FAQ schema) */}
      <Section tone="white">
        <Container size="wide">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">Questions, Answered</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <Faq items={service.faqs} />
        </Container>
      </Section>

      <Testimonials />
      <Steps />
      <ChecklistCta />
    </>
  );
}
