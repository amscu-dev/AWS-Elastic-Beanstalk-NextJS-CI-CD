import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true, // nu deschide automat browserul
});

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
  reactStrictMode: false,
};

export default withBundleAnalyzer(nextConfig);
