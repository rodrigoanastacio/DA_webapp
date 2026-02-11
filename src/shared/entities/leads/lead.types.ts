/**
 * Lead entity - Representa um lead genérico de Landing Page
 */
export interface Lead {
  id: string
  tenant_id: string
  nome_completo: string
  email: string
  whatsapp?: string
  form_id?: string
  landing_page_id?: string
  answers?: Record<string, unknown>
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
}

/**
 * Lead row from database (snake_case with nullable fields)
 */
export interface LeadRow {
  id: string
  tenant_id: string
  nome_completo: string
  email: string
  whatsapp: string | null
  form_id: string | null
  landing_page_id: string | null
  answers: Record<string, unknown> | null
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
 * Response type for leads list
 */
export interface LeadsListResponse {
  leads: Lead[]
  total: number
  page?: number
  perPage?: number
}
