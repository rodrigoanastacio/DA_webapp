import {
  saveLandingPage,
  updateLandingPage
} from '@/services/landing-pages/actions'
import {
  LandingPageContent,
  SaveLandingPageResult
} from '@/services/landing-pages/types'
import { useState } from 'react'

export interface UseLandingPageReturn {
  save: (sections: LandingPageContent) => Promise<SaveLandingPageResult>
  update: (
    id: string,
    sections: LandingPageContent
  ) => Promise<SaveLandingPageResult>
  isSaving: boolean
}

export function useLandingPage(): UseLandingPageReturn {
  const [isSaving, setIsSaving] = useState(false)

  const save = async (
    sections: LandingPageContent
  ): Promise<SaveLandingPageResult> => {
    setIsSaving(true)
    try {
      const result = await saveLandingPage(sections)
      return result
    } catch (err) {
      console.error(err)
      return { success: false, message: 'Erro inesperado ao salvar.' }
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
    save,
    update,
    isSaving
  }
}
