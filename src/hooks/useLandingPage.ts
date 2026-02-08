import {
  createLandingPage,
  updateLandingPage
} from '@/services/landing-pages/actions'
import {
  CreateLandingPageInput,
  LandingPageContent,
  SaveLandingPageResult
} from '@/services/landing-pages/types'
import { useState } from 'react'

export interface UseLandingPageReturn {
  create: (input: CreateLandingPageInput) => Promise<SaveLandingPageResult>
  update: (
    id: string,
    sections: LandingPageContent
  ) => Promise<SaveLandingPageResult>
  isSaving: boolean
}

export function useLandingPage(): UseLandingPageReturn {
  const [isSaving, setIsSaving] = useState(false)

  const create = async (
    input: CreateLandingPageInput
  ): Promise<SaveLandingPageResult> => {
    setIsSaving(true)
    try {
      const result = await createLandingPage(input)
      if (!result.success) {
        // Optionally trigger toast here or let component handle it
      }
      return result
    } catch (err) {
      console.error(err)
      return { success: false, message: 'Erro inesperado ao criar.' }
    } finally {
      setIsSaving(false)
    }
  }

  const update = async (
    id: string,
    sections: LandingPageContent
  ): Promise<SaveLandingPageResult> => {
    setIsSaving(true)
    try {
      const result = await updateLandingPage(id, sections)
      return result
    } catch (error) {
      console.error(error)
      return { success: false, message: 'Erro inesperado ao atualizar.' }
    } finally {
      setIsSaving(false)
    }
  }

  return {
    create,
    update,
    isSaving
  }
}
