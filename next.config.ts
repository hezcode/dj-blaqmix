import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "ezbotybyjiriuajyicex.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/blaqmix/**",
      },
    ],
  },
};

export default nextConfig;
