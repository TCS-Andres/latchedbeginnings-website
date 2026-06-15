import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeartMark } from "@/components/brand/HeartMark";

export default function NotFound() {
  return (
    <Section tone="blush" spacing="loose">
      <Container size="narrow" className="text-center">
        <HeartMark className="mx-auto h-16 w-16 text-coral/50" />
        <p className="eyebrow mt-6">Page not found</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">
          This little one wandered off
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
          We could not find the page you were looking for. Let us help you find
          your way back to gentle, whole-baby care.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
