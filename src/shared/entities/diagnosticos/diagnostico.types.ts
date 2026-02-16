import { Lead } from '../leads/lead.types'

/**
 * Diagnostico entity - Representa um diagnóstico empresarial
 */
export interface Diagnostico {
  id: string
  tenant_id: string
  nome_completo: string
  email: string
  whatsapp: string
  instagram: string
  tempo: string
  estrutura_equipe: string
  nivel_gestao: string
  desafio_sobrecarga: string
  estrutura_ideal: string
  faturamento: string
  investimento: string
  status: string
  ip_cliente?: string
  agente_usuario?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
  created_at: string
  updated_at: string
  is_high_potential?: boolean
}

/**
 * Diagnostico row from database (snake_case with nullable fields)
 */
export interface DiagnosticoRow {
  id: string
  tenant_id: string
  nome_completo: string
  email: string
  whatsapp: string
  instagram: string | null
  tempo: string | null
  estrutura_equipe: string | null
  nivel_gestao: string | null
  desafio_sobrecarga: string | null
  estrutura_ideal: string | null
  faturamento: string | null
  investimento: string | null
  status: string
  ip_cliente: string | null
  agente_usuario: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  referrer: string | null
  created_at: string
  updated_at: string
}

/**
 * Response type for diagnosticos list
 */
export interface DiagnosticosListResponse {
  diagnosticos: Diagnostico[]
  total: number
  page?: number
  perPage?: number
}

/**
 * Type guard check if it is a Diagnostico
 */
export function isDiagnostico(lead: Lead | Diagnostico): lead is Diagnostico {
  return 'faturamento' in lead && 'estrutura_ideal' in lead
}
