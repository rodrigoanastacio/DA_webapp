'use client'

import InteractiveTable, {
  type Column
} from '@/components/dashboard/InteractiveTable'
import { cn } from '@/lib/utils'

type TeamMemberRow = {
  id: string
  fullName: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  avatarUrl?: string | null
  formattedJoinDate: string
  roleBadgeStyles: string
  initials: string
}

interface TeamListTableProps {
  rows: TeamMemberRow[]
}

export function TeamListTable({ rows }: TeamListTableProps) {
  const columns: Column<TeamMemberRow>[] = [
    {
      key: 'fullName',
      label: 'Colaborador',
      render: (member) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-400 font-bold text-sm border-2 border-white shadow-sm overflow-hidden">
            {member.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.avatarUrl}
                alt={member.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              member.initials
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-400 transition-colors">
              {member.fullName}
            </p>
            <p className="text-xs font-medium text-gray-400 italic lowercase">
              {member.email}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (member) => (
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest',
            member.roleBadgeStyles
          )}
        >
          {member.role}
        </span>
      )
    },
    {
      key: 'formattedJoinDate',
      label: 'Data de Inscrição',
      render: (member) => (
        <p className="text-sm font-bold text-gray-500">
          {member.formattedJoinDate}
        </p>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: () => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
          <span className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider">
            Ativo
          </span>
        </div>
      )
    }
  ]

  return (
    <InteractiveTable<TeamMemberRow>
      columns={columns}
      rows={rows}
      pagination
      rowsPerPageOptions={[10, 20, 50]}
    />
  )
}
