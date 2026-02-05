'use client'

import { UserRole } from '@/shared/enums/UserRole'
import { useTeamManager } from '../hooks/useTeamManager'
import { TeamMemberRow } from '../types'
import { MemberDetailsDrawer } from './MemberDetailsDrawer'
import { TeamHeader } from './TeamHeader'
import { TeamListTable } from './TeamListTable'

interface TeamManagerProps {
  rows: TeamMemberRow[]
  tenantId: string
}

export function TeamManager({ rows: initialRows, tenantId }: TeamManagerProps) {
  const { teamMembers, isDrawerOpen, selectedMember, actions } = useTeamManager(
    initialRows,
    tenantId
  )

  return (
    <>
      <TeamHeader
        totalMembers={teamMembers.length}
        adminsCount={
          teamMembers.filter((member) => member.role === UserRole.ADMIN).length
        }
        onNewMember={actions.openNewMember}
      />

      <TeamListTable rows={teamMembers} onDelete={actions.deleteMember} />

      <MemberDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={actions.closeDrawer}
        initialData={selectedMember}
      />
    </>
  )
}
