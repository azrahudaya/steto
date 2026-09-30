import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

const protectedRoute = createRouteMatcher(["/app(.*)"]);
const withClerk = clerkMiddleware(async (auth, req) => {
  if (protectedRoute(req)) await auth.protect();
});

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    if (protectedRoute(req)) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }
  return withClerk(req, event);
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|webp|ico|woff2?|ttf|map)).*)", "/(api|trpc)(.*)", "/__clerk/:path*"],
};
