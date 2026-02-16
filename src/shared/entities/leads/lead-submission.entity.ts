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
  readonly instagram: string
  readonly experienceTime: string
  readonly revenue: string
  readonly teamStructure: string
  readonly managementLevel: string
  readonly overloadChallenges: string
  readonly idealStructure: string
  readonly investment: string

  constructor(data: LeadFormData) {
    this.name = data.name
    this.email = data.email
    this.whatsapp = data.whatsapp
    this.instagram = data.instagram
    this.experienceTime = data.experienceTime
    this.revenue = data.revenue
    this.teamStructure = data.teamStructure
    this.managementLevel = data.managementLevel
    this.overloadChallenges = data.overloadChallenges
    this.idealStructure = data.idealStructure
    this.investment = data.investment
  }

  /**
   * Identifica se este lead representa um potencial cliente de alto valor
   * baseado em faturamento e disposição para call estratégica.
   */
  get isHighPotential(): boolean {
    const highRevenue = ['ABOVE_70K', 'FROM_30K_TO_70K'].includes(this.revenue)
    const interestedInCall = ['interested', 'need_more_info'].includes(
      this.investment
    )
    return highRevenue && interestedInCall
  }

  /**
   * Retorna um rótulo legível para o tamanho da equipe.
   */
  get teamSizeLabel(): string {
    const sizeMap: Record<string, string> = {
      solo: 'Solo',
      '1_2_people': '1-2 pessoas',
      '3_5_people': '3-5 pessoas',
      more_5_people: 'Mais de 5 pessoas'
    }
    return sizeMap[this.teamStructure] || 'Não Identificado'
  }

  /**
   * Gera um resumo do perfil operacional para logs ou notificações.
   */
  get profileSummary(): string {
    return `${this.revenue} | ${this.experienceTime} de exp. | Estrutura: ${this.teamSizeLabel}`
  }
}
