import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { TeamManager } from '../components/TeamManager'

import { createClient } from '@/lib/supabase/server'

export default async function TeamPage() {
  const supabase = await createClient()
  // Chamada via API Handler (Camada de Integração)
  const members = await teamHandler.list(supabase)

  const rows = members.map((m) => m.toPlainObj())

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <TeamManager rows={rows} />
    </section>
  )
}
