import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk middleware entrypoint — use a .js file because some deployments/tools
// expect middleware.(ts|js) to exist so auth() can detect it.
export default clerkMiddleware();

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
