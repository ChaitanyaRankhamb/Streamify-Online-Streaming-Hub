import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      domains: ["image.tmdb.org"], // ✅ allow TMDB posters
    },
};

export default nextConfig;
