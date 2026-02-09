import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type FormRow = Database['public']['Tables']['forms']['Row']
export type FormInsert = Database['public']['Tables']['forms']['Insert']
export type FormUpdate = Database['public']['Tables']['forms']['Update']

export const formsHandler = {
  /**
   * Lista todos os formulários de um tenant.
   */
  async list(supabase: SupabaseClient<Database>, tenantId: string) {
    const { data, error, count } = await supabase
      .from('forms')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return {
      forms: data as FormRow[],
      total: count || 0
    }
  },

  /**
   * Busca um formulário pelo ID e Tenant.
   */
  async getById(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string
  ) {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single()

    if (error) throw error
    return data as FormRow
  },

  /**
   * Cria um novo formulário.
   */
  async create(supabase: SupabaseClient<Database>, form: FormInsert) {
    const { data, error } = await supabase
      .from('forms')
      .insert(form)
      .select()
      .single()

    if (error) throw error
    return data as FormRow
  },

  /**
   * Atualiza um formulário existente filtrando por tenant.
   */
  async update(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string,
    form: FormUpdate
  ) {
    const { data, error } = await supabase
      .from('forms')
      .update(form)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single()

    if (error) throw error
    return data as FormRow
  },

  /**
   * Remove um formulário filtrando por tenant.
   */
  async delete(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string
  ) {
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId)

    if (error) throw error
    return true
  }
}
