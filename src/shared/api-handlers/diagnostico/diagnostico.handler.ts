import { supabase } from '@/lib/supabase'
import { DiagnosticoFormData } from '@/shared/entities/diagnostico/diagnostico.schema'

export const diagnosticoHandler = {
  /**
   * Insere um novo diagnóstico no banco de dados Supabase
   * Realiza o mapeamento de campos CamelCase para SnakeCase (PT-BR)
   */
  create: async (
    data: DiagnosticoFormData,
    metadata: { clientIp: string; userAgent: string }
  ) => {
    const { error } = await supabase.from('diagnosticos').insert([
      {
        nome_completo: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        whatsapp: data.whatsapp.replace(/\D/g, ''),
        cidade_estado: data.cityState.trim(),
        tempo: data.experienceTime,
        atuacao: data.currentRole,
        estrutura_equipe: data.teamStructure,
        nivel_gestao: data.managementLevel,
        dificuldades: data.dificuldades,
        faturamento: data.revenue,
        expectativas: data.expectativas.trim(),
        investimento: data.investment,
        ip_cliente: metadata.clientIp,
        agente_usuario: metadata.userAgent
      }
    ])

    if (error) {
      throw error
    }

    return { success: true }
  }
}
