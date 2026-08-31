import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,

  /**
   * The site moved from droneiq.iqlabs.app to droneiq.pro on 2026-08-31.
   * Path-preserving permanent redirects, so every one of the 145 URLs keeps
   * its equivalent and nothing 404s. Keep these — the old host stays attached
   * to the project and would otherwise serve a duplicate of the whole site.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "droneiq.iqlabs.app" }],
        destination: "https://droneiq.pro/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.droneiq.pro" }],
        destination: "https://droneiq.pro/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
