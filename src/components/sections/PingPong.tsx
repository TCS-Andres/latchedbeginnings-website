import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { ServiceSection } from "@/lib/content/services";

/**
 * Alternating content row: heading + copy on one side, image on the other.
 * `reverse` flips the image to the right. Tone alternates white/blush per row.
 */
export function PingPong({
  section,
  reverse = false,
  tone = "white",
}: {
  section: ServiceSection;
  reverse?: boolean;
  tone?: "white" | "blush";
}) {
  return (
    <Section tone={tone}>
      <Container size="wide">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal className={cn(reverse && "lg:order-2")}>
            <Photo
              src={section.image}
              alt={section.heading}
              slot={section.imageSlot}
              aspect="aspect-[4/5]"
              shape={section.imageShape ?? "rounded"}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          <div className={cn(reverse && "lg:order-1")}>
            <p className="eyebrow mb-3">{section.eyebrow}</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl">
              {section.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
              {section.body}
            </p>

            {section.bullets ? (
              <ul className="mt-8 space-y-5">
                {section.bullets.map((b, i) => (
                  <Reveal as="li" key={b.title} delay={i * 70}>
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-ink">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-stone">
                          {b.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
