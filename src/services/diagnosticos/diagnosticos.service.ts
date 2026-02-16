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
  submit: async (data: LeadFormData, utmParams: UTMParams | null) => {
    return api.post<{ success: boolean }>('/api/diagnosticos', {
      nome: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      experienceTime: data.experienceTime,
      revenue: data.revenue,
      teamStructure: data.teamStructure,
      managementLevel: data.managementLevel,
      overloadChallenges: data.overloadChallenges,
      idealStructure: data.idealStructure,
      investment: data.investment,
      utm_source: utmParams?.utm_source,
      utm_medium: utmParams?.utm_medium,
      utm_campaign: utmParams?.utm_campaign,
      utm_content: utmParams?.utm_content,
      utm_term: utmParams?.utm_term,
      referrer: typeof window !== 'undefined' ? document.referrer : undefined
    })
  }
}
