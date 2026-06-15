import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/brand/SocialIcons";
import { site } from "@/lib/site";

/**
 * Social proof grid. These are placeholder tiles linking to Instagram.
 * To show a live feed, drop in an embed (e.g. EmbedSocial / Behold) later.
 */
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

        <Reveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <a
              key={i}
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
              aria-label="View on Instagram"
            >
              <Photo
                src={`/images/photos/insta-${i + 1}.jpg`}
                alt="Instagram post from Latched Beginnings"
                slot={`Instagram tile ${i + 1}`}
                aspect="aspect-square"
                shape="soft"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                <InstagramIcon className="h-7 w-7 text-white" />
              </span>
            </a>
          ))}
        </Reveal>

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
