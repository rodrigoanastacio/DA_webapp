import { DiagnosticoFormData } from '@/lib/zod/diagnostico.schema'
import { Diagnostico } from '@/shared/entities/diagnostico/diagnostico.entity'
import {
  DiagnosticoRow,
  Lead,
  LeadsListResponse
} from '@/shared/entities/diagnostico/lead.types'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

export const diagnosticoHandler = {
  create: async (
    supabase: SupabaseClient,
    data: DiagnosticoFormData,
    metadata: { clientIp: string; userAgent: string }
  ) => {
    const diagnostico = new Diagnostico(data)

    // Exemplo de uso da lógica da entidade antes de persistir
    if (diagnostico.isHighPotential) {
      console.log(
        `[ALERTA] Lead de alto potencial identificado: ${diagnostico.name}`
      )
    }

    const { error } = await supabase.from('diagnosticos').insert([
      {
        nome_completo: diagnostico.name.trim(),
        email: diagnostico.email.trim().toLowerCase(),
        whatsapp: diagnostico.whatsapp.replace(/\D/g, ''),
        cidade_estado: diagnostico.cityState.trim(),
        tempo: diagnostico.experienceTime,
        atuacao: diagnostico.currentRole,
        estrutura_equipe: diagnostico.teamStructure,
        nivel_gestao: diagnostico.managementLevel,
        dificuldades: diagnostico.dificuldades,
        faturamento: diagnostico.revenue,
        expectativas: diagnostico.expectativas.trim(),
        investimento: diagnostico.investment,
        status: 'novo_lead',
        ip_cliente: metadata.clientIp,
        agente_usuario: metadata.userAgent
      }
    ])

    if (error) {
      throw error
    }

    return { success: true }
  },

  updateStatus: async (
    supabase: SupabaseClient,
    id: string,
    status: string
  ) => {
    const { error } = await supabase
      .from('diagnosticos')
      .update({ status })
      .eq('id', id)

    if (error) {
      throw error
    }

    return { success: true }
  },

  list: async (
    supabase: SupabaseClient,
    options: {
      page?: number
      perPage?: number
      orderBy?: 'created_at' | 'nome_completo'
      orderDirection?: 'asc' | 'desc'
    } = {}
  ): Promise<LeadsListResponse> => {
    const {
      page = 1,
      perPage = 10,
      orderBy = 'created_at',
      orderDirection = 'desc'
    } = options

    const from = (page - 1) * perPage
    const to = from + perPage - 1

    const { count } = await supabase
      .from('diagnosticos')
      .select('*', { count: 'exact', head: true })
    const { data, error } = await supabase
      .from('diagnosticos')
      .select('*')
      .order(orderBy, { ascending: orderDirection === 'asc' })
      .range(from, to)

    if (error) {
      throw error
    }

    const leads: Lead[] = (data as DiagnosticoRow[]).map((row) => ({
      id: row.id,
      nome_completo: row.nome_completo,
      email: row.email,
      whatsapp: row.whatsapp,
      cidade_estado: row.cidade_estado,
      tempo: row.tempo,
      atuacao: row.atuacao,
      estrutura_equipe: row.estrutura_equipe,
      nivel_gestao: row.nivel_gestao,
      dificuldades: row.dificuldades,
      faturamento: row.faturamento,
      expectativas: row.expectativas,
      investimento: row.investimento,
      created_at: row.created_at,
      status: row.status,
      ip_cliente: row.ip_cliente || undefined,
      agente_usuario: row.agente_usuario || undefined,
      is_high_potential: calculateHighPotential(row)
    }))

    return {
      leads,
      total: count || 0,
      page,
      perPage
    }
  },

  getById: async (
    supabase: SupabaseClient,
    id: string
  ): Promise<{ data: Lead | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
      .from('diagnosticos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error }
    }

    const row = data as DiagnosticoRow
    const lead: Lead = {
      id: row.id,
      nome_completo: row.nome_completo,
      email: row.email,
      whatsapp: row.whatsapp,
      cidade_estado: row.cidade_estado,
      tempo: row.tempo,
      atuacao: row.atuacao,
      estrutura_equipe: row.estrutura_equipe,
      nivel_gestao: row.nivel_gestao,
      dificuldades: row.dificuldades,
      faturamento: row.faturamento,
      expectativas: row.expectativas,
      investimento: row.investimento,
      created_at: row.created_at,
      status: row.status,
      ip_cliente: row.ip_cliente || undefined,
      agente_usuario: row.agente_usuario || undefined,
      is_high_potential: calculateHighPotential(row)
    }

    return { data: lead, error: null }
  }
}

function calculateHighPotential(row: DiagnosticoRow): boolean {
  const highRevenueThreshold = ['50k_100k', 'more_100k']
  const highInvestmentThreshold = ['2k_5k', 'more_5k']

  return (
    highRevenueThreshold.includes(row.faturamento) &&
    highInvestmentThreshold.includes(row.investimento)
  )
}
