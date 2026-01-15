import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "res.cloudinary.com",
      "everspringagrochem.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images3.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "everspringagrochem.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
