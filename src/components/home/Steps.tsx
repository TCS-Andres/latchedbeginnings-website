import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Trust Your Instinct",
    body: "Reach out to schedule an evaluation. Your intuition about your baby matters, and we are here to listen.",
  },
  {
    n: "02",
    title: "Get a Personalized Plan",
    body: "We assess your baby's needs and recommend the best path forward, with clear answers and no pressure.",
  },
  {
    n: "03",
    title: "Start the Journey",
    body: "Whether it is a release, lactation support, or simple reassurance, we guide you toward happy, healthy feeding.",
  },
];

export function Steps() {
  return (
    <Section tone="white">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Your Path to Relief</p>
            <h2 className="text-[2.15rem] leading-[1.12] sm:text-[2.5rem] md:text-5xl">
              Simple Steps to Thrive
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone">
              Getting help should feel hopeful, not overwhelming. Here is how we
              walk alongside you from the first hello.
            </p>
            <div className="mt-8 inline-flex items-baseline gap-3 rounded-2xl bg-blush px-6 py-4">
              <span className="font-display text-4xl text-coral-deep">15+</span>
              <span className="text-sm font-medium text-stone">
                Years helping
                <br /> infants and families
              </span>
            </div>
            <div className="mt-8">
              <Button href={site.bookingUrl} size="lg">
                {site.bookingLabel}
              </Button>
            </div>
          </div>

          <ol className="space-y-5">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 90}>
                <div className="flex gap-6 rounded-[1.5rem] border border-blush-200 bg-cream p-7">
                  <span className="font-display text-3xl text-coral/60">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{s.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-stone">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
