import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ElfsightWidget } from "@/components/ui/ElfsightWidget";

/** Live Google reviews via Elfsight, in a branded section. */
export function GoogleReviews() {
  return (
    <Section tone="blush" spacing="default">
      <Container size="wide">
        <div className="text-center">
          <p className="eyebrow mb-3">Loved by Families</p>
          <h2 className="text-[2.15rem] leading-[1.12] sm:text-[2.5rem] md:text-5xl">
            What Austin Families Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone">
            Real reviews from the moms and families we have cared for across
            Greater Austin.
          </p>
        </div>

        <div className="mt-10">
          <ElfsightWidget appId="f9fc4f69-d202-4801-b9a0-6bb9898ecbf9" />
        </div>
      </Container>
    </Section>
  );
}
