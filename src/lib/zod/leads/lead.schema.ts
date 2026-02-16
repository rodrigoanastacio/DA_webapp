import { z } from 'zod'

/**
 * Schema para validação de dados de lead (formulário de diagnóstico)
 */
export const leadSchema = z.object({
  // Step 1: Contato
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  instagram: z
    .string()
    .min(1, 'Instagram é obrigatório')
    .regex(
      /^@?[\w.]+$/,
      'Instagram inválido (use apenas letras, números, . e _)'
    )
    .transform((val) => (val.startsWith('@') ? val : `@${val}`)),

  // Step 2: Perfil Profissional
  experienceTime: z
    .string({ message: 'Selecione o tempo de atuação' })
    .min(1, 'Selecione o tempo de atuação'),
  revenue: z
    .string({ message: 'Selecione a faixa de faturamento' })
    .min(1, 'Selecione a faixa de faturamento'),

  // Step 3: Estrutura
  teamStructure: z
    .string({ message: 'Selecione a estrutura da equipe' })
    .min(1, 'Selecione a estrutura da equipe'),
  managementLevel: z
    .string({ message: 'Descreva o principal desafio' })
    .min(10, 'Faça uma breve descrição do desafio'),
  overloadChallenges: z
    .string({ message: 'Descreva o que gera sobrecarga' })
    .min(10, 'Faça uma breve descrição'),
  idealStructure: z
    .string({ message: 'Descreva a estrutura ideal' })
    .min(10, 'Faça uma breve descrição'),

  // Step 4: Finalização
  investment: z
    .string({ message: 'Selecione uma opção de investimento' })
    .min(1, 'Selecione uma opção de investimento')
})

export type LeadFormData = z.infer<typeof leadSchema>
