// lib/auth.ts
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';

// Extend NextAuth types to include custom user properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isPremium: boolean;
      tier: 'Pleb' | 'Standard' | 'Premium' | 'Maxi';
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    isPremium: boolean;
    tier: 'Pleb' | 'Standard' | 'Premium' | 'Maxi';
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

interface Subscription {
  isPremium: boolean;
  tier: 'Pleb' | 'Standard' | 'Premium' | 'Maxi';
}

async function getUserSubscription(userId: string): Promise<Subscription> {
  // Replace with Clover API or database query
  const mockSubscriptions: { [key: string]: Subscription } = {
    'github|123': { isPremium: true, tier: 'Premium' },
    'google|456': { isPremium: false, tier: 'Pleb' },
    'twitter|789': { isPremium: true, tier: 'Standard' },
  };
  return mockSubscriptions[userId] || { isPremium: false, tier: 'Pleb' };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const provider = account.provider;
        const providerId = account.providerAccountId;
        token.sub = `${provider}|${providerId}`;
        const subscription = await getUserSubscription(token.sub);
        token.isPremium = subscription.isPremium;
        token.tier = subscription.tier;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isPremium = token.isPremium as boolean;
        session.user.tier = token.tier as 'Pleb' | 'Standard' | 'Premium' | 'Maxi';
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};