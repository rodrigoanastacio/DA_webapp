import { dateHelpers } from '@/lib/utils/date-helpers'
import { SupabaseClient } from '@supabase/supabase-js'

export interface DashboardStats {
  totalLeads: number
  leadsToday: number
  leadsThisWeek: number
  leadsThisMonth: number
  activeLeads: number
  opportunities: number
  conversionRate: string
}

export interface ChartDataPoint {
  date: string
  leads: number
  sales: number
}

export const dashboardHandler = {
  getStats: async (supabase: SupabaseClient): Promise<DashboardStats> => {
    const todayStart = dateHelpers.getTodayStart().toISOString()
    const weekStart = dateHelpers.getWeekStart().toISOString()
    const monthStart = dateHelpers.getMonthStart().toISOString()

    const { count: totalLeads } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
    const { count: leadsToday } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart)

    const { count: leadsThisWeek } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekStart)

    const { count: leadsThisMonth } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthStart)

    const { count: activeLeads } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
      .not('status', 'in', '("lost","won","descartado","convertido")')

    const { count: wonLeads } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
      .in('status', ['won', 'convertido'])

    const total = totalLeads || 0
    const won = wonLeads || 0
    const rate = total > 0 ? ((won / total) * 100).toFixed(1) + '%' : '0.0%'

    return {
      totalLeads: total,
      leadsToday: leadsToday || 0,
      leadsThisWeek: leadsThisWeek || 0,
      leadsThisMonth: leadsThisMonth || 0,
      activeLeads: activeLeads || 0,
      opportunities: won,
      conversionRate: rate
    }
  },

  getChartData: async (supabase: SupabaseClient): Promise<ChartDataPoint[]> => {
    const { data } = await supabase
      .from('diagnosticos')
      .select('created_at, status')
      .order('created_at', { ascending: true })

    if (!data) return []

    const grouped = data.reduce(
      (acc, curr) => {
        const date = new Date(curr.created_at)
        const key = date.toLocaleDateString('pt-BR', { month: 'short' })

        if (!acc[key]) {
          acc[key] = { date: key, leads: 0, sales: 0 }
        }

        acc[key].leads += 1
        if (['won', 'convertido'].includes(curr.status)) {
          acc[key].sales += 1
        }

        return acc
      },
      {} as Record<string, ChartDataPoint>
    )

    return Object.values(grouped)
  },

  getRecentLeads: async (supabase: SupabaseClient, limit = 5) => {
    const { data } = await supabase
      .from('diagnosticos')
      .select('id, nome_completo, created_at, status')
      .order('created_at', { ascending: false })
      .limit(limit)

    return (data || []).map((lead) => ({
      id: lead.id,
      name: lead.nome_completo,
      date: lead.created_at,
      status: lead.status
    }))
  }
}
