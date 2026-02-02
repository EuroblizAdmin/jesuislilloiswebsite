/**
 * Validate username and password against environment variables
 */
export function validateCredentials(username: string, password: string): boolean {
  const validUsername = process.env.CMS_USERNAME
  const validPassword = process.env.CMS_PASSWORD

  if (!validUsername || !validPassword) {
    console.error('CMS credentials not configured in environment variables')
    return false
  }

  // Simple comparison for MVP
  return username === validUsername && password === validPassword
}
