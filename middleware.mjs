import { clerkMiddleware } from "@clerk/nextjs/server";

// Use Clerk's middleware so server-side `auth()` calls can detect it.
// Exclude Next.js static assets and the favicon from the matcher to avoid
// middleware runs for those requests (and avoid earlier 500s on favicon.png).
export default clerkMiddleware();

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
