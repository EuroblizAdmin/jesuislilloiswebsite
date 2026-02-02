'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from './actions'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')

    const result = await login(formData)

    if (result.success) {
      const redirect = searchParams.get('redirect') || '/keystatic'
      router.push(redirect)
      router.refresh()
    } else {
      setError(result.error || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img src="/jesuislillois.png" alt="CMS Logo" className="h-20  brightness-0" />
          </div>
          <CardTitle className="text-2xl text-center">CMS Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium block mb-2">
                Username
              </label>
              <Input id="username" name="username" required autoComplete="username" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium block mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
