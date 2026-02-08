import { api } from '@/lib/api/fetcher'
import { LeadFormData } from '@/lib/zod/lead.schema'

export const leadsService = {
  /**
   * Envia os dados do lead para a API interna
   */
  submit: async (
    data: LeadFormData,
    utmParams?: Record<string, string | null>
  ) => {
    return api.post<{ success: boolean }>('/api/leads', {
      ...data,
      ...utmParams
    })
  }
}
