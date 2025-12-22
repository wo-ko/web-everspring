import NextAuth, { NextAuthRequest } from 'next-auth';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authConfig from './app/configs/auth.config';

const { auth } = NextAuth(authConfig);
// This function can be marked `async` if using `await` inside
export default auth(async function middleware(request: NextRequest & NextAuthRequest) {
  const pathnames = request.nextUrl.pathname.split('/');

  switch (pathnames[1]) {
    case 'th':
    case 'en':
      return NextResponse.next();
    case 'admin':
      if (pathnames.length > 2 && !request?.auth) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      return NextResponse.next();
    case "": // root → redirect ไป /th
      return NextResponse.redirect(new URL("/th", request.url));
    default:
      return NextResponse.redirect(new URL('/th', request.url));
  }
})

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/:lang', '/admin/:path*'],
}
