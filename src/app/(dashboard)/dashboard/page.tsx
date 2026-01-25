'use client'

import InteractiveTable, {
  type Column
} from '@/components/dashboard/InteractiveTable'
import { LeadDetailsDrawer } from '@/components/dashboard/LeadDetailsDrawer'
import { StatCard } from '@/components/dashboard/StatCard'
import { Summary } from '@/components/dashboard/Summary'
import { Badge } from '@/components/ui/badge'
import { Lead, MOCK_LEADS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { BarChart3, Star, Users } from 'lucide-react'
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

  const columns: Column<Lead>[] = [
    {
      key: 'nome_completo',
      label: 'Nome do Lead',
      sortable: true,
      render: (lead) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-gray-900 text-[15px]">
            {lead.nome_completo}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {lead.email}
          </span>
        </div>
      )
    },
    {
      key: 'atuacao',
      label: 'Empresa',
      render: (lead) => (
        <span className="text-sm font-bold text-gray-500">
          {lead.atuacao === 'advogado_autonomo'
            ? 'Advogado Autônomo'
            : 'Escritório Jurídico'}
        </span>
      )
    },
    {
      key: 'faturamento',
      label: 'Faturamento Est.',
      sortable: false,
      render: (lead) => (
        <span className="text-[15px] font-extrabold text-gray-900">
          R$ {lead.faturamento.replace('_', '-')}
        </span>
      )
    },
    {
      key: 'created_at',
      label: 'Data',
      sortable: false,
      render: (lead) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-gray-500">
            {new Date(lead.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short'
            })}
          </span>
          <span className="text-[11px] font-medium text-gray-400 uppercase">
            {new Date(lead.created_at).getFullYear()}
          </span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_lead, idx) => {
        const statusInfo = getStatusInfo(idx ?? 0)
        return (
          <Badge
            className={cn(
              'border-0 shadow-none font-extrabold text-[10px] tracking-widest px-4 py-1.5 rounded-lg',
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </Badge>
        )
      }
    }
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

      <Summary>
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
      </Summary>

      {/* Tabela de Leads */}
      <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.01)] border border-gray-50 overflow-hidden">
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

        <InteractiveTable<Lead>
          columns={columns}
          rows={recentLeads}
          pagination
          rowsPerPageOptions={[10, 20, 50]}
          initialsKey="nome_completo"
          onRowClick={handleLeadClick}
        />
      </div>

      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
}
