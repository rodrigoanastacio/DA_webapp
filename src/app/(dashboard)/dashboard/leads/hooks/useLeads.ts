'use client'

import { updateLeadStatus } from '@/app/(dashboard)/dashboard/leads/actions/updateLeadStatus'
import {
  formatAtuacao,
  formatLeadStatus,
  formatRevenue,
  getLeadStatusStyle
} from '@/shared/constants/lead.constants'
import { Lead } from '@/shared/entities/leads/lead.types'
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

  const handleUpdateStatus = async (status: string) => {
    if (!selectedLead) return

    const updatedLead = { ...selectedLead, status }
    setSelectedLead(updatedLead)

    const result = await updateLeadStatus(selectedLead.id, status)

    if (!result.success) {
      setSelectedLead(selectedLead)
      console.error('Failed to update status')
    }
  }

  return {
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
