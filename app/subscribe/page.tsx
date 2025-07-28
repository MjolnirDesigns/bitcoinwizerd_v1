// app/subscribe/page.tsx
export const dynamic = 'force-dynamic'; // Force dynamic rendering to handle session/tier logic at request time

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PricingCards from '@/components/ui/PricingCards';

export default async function SubscribePage() {
  const session = await getServerSession(authOptions);

  // Simulate newsletter signup for Pleb users (scraping commented out as tokens are invalid/not essential for launch)
  if (session && session.user?.tier === 'Pleb') {
    // TODO: Re-enable once scrapeXPosts.mjs tokens are fixed and tested
    // try {
    //   const topPosts = await scrapeTopXPosts();
    //   console.log('Pleb user subscribed, top posts:', topPosts);
    //   // Placeholder for Substack/Listmonk API call
    //   // await fetch('https://YOUR_SUBSTACK_API/subscribe', {
    //   //   method: 'POST',
    //   //   body: JSON.stringify({ email: session.user.email, posts: topPosts }),
    //   // });
    // } catch (error) {
    //   console.error('Error scraping X posts during subscription:', error);
    // }
    console.log('Pleb user subscribed to newsletter (scraping skipped)');
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Subscribe to BitcoinWizerd</h1>
      {!session ? (
        <p className="mb-4">Please log in to subscribe to our newsletter or premium content.</p>
      ) : session.user?.tier === 'Pleb' ? (
        <>
          <p className="mb-4">Pleb users get our free weekly newsletter with top Bitcoin and tech insights!</p>
          <p>You are subscribed to the newsletter automatically.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Upgrade Your Plan</h2>
          <PricingCards />
        </>
      ) : (
        <>
          <p className="mb-4">
            Your current plan: <strong>{session.user.tier}</strong>. Upgrade or manage your subscription below.
          </p>
          <PricingCards />
        </>
      )}
    </div>
  );
}