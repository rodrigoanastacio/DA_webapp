'use client'

import { cn } from '@/lib/utils'
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
  }
  variant?: 'premium' | 'compact'
  className?: string
  iconColor?: string
  iconBg?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  variant = 'premium',
  className,
  iconColor,
  iconBg
}: StatCardProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] border border-gray-100 flex justify-between h-28',
          className
        )}
      >
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">
            {label}
          </p>
          <p className="text-2xl font-black text-gray-900">{value}</p>
        </div>
        <div
          className={cn(
            'w-12 h-12 flex items-center justify-center',
            iconBg || 'text-gray-200',
            iconColor || 'text-blue-400'
          )}
        >
          <Icon className="w-15 h-15" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] border border-gray-100 flex flex-col justify-between h-48',
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
          {label}
        </p>
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon className={cn('w-10 h-10 text-gray-200', iconColor)} />
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {value}
        </span>
        {trend && (
          <div className="flex items-center gap-0.5 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
            {trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  )
}
