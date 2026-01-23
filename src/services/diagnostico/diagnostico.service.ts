import { api } from '@/lib/api/fetcher'
import { DiagnosticoFormData } from '@/lib/zod/diagnostico.schema'

export const diagnosticoService = {
  /**
   * Envia os dados do diagnóstico para a API interna
   */
  submit: async (data: DiagnosticoFormData) => {
    return api.post<{ success: boolean }>('/api/diagnostico', data)
  }
}
