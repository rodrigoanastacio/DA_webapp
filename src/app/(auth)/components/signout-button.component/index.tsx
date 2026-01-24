'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  const handleSignOut = () => {
    console.log('Sign out clicked')
    // await signOutAction()
  }

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="flex items-center gap-2 text-gray-500 hover:text-rose-600 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span>Sair</span>
    </Button>
  )
}
