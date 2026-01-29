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
import { UserRole, UserRoleLabel } from '@/shared/enums/UserRole'
import {
  Eye,
  Loader2,
  Mail,
  Shield,
  ShieldCheck,
  UserCog,
  UserPlus,
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface MemberDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  initialData?: {
    id: string
    fullName: string
    email: string
    role: UserRole
  } | null
}

export function MemberDetailsDrawer({
  isOpen,
  onClose,
  initialData
}: MemberDetailsDrawerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: UserRole.VIEWER
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.fullName,
        email: initialData.email,
        role: initialData.role
      })
    } else {
      setFormData({ full_name: '', email: '', role: UserRole.VIEWER })
    }
  }, [initialData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (initialData) {
        // Update Mode
        await teamService.update(initialData.id, {
          full_name: formData.full_name,
          role: formData.role
        })
        toast.success('Colaborador atualizado com sucesso!')
      } else {
        // Create Mode
        await teamService.invite(formData)
        toast.success('Convite enviado com sucesso!')
      }

      onClose()
      setFormData({ full_name: '', email: '', role: UserRole.VIEWER })
      router.refresh()
    } catch (error: unknown) {
      console.error('Erro ao atualizar membro:', error)
      toast.error('Erro ao salvar alterações')
    } finally {
      setIsLoading(false)
    }
  }

  const isEditing = !!initialData

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px] p-0 overflow-y-auto bg-white border-l border-gray-100 shadow-2xl">
        <SheetTitle className="sr-only">
          {isEditing ? 'Editar Colaborador' : 'Adicionar Novo Colaborador'}
        </SheetTitle>
        <SheetDescription className="sr-only">
          Formulário para gestão de membros da equipe.
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
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isEditing ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-400'}`}
            >
              {isEditing ? (
                <UserCog className="w-6 h-6" />
              ) : (
                <UserPlus className="w-6 h-6" />
              )}
            </div>
            <h2 className="text-[24px] font-extrabold text-[#111827] tracking-tight">
              {isEditing ? 'Editar Colaborador' : 'Novo Colaborador'}
            </h2>
            <p className="text-[14px] font-medium text-gray-400">
              {isEditing
                ? 'Atualize as permissões ou dados do membro.'
                : 'Cadastre um novo especialista para gerenciar os leads.'}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
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
                disabled={isEditing}
                placeholder="email@consultoria.com.br"
                className={`h-14 border-none rounded-2xl focus:ring-2 focus:ring-blue-400/20 transition-all font-bold pl-14 ${isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50/50'}`}
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
                  id: UserRole.ADMIN,
                  title: UserRoleLabel[UserRole.ADMIN],
                  desc: 'Acesso total ao sistema e gestão de equipe.',
                  icon: ShieldCheck,
                  color: 'text-blue-500',
                  bg: 'bg-blue-50'
                },
                {
                  id: UserRole.EDITOR,
                  title: UserRoleLabel[UserRole.EDITOR],
                  desc: 'Pode gerenciar leads e agenda, mas não equipe.',
                  icon: Shield,
                  color: 'text-green-500',
                  bg: 'bg-green-50'
                },
                {
                  id: UserRole.VIEWER,
                  title: UserRoleLabel[UserRole.VIEWER],
                  desc: 'Apenas leitura de dados e relatórios.',
                  icon: Eye,
                  color: 'text-gray-500',
                  bg: 'bg-gray-50'
                }
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: role.id })}
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
              ) : isEditing ? (
                'Salvar Alterações'
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
