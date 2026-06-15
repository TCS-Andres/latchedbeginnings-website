import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Background treatment */
  tone?: "white" | "blush" | "blush-soft" | "cream" | "ink";
  /** Vertical rhythm */
  spacing?: "default" | "tight" | "loose";
  id?: string;
  as?: "section" | "div" | "article";
};

const tones = {
  white: "bg-white text-charcoal",
  blush: "bg-blush text-charcoal",
  "blush-soft": "bg-blush-200 text-charcoal",
  cream: "bg-cream text-charcoal",
  ink: "bg-ink text-white",
};

const spacings = {
  tight: "py-12 sm:py-16",
  default: "py-16 sm:py-24",
  loose: "py-20 sm:py-32",
};

export function Section({
  children,
  className,
  tone = "white",
  spacing = "default",
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn(tones[tone], spacings[spacing], className)}>
      {children}
    </Tag>
  );
}
