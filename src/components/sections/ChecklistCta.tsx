import Image from "next/image";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * "Download the Oral Tie Symptoms Checklist" lead-magnet section.
 * Shared across the homepage-style flows and the service pages.
 */
export function ChecklistCta({ tone = "blush" }: { tone?: "white" | "blush" }) {
  return (
    <Section tone={tone}>
      <Container size="wide">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_18px_44px_-32px_rgba(45,45,45,0.4)] sm:p-10 md:grid-cols-2 lg:gap-12">
            <div>
              <p className="eyebrow mb-3">Free Download</p>
              <h2 className="text-2xl leading-tight sm:text-3xl md:text-4xl">
                Download the Oral Tie Symptoms Checklist
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone">
                Feeding struggles and discomfort do not have to leave you feeling
                uncertain. Our comprehensive checklist helps you identify common
                signs of tongue, lip, and buccal ties in both infants and
                parents. Download the free checklist today to gain clarity and
                take the first step toward relief and wellness for you and your
                baby.
              </p>
              <div className="mt-7">
                {/* TODO: add the real checklist PDF at /public/downloads/ */}
                <Button
                  href="/downloads/common-oral-tie-checklist.pdf"
                  size="lg"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Download the Checklist
                </Button>
              </div>
            </div>
            {/* Checklist shown on a tablet mockup */}
            <div className="mx-auto w-full max-w-[280px]">
              <div className="relative rounded-[2rem] bg-ink p-3 shadow-[0_30px_60px_-35px_rgba(45,45,45,0.6)]">
                <div className="overflow-hidden rounded-[1.4rem] bg-white">
                  <Image
                    src="/images/resources/oral-tie-checklist.jpg"
                    alt="The oral tie symptoms checklist shown on a tablet"
                    width={696}
                    height={900}
                    className="h-auto w-full"
                    sizes="(max-width: 1024px) 60vw, 280px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
