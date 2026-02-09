import { z } from 'zod'

/**
 * Schema para validação de dados de lead (formulário de diagnóstico)
 */
export const leadSchema = z.object({
  // Step 1: Contato
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  cityState: z.string().min(2, 'Cidade/Estado é obrigatório'),

  // Step 2: Perfil Profissional
  experienceTime: z
    .string({ message: 'Selecione o tempo de atuação' })
    .min(1, 'Selecione o tempo de atuação'),
  currentRole: z
    .string({ message: 'Selecione sua atuação atual' })
    .min(1, 'Selecione sua atuação atual'),

  // Step 3: Estrutura
  teamStructure: z
    .string({ message: 'Selecione a estrutura da equipe' })
    .min(1, 'Selecione a estrutura da equipe'),
  managementLevel: z
    .string({ message: 'Selecione o nível de gestão' })
    .min(1, 'Selecione o nível de gestão'),

  // Step 4: Desafios
  dificuldades: z
    .array(z.string())
    .min(1, 'Selecione pelo menos uma dificuldade'),

  // Step 5: Momento Financeiro
  revenue: z
    .string({ message: 'Selecione a faixa de faturamento' })
    .min(1, 'Selecione a faixa de faturamento'),

  // Step 6: Finalização
  expectativas: z
    .string({ message: 'Descreva suas expectativas' })
    .min(10, 'Faça uma breve descrição das expectativas'),
  investment: z
    .string({ message: 'Selecione uma opção de investimento' })
    .min(1, 'Selecione uma opção de investimento')
})

export type LeadFormData = z.infer<typeof leadSchema>
