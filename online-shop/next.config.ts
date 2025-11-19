import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.noroff.dev" },
      { protocol: "https", hostname: "static.cloud.noroff.dev" },
    ],
    // or simpler:
    // domains: ["static.noroff.dev", "static.cloud.noroff.dev"],
  },
};

export default nextConfig;
