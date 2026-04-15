import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Security Headers

const cspHeader = `
  default-src 'self';
  connect-src 'self' ${
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "< YOUR_PRODUCTION_DOMAIN >"
  };
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${process.env.NODE_ENV === "production" ? "upgrade-insecure-requests;" : ""}
`;

const secHeaders = {
  source: "/(.*)",
  headers: [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "origin-when-cross-origin",
    },
    {
      key: "Strict-Transport-Security",
      value:
        process.env.NODE_ENV === "production"
          ? "max-age=63072000; includeSubDomains; preload"
          : "",
    },
    {
      key: "Content-Security-Policy",
      value: cspHeader.replace(/\n/g, ""),
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin-allow-popups",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-site",
    },
    {
      key: "Permissions-Policy",
      //  Configure based on app needs
      value: "camera=(), microphone=(), geolocation=()",
    },
  ],
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
  reactStrictMode: false,
  async headers() {
    return [secHeaders];
  },
};

export default withBundleAnalyzer(nextConfig);
