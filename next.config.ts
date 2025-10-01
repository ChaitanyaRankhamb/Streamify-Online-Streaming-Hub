import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
     images: {
    domains: ["image.tmdb.org", "via.placeholder.com"], // add all external domains you use
  },
};

export default nextConfig;
