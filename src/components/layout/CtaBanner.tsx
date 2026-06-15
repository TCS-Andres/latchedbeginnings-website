import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeartMark } from "@/components/brand/HeartMark";
import { site } from "@/lib/site";

/**
 * Sitewide pre-footer call to action. Rendered globally in the root layout.
 */
export function CtaBanner() {
  return (
    <section className="bg-white">
      <Container size="wide">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-coral via-coral to-coral-soft px-6 py-14 text-center sm:px-12 sm:py-20">
          <HeartMark className="absolute -right-6 -top-6 h-40 w-40 text-white/15" />
          <HeartMark className="absolute -bottom-10 -left-8 h-44 w-44 text-white/10" />
          <div className="relative mx-auto max-w-2xl">
            <p className="font-display text-lg italic text-white/90">
              We are here to help your family
            </p>
            <h2 className="mt-3 text-3xl text-white sm:text-4xl md:text-[2.75rem]">
              Healthy beginnings start with one gentle conversation
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              Book a 1-on-1 consultation with Dr. Kacie Culotta. We will listen,
              evaluate your baby with care, and help you decide the right next
              step. No pressure, ever.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={site.bookingUrl} variant="white" size="lg">
                {site.bookingLabel}
              </Button>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 font-semibold text-white transition-opacity hover:opacity-80"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
