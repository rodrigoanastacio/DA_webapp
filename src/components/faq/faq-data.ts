export interface IFAQItem {
  question: string
  answer: string
}

export const faqData: IFAQItem[] = [
  {
    question: 'Isso substitui um gerente interno?',
    answer:
      'Não. Estruturamos a base para que você possa crescer com governança, inclusive facilitando futuras contratações.'
  },
  {
    question: 'Eu preciso ter equipe para aplicar?',
    answer: 'Não necessariamente. O método adapta à fase do escritório.'
  },
  {
    question: 'Isso é mentoria ou execução?',
    answer: 'É implementação estratégica assistida.'
  },
  {
    question: 'Qual o nível de comprometimento necessário?',
    answer:
      'Alto. Escritórios que não estão dispostos a mudar sua cultura não devem aplicar.'
  },
  {
    question: 'Em quanto tempo vejo resultados?',
    answer:
      'A partir das primeiras 4 semanas já há redução de sobrecarga e clareza operacional.'
  }
]
