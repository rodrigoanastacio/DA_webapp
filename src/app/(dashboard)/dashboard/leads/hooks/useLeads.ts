'use client'

import { updateLeadStatus } from '@/app/(dashboard)/dashboard/leads/actions/updateLeadStatus'
import {
  formatAtuacao,
  formatLeadStatus,
  formatRevenue,
  getLeadStatusStyle
} from '@/shared/constants/lead.constants'
import { Diagnostico } from '@/shared/entities/diagnosticos/diagnostico.types'
import { Lead } from '@/shared/entities/leads/lead.types'
import { useState } from 'react'

export function useLeads(initialLeads: (Lead | Diagnostico)[] = []) {
  const [leads, setLeads] = useState<(Lead | Diagnostico)[]>(initialLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | Diagnostico | null>(
    null
  )
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLeadClick = (lead: Lead | Diagnostico) => {
    setSelectedLead(lead)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedLead(null)
  }

  const handleUpdateStatus = async (status: string) => {
    if (!selectedLead) return

    // Update local state for immediate feedback
    const updatedLead = { ...selectedLead, status }
    setSelectedLead(updatedLead)

    // Update the list as well
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    )

    const result = await updateLeadStatus(selectedLead.id, status)

    if (!result.success) {
      // Revert if failed
      setSelectedLead(selectedLead)
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? selectedLead : l))
      )
      console.error('Failed to update status')
    }
  }

  return {
    leads,
    selectedLead,
    isDrawerOpen,
    handleLeadClick,
    handleCloseDrawer,
    handleUpdateStatus,
    formatAtuacao,
    formatRevenue,
    formatLeadStatus,
    getLeadStatusStyle
  }
}
