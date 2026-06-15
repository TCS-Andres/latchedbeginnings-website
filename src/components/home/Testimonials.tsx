import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials, reviewSummary } from "@/lib/content/testimonials";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < count ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-blush-300"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <Section tone="blush">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3">Happy Moms &amp; Babies</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              Stories of Change
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone">
              Real relief, real support, and gentle solutions. Here is what
              families say after their time with Latched Beginnings.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-[0_18px_40px_-30px_rgba(45,45,45,0.5)]">
            <span className="font-display text-4xl text-ink">
              {reviewSummary.rating.toFixed(1)}
            </span>
            <div>
              <Stars count={5} />
              <p className="mt-1 text-xs text-stone">
                {reviewSummary.count}+ {reviewSummary.source} reviews
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="article" key={i} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-[1.75rem] bg-white p-7 shadow-[0_18px_44px_-32px_rgba(45,45,45,0.5)]">
                <Quote
                  className="h-8 w-8 text-coral/40"
                  aria-hidden="true"
                />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-charcoal">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-blush-200 pt-4">
                  <Stars count={t.rating} />
                  <p className="mt-2 font-display text-base text-ink">
                    {t.name}
                  </p>
                  <p className="text-xs text-stone">{t.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
