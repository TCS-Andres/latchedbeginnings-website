import Script from "next/script";
import { cn } from "@/lib/cn";

/**
 * Mounts an Elfsight widget by its app id. The Elfsight platform script loads
 * lazily (only after the page is idle) and the widget itself is marked lazy, so
 * these third-party embeds do not slow the initial page load. Next dedupes the
 * platform script across multiple widgets on the same page.
 */
export function ElfsightWidget({
  appId,
  className,
}: {
  appId: string;
  className?: string;
}) {
  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div
        className={cn(`elfsight-app-${appId}`, className)}
        data-elfsight-app-lazy=""
      />
    </>
  );
}
