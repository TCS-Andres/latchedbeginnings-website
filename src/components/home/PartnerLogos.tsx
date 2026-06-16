import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const logos = [
  { name: "American Dental Association", src: "/images/partners/ada.png" },
  { name: "Academy of Laser Dentistry", src: "/images/partners/ald.png" },
  {
    name: "International Affiliation of Tongue-tie Professionals",
    src: "/images/partners/iatp.png",
  },
  {
    name: "American Laser Study Club",
    src: "/images/partners/american-laser-study-club.png",
  },
  { name: "LightScalpel", src: "/images/partners/lightscalpel.png" },
  { name: "Texas Dental Association", src: "/images/partners/tda.png" },
];

export function PartnerLogos() {
  return (
    <Section tone="cream" spacing="tight">
      <Container size="wide">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">Recognized &amp; Trusted</p>
          <h2 className="text-2xl leading-tight sm:text-3xl">
            Our training and affiliations
          </h2>
        </Reveal>

        <div className="relative mt-10 w-full overflow-hidden">
          <InfiniteSlider
            className="flex w-full items-center"
            duration={40}
            gap={80}
          >
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex w-44 items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 w-auto max-w-[150px] object-contain opacity-90 sm:h-14"
                />
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className="pointer-events-none absolute left-0 top-0 h-full w-28 sm:w-40"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute right-0 top-0 h-full w-28 sm:w-40"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </Container>
    </Section>
  );
}
