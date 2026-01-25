'use client'

import { Button } from '@/components/ui/button'
import { Mail, Plus, ShieldCheck, User } from 'lucide-react'
import { useState } from 'react'
import { MemberDetailsDrawer } from './MemberDetailsDrawer'

interface TeamHeaderProps {
  totalMembers: number
  adminsCount: number
}

export function TeamHeader({ totalMembers, adminsCount }: TeamHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
          onClick={() => setIsDrawerOpen(true)}
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-blue-400/20 transition-all flex items-center gap-2 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Novo Colaborador
        </Button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">
              Total de Membros
            </p>
            <p className="text-2xl font-black text-gray-900">{totalMembers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">
              Administradores
            </p>
            <p className="text-2xl font-black text-gray-900">{adminsCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">
              Convites Pendentes
            </p>
            <p className="text-2xl font-black text-gray-900">0</p>
          </div>
        </div>
      </div>

      <MemberDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}
