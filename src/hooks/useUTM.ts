'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface UTMParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  referrer: string | null
}

const STORAGE_KEY = 'lp_utm_params'

export function useUTM() {
  const searchParams = useSearchParams()
  const [utms, setUtms] = useState<UTMParams | null>(null)

  useEffect(() => {
    // 1. Tentar ler da URL
    const currentUtms: UTMParams = {
      utm_source: searchParams?.get('utm_source') || null,
      utm_medium: searchParams?.get('utm_medium') || null,
      utm_campaign: searchParams?.get('utm_campaign') || null,
      utm_content: searchParams?.get('utm_content') || null,
      utm_term: searchParams?.get('utm_term') || null,
      referrer: document.referrer || null
    }

    // Se temos UTMs na URL, salvamos e usamos
    if (
      currentUtms.utm_source ||
      currentUtms.utm_medium ||
      currentUtms.utm_campaign
    ) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentUtms))
      setUtms(currentUtms)
      return
    }

    // 2. Se não, tentar ler do Storage (persistencia na sessão)
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUtms(JSON.parse(stored))
      } catch {
        // Ignorar erro de parse
      }
    }
  }, [searchParams])

  return utms
}
