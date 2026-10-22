"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children everywhere except the listed routes. Used to keep the
 * sitewide appointment banner off landing pages that have their own CTA.
 */
export function HideOnRoutes({
  routes,
  children,
}: {
  routes: string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname && routes.includes(pathname)) return null;
  return <>{children}</>;
}
