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

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn-icons-png.flaticon.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "everspringagrochem.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "images.alphacoders.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "images3.alphacoders.com",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;
