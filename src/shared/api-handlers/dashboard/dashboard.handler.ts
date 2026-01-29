import { SupabaseClient } from '@supabase/supabase-js'

export interface DashboardStats {
  totalLeads: number
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
    const { count: totalLeads } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })

    const { count: activeLeads } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
      .not('status', 'in', '("lost","won","descartado","convertido")')

    // 3. Oportunidades (Ganhos)
    const { count: wonLeads } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
      .in('status', ['won', 'convertido'])

    // Cálculo de Conversão
    const total = totalLeads || 0
    const won = wonLeads || 0
    const rate = total > 0 ? ((won / total) * 100).toFixed(1) + '%' : '0.0%'

    return {
      totalLeads: total,
      activeLeads: activeLeads || 0,
      opportunities: won,
      conversionRate: rate
    }
  },

  getChartData: async (supabase: SupabaseClient): Promise<ChartDataPoint[]> => {
    // Busca leads dos últimos 6 meses para o gráfico
    const { data } = await supabase
      .from('diagnosticos')
      .select('created_at, status')
      .order('created_at', { ascending: true })

    if (!data) return []

    // Agrupa por mês (YYYY-MM) no Client-side
    // (Supabase não tem GROUP BY fácil via SDK JS sem RPC)
    const grouped = data.reduce(
      (acc, curr) => {
        const date = new Date(curr.created_at)
        const key = date.toLocaleDateString('pt-BR', { month: 'short' }) // "jan", "fev"

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
