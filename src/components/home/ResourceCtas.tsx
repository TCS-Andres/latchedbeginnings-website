import { PlayCircle, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ResourceCtas() {
  return (
    <Section tone="blush" spacing="default">
      <Container size="wide">
        <div className="space-y-7">
          {/* Pacifier webinar */}
          <Reveal>
            <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-white p-6 sm:p-8 md:grid-cols-2 lg:gap-12">
              <Photo
                src="/images/photos/pacifier-webinar.jpg"
                alt="A baby with a pacifier"
                slot="Baby with a pacifier, soft and sweet"
                aspect="aspect-[16/10]"
                shape="soft"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div>
                <p className="eyebrow mb-3">Webinar Replay</p>
                <h2 className="text-2xl leading-tight sm:text-3xl md:text-4xl">
                  Pacifiers Don&apos;t Have To Be A Headache
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  Watch our on-demand webinar where Dr. Kacie Culotta breaks down
                  everything parents are rarely told about pacifiers: when they
                  help, when they cause challenges, and how to choose and use one
                  in a way that supports your baby&apos;s oral development.
                </p>
                <div className="mt-7">
                  <Button href="/resources/pacifier-webinar" size="lg">
                    <PlayCircle className="h-5 w-5" aria-hidden="true" />
                    Watch the Webinar
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Checklist download */}
          <Reveal>
            <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-white p-6 sm:p-8 md:grid-cols-2 lg:gap-12">
              <div className="lg:order-2">
                <p className="eyebrow mb-3">Free Download</p>
                <h2 className="text-2xl leading-tight sm:text-3xl md:text-4xl">
                  Download the Oral Tie Symptoms Checklist
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  Feeding struggles and discomfort do not have to leave you
                  feeling uncertain. Our comprehensive checklist helps you spot
                  common signs of tongue, lip, and buccal ties in both infants
                  and parents, so you can take the first step toward relief and
                  clarity.
                </p>
                <div className="mt-7">
                  <Button
                    href="/resources/oral-tie-symptoms-checklist"
                    size="lg"
                  >
                    <Download className="h-5 w-5" aria-hidden="true" />
                    Download the Checklist
                  </Button>
                </div>
              </div>
              <Photo
                src="/images/photos/checklist.jpg"
                alt="The oral tie symptoms checklist on a tablet"
                slot="Checklist shown on a tablet (product mockup)"
                aspect="aspect-[16/10]"
                shape="soft"
                className="lg:order-1"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
