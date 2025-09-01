import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password protection - change this password!
const SITE_PASSWORD = 'zoe2024' // CHANGE THIS!

export function middleware(request: NextRequest) {
  // Check if user has the auth cookie
  const authCookie = request.cookies.get('site-auth')
  
  // If trying to access login page, always allow
  if (request.nextUrl.pathname === '/auth') {
    return NextResponse.next()
  }
  
  // Check password from URL query parameter
  const password = request.nextUrl.searchParams.get('password')
  if (password === SITE_PASSWORD) {
    // Set cookie and redirect without password in URL
    const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url))
    response.cookies.set('site-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return response
  }
  
  // If authenticated, allow access
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next()
  }
  
  // Otherwise, redirect to login
  return NextResponse.redirect(new URL('/auth', request.url))
}

// Protect all routes except public assets and api
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (login page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
}
