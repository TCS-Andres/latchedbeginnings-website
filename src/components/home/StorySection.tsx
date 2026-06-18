import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function StorySection() {
  return (
    <Section tone="blush">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              src="/images/dr-kacie-with-child.jpg"
              alt="Dr. Kacie Culotta with a young patient at Latched Beginnings"
              slot="Dr. Kacie with a child she is helping"
              aspect="aspect-[3/4]"
              shape="rounded"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          <div>
            <p className="eyebrow mb-3">Our Difference</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              Care That Comes From the Heart
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
              At Latched Beginnings, we are moms helping moms. Dr. Kacie
              Culotta&apos;s journey with her own children&apos;s tongue-tie and
              feeding struggles is the reason this practice exists. She knows the
              worry, the exhaustion, and the relief of finally being heard.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone">
              With advanced training, the gold-standard CO2 laser, and a team
              that understands, we go beyond feeding to help your baby grow and
              thrive. We will never rush your visit, never dismiss your
              concerns, and never recommend a procedure that is not in your
              baby&apos;s best interest.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Meet Dr. Kacie
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
