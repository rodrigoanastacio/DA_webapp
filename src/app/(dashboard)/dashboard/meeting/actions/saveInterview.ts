'use server'

import { createClient } from '@/lib/supabase/server'
import { entrevistasHandler } from '@/shared/api-handlers/entrevistas/entrevistas.handler'
import { leadsHandler } from '@/shared/api-handlers/leads/leads.handler'
import { revalidatePath } from 'next/cache'

export async function saveInterview(
  leadId: string,
  interviewId: string | undefined,
  respostas: Record<string, unknown>,
  observacoes: string
) {
  const supabase = await createClient()

  try {
    let result
    if (interviewId) {
      result = await entrevistasHandler.update(supabase, interviewId, {
        respostas_json: respostas,
        observacoes,
        updated_at: new Date().toISOString()
      })
    } else {
      // Create new
      result = await entrevistasHandler.create(supabase, {
        lead_id: leadId,
        respostas_json: respostas,
        observacoes
      })

      await leadsHandler.updateStatus(supabase, leadId, 'em_negociacao')
    }

    if (result.error) {
      console.error('Error saving interview:', result.error)
      return { success: false, error: result.error.message }
    }

    revalidatePath(`/dashboard/meeting/${leadId}`)
    return { success: true, data: result.data }
  } catch (error) {
    console.error('Unexpected error saving interview:', error)
    return { success: false, error: 'Unexpected error occurred' }
  }
}
