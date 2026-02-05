import { UserRole } from '@/shared/enums/UserRole'

export interface TeamMemberRow {
  id: string
  fullName: string
  email: string
  role: UserRole
  avatarUrl?: string | null
  formattedJoinDate: string
  roleBadgeStyles: string
  initials: string
  isActive: boolean
}
