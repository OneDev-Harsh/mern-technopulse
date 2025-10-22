import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/events/:id",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]);

const isIgnoredRoute = createRouteMatcher([
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]);

export default clerkMiddleware(async (auth, req) => {
  // Ignore webhook routes entirely
  if (isIgnoredRoute(req)) return;

  const { userId, redirectToSignIn } = await auth();

  // Allow public routes
  if (isPublicRoute(req)) return;

  // Redirect unauthenticated users to sign in
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // Match all routes except static files & Next internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Also match API routes
    '/(api|trpc)(.*)',
  ],
};
