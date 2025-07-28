import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simulated session check (replace with actual session logic)
function getSessionFromCookie(req: NextRequest) {
  const sessionToken = req.cookies.get("next-auth.session-token"); // Adjust based on your setup
  return sessionToken ? JSON.parse(sessionToken.value) : null; // Placeholder
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const isTestMode = searchParams.get("test") === "true";

  // Bypass login in test mode
  if (isTestMode) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  const session = getSessionFromCookie(req);
  if (!session && pathname.startsWith("/devkit")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Restrict premium components for non-premium users
  const premiumPaths = [
    "/devkit/animations",
    "/devkit/dashboards",
    "/devkit/components",
  ];
  if (
    premiumPaths.some((path) => pathname.startsWith(path)) &&
    session &&
    !session.user?.isPremium
  ) {
    return NextResponse.redirect(new URL("/devkit", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/devkit/:path*"],
};