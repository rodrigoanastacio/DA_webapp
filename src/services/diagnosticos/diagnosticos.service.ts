import { api } from '@/lib/api/fetcher'
import { LeadFormData } from '@/lib/zod/lead.schema'

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

export const diagnosticosService = {
  submit: async (data: LeadFormData, utmParams: UTMParams) => {
    return api.post<{ success: boolean }>('/api/diagnosticos', {
      nome: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      cityState: data.cityState,
      experienceTime: data.experienceTime,
      currentRole: data.currentRole,
      teamStructure: data.teamStructure,
      managementLevel: data.managementLevel,
      dificuldades: data.dificuldades,
      revenue: data.revenue,
      expectativas: data.expectativas,
      investment: data.investment,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_term: utmParams.utm_term,
      referrer: typeof window !== 'undefined' ? document.referrer : undefined
    })
  }
}
