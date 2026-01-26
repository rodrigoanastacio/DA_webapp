'use client'

import { StatCard } from '@/components/dashboard/StatCard'
import { Summary } from '@/components/dashboard/Summary'
import { BarChart3, Star, Users } from 'lucide-react'

interface LeadsStatsProps {
  totalLeads: number
  highPotentialLeads: number
  conversionRate: string
}

export function LeadsStats({
  totalLeads,
  highPotentialLeads,
  conversionRate
}: LeadsStatsProps) {
  return (
    <Summary>
      <StatCard
        label="Total de Leads"
        value={totalLeads.toLocaleString('pt-BR')}
        icon={Users}
        trend={{ value: '+5.2%', direction: 'up' }}
      />

      <StatCard
        label="Leads P0 (Alto Potencial)"
        value={highPotentialLeads.toString()}
        icon={Star}
        trend={{ value: '+2.1%', direction: 'up' }}
        iconColor="text-gray-200 fill-gray-100"
      />

      <StatCard
        label="Taxa de Conversão"
        value={conversionRate}
        icon={BarChart3}
        trend={{ value: '+0.8%', direction: 'up' }}
      />
    </Summary>
  )
}
