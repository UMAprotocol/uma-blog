import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Validate env on build
jiti("./app/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers() {
    return [
      {
        source: "/articles/:slug*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://app.contentful.com", // alow the app to be embedded as an iframe for live previews
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
};
export default nextConfig;
