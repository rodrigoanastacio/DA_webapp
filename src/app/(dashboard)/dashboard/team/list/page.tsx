import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { userHandler } from '@/shared/api-handlers/user/user.handler'
import { teamService } from '@/shared/services/team/team.service'
import { redirect } from 'next/navigation'
import { TeamManager } from '../components/TeamManager'

export default async function TeamPage() {
  // 1. Verify Access (RBAC)
  const supabaseAuth = await createClient()
  const currentUser = await userHandler.getMe(supabaseAuth)

  if (currentUser?.role !== 'admin') {
    redirect('/dashboard')
  }

  // 2. Fetch Data (Admin Privileges)
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
