'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/app/admin/login/actions'
import { LogOut } from 'lucide-react'

interface KeystaticWrapperProps {
  children: React.ReactNode
}

export function KeystaticWrapper({ children }: KeystaticWrapperProps) {
  const router = useRouter()

  async function handleLogout() {
    await logout()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="relative min-h-screen">
      {/* Logout button overlay - bottom left sidebar */}
      <div className="fixed bottom-4 left-0 w-64 px-4 z-9999">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Keystatic admin interface */}
      {children}
    </div>
  )
}
