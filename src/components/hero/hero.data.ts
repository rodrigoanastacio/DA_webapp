export interface IHeroContent {
  badge: {
    text: string
    showPulse: boolean
  }
  headline: string
  subheadline: string
  cta: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export const heroContent: IHeroContent = {
  badge: {
    text: 'Gestão Estratégica e Organização',
    showPulse: true
  },
  headline:
    'Em até 90 dias, estruturamos a operação do seu escritório ou empresa para funcionar com previsibilidade, controle e menor dependência de você',
  subheadline:
    'Você já fatura bem, tem um negócio consolidado, mas sente que seu próximo nível de crescimento está limitado pela desorganização interna, sobrecarga e retrabalho — o problema não é falta de clientes. É falta de estrutura estratégica.',
  cta: {
    text: 'Agendar Conversa Estratégica de Reestruturação',
    href: '/diagnostico-de-gestao'
  },
  backgroundImage: '/assets/avatar.jpg' // Apenas troque pelo caminho da imagem final aqui
}
