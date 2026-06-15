import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * Credential strip. Rendered as text badges rather than third-party logos,
 * which we do not have rights to reproduce. Swap for official logos if licensed.
 */
export function Credentials() {
  return (
    <section className="border-y border-blush-200 bg-cream py-12">
      <Container size="wide">
        <Reveal>
          <p className="text-center font-display text-base italic text-stone">
            Trusted training and affiliations
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {site.credentials.map((c) => (
              <li
                key={c.abbr}
                className="flex flex-col items-center text-center"
                title={c.label}
              >
                <span className="font-display text-xl text-ink">{c.abbr}</span>
                <span className="mt-0.5 max-w-[12rem] text-[0.7rem] uppercase tracking-[0.12em] text-stone">
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
