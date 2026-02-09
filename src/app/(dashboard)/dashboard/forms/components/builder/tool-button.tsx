'use client'

import { Plus } from 'lucide-react'
import React from 'react'

interface ToolButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export function ToolButton({ icon, label, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-left group overflow-hidden relative"
    >
      <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-bold text-gray-600 group-hover:text-[#111827] transition-colors">
        {label}
      </span>
      <div className="absolute right-[-10px] top-[-10px] opacity-0 group-hover:opacity-10 transition-all group-hover:right-[-5px] group-hover:top-[-5px]">
        <Plus size={40} className="text-blue-600" />
      </div>
    </button>
  )
}
