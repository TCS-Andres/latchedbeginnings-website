import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content/services";
import { getAllPosts } from "@/lib/blog";
import { webinars } from "@/lib/content/webinars";

// Re-render hourly so scheduled posts enter the sitemap on their publish date.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/resources",
    "/resources/oral-tie-symptoms-checklist",
    "/resources/webinars",
    "/provider-coaching",
    "/patient-referrals",
    "/providers",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
    "/hipaa-notice",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date || undefined,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const webinarRoutes = webinars.map((w) => ({
    url: `${base}/resources/webinars/${w.slug}`,
    lastModified: w.date || undefined,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...webinarRoutes];
}
