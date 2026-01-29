'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { useAuthCallback } from './hooks/use-auth-callback'

function AuthCallbackContent() {
  const router = useRouter()
  const { isLoading, error } = useAuthCallback()

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-red-50 text-red-600">
        <p className="font-bold">Erro na Autenticação</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="rounded bg-white px-4 py-2 text-sm border shadow-sm"
        >
          Voltar para Home
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-gray-500">Autenticando...</p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  )
}
