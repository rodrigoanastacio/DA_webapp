import { createClient } from '@/lib/supabase/server'
import { leadsHandler } from '@/shared/api-handlers/leads/leads.handler'
import { LeadsHeader } from '../components/LeadsHeader'
import { LeadsListTable } from '../components/LeadsListTable'
import { LeadsStats } from '../components/LeadsStats'

export default async function LeadsListPage() {
  const supabase = await createClient()

  // Buscar leads do banco de dados
  const { leads, total } = await leadsHandler.list(supabase, {
    page: 1,
    perPage: 50,
    orderBy: 'created_at',
    orderDirection: 'desc'
  })

  // Calcular estatísticas
  const highPotentialCount = leads.filter(
    (lead) => lead.is_high_potential
  ).length

  // Taxa de conversão (mock por enquanto)
  const conversionRate = '12.4%'

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <LeadsHeader totalLeads={total} highPotentialCount={highPotentialCount} />

      <LeadsStats
        totalLeads={total}
        highPotentialLeads={highPotentialCount}
        conversionRate={conversionRate}
      />

      <LeadsListTable leads={leads} />
    </section>
  )
}
