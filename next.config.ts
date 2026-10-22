import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Old single webinar page, now part of the webinars section.
        source: "/resources/pacifier-webinar",
        destination: "/resources/webinars/all-about-pacifiers",
        permanent: true,
      },
      {
        // Renamed: Dr. Culotta can't be described as a specialist.
        source: "/blog/choose-tongue-tie-specialist-austin",
        destination: "/blog/choose-tongue-tie-provider-austin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
