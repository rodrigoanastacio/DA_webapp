import { createClient } from '@/lib/supabase/server'
import { diagnosticoHandler } from '@/shared/api-handlers/diagnostico/diagnostico.handler'
import { entrevistasHandler } from '@/shared/api-handlers/entrevistas/entrevistas.handler'
import { notFound } from 'next/navigation'
import { MeetingRunner } from './components/MeetingRunner'

export default async function MeetingPage({
  params
}: {
  params: { id: string }
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch Lead Data
  const { data: lead } = await diagnosticoHandler.getById(supabase, id)

  if (!lead) {
    notFound()
  }

  // Fetch Existing Interview Data (if any) - assuming listByLeadId returns all, we take the latest or verify logic
  // For now, let's assume we might want to continue the last one or create new.
  // The MeetingRunner will handle "Create new" vs "Update" logic internal to the flow or we pass initial data.
  // Let's fetch the latest interview to see if there's one in progress.
  const { data: entrevistas } = await entrevistasHandler.listByLeadId(
    supabase,
    id
  )
  const latestEntrevista =
    entrevistas && entrevistas.length > 0 ? entrevistas[0] : null

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <MeetingRunner lead={lead} initialEntrevista={latestEntrevista} />
    </div>
  )
}
