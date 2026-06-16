import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeartMark } from "@/components/brand/HeartMark";
import { cn } from "@/lib/cn";

type Crumb = { name: string; href: string };

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  cta?: { label: string; href: string };
  align?: "left" | "center";
};

/** Interior page hero with a soft blush band and optional breadcrumb. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  cta,
  align = "center",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-soft-hero">
      <HeartMark className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 text-coral/10" />
      <HeartMark className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 text-coral/10" />
      <Container size="wide">
        <div
          className={cn(
            "py-16 sm:py-20",
            align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
          )}
        >
          {crumbs ? (
            <nav
              aria-label="Breadcrumb"
              className={cn(
                "mb-6 flex flex-wrap items-center gap-1.5 text-sm text-stone",
                align === "center" && "justify-center",
              )}
            >
              {crumbs.map((c, i) => (
                <span key={c.href} className="inline-flex items-center gap-1.5">
                  {i > 0 ? (
                    <ChevronRight className="h-3.5 w-3.5 text-coral/60" aria-hidden="true" />
                  ) : null}
                  {i === crumbs.length - 1 ? (
                    <span className="text-charcoal">{c.name}</span>
                  ) : (
                    <Link
                      href={c.href}
                      className="transition-colors hover:text-coral-deep"
                    >
                      {c.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h1 className="text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
          {intro ? (
            <p
              className={cn(
                "mt-5 text-base leading-relaxed text-stone sm:text-lg",
                align === "center" && "mx-auto max-w-2xl",
              )}
            >
              {intro}
            </p>
          ) : null}
          {cta ? (
            <div className={cn("mt-8", align === "center" && "flex justify-center")}>
              <Button href={cta.href} size="lg">
                {cta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
