'use client'

import { Lead } from '@/shared/entities/diagnostico/lead.types'
import { useState } from 'react'

/**
 * Hook para centralizar a lógica de comportamento do módulo de Leads
 */
export function useLeads() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedLead(null)
  }

  /**
   * Mapeia status mock baseado no índice
   * TODO: Substituir por status real do banco de dados
   */
  const getStatusInfo = (index: number) => {
    const statuses = [
      { label: 'QUALIFICADO', className: 'bg-[#E0F2FE] text-[#0369A1]' },
      { label: 'EM CONTATO', className: 'bg-[#FEF3C7] text-[#92400E]' },
      { label: 'AGUARDANDO DOC', className: 'bg-[#DBEAFE] text-[#1E40AF]' },
      { label: 'NOVO LEAD', className: 'bg-[#F3F4F6] text-[#374151]' }
    ]
    return statuses[index % statuses.length]
  }

  /**
   * Formata tipo de atuação para exibição
   */
  const formatAtuacao = (atuacao: string) => {
    return atuacao === 'advogado_autonomo'
      ? 'Advogado Autônomo'
      : 'Escritório Jurídico'
  }

  /**
   * Formata faturamento para exibição
   */
  const formatFaturamento = (faturamento: string) => {
    return `R$ ${faturamento.replace('_', '-')}`
  }

  return {
    // Estado
    selectedLead,
    isDrawerOpen,
    // Ações
    handleLeadClick,
    handleCloseDrawer,
    // Formatadores
    getStatusInfo,
    formatAtuacao,
    formatFaturamento
  }
}
