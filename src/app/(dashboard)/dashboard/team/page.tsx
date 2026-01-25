import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { TeamHeader } from './components/TeamHeader'
import { TeamListTable } from './components/TeamListTable'

import { createClient } from '@/lib/supabase/server'

export default async function TeamPage() {
  const supabase = await createClient()
  // Chamada via API Handler (Camada de Integração)
  const members = await teamHandler.list(supabase)

  const rows = members.map((m) => ({
    id: m.id,
    fullName: m.fullName,
    email: m.email,
    role: m.role,
    avatarUrl: m.avatarUrl ?? null,
    formattedJoinDate: m.formattedJoinDate,
    roleBadgeStyles: m.roleBadgeStyles,
    initials: m.initials
  }))

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <TeamHeader
        totalMembers={members.length}
        adminsCount={members.filter((m) => m.canManageTeam).length}
      />

      <TeamListTable rows={rows} />
    </section>
  )
}
