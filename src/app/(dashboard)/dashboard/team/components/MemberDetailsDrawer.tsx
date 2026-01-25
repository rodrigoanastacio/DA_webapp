'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle
} from '@/components/ui/sheet'
import { teamService } from '@/services/team/team.service'
import {
  Eye,
  Loader2,
  Mail,
  Shield,
  ShieldCheck,
  UserPlus,
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface MemberDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MemberDetailsDrawer({
  isOpen,
  onClose
}: MemberDetailsDrawerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await teamService.invite(formData)
      onClose()
      setFormData({ full_name: '', email: '', role: 'viewer' })
      router.refresh() // Recarrega os dados do servidor
    } catch (err: any) {
      setError(err.error || err.message || 'Erro ao convidar membro')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px] p-0 overflow-y-auto bg-white border-l border-gray-100 shadow-2xl">
        <SheetTitle className="sr-only">Adicionar Novo Colaborador</SheetTitle>
        <SheetDescription className="sr-only">
          Preencha os dados abaixo para convidar um novo membro para sua equipe.
        </SheetDescription>

        {/* Header */}
        <div className="p-8 border-b border-gray-50 bg-white sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute right-8 top-8 p-1 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-1">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 mb-4">
              <UserPlus className="w-6 h-6" />
            </div>
            <h2 className="text-[24px] font-extrabold text-[#111827] tracking-tight">
              Novo Colaborador
            </h2>
            <p className="text-[14px] font-medium text-gray-400">
              Cadastre um novo especialista para gerenciar os leads.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {/* Nome Completo */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px]">
              Nome Completo
            </label>
            <div className="relative">
              <Input
                required
                placeholder="Ex: João Silva"
                className="h-14 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400/20 transition-all font-bold px-5"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>
          </div>

          {/* E-mail Profissional */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px]">
              E-mail de Acesso
            </label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <Input
                required
                type="email"
                placeholder="email@consultoria.com.br"
                className="h-14 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400/20 transition-all font-bold pl-14"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Nível de Acesso (Roles) */}
          <div className="space-y-4">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px]">
              Nível de Permissão
            </label>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  id: 'admin',
                  title: 'Administrador',
                  desc: 'Acesso total ao sistema e gestão de equipe.',
                  icon: ShieldCheck,
                  color: 'text-blue-500',
                  bg: 'bg-blue-50'
                },
                {
                  id: 'editor',
                  title: 'Editor',
                  desc: 'Pode gerenciar leads e agenda, mas não equipe.',
                  icon: Shield,
                  color: 'text-green-500',
                  bg: 'bg-green-50'
                },
                {
                  id: 'viewer',
                  title: 'Visualizador',
                  desc: 'Apenas leitura de dados e relatórios.',
                  icon: Eye,
                  color: 'text-gray-500',
                  bg: 'bg-gray-50'
                }
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: role.id as any })
                  }
                  className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left group ${
                    formData.role === role.id
                      ? 'border-blue-400 bg-blue-50/30'
                      : 'border-gray-50 hover:border-gray-100 bg-white'
                  }`}
                >
                  <div
                    className={`mt-1 w-10 h-10 rounded-xl ${role.bg} flex items-center justify-center ${role.color} shrink-0`}
                  >
                    <role.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-sm font-bold ${formData.role === role.id ? 'text-blue-600' : 'text-gray-900'}`}
                    >
                      {role.title}
                    </p>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-gray-50 flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-blue-400 hover:bg-blue-500 text-white rounded-2xl font-black text-[14px] uppercase tracking-widest shadow-xl shadow-blue-400/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Confirmar Cadastro'
              )}
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="h-12 w-full text-[11px] font-black text-gray-400 uppercase tracking-[2px] hover:text-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
