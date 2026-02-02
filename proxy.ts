import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type SessionData } from './lib/auth/session'

export async function proxy(request: NextRequest) {
  // Only protect Keystatic routes
  if (
    request.nextUrl.pathname.startsWith('/keystatic') ||
    request.nextUrl.pathname.startsWith('/api/keystatic')
  ) {
    try {
      // Create a response object
      const response = NextResponse.next()

      // Get session - iron-session handles cookies internally
      const session = await getIronSession<SessionData>(
        request,
        response,
        sessionOptions
      )

      // Check authentication
      if (!session.isAuthenticated) {
        // Redirect to login page with preserved redirect URL
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }

      return response
    } catch (error) {
      console.error('Proxy error:', error)
      // On error, redirect to login
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configure which routes to run proxy on
export const config = {
  matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
}
