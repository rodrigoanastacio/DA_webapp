import { TeamMemberResponse } from '@/lib/zod/team.schema'
import { TeamMember } from '@/shared/entities/team/team-member.entity'
import { SupabaseClient } from '@supabase/supabase-js'

export const teamService = {
  enrichMembersWithAuthStatus: async (
    supabase: SupabaseClient,
    members: TeamMemberResponse[]
  ): Promise<TeamMemberResponse[]> => {
    const { data: authUsers, error } = await supabase.auth.admin.listUsers()

    if (error) {
      throw new Error(`Failed to fetch auth users: ${error.message}`)
    }

    return members.map((member) => {
      const authUser = authUsers.users.find((u) => u.id === member.id)
      return {
        ...member,
        email_confirmed_at: authUser?.email_confirmed_at || null
      }
    })
  },

  getMembersWithStatus: async (
    supabase: SupabaseClient,
    profiles: TeamMemberResponse[]
  ): Promise<TeamMember[]> => {
    const enrichedProfiles = await teamService.enrichMembersWithAuthStatus(
      supabase,
      profiles
    )

    return enrichedProfiles.map((profile) => new TeamMember(profile))
  }
}
