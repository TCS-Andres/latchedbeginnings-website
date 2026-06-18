import { Heart, Clock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const points = [
  {
    icon: Heart,
    title: "Gentle and Effective Care",
    body: "Designed for your child's comfort and healing, with precise tissue release.",
  },
  {
    icon: Clock,
    title: "Quick Recovery",
    body: "Gentle procedures mean smoother recovery, so your little one bounces back sooner.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and Clean",
    body: "The laser promotes a sterile environment and reduces the risk of infection.",
  },
];

export function GoldStandard() {
  return (
    <Section tone="white">
      <Container size="wide">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <Photo
              src="/images/photos/laser.jpg"
              alt="A calm, alert baby"
              slot="Close-up of a calm, alert baby"
              aspect="aspect-[4/5]"
              shape="arch"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-3">LightScalpel CO2 Laser Technology</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              The Gold Standard in Tongue-Tie Treatment for Your Little One
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone">
              We use the LightScalpel CO2 laser for tongue, lip, and buccal-tie
              releases to provide the most gentle and effective care for your
              baby. Unlike traditional methods, this technology is designed with
              your child&apos;s comfort and healing in mind, with minimal
              discomfort, less bleeding, and precise results.
            </p>

            <ul className="mt-8 space-y-5">
              {points.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80}>
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                      <p.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/services/co2-laser-tongue-tie-release">
                Learn about the procedure
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
