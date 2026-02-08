import { getTenantIdFromJWT } from '@/lib/auth/get-tenant-id'
import { LeadFormData } from '@/lib/zod/lead.schema'
import { LeadSubmission } from '@/shared/entities/leads/lead-submission.entity'
import {
  Lead,
  LeadRow,
  LeadsListResponse
} from '@/shared/entities/leads/lead.types'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

export const leadsHandler = {
  create: async (
    supabase: SupabaseClient,
    data: LeadFormData,
    metadata: {
      clientIp: string
      userAgent: string
      utmSource?: string
      utmMedium?: string
      utmCampaign?: string
      utmContent?: string
      utmTerm?: string
      referrer?: string
    },
    overrideTenantId?: string
  ) => {
    const submission = new LeadSubmission(data)

    let tenantId: string | null | undefined = overrideTenantId

    if (!tenantId) {
      tenantId = await getTenantIdFromJWT()
    }

    if (!tenantId) {
      throw new Error(
        'Tenant ID not found (JWT missing and no override provided)'
      )
    }

    if (submission.isHighPotential) {
      console.log(
        `[ALERTA] Lead de alto potencial identificado: ${submission.name}`
      )
    }

    const { error } = await supabase.from('leads').insert([
      {
        tenant_id: tenantId,
        nome_completo: submission.name.trim(),
        email: submission.email.trim().toLowerCase(),
        whatsapp: submission.whatsapp.replace(/\D/g, ''),
        cidade_estado: submission.cityState.trim(),
        tempo: submission.experienceTime,
        atuacao: submission.currentRole,
        estrutura_equipe: submission.teamStructure,
        nivel_gestao: submission.managementLevel,
        dificuldades: submission.dificuldades,
        faturamento: submission.revenue,
        expectativas: submission.expectativas.trim(),
        investimento: submission.investment,
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
      .from('leads')
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
      .from('leads')
      .select('*', { count: 'exact', head: true })
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order(orderBy, { ascending: orderDirection === 'asc' })
      .range(from, to)

    if (error) {
      throw error
    }

    const leads: Lead[] = (data as LeadRow[]).map((row) => ({
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
      is_high_potential: calculateHighPotential(row),
      utm_source: row.utm_source || undefined,
      utm_medium: row.utm_medium || undefined,
      utm_campaign: row.utm_campaign || undefined,
      utm_content: row.utm_content || undefined,
      utm_term: row.utm_term || undefined,
      referrer: row.referrer || undefined
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
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error }
    }

    const row = data as LeadRow
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
      is_high_potential: calculateHighPotential(row),
      utm_source: row.utm_source || undefined,
      utm_medium: row.utm_medium || undefined,
      utm_campaign: row.utm_campaign || undefined,
      utm_content: row.utm_content || undefined,
      utm_term: row.utm_term || undefined,
      referrer: row.referrer || undefined
    }

    return { data: lead, error: null }
  }
}

function calculateHighPotential(row: LeadRow): boolean {
  const highRevenueThreshold = ['50k_100k', 'more_100k']
  const highInvestmentThreshold = ['2k_5k', 'more_5k']

  return (
    highRevenueThreshold.includes(row.faturamento) ||
    highInvestmentThreshold.includes(row.investimento)
  )
}
