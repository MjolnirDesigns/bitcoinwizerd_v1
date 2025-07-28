// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    // Call Mailchimp API to add subscriber
    // Example: await fetch("https://api.mailchimp.com/3.0/lists/{list_id}/members", ...)
    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error subscribing." }, { status: 500 });
  }
}