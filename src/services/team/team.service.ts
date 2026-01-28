import { api } from '@/lib/api/fetcher'
import { TeamMemberFormData, TeamMemberResponse } from '@/lib/zod/team.schema'
import { TeamMember } from '@/shared/entities/team/team-member.entity'

export const teamService = {
  list: async (): Promise<TeamMember[]> => {
    const data = await api.get<TeamMemberResponse[]>('/api/team')
    return (data || []).map((profile) => new TeamMember(profile))
  },

  invite: async (data: TeamMemberFormData): Promise<{ success: boolean }> => {
    return api.post<{ success: boolean }>('/api/team', data)
  },

  update: async (
    id: string,
    data: { full_name: string; role: 'admin' | 'editor' | 'viewer' }
  ): Promise<{ success: boolean }> => {
    return api.put<{ success: boolean }>(`/api/team/${id}`, data)
  }
}
