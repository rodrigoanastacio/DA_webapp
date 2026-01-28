'use client'

import { StatCard } from '@/components/dashboard/StatCard'
import { Summary } from '@/components/dashboard/Summary'
import { Button } from '@/components/ui/button'
import { Mail, Plus, ShieldCheck, User } from 'lucide-react'

interface TeamHeaderProps {
  totalMembers: number
  adminsCount: number
  onNewMember: () => void
}

export function TeamHeader({
  totalMembers,
  adminsCount,
  onNewMember
}: TeamHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Gestão de Equipe
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">
            Gerencie as permissões e acessos do seu time de especialistas.
          </p>
        </div>
        <Button
          onClick={onNewMember}
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-blue-400/20 transition-all flex items-center gap-2 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Novo Colaborador
        </Button>
      </div>

      <Summary>
        <StatCard
          variant="compact"
          label="Total de Membros"
          value={totalMembers}
          icon={User}
          iconColor="text-gray-200"
        />
        <StatCard
          variant="compact"
          label="Administradores"
          value={adminsCount}
          icon={ShieldCheck}
          iconColor="text-gray-200"
        />
        <StatCard
          variant="compact"
          label="Convites Pendentes"
          value={0}
          icon={Mail}
          iconColor="text-gray-200"
        />
      </Summary>
    </>
  )
}
