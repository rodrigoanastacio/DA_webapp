import { getTenantIdFromJWT } from '@/lib/auth/get-tenant-id'
import {
  Diagnostico,
  DiagnosticoRow,
  DiagnosticosListResponse
} from '@/shared/entities/diagnosticos/diagnostico.types'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

export const diagnosticosHandler = {
  create: async (
    supabase: SupabaseClient,
    data: {
      nome: string
      email: string
      whatsapp: string
      cityState: string
      experienceTime: string
      currentRole: string
      teamStructure: string
      managementLevel: string
      dificuldades: string[]
      revenue: string
      expectativas: string
      investment: string
    },
    metadata: {
      clientIp: string
      userAgent: string
      utmSource?: string
      utmMedium?: string
      utmCampaign?: string
      utmContent?: string
      utmTerm?: string
      referrer?: string
    }
  ) => {
    const tenantId = await getTenantIdFromJWT()
    if (!tenantId) {
      throw new Error('Unauthorized: Tenant ID could not be determined')
    }

    const { error } = await supabase.from('diagnosticos').insert([
      {
        tenant_id: tenantId,
        nome_completo: data.nome.trim(),
        email: data.email.trim().toLowerCase(),
        whatsapp: data.whatsapp.replace(/\D/g, ''),
        cidade_estado: data.cityState,
        tempo: data.experienceTime,
        atuacao: data.currentRole,
        estrutura_equipe: data.teamStructure,
        nivel_gestao: data.managementLevel,
        dificuldades: data.dificuldades,
        faturamento: data.revenue,
        expectativas: data.expectativas,
        investimento: data.investment,
        status: 'novo_lead',
        ip_cliente: metadata.clientIp,
        agente_usuario: metadata.userAgent,
        utm_source: metadata.utmSource,
        utm_medium: metadata.utmMedium,
        utm_campaign: metadata.utmCampaign,
        utm_content: metadata.utmContent,
        utm_term: metadata.utmTerm,
        referrer: metadata.referrer
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
  ): Promise<DiagnosticosListResponse> => {
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

    const diagnosticos: Diagnostico[] = (data as DiagnosticoRow[]).map(
      (row) => ({
        id: row.id,
        tenant_id: row.tenant_id,
        nome_completo: row.nome_completo,
        email: row.email,
        whatsapp: row.whatsapp,
        cidade_estado: row.cidade_estado || '',
        tempo: row.tempo || '',
        atuacao: row.atuacao || '',
        estrutura_equipe: row.estrutura_equipe || '',
        nivel_gestao: row.nivel_gestao || '',
        dificuldades: row.dificuldades || [],
        faturamento: row.faturamento || '',
        expectativas: row.expectativas || '',
        investimento: row.investimento || '',
        created_at: row.created_at,
        updated_at: row.updated_at,
        status: row.status,
        ip_cliente: row.ip_cliente || undefined,
        agente_usuario: row.agente_usuario || undefined,
        is_high_potential: calculateHighPotential(row),
        utm_source: row.utm_source || undefined,
        utm_medium: row.utm_medium || undefined,
        utm_campaign: row.utm_campaign || undefined,
        utm_content: row.utm_content || undefined,
        utm_term: row.utm_term || undefined,
        referrer: row.referrer || undefined
      })
    )

    return {
      diagnosticos,
      total: count || 0,
      page,
      perPage
    }
  },

  getById: async (
    supabase: SupabaseClient,
    id: string
  ): Promise<{ data: Diagnostico | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
      .from('diagnosticos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error }
    }

    const row = data as DiagnosticoRow
    const diagnostico: Diagnostico = {
      id: row.id,
      tenant_id: row.tenant_id,
      nome_completo: row.nome_completo,
      email: row.email,
      whatsapp: row.whatsapp,
      cidade_estado: row.cidade_estado || '',
      tempo: row.tempo || '',
      atuacao: row.atuacao || '',
      estrutura_equipe: row.estrutura_equipe || '',
      nivel_gestao: row.nivel_gestao || '',
      dificuldades: row.dificuldades || [],
      faturamento: row.faturamento || '',
      expectativas: row.expectativas || '',
      investimento: row.investimento || '',
      created_at: row.created_at,
      updated_at: row.updated_at,
      status: row.status,
      ip_cliente: row.ip_cliente || undefined,
      agente_usuario: row.agente_usuario || undefined,
      is_high_potential: calculateHighPotential(row),
      utm_source: row.utm_source || undefined,
      utm_medium: row.utm_medium || undefined,
      utm_campaign: row.utm_campaign || undefined,
      utm_content: row.utm_content || undefined,
      utm_term: row.utm_term || undefined,
      referrer: row.referrer || undefined
    }

    return { data: diagnostico, error: null }
  }
}

function calculateHighPotential(row: DiagnosticoRow): boolean {
  const highRevenueThreshold = ['50k_100k', 'more_100k']
  const highInvestmentThreshold = ['2k_5k', 'more_5k']

  return (
    highRevenueThreshold.includes(row.faturamento || '') ||
    highInvestmentThreshold.includes(row.investimento || '')
  )
}
