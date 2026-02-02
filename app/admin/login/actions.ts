'use server'

import { validateCredentials } from '@/lib/auth/credentials'
import { getSession } from '@/lib/auth/session'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { success: false, error: 'Username and password required' }
  }

  const isValid = validateCredentials(username, password)

  if (isValid) {
    const session = await getSession()
    session.username = username
    session.isAuthenticated = true
    await session.save()

    return { success: true }
  }

  return { success: false, error: 'Invalid username or password' }
}

export async function logout() {
  const session = await getSession()
  session.destroy()
}
