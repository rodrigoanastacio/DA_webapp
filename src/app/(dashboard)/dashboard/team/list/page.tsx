import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { userHandler } from '@/shared/api-handlers/user/user.handler'
import { teamService } from '@/shared/services/team/team.service'
import { redirect } from 'next/navigation'
import { TeamManager } from '../components/TeamManager'

export default async function TeamPage() {
  const supabaseAuth = await createClient()
  const currentUser = await userHandler.getMe(supabaseAuth)

  if (currentUser?.role !== 'admin') {
    redirect('/dashboard')
  }

  const supabase = createAdminClient()
  const profiles = await teamHandler.list(supabase, currentUser?.tenant_id)

  const profilesData = profiles.map((p) => p.toResponse())

  const members = await teamService.getMembersWithStatus(supabase, profilesData)
  const rows = members.map((m) => m.toPlainObj())

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      <TeamManager rows={rows} tenantId={currentUser?.tenant_id || ''} />
    </section>
  )
}
