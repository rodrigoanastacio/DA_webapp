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
  formatExperience,
  formatLeadStatus,
  formatRevenue,
  formatTeamStructure,
  getLeadStatusStyle,
  LeadStatusType
} from '@/shared/constants/lead.constants'
import {
  Diagnostico,
  isDiagnostico
} from '@/shared/entities/diagnosticos/diagnostico.types'
import { Lead } from '@/shared/entities/leads/lead.types'
import {
  AlertCircle,
  Briefcase,
  ChevronDown,
  FileText,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  User,
  X
} from 'lucide-react'

interface LeadDetailsDrawerProps {
  lead: Lead | Diagnostico | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus?: (status: string) => void
}

export function LeadDetailsDrawer({
  lead,
  isOpen,
  onClose,
  onUpdateStatus
}: LeadDetailsDrawerProps) {
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
                variant="outline"
                className="bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center gap-2 rounded-xl h-12 px-6 font-bold shadow-sm transition-all active:scale-95 text-[14px]"
                disabled={!lead.whatsapp}
                onClick={() =>
                  lead.whatsapp &&
                  window.open(
                    `https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`,
                    '_blank'
                  )
                }
              >
                <MessageCircle className="w-5 h-5" />
                WHATSAPP
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
            {/* Perfil Profissional - Only for Diagnostico */}
            {isDiagnostico(lead) && (
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
                      Instagram
                    </p>
                    {lead.instagram ? (
                      <a
                        href={`https://instagram.com/${lead.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                      >
                        <Instagram className="w-4 h-4" />
                        {lead.instagram}
                      </a>
                    ) : (
                      <p className="text-[15px] font-bold text-gray-400">-</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Estrutura do Escritório - Only for Diagnostico */}
            {isDiagnostico(lead) && (
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
                      Faturamento Mensal
                    </p>
                    <p className="text-[15px] font-bold text-emerald-600">
                      {formatRevenue(lead.faturamento)}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                      Nível de Gestão (Auto-avaliação)
                    </p>
                    <div className="p-4 bg-white rounded-xl border border-gray-100 text-[13px] text-gray-600 italic">
                      &quot;{lead.nivel_gestao}&quot;
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Dores Identificadas - Only for Diagnostico */}
            {isDiagnostico(lead) && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-rose-500">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 fill-rose-500/10" />
                  </div>
                  <h3 className="text-[14px] font-extrabold uppercase tracking-widest text-rose-800">
                    Diagnóstico Detalhado
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Desafio de Sobrecarga */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <p className="text-[11px] font-extrabold text-rose-600 uppercase tracking-widest">
                        Principais Desafios de Sobrecarga
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100">
                      <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {lead.desafio_sobrecarga || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  {/* Estrutura Ideal */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <p className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest">
                        Estrutura Ideal Desejada
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                      <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {lead.estrutura_ideal || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  {/* Investimento / Call Alert */}
                  {lead.is_high_potential && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                      <div className="p-1 bg-emerald-100 rounded-full mt-0.5">
                        <AlertCircle className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-emerald-800">
                          Interesse em Call Estratégica
                        </p>
                        <p className="text-[12px] text-emerald-600 mt-0.5">
                          Este lead demonstrou interesse explícito em agendar
                          uma conversa.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
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
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
