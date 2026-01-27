export enum AtuacaoType {
  AUTONOMO = 'autonomo',
  SOCIO = 'socio',
  ASSOCIADO = 'associado',
  DEPT_JURIDICO = 'dept_juridico'
}

export const ATUACAO_LABELS: Record<AtuacaoType, string> = {
  [AtuacaoType.AUTONOMO]: 'Advogado Autônomo',
  [AtuacaoType.SOCIO]: 'Sócio de Escritório',
  [AtuacaoType.ASSOCIADO]: 'Advogado Associado',
  [AtuacaoType.DEPT_JURIDICO]: 'Departamento Jurídico'
}

export const ATUACAO_OPTIONS = [
  {
    value: AtuacaoType.AUTONOMO,
    label: ATUACAO_LABELS[AtuacaoType.AUTONOMO],
    description: 'Atua sozinho, sem sócios ou equipe fixa.'
  },
  {
    value: AtuacaoType.SOCIO,
    label: ATUACAO_LABELS[AtuacaoType.SOCIO],
    description: 'Participação societária em escritório de advocacia.'
  },
  {
    value: AtuacaoType.ASSOCIADO,
    label: ATUACAO_LABELS[AtuacaoType.ASSOCIADO],
    description: 'Trabalha em escritório sem participação societária.'
  },
  {
    value: AtuacaoType.DEPT_JURIDICO,
    label: ATUACAO_LABELS[AtuacaoType.DEPT_JURIDICO],
    description: 'Atua internamente em empresas ou instituições.'
  }
]

export function formatAtuacao(atuacao: string): string {
  return ATUACAO_LABELS[atuacao as AtuacaoType] || atuacao
}

export enum RevenueType {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export const REVENUE_LABELS: Record<RevenueType, string> = {
  [RevenueType.LOW]: 'Até R$ 20 mil',
  [RevenueType.MEDIUM]: 'R$ 20 mil - R$ 40 mil',
  [RevenueType.HIGH]: 'Acima de R$ 40 mil'
}

export const REVENUE_OPTIONS = [
  {
    value: RevenueType.LOW,
    label: 'Até R$ 20.000,00',
    description: 'Escritórios em fase inicial ou reestruturação.'
  },
  {
    value: RevenueType.MEDIUM,
    label: 'De R$ 20.000,00 a R$ 40.000,00',
    description: 'Escritórios em crescimento/expansão.'
  },
  {
    value: RevenueType.HIGH,
    label: 'Acima de R$ 40.000,00',
    description: 'Escritórios consolidados.'
  }
]

export function formatRevenue(revenue: string): string {
  return REVENUE_LABELS[revenue as RevenueType] || revenue
}

export enum LeadStatusType {
  NOVO_LEAD = 'novo_lead',
  QUALIFICADO = 'qualificado',
  EM_CONTATO = 'em_contato',
  EM_NEGOCIACAO = 'em_negociacao',
  AGUARDANDO_DOC = 'aguardando_doc',
  CONVERTIDO = 'convertido',
  DESCARTADO = 'descartado'
}

export const LEAD_STATUS_LABELS: Record<LeadStatusType, string> = {
  [LeadStatusType.NOVO_LEAD]: 'NOVO LEAD',
  [LeadStatusType.QUALIFICADO]: 'QUALIFICADO',
  [LeadStatusType.EM_CONTATO]: 'EM CONTATO',
  [LeadStatusType.EM_NEGOCIACAO]: 'EM NEGOCIAÇÃO',
  [LeadStatusType.AGUARDANDO_DOC]: 'AGUARDANDO DOC',
  [LeadStatusType.CONVERTIDO]: 'CONVERTIDO',
  [LeadStatusType.DESCARTADO]: 'DESCARTADO'
}

export const LEAD_STATUS_STYLES: Record<LeadStatusType, string> = {
  [LeadStatusType.NOVO_LEAD]: 'bg-[#F3F4F6] text-[#374151]',
  [LeadStatusType.QUALIFICADO]: 'bg-[#E0F2FE] text-[#0369A1]',
  [LeadStatusType.EM_CONTATO]: 'bg-[#FEF3C7] text-[#92400E]',
  [LeadStatusType.EM_NEGOCIACAO]: 'bg-[#F3E8FF] text-[#6B21A8]', // Purple
  [LeadStatusType.AGUARDANDO_DOC]: 'bg-[#DBEAFE] text-[#1E40AF]',
  [LeadStatusType.CONVERTIDO]: 'bg-[#D1FAE5] text-[#065F46]',
  [LeadStatusType.DESCARTADO]: 'bg-[#FEE2E2] text-[#991B1B]'
}

export function formatLeadStatus(status: string): string {
  return (
    LEAD_STATUS_LABELS[status as LeadStatusType] ||
    (status ? status.toUpperCase() : 'SEM STATUS')
  )
}

export function getLeadStatusStyle(status: string): string {
  return (
    LEAD_STATUS_STYLES[status as LeadStatusType] || 'bg-gray-100 text-gray-700'
  )
}

// Experience Time
export const EXPERIENCE_OPTIONS = [
  { value: 'less_1', label: 'Menos de 1 ano' },
  { value: '1_3', label: '1 a 3 anos' },
  { value: '3_5', label: '3 a 5 anos' },
  { value: 'more_5', label: 'Mais de 5 anos' }
]

export function formatExperience(experience: string): string {
  const option = EXPERIENCE_OPTIONS.find((opt) => opt.value === experience)
  return option ? option.label : experience
}

// Team Structure
export const TEAM_STRUCTURE_OPTIONS = [
  {
    value: 'clt_associados',
    label: 'Sim, tenho funcionários CLT/Associados',
    description: 'Escritório com equipe fixa e estrutura formal'
  },
  {
    value: 'solo',
    label: 'Não, atuo sozinho',
    description: 'Advocacia autônoma ou em parceria pontual'
  },
  {
    value: 'estagiarios',
    label: 'Tenho apenas estagiários',
    description: 'Estrutura enxuta com apoio acadêmico'
  }
]

export function formatTeamStructure(structure: string): string {
  const option = TEAM_STRUCTURE_OPTIONS.find((opt) => opt.value === structure)
  return option ? option.label : structure
}

// Management Level
export const MANAGEMENT_LEVEL_OPTIONS = [
  {
    value: 'precaria',
    label: 'Precária / Inexistente',
    description: 'Não há controle de processos ou fluxo de caixa organizado.',
    icon: 'warning'
  },
  {
    value: 'basica',
    label: 'Básica (Financeiro)',
    description: 'Controle mínimo de contas a pagar e receber, sem estratégia.',
    icon: 'attach_money'
  },
  {
    value: 'desenvolvimento',
    label: 'Em desenvolvimento',
    description:
      'Existem processos definidos mas não documentados ou seguidos.',
    icon: 'trending_up'
  }
]

export function formatManagementLevel(level: string): string {
  const option = MANAGEMENT_LEVEL_OPTIONS.find((opt) => opt.value === level)
  return option ? option.label : level
}
