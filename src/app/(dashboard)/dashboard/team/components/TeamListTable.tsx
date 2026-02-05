import InteractiveTable, {
  type Column
} from '@/components/dashboard/InteractiveTable'
import { ActionTooltip } from '@/components/ui/action-tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UserRoleLabel } from '@/shared/enums/UserRole'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { TeamMemberRow } from '../types'

interface TeamListTableProps {
  rows: TeamMemberRow[]
  onDelete: (id: string) => Promise<void>
}

export function TeamListTable({ rows, onDelete }: TeamListTableProps) {
  const [memberToDelete, setMemberToDelete] = useState<TeamMemberRow | null>(
    null
  )
  const [isDeleting, setIsDeleting] = useState(false)

  const confirmDelete = async () => {
    if (!memberToDelete) return

    setIsDeleting(true)
    try {
      await onDelete(memberToDelete.id)
    } finally {
      setIsDeleting(false)
      setMemberToDelete(null)
    }
  }

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
            <p className="text-sm font-bold text-gray-900 transition-colors">
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
          {UserRoleLabel[member.role] || member.role}
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
      render: (member) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              member.isActive
                ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)]'
                : 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]'
            }`}
          />
          <span className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider">
            {member.isActive ? 'Ativo' : 'Pendente'}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Ação',
      align: 'center',
      render: (member) => (
        <ActionTooltip label="Excluir Usuário">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setMemberToDelete(member)
            }}
            className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </ActionTooltip>
      )
    }
  ]

  return (
    <>
      <InteractiveTable<TeamMemberRow>
        columns={columns}
        rows={rows}
        pagination
        rowsPerPageOptions={[10, 20, 50]}
      />

      <AlertDialog
        open={!!memberToDelete}
        onOpenChange={(open) => !open && setMemberToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir{' '}
              <strong className="text-gray-900">
                {memberToDelete?.fullName}
              </strong>
              . Essa ação removerá o acesso ao sistema imediatamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                confirmDelete()
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 font-bold"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Sim, excluir usuário'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
