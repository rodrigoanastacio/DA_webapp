'use client'

import { LeadDetailsDrawer } from '@/components/dashboard/LeadDetailsDrawer'

import { StatCard } from '@/components/dashboard/StatCard'
import { Badge } from '@/components/ui/badge'
import { Lead, MOCK_LEADS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { BarChart3, MoreVertical, Star, Users } from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const totalLeads = 1240 // Matching screenshot
  const highPotentialLeads = 42
  const recentLeads = MOCK_LEADS.slice(0, 4)

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDrawerOpen(true)
  }

  // Helper para gerar avatar com iniciais
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Cores para avatares
  const avatarColors = [
    'bg-blue-100 text-blue-600',
    'bg-amber-100 text-amber-600',
    'bg-emerald-100 text-emerald-600',
    'bg-purple-100 text-purple-600'
  ]

  // Mock statuses mapping
  const getStatusInfo = (index: number) => {
    const statuses = [
      { label: 'QUALIFICADO', className: 'bg-[#E0F2FE] text-[#0369A1]' },
      { label: 'EM CONTATO', className: 'bg-[#FEF3C7] text-[#92400E]' },
      { label: 'AGUARDANDO DOC', className: 'bg-[#DBEAFE] text-[#1E40AF]' },
      { label: 'NOVO LEAD', className: 'bg-[#F3F4F6] text-[#374151]' }
    ]
    return statuses[index % statuses.length]
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header com Saudação */}
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
          Bem-vinda,{' '}
          <span className="font-extrabold text-blue-600">Dayane</span>
        </h1>
        <p className="text-gray-400 font-medium text-sm mt-1">
          Visão geral da performance em 24 de Maio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total de Leads"
          value="180.240"
          icon={Users}
          trend={{ value: '+5.2%', direction: 'up' }}
        />

        <StatCard
          label="Leads P0 (Alto Potencial)"
          value="42"
          icon={Star}
          trend={{ value: '+2.1%', direction: 'up' }}
          iconColor="text-gray-200 fill-gray-100"
        />

        <StatCard
          label="Taxa de Conversão"
          value="12.4%"
          icon={BarChart3}
          trend={{ value: '+0.8%', direction: 'up' }}
        />
      </div>

      {/* Tabela de Leads */}
      <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white">
          <h2 className="text-[16px] font-extrabold text-gray-900 uppercase tracking-wider">
            Gestão de Leads
          </h2>
          <div className="flex items-center gap-6">
            <button className="text-[12px] font-bold text-gray-400 hover:text-gray-900 tracking-widest uppercase transition-colors">
              Exportar
            </button>
            <button className="text-[12px] font-extrabold text-blue-600 hover:text-blue-700 tracking-widest uppercase transition-colors">
              Filtros
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="px-8 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Nome do Lead
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Empresa
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Faturamento Est.
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Data
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-center text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentLeads.map((lead, index) => {
                const statusInfo = getStatusInfo(index)
                const isP0 = index % 2 === 0 // Ricardo and Felipe in screenshot are marked with star

                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                    onClick={() => handleLeadClick(lead)}
                  >
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        {/* <div className="w-5 flex justify-center">
                          {isP0 && (
                            <Star className="w-4 h-4 text-blue-600 fill-blue-600 shrink-0" />
                          )}
                        </div> */}
                        {/* <div
                          className={cn(
                            'w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm tracking-tighter shrink-0 transition-transform group-hover:scale-105',
                            avatarColors[index % avatarColors.length]
                          )}
                        >
                          {getInitials(lead.nome_completo)}
                        </div> */}
                        <div className="flex flex-col">
                          <span className="font-extrabold text-gray-900 text-[15px]">
                            {lead.nome_completo}
                          </span>
                          <span className="text-xs font-medium text-gray-400">
                            {lead.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-500">
                        {lead.atuacao === 'advogado_autonomo'
                          ? 'Advogado Autônomo'
                          : 'Escritório Jurídico'}
                      </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="text-[15px] font-extrabold text-gray-900">
                        R$ {lead.faturamento.replace('_', '-')}
                      </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString(
                            'pt-BR',
                            { day: '2-digit', month: 'short' }
                          )}
                        </span>
                        <span className="text-[11px] font-medium text-gray-400 uppercase">
                          {new Date(lead.created_at).getFullYear()}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <Badge
                        className={cn(
                          'border-0 shadow-none font-extrabold text-[10px] tracking-widest px-4 py-1.5 rounded-lg',
                          statusInfo.className
                        )}
                      >
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-center">
                      <button className="p-2 hover:bg-white rounded-xl transition-colors inline-block hover:shadow-sm">
                        <MoreVertical className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-between text-gray-400 font-bold text-[11px] uppercase tracking-[2px]">
          <span>Página 1 de 8</span>
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-900 transition-colors cursor-not-allowed opacity-50">
              Anterior
            </button>
            <button className="hover:text-blue-600 transition-colors font-extrabold">
              Próxima
            </button>
          </div>
        </div>
      </div>

      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
}
