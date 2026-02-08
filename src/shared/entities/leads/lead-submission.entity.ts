import { LeadFormData } from '@/lib/zod/lead.schema'

/**
 * Entidade de Domínio: LeadSubmission
 *
 * Representa uma submissão de lead completa com lógica de negócio encapsulada.
 * Esta camada é independente de banco de dados ou frameworks.
 */
export class LeadSubmission {
  readonly name: string
  readonly email: string
  readonly whatsapp: string
  readonly cityState: string
  readonly experienceTime: string
  readonly currentRole: string
  readonly teamStructure: string
  readonly managementLevel: string
  readonly dificuldades: string[]
  readonly revenue: string
  readonly expectativas: string
  readonly investment: string

  constructor(data: LeadFormData) {
    this.name = data.name
    this.email = data.email
    this.whatsapp = data.whatsapp
    this.cityState = data.cityState
    this.experienceTime = data.experienceTime
    this.currentRole = data.currentRole
    this.teamStructure = data.teamStructure
    this.managementLevel = data.managementLevel
    this.dificuldades = data.dificuldades
    this.revenue = data.revenue
    this.expectativas = data.expectativas
    this.investment = data.investment
  }

  /**
   * Identifica se este lead representa um potencial cliente de alto valor
   * baseado em faturamento e disposição para investimento.
   */
  get isHighPotential(): boolean {
    const highRevenue = ['more_100k', '50k_100k'].includes(this.revenue)
    const highInvestment = ['more_5k', '2k_5k'].includes(this.investment)
    return highRevenue || highInvestment
  }

  /**
   * Retorna um rótulo legível para o nível de maturidade da gestão.
   */
  get managementMaturityLabel(): string {
    const maturityMap: Record<string, string> = {
      precaria: 'Inexistente / Primitiva',
      basica: 'Básica (Apenas Financeiro)',
      desenvolvimento: 'Em Evolução',
      avancada: 'Profissional / Completa'
    }
    return maturityMap[this.managementLevel] || 'Não Identificada'
  }

  /**
   * Gera um resumo do perfil operacional para logs ou notificações.
   */
  get profileSummary(): string {
    return `${this.currentRole} | ${this.experienceTime} de exp. | Estrutura: ${this.teamStructure}`
  }
}
