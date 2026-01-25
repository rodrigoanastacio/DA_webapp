import { DiagnosticoFormData } from '@/lib/zod/diagnostico.schema'
import { Diagnostico } from '@/shared/entities/diagnostico/diagnostico.entity'
import { SupabaseClient } from '@supabase/supabase-js'

export const diagnosticoHandler = {
  /**
   * Insere um novo diagnóstico no banco de dados Supabase
   * Realiza o mapeamento de campos CamelCase para SnakeCase (PT-BR)
   */
  create: async (
    supabase: SupabaseClient,
    data: DiagnosticoFormData,
    metadata: { clientIp: string; userAgent: string }
  ) => {
    // 1. Instancia a Entidade de Domínio para usar lógica de negócio
    const diagnostico = new Diagnostico(data)

    // Exemplo de uso da lógica da entidade antes de persistir
    if (diagnostico.isHighPotential) {
      console.log(
        `[ALERTA] Lead de alto potencial identificado: ${diagnostico.name}`
      )
    }

    // 2. Mapeamento para o banco de dados (PT-BR snake_case)
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
