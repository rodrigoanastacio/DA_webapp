export enum LeadStatus {
  NOVO_LEAD = 'novo_lead',
  ANALISAR_LEAD = 'analisar_lead',
  EM_CONTATO = 'em_contato',
  QUALIFICADO = 'qualificado',
  AGENDADO = 'reuniao_agendada',
  NEGOCIACAO = 'em_negociacao',
  PROPOSTA = 'proposta_enviada',
  WON = 'won',
  LOST = 'lost',
  ARCHIVED = 'archived'
}

export const LeadStatusLabel: Record<LeadStatus, string> = {
  [LeadStatus.NOVO_LEAD]: 'Novo Lead',
  [LeadStatus.ANALISAR_LEAD]: 'Analisar Lead',
  [LeadStatus.EM_CONTATO]: 'Em contato',
  [LeadStatus.QUALIFICADO]: 'Qualificado',
  [LeadStatus.AGENDADO]: 'Em Reunião',
  [LeadStatus.NEGOCIACAO]: 'Em Negociação',
  [LeadStatus.PROPOSTA]: 'Proposta',
  [LeadStatus.WON]: 'Ganho',
  [LeadStatus.LOST]: 'Perdido',
  [LeadStatus.ARCHIVED]: 'Arquivado'
}

export const LeadStatusColor: Record<LeadStatus, string> = {
  [LeadStatus.NOVO_LEAD]: 'bg-cyan-100 text-cyan-600',
  [LeadStatus.ANALISAR_LEAD]: 'bg-amber-100 text-amber-700',
  [LeadStatus.EM_CONTATO]: 'bg-indigo-100 text-indigo-600',
  [LeadStatus.QUALIFICADO]: 'bg-purple-100 text-purple-600',
  [LeadStatus.AGENDADO]: 'bg-orange-100 text-orange-600',
  [LeadStatus.NEGOCIACAO]: 'bg-yellow-100 text-yellow-600',
  [LeadStatus.PROPOSTA]: 'bg-cyan-100 text-cyan-600',
  [LeadStatus.WON]: 'bg-emerald-100 text-emerald-600',
  [LeadStatus.LOST]: 'bg-red-100 text-red-600',
  [LeadStatus.ARCHIVED]: 'bg-gray-100 text-gray-600'
}
