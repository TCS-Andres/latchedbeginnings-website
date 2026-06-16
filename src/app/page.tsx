import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StorySection } from "@/components/home/StorySection";
import { GoldStandard } from "@/components/home/GoldStandard";
import { Testimonials } from "@/components/home/Testimonials";
import { Steps } from "@/components/home/Steps";
import { ResourceCtas } from "@/components/home/ResourceCtas";
import { FounderBio } from "@/components/home/FounderBio";
import { ReferralBand } from "@/components/home/ReferralBand";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <ValueProps />
      <ServicesGrid />
      <StorySection />
      <GoldStandard />
      <Testimonials />
      <Steps />
      <ResourceCtas />
      <FounderBio />
      <ReferralBand />
      <PartnerLogos />
      <InstagramFeed />
    </>
  );
}
