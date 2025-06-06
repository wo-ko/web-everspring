import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathnames = request.nextUrl.pathname.split('/');
  
  switch (pathnames[1]) {
    case 'th':
    case 'en':
      return NextResponse.next();
    default:
      return NextResponse.redirect(new URL('/th', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/:lang'],
}
