// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const pathnames = request.nextUrl.pathname.split('/');
  
//   switch (pathnames[1]) {
//     case 'th':
//     case 'en':
//       return NextResponse.next();
//     default:
//       return NextResponse.redirect(new URL('/th', request.url))
//   }
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/', '/:lang'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/");

  // ข้ามไฟล์พิเศษ (public หรือ auto gen จาก app)
  if (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  switch (segments[1]) {
    case "th":
    case "en":
      return NextResponse.next();
    case "": // root → redirect ไป /th
      return NextResponse.redirect(new URL("/th", request.url));
    default:
      return NextResponse.redirect(new URL("/th", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
