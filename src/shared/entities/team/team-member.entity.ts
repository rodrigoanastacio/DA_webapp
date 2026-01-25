import { TeamMemberResponse } from '@/lib/zod/team.schema'

/**
 * Entidade de Domínio: TeamMember
 *
 * Representa um colaborador do time com lógica de negócio e formatação.
 */
export class TeamMember {
  readonly id: string
  readonly fullName: string
  readonly email: string
  readonly role: 'admin' | 'editor' | 'viewer'
  readonly avatarUrl?: string
  readonly createdAt: Date

  constructor(data: TeamMemberResponse) {
    this.id = data.id
    this.fullName = data.full_name
    this.email = data.email
    this.role = data.role
    this.avatarUrl = data.avatar_url
    this.createdAt = new Date(data.created_at)
  }

  /**
   * Retorna as iniciais do nome para uso em avatares.
   */
  get initials(): string {
    return this.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  /**
   * Identifica se o usuário tem privilégios de gestão.
   */
  get canManageTeam(): boolean {
    return this.role === 'admin'
  }

  /**
   * Formatação de data localizada.
   */
  get formattedJoinDate(): string {
    return this.createdAt.toLocaleDateString('pt-BR')
  }

  /**
   * Cores semânticas baseadas na Role.
   */
  get roleBadgeStyles(): string {
    const styles = {
      admin: 'bg-blue-50 text-blue-500',
      editor: 'bg-green-50 text-green-500',
      viewer: 'bg-gray-50 text-gray-500'
    }
    return styles[this.role]
  }
}
