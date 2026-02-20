export interface IHeroContent {
  badge: {
    text: string
    showPulse: boolean
  }
  headline: {
    line1: string
    line2: string
  }
  subheadline: string
  cta: {
    text: string
    href: string
  }
}

export const heroContent: IHeroContent = {
  badge: {
    text: 'Gestão Estratégica e Organização',
    showPulse: true
  },
  headline: {
    line1: 'Estruture sua empresa para crescer com previsibilidade.',
    line2:
      'Tenha processos que funcionam sem depender 100% da sua presença operacional.'
  },
  subheadline:
    'Gestão mensal estratégica para organizar processos, rotina e decisões — garantindo consistência, liberdade operacional e evolução sustentável.',
  cta: {
    text: 'Solicitar diagnóstico estratégico',
    href: '/diagnostico-de-gestao'
  }
}
