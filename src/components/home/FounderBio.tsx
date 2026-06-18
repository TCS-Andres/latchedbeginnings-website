import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function FounderBio() {
  return (
    <Section tone="white">
      <Container size="wide">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Hey There, Momma</p>
            <h2 className="text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              From One Mom to Another
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-stone">
              <p>
                I&apos;m Dr. Kacie Culotta, a dentist, lactation counselor, and
                mom with a heart for helping families thrive. My passion for
                supporting moms and their babies began with my own journey. When
                my foster son needed a tongue-tie release and, later, my daughter
                faced breastfeeding challenges, I saw how hard it can be to find
                the right care.
              </p>
              <p>
                Those experiences led me to create Latched Beginnings. With
                advanced training in tongue-tie releases, airway health, and
                lactation support, I&apos;ve dedicated my career to offering the
                compassionate, comprehensive care I wished I had. I believe in
                treating the whole baby and empowering moms to feel heard,
                understood, and confident. My mission is to help your little one
                grow, feed, and breathe with ease, so you can enjoy the peace of
                mind and joy that come with a healthy, thriving start.
              </p>
            </div>
            <p className="mt-6 font-display text-xl italic text-coral-deep">
              Dr. Kacie Culotta, DMD
            </p>
            <p className="text-sm text-stone">Founder of Latched Beginnings</p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Read her full story
              </Button>
            </div>
          </div>

          <Reveal className="relative">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.75rem] rounded-tr-[8rem] bg-blush-200">
              <Image
                src="/images/dr-kacie-culotta.png"
                alt="Dr. Kacie Culotta, DMD, founder of Latched Beginnings"
                width={1706}
                height={2560}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
