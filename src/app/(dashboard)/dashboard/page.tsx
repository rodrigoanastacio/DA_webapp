import { LeadsTimelineChart } from '@/components/dashboard/LeadsTimelineChart'
import { RecentLeads } from '@/components/dashboard/RecentLeads'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { StatCard } from '@/components/dashboard/StatCard'
import { Summary } from '@/components/dashboard/Summary'
import { createClient } from '@/lib/supabase/server'
import { dashboardHandler } from '@/shared/api-handlers/dashboard/dashboard.handler'
import { Star, Target, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const [stats, chartData, recentLeads, timelineData] = await Promise.all([
    dashboardHandler.getStats(supabase),
    dashboardHandler.getChartData(supabase),
    dashboardHandler.getRecentLeads(supabase),
    dashboardHandler.getLeadsTimeline(supabase, 30)
  ])

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Visão Geral
          </h1>
          <p className="text-gray-400 font-medium text-sm mt-1">
            Acompanhe os principais indicadores de hoje,{' '}
            {new Date().toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long'
            })}
            .
          </p>
        </div>
      </div>

      <Summary>
        <StatCard
          label="Total de Leads"
          value={stats.totalLeads}
          icon={Users}
          trend={{ value: 'Base total', direction: 'neutral' }}
        />
        <StatCard
          label="Em Negociação"
          value={stats.activeLeads}
          icon={Target}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-50"
          trend={{ value: 'Ativos no funil', direction: 'neutral' }}
        />
        <StatCard
          label="Vendas Realizadas"
          value={stats.opportunities}
          icon={Star}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-50"
          trend={{ value: `${stats.conversionRate} conv.`, direction: 'up' }}
        />
        <StatCard
          label="Leads Este Mês"
          value={stats.leadsThisMonth}
          icon={Users}
          iconColor="text-purple-500"
          iconBg="bg-purple-50"
          trend={{ value: `${stats.leadsToday} hoje`, direction: 'neutral' }}
        />
      </Summary>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} />
        </div>

        <div className="h-full min-h-[300px]">
          <RecentLeads leads={recentLeads} />
        </div>
      </div>

      <div className="w-full">
        <LeadsTimelineChart data={timelineData} />
      </div>
    </div>
  )
}
