import { env } from '@/config/env'
import { TeamMemberFormData, TeamMemberResponse } from '@/lib/zod/team.schema'
import { TeamMember } from '@/shared/entities/team/team-member.entity'
import { SupabaseClient } from '@supabase/supabase-js'

export const teamHandler = {
  list: async (supabase: SupabaseClient): Promise<TeamMember[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name', { ascending: true })

    if (error) throw error

    return (data || []).map(
      (profile) => new TeamMember(profile as TeamMemberResponse)
    )
  },

  update: async (
    supabase: SupabaseClient,
    id: string,
    data: { full_name: string; role: 'admin' | 'editor' | 'viewer' }
  ): Promise<{ success: boolean }> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.full_name,
        role: data.role,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error

    return { success: true }
  },

  invite: async (
    supabase: SupabaseClient,
    data: TeamMemberFormData
  ): Promise<{ success: boolean }> => {
    const { error } = await supabase.auth.admin.inviteUserByEmail(data.email, {
      data: {
        full_name: data.full_name,
        role: data.role
      },
      redirectTo: `${env.app.url}/auth/callback?next=/update-password`
    })

    if (error) throw error

    return { success: true }
  }
}
