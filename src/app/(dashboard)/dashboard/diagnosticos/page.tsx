import { createClient } from '@/lib/supabase/server'
import { diagnosticosHandler } from '@/shared/api-handlers/diagnosticos/diagnosticos.handler'
import { LeadsHeader } from '../leads/components/LeadsHeader'
import { LeadsListTable } from '../leads/components/LeadsListTable'
import { LeadsStats } from '../leads/components/LeadsStats'

export default async function DiagnosticosPage() {
  const supabase = await createClient()

  // Buscar diagnósticos do banco de dados
  const { diagnosticos, total } = await diagnosticosHandler.list(supabase, {
    page: 1,
    perPage: 50,
    orderBy: 'created_at',
    orderDirection: 'desc'
  })

  // Calcular estatísticas
  const highPotentialCount = diagnosticos.filter(
    (diagnostico) => diagnostico.is_high_potential
  ).length

  // Taxa de conversão (mock por enquanto)
  const conversionRate = '12.4%'

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <LeadsHeader
        totalLeads={total}
        highPotentialCount={highPotentialCount}
        title="Diagnósticos (Dayane)"
        description="Gestão exclusiva de diagnósticos empresariais"
      />

      <LeadsStats
        totalLeads={total}
        highPotentialLeads={highPotentialCount}
        conversionRate={conversionRate}
      />

      <LeadsListTable
        initialLeads={diagnosticos}
        variant="dayane" // Ativa colunas Empresa/Faturamento
      />
    </section>
  )
}
