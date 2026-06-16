import { cn } from "@/lib/cn";

/**
 * Decorative line-art heart with a baby's head, echoing the Latched Beginnings
 * logo mark. Purely ornamental, so it is hidden from assistive tech.
 */
export function HeartMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 60"
      fill="none"
      aria-hidden="true"
      className={cn("text-coral", className)}
    >
      <path
        d="M32 57C32 57 5 41 5 24.5C5 16.5 11 11.5 18 11.5C24.5 11.5 30 16 32 23C34 16 39.5 11.5 46 11.5C53 11.5 59 16.5 59 24.5C59 41 32 57 32 57Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="9" r="7" stroke="currentColor" strokeWidth="3" />
      <circle cx="45" cy="35" r="11.5" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
