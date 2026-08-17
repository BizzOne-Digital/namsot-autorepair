import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Image URLs are entered by admins in the dashboard, so any HTTPS host has to
    // be renderable. Only signed-in admins can add them.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
