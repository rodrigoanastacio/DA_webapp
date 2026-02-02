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
    text: 'Gestão Jurídica e Organização',
    showPulse: true
  },
  headline: {
    line1: 'Pare de ser refém do seu próprio escritório.',
    line2: 'Tenha processos que funcionam sem você.'
  },
  subheadline:
    'Serviços especializados em gestão, processos e previsibilidade para escritórios e advogados que buscam crescimento sustentável.',
  cta: {
    text: 'Fazer diagnóstico gratuito do meu escritório',
    href: '/diagnostico-de-gestao'
  }
}
