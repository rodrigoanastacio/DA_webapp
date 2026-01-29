import { createAdminClient } from '@/lib/supabase/admin'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { teamService } from '@/shared/services/team/team.service'
import { TeamManager } from '../components/TeamManager'

export default async function TeamPage() {
  const supabase = createAdminClient()

  const profiles = await teamHandler.list(supabase)

  const profilesData = profiles.map((p) => ({
    id: p.id,
    full_name: p.fullName,
    email: p.email,
    role: p.role as 'admin' | 'editor' | 'viewer',
    avatar_url: p.avatarUrl,
    created_at: p.createdAt.toISOString(),
    updated_at: p.createdAt.toISOString()
  }))

  const members = await teamService.getMembersWithStatus(supabase, profilesData)
  const rows = members.map((m) => m.toPlainObj())

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <TeamManager rows={rows} />
    </section>
  )
}
