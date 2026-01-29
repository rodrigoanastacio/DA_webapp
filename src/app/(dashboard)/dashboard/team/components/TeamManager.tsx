'use client'

import { env } from '@/config/env'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'
import { refreshTeamList } from '../actions'
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

export function TeamManager({ rows: initialRows }: TeamManagerProps) {
  const [rows, setRows] = useState(initialRows)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMemberRow | null>(
    null
  )

  const supabase = createBrowserClient(env.supabase.url, env.supabase.anonKey)

  useEffect(() => {
    const channel = supabase
      .channel('team-list-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        async () => {
          const updatedRows = await refreshTeamList()
          setRows(updatedRows)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

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
