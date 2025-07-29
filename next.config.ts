/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "www.solosatoshi.com",
      "www.dcentwallet.com",
      "www.ledger.com",
      "tangem.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config: import('webpack').Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      console.log('Client-side env vars:', {
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      });
    }
    return config;
  },
};

export default nextConfig;