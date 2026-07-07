import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.20.10.4", "localhost"],
  output: "export",
};

export default nextConfig;
