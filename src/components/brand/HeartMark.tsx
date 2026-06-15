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
        d="M32 55C32 55 6 39.5 6 22.5C6 13.4 13.1 6.5 21.5 6.5C26.4 6.5 30.6 8.9 33 12.6C35.4 8.9 39.6 6.5 44.5 6.5C52.9 6.5 60 13.4 60 22.5C60 39.5 34 55 34 55"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="20.5"
        cy="14"
        r="6.5"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="26.5" cy="30" r="9" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
