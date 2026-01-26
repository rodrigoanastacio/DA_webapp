export interface Lead {
  id: string
  nome_completo: string
  email: string
  whatsapp: string
  cidade_estado: string
  tempo: string
  atuacao: string
  estrutura_equipe: string
  nivel_gestao: string
  dificuldades: string[]
  faturamento: string
  expectativas: string
  investimento: string
  created_at: string
  is_high_potential: boolean
  // Campos adicionais do banco
  ip_cliente?: string
  agente_usuario?: string
}

export interface DiagnosticoRow {
  id: string
  nome_completo: string
  email: string
  whatsapp: string
  cidade_estado: string
  tempo: string
  atuacao: string
  estrutura_equipe: string
  nivel_gestao: string
  dificuldades: string[]
  faturamento: string
  expectativas: string
  investimento: string
  created_at: string
  ip_cliente: string | null
  agente_usuario: string | null
}

export interface LeadsListResponse {
  leads: Lead[]
  total: number
  page: number
  perPage: number
}
