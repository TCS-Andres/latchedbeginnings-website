import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ElfsightWidget } from "@/components/ui/ElfsightWidget";
import { InstagramIcon } from "@/components/brand/SocialIcons";
import { site } from "@/lib/site";

/** Live Instagram feed via Elfsight, in a branded section. */
export function InstagramFeed() {
  return (
    <Section tone="white" spacing="default">
      <Container size="wide">
        <div className="text-center">
          <p className="eyebrow mb-3">{site.socials.instagramHandle}</p>
          <h2 className="text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
            Follow Us On Our Socials
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone">
            Gentle, real, and mom-approved. Join our community for feeding tips,
            oral-tie education, and a little encouragement for your day.
          </p>
        </div>

        <div className="mt-10">
          <ElfsightWidget appId="5257503d-f6f6-432b-ad1b-a0100ae79f03" />
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={site.socials.instagram} external size="lg">
            <InstagramIcon className="h-5 w-5" />
            Follow {site.socials.instagramHandle}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
