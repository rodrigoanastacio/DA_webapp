import { FormRow } from '@/shared/api-handlers/forms/forms.handler'

export const formsService = {
  async list(): Promise<FormRow[]> {
    const response = await fetch('/api/forms')
    if (!response.ok) throw new Error('Falha ao listar formulários')
    return response.json()
  },

  async getById(id: string): Promise<FormRow> {
    const response = await fetch(`/api/forms/${id}`)
    if (!response.ok) throw new Error('Falha ao buscar formulário')
    return response.json()
  },

  async create(data: Partial<FormRow>): Promise<FormRow> {
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Falha ao criar formulário')
    return response.json()
  },

  async update(id: string, data: Partial<FormRow>): Promise<FormRow> {
    const response = await fetch(`/api/forms/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Falha ao atualizar formulário')
    return response.json()
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/forms/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Falha ao remover formulário')
  }
}
