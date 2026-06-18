import { HeartHandshake, Sparkles, Sprout } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

const props = [
  {
    icon: HeartHandshake,
    title: "Compassionate Expertise",
    body: "Dr. Kacie Culotta and her all-mom team listen to you, understand your concerns, and guide you with the expert care your baby needs.",
  },
  {
    icon: Sparkles,
    title: "Personalized Solutions",
    body: "Individualized care plans tailored to your baby's unique feeding and wellness needs, never one-size-fits-all.",
  },
  {
    icon: Sprout,
    title: "Long-Term Wellness",
    body: "We focus on more than feeding. We set your child on a path to lasting health and healthy development.",
  },
];

export function ValueProps() {
  return (
    <Section tone="white">
      <Container size="wide">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Why Moms Choose Us</p>
            <h2 className="text-[2.15rem] leading-[1.12] sm:text-[2.5rem] lg:text-5xl">
              Empowering Care, Lasting Health
            </h2>
            <ul className="mt-10 space-y-8">
              {props.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 90}>
                  <div className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                      <p.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-stone">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="grid grid-cols-2 gap-5">
            <Photo
              src="/images/photos/value-1.jpg"
              alt="A mother smiling with her baby"
              slot="Mom holding baby, smiling"
              aspect="aspect-[3/4]"
              sizes="(max-width: 1024px) 45vw, 25vw"
            />
            <Photo
              src="/images/photos/value-2.jpg"
              alt="A parent cradling a newborn"
              slot="Parent cradling newborn"
              aspect="aspect-[3/4]"
              sizes="(max-width: 1024px) 45vw, 25vw"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
