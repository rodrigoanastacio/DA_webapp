'use client'

import { getUserDisplayName } from '@/lib/utils'
import { UserRole, UserRoleLabel } from '@/shared/enums/UserRole'
import { Bell } from 'lucide-react'
import { MobileNav } from './MobileNav'
import { UserProfile } from './UserProfile'

interface DashboardHeaderProps {
  user?: {
    name?: string
    email?: string
    avatar_url?: string
    role?: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const userRole = user?.role
    ? UserRoleLabel[user.role as UserRole] || 'Membro'
    : 'Membro'

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff] px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between lg:justify-end gap-x-4">
        <div className="flex items-center gap-x-4 lg:hidden">
          <MobileNav />
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <button className="relative p-2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors rounded-xl hidden sm:block">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9FAFB]" />
          </button>

          <div className="hidden sm:block w-px h-6 bg-gray-200 mx-2" />

          <UserProfile
            name={getUserDisplayName(user)}
            role={userRole}
            avatarUrl={user?.avatar_url || '/assets/avatar.jpg'}
          />
        </div>
      </div>
    </header>
  )
}
