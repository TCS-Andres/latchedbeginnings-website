import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Heading level for semantics (visual size stays consistent) */
  as?: "h2" | "h3";
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as: Heading = "h2",
  titleClassName,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Heading
        className={cn(
          "text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
