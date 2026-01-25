import { z } from 'zod'

export const teamMemberSchema = z.object({
  full_name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  role: z.enum(['admin', 'editor', 'viewer'] as const, {
    message: 'Selecione um nível de permissão válido'
  })
})

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>

export interface TeamMemberResponse {
  id: string
  full_name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  avatar_url?: string
  created_at: string
  updated_at: string
}
