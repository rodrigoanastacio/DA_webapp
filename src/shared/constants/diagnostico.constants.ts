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
    description: 'Possui participação societária em uma banca de advocacia.'
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
    description: 'Escritórios em crescimento sustentável.'
  },
  {
    value: RevenueType.HIGH,
    label: 'Acima de R$ 40.000,00',
    description: 'Escritórios consolidados e alta performance.'
  }
]

export function formatRevenue(revenue: string): string {
  return REVENUE_LABELS[revenue as RevenueType] || revenue
}

export enum LeadStatusType {
  NOVO_LEAD = 'novo_lead',
  QUALIFICADO = 'qualificado',
  EM_CONTATO = 'em_contato',
  AGUARDANDO_DOC = 'aguardando_doc',
  CONVERTIDO = 'convertido',
  DESCARTADO = 'descartado'
}

export const LEAD_STATUS_LABELS: Record<LeadStatusType, string> = {
  [LeadStatusType.NOVO_LEAD]: 'NOVO LEAD',
  [LeadStatusType.QUALIFICADO]: 'QUALIFICADO',
  [LeadStatusType.EM_CONTATO]: 'EM CONTATO',
  [LeadStatusType.AGUARDANDO_DOC]: 'AGUARDANDO DOC',
  [LeadStatusType.CONVERTIDO]: 'CONVERTIDO',
  [LeadStatusType.DESCARTADO]: 'DESCARTADO'
}

export const LEAD_STATUS_STYLES: Record<LeadStatusType, string> = {
  [LeadStatusType.NOVO_LEAD]: 'bg-[#F3F4F6] text-[#374151]',
  [LeadStatusType.QUALIFICADO]: 'bg-[#E0F2FE] text-[#0369A1]',
  [LeadStatusType.EM_CONTATO]: 'bg-[#FEF3C7] text-[#92400E]',
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
