import { TeamMemberResponse } from '@/lib/zod/team.schema'
import { UserRole } from '@/shared/enums/UserRole'

/**
 * Entidade de Domínio: TeamMember
 *
 * Representa um colaborador do time com lógica de negócio e formatação.
 */
export class TeamMember {
  readonly id: string
  readonly fullName: string
  readonly email: string
  readonly role: UserRole
  readonly avatarUrl?: string
  readonly createdAt: Date

  constructor(data: TeamMemberResponse) {
    this.id = data.id
    this.fullName = data.full_name
    this.email = data.email
    this.role = this.role = data.role as unknown as UserRole
    this.avatarUrl = data.avatar_url
    this.createdAt = new Date(data.created_at)
  }

  get initials(): string {
    return this.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  get canManageTeam(): boolean {
    return this.role === UserRole.ADMIN
  }

  get formattedJoinDate(): string {
    return this.createdAt.toLocaleDateString('pt-BR')
  }

  get roleBadgeStyles(): string {
    const styles = {
      [UserRole.ADMIN]: 'bg-blue-50 text-blue-500',
      [UserRole.EDITOR]: 'bg-green-50 text-green-500',
      [UserRole.VIEWER]: 'bg-gray-50 text-gray-500'
    }
    return styles[this.role]
  }

  toPlainObj() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      role: this.role as unknown as UserRole,
      avatarUrl: this.avatarUrl ?? null,
      formattedJoinDate: this.formattedJoinDate,
      roleBadgeStyles: this.roleBadgeStyles,
      initials: this.initials
    }
  }
}
