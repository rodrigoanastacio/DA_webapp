export interface Lead {
  id: string
  nome_completo: string
  email: string
  whatsapp: string
  cidade_estado: string
  tempo: string
  atuacao: string
  estrutura_equipe: string
  nivel_gestao: string
  dificuldades: string[]
  faturamento: string
  expectativas: string
  investimento: string
  created_at: string
  is_high_potential: boolean
}

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    nome_completo: 'Dr. Carlos Eduardo Silva',
    email: 'carlos.silva@adv.com',
    whatsapp: '11987654321',
    cidade_estado: 'São Paulo/SP',
    tempo: '3_5_anos',
    atuacao: 'advogado_autonomo',
    estrutura_equipe: 'sozinho',
    nivel_gestao: 'basica',
    dificuldades: [
      'controle_prazos',
      'organizacao_documentos',
      'atendimento_clientes'
    ],
    faturamento: '50k_100k',
    expectativas:
      'Preciso urgentemente de ajuda para organizar meu escritório. Estou perdendo prazos e clientes por falta de estrutura.',
    investimento: 'more_5k',
    created_at: '2026-01-23T10:30:00',
    is_high_potential: true
  },
  {
    id: '2',
    nome_completo: 'Dra. Mariana Costa',
    email: 'mariana.costa@juridico.com.br',
    whatsapp: '21976543210',
    cidade_estado: 'Rio de Janeiro/RJ',
    tempo: '5_10_anos',
    atuacao: 'socio_escritorio',
    estrutura_equipe: '2_5_pessoas',
    nivel_gestao: 'desenvolvimento',
    dificuldades: ['gestao_equipe', 'processos_internos'],
    faturamento: 'more_100k',
    expectativas:
      'Quero profissionalizar a gestão do escritório e implementar processos eficientes.',
    investimento: '2k_5k',
    created_at: '2026-01-22T14:20:00',
    is_high_potential: true
  },
  {
    id: '3',
    nome_completo: 'Dr. Roberto Almeida',
    email: 'roberto.almeida@adv.br',
    whatsapp: '31965432109',
    cidade_estado: 'Belo Horizonte/MG',
    tempo: '2_3_anos',
    atuacao: 'advogado_autonomo',
    estrutura_equipe: 'sozinho',
    nivel_gestao: 'precaria',
    dificuldades: ['organizacao_documentos', 'controle_financeiro'],
    faturamento: '30k_50k',
    expectativas: 'Busco organização básica para conseguir crescer sem caos.',
    investimento: '1k_2k',
    created_at: '2026-01-21T09:15:00',
    is_high_potential: false
  },
  {
    id: '4',
    nome_completo: 'Dra. Ana Paula Ferreira',
    email: 'ana.ferreira@advocacia.com',
    whatsapp: '41954321098',
    cidade_estado: 'Curitiba/PR',
    tempo: '3_5_anos',
    atuacao: 'advogado_autonomo',
    estrutura_equipe: 'sozinho',
    nivel_gestao: 'basica',
    dificuldades: ['atendimento_clientes', 'marketing_captacao'],
    faturamento: '30k_50k',
    expectativas: 'Quero ter mais tempo para focar em captação de clientes.',
    investimento: 'less_1k',
    created_at: '2026-01-20T16:45:00',
    is_high_potential: false
  },
  {
    id: '5',
    nome_completo: 'Dr. Fernando Santos',
    email: 'fernando.santos@adv.net',
    whatsapp: '85943210987',
    cidade_estado: 'Fortaleza/CE',
    tempo: '5_10_anos',
    atuacao: 'socio_escritorio',
    estrutura_equipe: '6_10_pessoas',
    nivel_gestao: 'avancada',
    dificuldades: ['gestao_equipe', 'processos_internos'],
    faturamento: 'more_100k',
    expectativas:
      'Preciso de apoio estratégico para escalar o escritório mantendo a qualidade.',
    investimento: 'more_5k',
    created_at: '2026-01-19T11:00:00',
    is_high_potential: true
  }
]
