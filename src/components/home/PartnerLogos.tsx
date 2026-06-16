import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

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
            Our Training and Affiliations
          </h2>
        </Reveal>

        <div className="relative mt-10 w-full overflow-hidden">
          {/* Two identical copies so the -50% marquee loops seamlessly. */}
          <div className="lb-marquee flex w-max items-center">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="mr-16 flex w-40 shrink-0 items-center justify-center sm:mr-24 sm:w-48"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="h-12 w-auto max-w-[150px] object-contain opacity-90 sm:h-14"
                />
              </div>
            ))}
          </div>

          {/* Cheap gradient fade at the edges (no backdrop-filter, so it stays smooth on scroll). */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent sm:w-40" />
        </div>
      </Container>
    </Section>
  );
}
