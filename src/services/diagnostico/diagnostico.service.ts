import { DiagnosticoFormData } from '@/shared/entities/diagnostico/diagnostico.schema'
import { api } from '../api'

export const diagnosticoService = {
  /**
   * Envia os dados do diagnóstico para a API interna
   */
  submit: async (data: DiagnosticoFormData) => {
    return api.post<{ success: boolean }>('/api/diagnostico', data)
  }
}
