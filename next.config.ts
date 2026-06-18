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
    ];
  },
};

export default nextConfig;
