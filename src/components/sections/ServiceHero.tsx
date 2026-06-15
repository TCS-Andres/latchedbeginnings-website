import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";
import type { Service } from "@/lib/content/services";

type Crumb = { name: string; href: string };

export function ServiceHero({
  service,
  crumbs,
}: {
  service: Service;
  crumbs: Crumb[];
}) {
  const { title, subhead, intro, image, imageSlot } = service.hero;
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10">
        <Photo
          src={image}
          alt={subhead}
          slot={imageSlot}
          fillParent
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/25"
          aria-hidden="true"
        />
      </div>

      <Container size="wide">
        <div className="max-w-2xl py-24 text-white sm:py-28">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/75"
          >
            {crumbs.map((c, i) => (
              <span key={c.href} className="inline-flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-white/50"
                    aria-hidden="true"
                  />
                ) : null}
                {i === crumbs.length - 1 ? (
                  <span className="text-white">{c.name}</span>
                ) : (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <p className="font-display text-lg italic text-blush-200">{title}</p>
          <h1 className="mt-3 text-4xl leading-[1.1] text-white sm:text-5xl">
            {subhead}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {intro}
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
