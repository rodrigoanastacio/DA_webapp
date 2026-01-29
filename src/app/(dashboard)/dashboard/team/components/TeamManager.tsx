'use client'

import { useState } from 'react'
import { MemberDetailsDrawer } from './MemberDetailsDrawer'
import { TeamHeader } from './TeamHeader'
import { TeamListTable } from './TeamListTable'

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

interface TeamManagerProps {
  rows: TeamMemberRow[]
}

export function TeamManager({ rows }: TeamManagerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMemberRow | null>(
    null
  )

  const handleOpenNew = () => {
    setSelectedMember(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (member: TeamMemberRow) => {
    setSelectedMember(member)
    setIsDrawerOpen(true)
  }

  const handleClose = () => {
    setIsDrawerOpen(false)
    setSelectedMember(null)
  }

  return (
    <>
      <TeamHeader
        totalMembers={rows.length}
        adminsCount={
          rows.filter((member) => member.role === UserRole.ADMIN).length
        }
        onNewMember={handleOpenNew}
      />

      <TeamListTable rows={rows} onRowClick={handleEdit} />

      <MemberDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleClose}
        initialData={selectedMember}
      />
    </>
  )
}
