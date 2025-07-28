/** type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Optional: Keep if you need to disable optimization for now
    domains: [
      "www.solosatoshi.com",
      "www.dcentwallet.com",
      "www.ledger.com",
      "tangem.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Keep this to skip linting during builds (remove post-launch after fixes)
  },
};

export default nextConfig;