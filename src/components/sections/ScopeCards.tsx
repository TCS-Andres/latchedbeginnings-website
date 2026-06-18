import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { ScopeCard } from "@/lib/content/services";

const icons = [Heart, ShieldCheck, Sparkles, Users];

export function ScopeCards({
  eyebrow,
  title,
  intro,
  cards,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  cards: ScopeCard[];
}) {
  return (
    <Section tone="blush">
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="text-[2.15rem] leading-[1.12] sm:text-[2.5rem]">{title}</h2>
          {intro ? (
            <p className="mt-4 text-base leading-relaxed text-stone">{intro}</p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal as="article" key={card.title} delay={(i % 2) * 80}>
                <div className="flex h-full gap-5 rounded-[1.5rem] border border-blush-200 bg-white p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      {card.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
