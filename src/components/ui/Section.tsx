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
  // Soft, feathered blush gradient bands (see .bg-soft in globals.css)
  blush: "bg-soft text-charcoal",
  "blush-soft": "bg-soft-alt text-charcoal",
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
