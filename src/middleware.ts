import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default authMiddleware({
  publicRoutes: ['/', '/404', '/sign-in', '/sign-up'],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      // handle users who aren't authenticated
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  },
  apiRoutes: ['/api(.*)'],
});
