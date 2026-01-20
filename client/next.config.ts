import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.bwbx.io",
      "another-domain.com",
      "dims.apnews.com",   // <-- add this domain
      "assets.apnews.com",  // <-- sometimes images are proxied
      "nbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
