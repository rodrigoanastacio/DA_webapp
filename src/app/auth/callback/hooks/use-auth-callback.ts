import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('next') || '/dashboard'
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processAuthCallback = async () => {
      const hash = window.location.hash

      if (hash.includes('error=')) {
        const params = new URLSearchParams(hash.substring(1))
        const errorMsg = params.get('error_description') || params.get('error')
        setError(errorMsg || 'Authentication failed')
        setIsLoading(false)
        return
      }

      if (hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1))
        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (!access_token || !refresh_token) {
          setError('Invalid authentication data')
          setIsLoading(false)
          return
        }

        try {
          const response = await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              access_token,
              refresh_token
            })
          })

          if (!response.ok) {
            const data = await response.json()
            setError(data.error || 'Failed to establish session')
            setIsLoading(false)
            return
          }

          window.history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          )

          router.replace(redirectPath)
          return
        } catch (err) {
          setError('Unexpected error during authentication')
          setIsLoading(false)
          return
        }
      }

      setError('No authentication data found')
      setIsLoading(false)
    }

    processAuthCallback()
  }, [router, redirectPath])

  return { isLoading, error }
}
