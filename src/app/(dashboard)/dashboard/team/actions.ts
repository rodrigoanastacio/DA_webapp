'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { teamService } from '@/shared/services/team/team.service'
import { TeamMemberRow } from './components/TeamManager'

export async function refreshTeamList(): Promise<TeamMemberRow[]> {
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

  return members.map((m) => m.toPlainObj())
}
