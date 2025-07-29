import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import CredentialsProvider from 'next-auth/providers/credentials';

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
  const mockSubscriptions: { [key: string]: Subscription } = {
    'github|123': { isPremium: true, tier: 'Premium' },
    'google|456': { isPremium: false, tier: 'Pleb' },
    'twitter|789': { isPremium: true, tier: 'Standard' },
    // Add mock for credentials if needed, e.g., 'credentials|user1'
  };
  return mockSubscriptions[userId] || { isPremium: false, tier: 'Pleb' };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ) {
        // Mock authorization (replace with real logic)
        if (credentials?.username === 'test' && credentials?.password === 'test') {
          const user = {
            id: 'credentials|test',
            name: 'Test User',
            email: 'test@example.com',
            isPremium: false, // or true, depending on your logic
            tier: 'Pleb' as const,     // or 'Standard' | 'Premium' | 'Maxi'
            image: null
          };
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? 'default-secret',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        const provider = account.provider;
        const providerId = account.providerAccountId || user?.id;
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
    async redirect({ url, baseUrl }) {
      return url.startsWith("/") ? `${baseUrl}/app/home` : baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
  },
};