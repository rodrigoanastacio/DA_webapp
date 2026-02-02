import { Lightbulb, Search, Settings, TrendingUp, Users } from 'lucide-react'
import { IProcessStep } from './how-it-works.types'

export const processSteps: IProcessStep[] = [
  {
    icon: Search,
    title: 'Estancamento de Sangria (O Fim do Caos)',
    description:
      'Identificação profunda de gargalos operacionais e financeiros através de análise de dados históricos.',
    deliverables: [
      {
        title: 'Auditoria de Fluxo',
        items: [
          'Identificamos exatamente onde seu tempo está sendo jogado fora e onde o lucro está vazando por falta de processos.',
          'Mapeamento completo dos gargalos operacionais que impedem o crescimento.'
        ]
      },
      {
        title: 'Diagnóstico Financeiro',
        items: [
          'Análise da rentabilidade real de cada área do escritório.',
          'Identificação de desperdícios e oportunidades de otimização.'
        ]
      }
    ]
  },
  {
    icon: Lightbulb,
    title: 'Estratégia',
    description:
      'Planejamento customizado de novos fluxos de trabalho e arquitetura de gestão orientada a resultados.',
    deliverables: [
      {
        title: 'Plano de Reestruturação',
        items: [
          'Design de novos processos adaptados à realidade do seu escritório.',
          'Definição de KPIs e metas mensuráveis.'
        ]
      },
      {
        title: 'Arquitetura de Gestão',
        items: [
          'Organograma funcional com papéis e responsabilidades claras.',
          'Fluxos de comunicação e tomada de decisão.'
        ]
      }
    ]
  },
  {
    icon: Settings,
    title: 'Implementação',
    description:
      'Ajuste técnico de processos, integração de softwares jurídicos e automação de tarefas repetitivas.',
    deliverables: [
      {
        title: 'Processos Padronizados',
        items: [
          'Criação de SOPs (Standard Operating Procedures) para todas as operações.',
          'Integração de ferramentas e automações.'
        ]
      },
      {
        title: 'Tecnologia Implementada',
        items: [
          'Configuração de softwares jurídicos e CRM.',
          'Automação de tarefas repetitivas e burocráticas.'
        ]
      }
    ]
  },
  {
    icon: Users,
    title: 'Treinamento',
    description:
      'Capacitação técnica e cultural da equipe para operar os novos sistemas com máxima performance.',
    deliverables: [
      {
        title: 'Capacitação da Equipe',
        items: [
          'Treinamento prático nos novos processos e ferramentas.',
          'Desenvolvimento de cultura de alta performance.'
        ]
      },
      {
        title: 'Gestão de Mudança',
        items: [
          'Acompanhamento da adaptação da equipe.',
          'Ajustes finos baseados no feedback do time.'
        ]
      }
    ]
  },
  {
    icon: TrendingUp,
    title: 'Monitoramento',
    description:
      'Gestão baseada em indicadores (KPIs) com suporte contínuo para ajustes finos e escalabilidade.',
    deliverables: [
      {
        title: 'Dashboard de KPIs',
        items: [
          'Monitoramento em tempo real dos principais indicadores.',
          'Tomada de decisão baseada em dados, não em achismos.'
        ]
      },
      {
        title: 'Suporte Contínuo',
        items: [
          'Revisão mensal de resultados e ajustes estratégicos.',
          'Planejamento para escalar o escritório de forma sustentável.'
        ]
      }
    ]
  }
]
