import { getTenantIdFromJWT } from '@/lib/auth/get-tenant-id'
import {
  Lead,
  LeadRow,
  LeadsListResponse
} from '@/shared/entities/leads/lead.types'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

export const leadsHandler = {
  create: async (
    supabase: SupabaseClient,
    data: Record<string, unknown>,
    metadata: {
      clientIp: string
      userAgent: string
      utmSource?: string
      utmMedium?: string
      utmCampaign?: string
      utmContent?: string
      utmTerm?: string
      referrer?: string
      form_id?: string
      answers?: Record<string, unknown>
    },
    overrideTenantId?: string
  ) => {
    let tenantId: string | null | undefined = overrideTenantId

    // 1. Tentar obter via JWT (usuário logado)
    if (!tenantId) {
      tenantId = await getTenantIdFromJWT()
    }

    // 2. Se não tiver JWT, obrigatório ter form_id para buscar o tenant dono do form
    if (!tenantId) {
      if (!metadata.form_id) {
        throw new Error('Form ID is required for public submissions')
      }

      // Buscar formulário para validar e obter tenant_id
      const { data: form, error: formError } = await supabase
        .from('forms')
        .select('tenant_id, is_published')
        .eq('id', metadata.form_id)
        .single()

      if (formError || !form) {
        throw new Error('Form not found')
      }

      if (!form.is_published) {
        throw new Error('Form is not published')
      }

      tenantId = form.tenant_id
    }

    if (!tenantId) {
      throw new Error('Tenant ID could not be determined')
    }

    // Tentar extrair campos básicos do JSON para conveniência na listagem
    const answers = metadata.answers || data || {}
    const nome =
      (answers.nome as string) ||
      (answers.name as string) ||
      (answers.fullName as string) ||
      (answers.nome_completo as string) ||
      ''
    const email =
      (answers.email as string) || (answers.userEmail as string) || ''
    const whatsapp =
      (answers.whatsapp as string) ||
      (answers.phone as string) ||
      (answers.tel as string) ||
      ''

    const { error } = await supabase.from('leads').insert([
      {
        tenant_id: tenantId,
        nome_completo: nome.toString().trim(),
        email: email.toString().trim().toLowerCase(),
        whatsapp: whatsapp.toString().replace(/\D/g, ''),
        status: 'novo_lead',
        ip_cliente: metadata.clientIp,
        agente_usuario: metadata.userAgent,
        utm_source: metadata.utmSource,
        utm_medium: metadata.utmMedium,
        utm_campaign: metadata.utmCampaign,
        utm_content: metadata.utmContent,
        utm_term: metadata.utmTerm,
        referrer: metadata.referrer,
        form_id: metadata.form_id,
        answers: answers
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
      referrer: row.referrer || undefined,
      form_id: row.form_id || undefined,
      answers: row.answers
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
      referrer: row.referrer || undefined,
      form_id: row.form_id || undefined,
      answers: row.answers
    }

    return { data: lead, error: null }
  }
}

function calculateHighPotential(row: LeadRow): boolean {
  const highRevenueThreshold = ['50k_100k', 'more_100k']
  const highInvestmentThreshold = ['2k_5k', 'more_5k']

  return (
    highRevenueThreshold.includes(row.faturamento || '') ||
    highInvestmentThreshold.includes(row.investimento || '')
  )
}
