import { z } from 'zod'

export const diagnosticSchema = z.object({
  // Step 1: Contact
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  cityState: z.string().min(2, 'Cidade/Estado é obrigatório'),

  // Step 2: Professional Profile
  experienceTime: z
    .string({ message: 'Selecione o tempo de atuação' })
    .min(1, 'Selecione o tempo de atuação'),
  currentRole: z
    .string({ message: 'Selecione sua atuação atual' })
    .min(1, 'Selecione sua atuação atual'),

  // Step 3: Structure
  teamStructure: z
    .string({ message: 'Selecione a estrutura da equipe' })
    .min(1, 'Selecione a estrutura da equipe'),
  managementLevel: z
    .string({ message: 'Selecione o nível de gestão' })
    .min(1, 'Selecione o nível de gestão'),

  // Step 4: Challenges (Multiple choice)
  dificuldades: z
    .array(z.string())
    .min(1, 'Selecione pelo menos uma dificuldade'),

  // Step 5: Financial Moment
  revenue: z
    .string({ message: 'Selecione a faixa de faturamento' })
    .min(1, 'Selecione a faixa de faturamento')
})

export type DiagnosticFormData = z.infer<typeof diagnosticSchema>
