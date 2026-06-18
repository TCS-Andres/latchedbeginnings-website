import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content/services";

const photoSlots: Record<string, string> = {
  "co2-laser-tongue-tie-release": "Newborn during gentle laser care",
  consultations: "Hands evaluating a baby during a consultation",
  "post-op-care": "Mother nursing a content baby",
};

export function ServicesGrid() {
  return (
    <Section tone="white">
      <Container size="wide">
        <div>
          <p className="eyebrow mb-3">What We Do</p>
          <h2 className="max-w-2xl text-[2.15rem] leading-[1.12] sm:text-[2.5rem] md:text-5xl">
            Gentle, Whole-Baby Care From First Visit to Full Healing
          </h2>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="article" key={service.slug} delay={i * 90}>
              <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(196,110,120,0.6)]">
                <Photo
                  src={`/images/photos/service-${service.slug}.jpg`}
                  alt={service.shortTitle}
                  slot={photoSlots[service.slug]}
                  aspect="aspect-[4/3]"
                  shape="soft"
                  className="rounded-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl text-ink">
                    {service.shortTitle}
                  </h3>
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

        <div className="mt-12 flex justify-center">
          <Button href="/services" variant="outline" size="lg">
            View all services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
