import { cn } from "@/lib/cn";

const ICON = "url(/images/brand/lb-icon-white.svg)";

/**
 * The real Latched Beginnings heart mark, rendered from the brand icon SVG as a
 * CSS mask. Using a mask (rather than an <img>) keeps it tintable with the
 * current text color and any opacity, so existing usages like
 * `text-white/15` or `text-coral/10` still work. Purely decorative.
 */
export function HeartMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block bg-current text-coral", className)}
      style={{
        WebkitMaskImage: ICON,
        maskImage: ICON,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
