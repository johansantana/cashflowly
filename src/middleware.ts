import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // If the user is not logged in and tries to access a protected route
  if (!token && request.nextUrl.pathname.startsWith('/(root)')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is logged in and tries to access auth routes
  if (
    token &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup'))
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
