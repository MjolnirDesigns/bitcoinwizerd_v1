import { Metadata } from "next";
import { Inter, Ubuntu } from 'next/font/google';
import { SessionProvider } from "next-auth/react"; // Add this import
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Custom Geo and JetBrains Mono are loaded via globals.css
export const metadata: Metadata = {
  title: {
    default: 'BitcoinWizerd',
    template: '%s | BitcoinWizerd',
  },
  description: 'Defi the Dollar with BitcoinWizerd’s content, developer tools, and educational resources.',
  keywords: [
    'AI','Bitcoin', 'BitcoinWizerd', 'Crypto', 'Cryptocurrency', 'Developers', 'Devkits', 'Digital Assets', 'Digital Ledger Technology', 'Education', 'Lightning Network', 'Mining', 'NextJS', 'Real World Assets', 'Ripple', 'Smart Contracts', 'SoloSatoshi','TailwindCSS', 'Wallets', 'XRP', 
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'BitcoinWizerd',
    description: 'Defi the Dollar with BitcoinWizerd’s content, developer tools, and educational resources.',
    url: 'https://www.bitcoinwizerd.com',
    siteName: 'BitcoinWizerd',
    type: 'website',
    images: [
      {
        url: 'https://bitcoinwizerd.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BitcoinWizerd Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BitcoinWizerd',
    description: 'Defi the Dollar with BitcoinWizerd’s content, developer tools, and educational resources.',
    site: '@BitcoinWizerd',
    images: ['https://bitcoinwizerd.com/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`dark ${inter.variable} ${ubuntu.variable} scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="var(--bitcoin-orange)" />
        <meta name="application-name" content="BitcoinWizerd" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preload" href="/favicon.ico" as="image" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Geo.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/JetBrainsMono.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen min-w-[320px] bg-background text-foreground font-sans antialiased">
        <SessionProvider> {/* Add SessionProvider here to wrap all children */}
          <main className="flex-grow w-full">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}