type GTMEvent = {
  event: string
  [key: string]: unknown
}

export const sendGTMEvent = (data: GTMEvent) => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
