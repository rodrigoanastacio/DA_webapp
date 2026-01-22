import { z } from 'zod'

export const diagnosticSchema = z.object({
  // Step 1: Contact
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  cityState: z.string().min(2, 'Cidade/Estado é obrigatório'),

  // Step 2: Professional Profile
  experienceTime: z.string().min(1, 'Selecione o tempo de atuação'),
  currentRole: z.string().min(1, 'Selecione sua atuação atual'),

  // Step 3: Business
  role: z.string().min(2, 'Cargo é obrigatório'),
  teamSize: z.string().min(1, 'Selecione o tamanho da equipe'),
  challenges: z.string().min(10, 'Descreva brevemente os desafios')
})

export type DiagnosticFormData = z.infer<typeof diagnosticSchema>
