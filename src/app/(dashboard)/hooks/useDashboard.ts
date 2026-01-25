'use client'

import { authService } from '@/services/auth/auth.service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * Hook para centralizar a lógica de comportamento do Dashboard.
 */
export function useDashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await authService.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Falha ao deslogar:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return {
    handleLogout,
    isLoggingOut
  }
}
