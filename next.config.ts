import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sanity", "@sanity/client", "next-sanity"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
