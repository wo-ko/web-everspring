import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images3.alphacoders.com',
      },
      {
        protocol: 'https',
        hostname: 'images.alphacoders.com',
      },
    ],
  },
};

export default nextConfig;
