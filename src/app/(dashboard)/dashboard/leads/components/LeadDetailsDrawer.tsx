'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle
} from '@/components/ui/sheet'
import {
  formatAtuacao,
  formatExperience,
  formatLeadStatus,
  formatManagementLevel,
  formatRevenue,
  formatTeamStructure,
  getLeadStatusStyle,
  LeadStatusType
} from '@/shared/constants/diagnostico.constants'
import { Lead } from '@/shared/entities/diagnostico/lead.types'
import {
  AlertCircle,
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  User,
  X
} from 'lucide-react'

interface LeadDetailsDrawerProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus?: (status: string) => void
}

import { useState } from 'react' // Ensure React hook import
import { ScheduleMeetingModal } from './ScheduleMeetingModal' // Import Modal

export function LeadDetailsDrawer({
  lead,
  isOpen,
  onClose,
  onUpdateStatus
}: LeadDetailsDrawerProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  if (!lead) return null

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-[600px] p-0 overflow-y-auto bg-white border-l border-gray-100 shadow-2xl">
          <SheetTitle className="sr-only">
            Detalhes do Lead: {lead.nome_completo}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Visualização completa das informações coletadas no diagnóstico de
            gestão jurídica.
          </SheetDescription>
          {/* Header Section */}
          <div className="p-8 border-b border-gray-50 bg-white sticky top-0 z-10">
            <button
              onClick={onClose}
              className="absolute right-8 top-8 p-1 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <h2 className="text-[28px] font-extrabold text-[#111827] tracking-tight">
                {lead.nome_completo}
              </h2>
              <p className="text-[13px] font-medium text-gray-400 uppercase tracking-wider">
                Lead captado via Landing Page em{' '}
                {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                className="bg-[#10B981] hover:bg-[#059669] text-white flex items-center gap-2 rounded-xl h-12 px-6 font-bold shadow-sm transition-all active:scale-95"
                onClick={() =>
                  window.open(
                    `https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`,
                    '_blank'
                  )
                }
              >
                <MessageCircle className="w-5 h-5" />
                WHATSAPP
              </Button>
              <Button
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center gap-2 rounded-xl h-12 px-6 font-bold shadow-sm transition-all active:scale-95 text-[14px]"
                onClick={() => setIsScheduleModalOpen(true)}
              >
                <Calendar className="w-5 h-5 text-blue-100" />
                AGENDAR
              </Button>
              <div className="flex-1 min-w-[180px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-between px-5 h-12 rounded-xl border-2 border-gray-100 bg-white text-[13px] font-extrabold text-gray-900 group hover:border-blue-400 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-400/20">
                      <span className="flex items-center gap-2">
                        STATUS:{' '}
                        <Badge
                          className={`border-0 shadow-none font-extrabold text-[10px] tracking-widest px-2 py-0.5 rounded ${getLeadStatusStyle(lead.status)}`}
                        >
                          {formatLeadStatus(lead.status)}
                        </Badge>
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    {Object.values(LeadStatusType).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => onUpdateStatus?.(status)}
                        className="cursor-pointer"
                      >
                        <Badge
                          className={`w-full justify-center border-0 shadow-none font-extrabold text-[10px] tracking-widest px-2 py-1 rounded ${getLeadStatusStyle(status)}`}
                        >
                          {formatLeadStatus(status)}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-10">
            {/* Perfil Profissional */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="w-5 h-5 fill-blue-600/10" />
                </div>
                <h3 className="text-[14px] font-extrabold uppercase tracking-widest text-[#1e40af]">
                  Perfil Profissional
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8 p-8 rounded-[24px] bg-[#f8fafc]/50 border border-gray-100/50">
                {/* Removido campos mock (Especialidade/OAB) pois não existem no banco */}
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Tempo de Atuação
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {formatExperience(lead.tempo)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Localização
                  </p>
                  <p className="text-[15px] font-bold text-blue-600 underline underline-offset-4 decoration-blue-200 cursor-pointer">
                    {lead.cidade_estado}
                  </p>
                </div>
              </div>
            </section>

            {/* Estrutura do Escritório */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase className="w-5 h-5 fill-blue-600/10" />
                </div>
                <h3 className="text-[14px] font-extrabold uppercase tracking-widest text-[#1e40af]">
                  Estrutura do Escritório
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8 p-8 rounded-[24px] bg-[#f8fafc]/50 border border-gray-100/50">
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Tamanho da Equipe
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {formatTeamStructure(lead.estrutura_equipe)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Modelo de Negócio
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {formatAtuacao(lead.atuacao)}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    Resumo da Operação
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-white border-gray-200 text-gray-600 px-3 py-1 text-[11px] font-bold"
                    >
                      Gestão {formatManagementLevel(lead.nivel_gestao)}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white border-gray-200 text-gray-600 px-3 py-1 text-[11px] font-bold"
                    >
                      Faturamento: {formatRevenue(lead.faturamento)}
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Dores Identificadas */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-rose-500">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 fill-rose-500/10" />
                </div>
                <h3 className="text-[14px] font-extrabold uppercase tracking-widest text-rose-800">
                  Dores & Expectativas
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-500">
                  O lead declarou ter &quot;alta urgência&quot; para resolver o
                  problema.
                </p>
                {lead.dificuldades.map((dificuldade, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-rose-50/30 border border-rose-100 flex gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[14px] font-bold text-rose-900 leading-tight">
                        {dificuldade
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                      <p className="text-[12px] text-rose-600/70 font-medium">
                        Dificuldade crítica identificada no diagnóstico inicial.
                      </p>
                    </div>
                  </div>
                ))}

                <div className="p-5 rounded-2xl bg-[#fff7ed] border border-[#ffedd5] flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#ffedd5] flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-[#ea580c]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[14px] font-bold text-[#9a3412] leading-tight">
                      Expectativas do Lead
                    </p>
                    <p className="text-[13px] text-[#9a3412]/70 font-medium italic">
                      "{lead.expectativas}"
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-[#f8fafc] border-t border-gray-100 sticky bottom-0 z-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 shadow-none"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 shadow-none"
                >
                  <Mail className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 shadow-none"
                >
                  <FileText className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <button className="text-[11px] font-extrabold text-gray-400 hover:text-rose-500 uppercase tracking-widest transition-colors">
                  DESCARTAR LEAD
                </button>
                <Button
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl h-12 px-8 font-extrabold shadow-lg shadow-blue-200/50 transition-all active:scale-95 text-[14px] tracking-tight"
                  onClick={() =>
                    (window.location.href = `/dashboard/meeting/${lead.id}`)
                  }
                >
                  INICIAR REUNIÃO
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ScheduleMeetingModal
        lead={lead}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </>
  )
}
