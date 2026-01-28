'use client'

import { useDashboard } from '@/app/(dashboard)/hooks/useDashboard'
import { cn, getUserDisplayName } from '@/lib/utils'
import {
  BarChart2,
  Calendar,
  Home,
  LogOut,
  Scale,
  Settings,
  Users,
  UsersRound
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Leads', href: '/dashboard/leads/list', icon: Users },
  { name: 'Equipe', href: '/dashboard/team/list', icon: UsersRound },
  { name: 'Agenda', href: '/dashboard/agenda', icon: Calendar },
  { name: 'Relatórios', href: '/dashboard/reports', icon: BarChart2 },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings }
]

interface DashboardSidebarProps {
  user?: {
    name?: string
    email?: string
    avatar_url?: string
  }
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { handleLogout, isLoggingOut } = useDashboard()

  const displayName = getUserDisplayName(user)

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-100">
      <div className="flex h-24 shrink-0 items-center px-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white overflow-hidden">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <Scale className="w-6 h-6" />
            )}
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm font-bold tracking-tight text-gray-900 leading-tight truncate max-w-[160px]"
              title="Dayane Anastacio"
            >
              Dayane Anastacio
            </span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[2px]">
              Consultoria & Gestão
            </span>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7 pl-4">
          <li className="flex-1">
            <ul role="list" className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        isActive
                          ? 'text-blue-400'
                          : 'text-gray-500 hover:text-blue-400',
                        'group flex gap-x-4 p-3 text-md font-semibold transition-all duration-200 items-center'
                      )}
                    >
                      <item.icon
                        className={cn(
                          isActive
                            ? 'text-blue-400'
                            : 'text-gray-400 group-hover:text-blue-400',
                          'h-5 w-5 shrink-0 transition-colors'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}

                      {isActive && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-full bg-blue-400 transition-colors" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>

          <li className="mt-auto px-2 pb-8">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full group font-semibold text-sm disabled:opacity-50"
            >
              <LogOut
                className={cn(
                  'h-5 w-5 shrink-0 transition-colors',
                  isLoggingOut && 'animate-pulse'
                )}
              />
              {isLoggingOut ? 'Saindo...' : 'Sair'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
