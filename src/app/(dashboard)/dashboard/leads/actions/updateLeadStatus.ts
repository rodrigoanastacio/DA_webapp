'use server'

import { createClient } from '@/lib/supabase/server'
import { diagnosticoHandler } from '@/shared/api-handlers/diagnostico/diagnostico.handler'
import { revalidatePath } from 'next/cache'

export async function updateLeadStatus(id: string, status: string) {
  try {
    const supabase = await createClient()
    await diagnosticoHandler.updateStatus(supabase, id, status)
    revalidatePath('/dashboard/leads')
    return { success: true }
  } catch (error) {
    console.error('Failed to update lead status:', error)
    return { success: false, error: 'Falha ao atualizar status' }
  }
}
