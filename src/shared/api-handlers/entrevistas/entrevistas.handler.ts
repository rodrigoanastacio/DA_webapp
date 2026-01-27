import { SupabaseClient } from '@supabase/supabase-js'
import {
  CreateEntrevistaDTO,
  Entrevista,
  UpdateEntrevistaDTO
} from '../../entities/entrevistas/entrevista.types'

export const entrevistasHandler = {
  create: async (
    supabase: SupabaseClient,
    data: CreateEntrevistaDTO
  ): Promise<{ data: Entrevista | null; error: any }> => {
    const { data: entrevista, error } = await supabase
      .from('entrevistas')
      .insert(data)
      .select()
      .single()

    return { data: entrevista, error }
  },

  listByLeadId: async (
    supabase: SupabaseClient,
    leadId: string
  ): Promise<{ data: Entrevista[] | null; error: any }> => {
    const { data, error } = await supabase
      .from('entrevistas')
      .select('*')
      .eq('lead_id', leadId)
      .order('data_reuniao', { ascending: false })

    return { data, error }
  },

  getById: async (
    supabase: SupabaseClient,
    id: string
  ): Promise<{ data: Entrevista | null; error: any }> => {
    const { data, error } = await supabase
      .from('entrevistas')
      .select('*')
      .eq('id', id)
      .single()

    return { data, error }
  },

  update: async (
    supabase: SupabaseClient,
    id: string,
    data: UpdateEntrevistaDTO
  ): Promise<{ data: Entrevista | null; error: any }> => {
    const { data: entrevista, error } = await supabase
      .from('entrevistas')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    return { data: entrevista, error }
  },

  delete: async (
    supabase: SupabaseClient,
    id: string
  ): Promise<{ error: any }> => {
    const { error } = await supabase.from('entrevistas').delete().eq('id', id)
    return { error }
  }
}
