'use client'

import { Input } from '@/components/ui/input'
import { Bell, HelpCircle, Plus, Search } from 'lucide-react'
import Image from 'next/image'
import { MobileNav } from './MobileNav'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#F9FAFB] px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between gap-x-4">
        {/* Mobile Toggle & Logo for Mobile */}
        <div className="flex items-center gap-x-4 lg:hidden">
          <MobileNav />
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center gap-x-4">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              type="search"
              placeholder="Buscar leads, processos ou tarefas..."
              className="w-full pl-10 pr-4 h-11 bg-white border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hidden sm:block">
            <Plus className="h-5 w-5" />
          </button>

          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hidden sm:block">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9FAFB]" />
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hidden sm:block">
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200 mx-2" />

          {/* User Profile in Header */}
          <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 group border border-transparent hover:border-gray-100">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-[13px] font-bold text-gray-900">
                Dayane Oliveira
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Senior Partner
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
