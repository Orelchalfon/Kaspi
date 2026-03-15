const nextConfig = {
  transpilePackages: ["@workspace/ui"],

  /* ── Performance ─────────────────────────────────────── */

  compiler: {
    // Strip console.log in production builds
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Tree-shake barrel exports for heavy packages
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "radix-ui",
      "@workspace/ui",
    ],
  },
}

export default nextConfig
