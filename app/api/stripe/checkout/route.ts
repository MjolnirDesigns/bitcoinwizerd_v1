// app/api/stripe/checkout/route.ts
/* import { NextResponse } from "next/server";
// import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payments`,
  });

  return NextResponse.json({ url: session.url });
} */

  export async function POST() {
  return new Response('Stripe is disabled. Contact support for subscription options.', { status: 503 });
}