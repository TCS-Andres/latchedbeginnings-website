import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Background photo */}
      <div className="absolute inset-0 -z-10">
        <Photo
          src="/images/photos/hero.jpg"
          alt="A mother gently holding her baby"
          slot="Hero, mom holding baby (warm, intimate)"
          fillParent
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/20"
          aria-hidden="true"
        />
      </div>

      <Container size="wide">
        <div className="flex min-h-[78vh] max-w-2xl flex-col justify-center py-24 text-white">
          <p className="font-display text-lg italic text-blush-200">
            Welcome to Latched Beginnings
          </p>
          <h1 className="mt-4 text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl">
            Healthy Beginnings That Last a Lifetime
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            We help your baby thrive with gentle, effective tongue-tie and
            lip-tie releases, compassionate lactation support, and a team that
            truly listens. Personalized, whole-baby care for happy feeding and
            healthy growth.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href={site.bookingUrl} variant="white" size="lg">
              {site.bookingLabel}
            </Button>
            <Button
              href={site.phoneHref}
              variant="outline"
              size="lg"
              className="border-white/70 text-white hover:bg-white hover:text-coral-deep"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
