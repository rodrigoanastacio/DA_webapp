import { api } from '@/lib/api/fetcher'
import { TeamMemberFormData, TeamMemberResponse } from '@/lib/zod/team.schema'
import { TeamMember } from '@/shared/entities/team/team-member.entity'

export const teamService = {
  /**
   * Obtém a listagem de membros consumindo a API interna
   */
  list: async (): Promise<TeamMember[]> => {
    const data = await api.get<TeamMemberResponse[]>('/api/team')
    return (data || []).map((profile) => new TeamMember(profile))
  },

  /**
   * Envia o convite para um novo colaborador
   */
  invite: async (data: TeamMemberFormData): Promise<{ success: boolean }> => {
    return api.post<{ success: boolean }>('/api/team', data)
  }
}
