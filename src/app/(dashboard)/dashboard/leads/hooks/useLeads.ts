'use client'

import {
  formatAtuacao,
  formatLeadStatus,
  formatRevenue,
  getLeadStatusStyle
} from '@/shared/constants/diagnostico.constants'
import { Lead } from '@/shared/entities/diagnostico/lead.types'
import { useState } from 'react'

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

  return {
    selectedLead,
    isDrawerOpen,
    handleLeadClick,
    handleCloseDrawer,
    formatAtuacao,
    formatRevenue,
    formatLeadStatus,
    getLeadStatusStyle
  }
}
