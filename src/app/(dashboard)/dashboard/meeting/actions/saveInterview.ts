'use server'

import { createClient } from '@/lib/supabase/server'
import { entrevistasHandler } from '@/shared/api-handlers/entrevistas/entrevistas.handler'
import { revalidatePath } from 'next/cache'

import { diagnosticoHandler } from '@/shared/api-handlers/diagnostico/diagnostico.handler'

export async function saveInterview(prevState: unknown, formData: FormData) {
  const leadId = formData.get('leadId') as string
  const interviewId = formData.get('interviewId') as string | undefined
  const respostas = JSON.parse(formData.get('respostas') as string) as Record<
    string,
    unknown
  >
  const observacoes = formData.get('observacoes') as string

  const supabase = await createClient()

  try {
    let result
    if (interviewId) {
      // Update existing
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

      // Auto-update status to 'em_negociacao' on first interview creation
      await diagnosticoHandler.updateStatus(supabase, leadId, 'em_negociacao')
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
