import { FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ReferralBand() {
  return (
    <Section tone="white" spacing="tight">
      <Container size="wide">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-blush-200 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
            <div>
              <p className="eyebrow mb-3">For Birth &amp; Feeding Professionals</p>
              <h2 className="text-2xl leading-tight sm:text-3xl md:text-4xl">
                Patient Referrals. We&apos;re Here To Help Families
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone">
                We love partnering with lactation consultants, pediatricians,
                chiropractors, midwives, and doulas. We give your patients the
                same gentle, conservative, evidence-based care you do. Download
                our referral form and send your patients our way.
              </p>
              <div className="mt-7">
                <Button href="/patient-referrals" size="lg">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  Download Patient Referral Form
                </Button>
              </div>
            </div>
            <Photo
              src="/images/photos/referrals.jpg"
              alt="A mother and baby cheek to cheek"
              slot="Mother and baby, tender close-up"
              aspect="aspect-square"
              shape="rounded"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
