import { getIronSession, type SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

// Session data structure
export interface SessionData {
  username: string
  isAuthenticated: boolean
}

// Session configuration with security options
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'keystatic_auth_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevents XSS attacks
    sameSite: 'lax', // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  },
}

// Get current session from cookies
export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session.isAuthenticated === true
}
