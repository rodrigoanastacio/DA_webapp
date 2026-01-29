export interface Entrevista {
  id: string
  lead_id: string
  data_reuniao: string
  respostas_json: Record<string, unknown>
  observacoes: string | null
  created_at: string
  updated_at: string
}

export interface CreateEntrevistaDTO {
  lead_id: string
  data_reuniao?: string
  respostas_json: Record<string, unknown>
  observacoes?: string
}

export interface UpdateEntrevistaDTO {
  data_reuniao?: string
  respostas_json?: Record<string, unknown>
  observacoes?: string
  updated_at?: string
}
