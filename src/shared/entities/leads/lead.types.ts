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
  status: string
  ip_cliente?: string
  agente_usuario?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
}

export interface LeadRow {
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
  status: string
  ip_cliente: string | null
  agente_usuario: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
  referrer?: string | null
}

export interface LeadsListResponse {
  leads: Lead[]
  total: number
  page: number
  perPage: number
}
