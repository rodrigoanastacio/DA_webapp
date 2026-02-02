export interface IMethodStep {
  letter: string
  title: string
  description: string
}

export const methodSteps: IMethodStep[] = [
  {
    letter: 'G',
    title: 'Gestão',
    description: 'Organização de rotinas, demandas, agendas e fluxos internos.'
  },
  {
    letter: 'E',
    title: 'Estrutura',
    description: 'Criação e padronização de processos, documentos e controles.'
  },
  {
    letter: 'R',
    title: 'Rotina',
    description: 'Implementação de uma rotina funcional, clara e executável.'
  },
  {
    letter: 'A',
    title: 'Autonomia',
    description: 'Seu escritório funcionando sem depender de você o tempo todo.'
  },
  {
    letter: 'R',
    title: 'Resultados',
    description: 'Mais produtividade, menos sobrecarga e foco no estratégico.'
  }
]
