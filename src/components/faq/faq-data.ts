export interface IFAQItem {
  question: string
  answer: string
}

export const faqData: IFAQItem[] = [
  {
    question: 'Isso é mentoria ou execução?',
    answer:
      'É implementação estratégica assistida. Não executamos tarefas isoladas — estruturamos sua operação junto com você para que ela tenha lógica e independência.'
  },
  {
    question: 'Em quanto tempo vejo resultados?',
    answer:
      'A partir das primeiras 4 semanas já há clareza estrutural e redução de sobrecarga. A consolidação completa e validação de todos os processos ocorre ao longo dos 90 dias.'
  },
  {
    question: 'Preciso ter equipe para aplicar?',
    answer:
      'Não necessariamente, mas é importante que seu negócio já tenha uma estrutura mínima que demande delegação, para que possamos organizar o que já funciona no improviso.'
  },
  {
    question: 'Isso substitui um gerente interno?',
    answer:
      'Não. O método GERAR cria a base e a governança para que você possa crescer com segurança, inclusive facilitando contratações futuras, pois as funções já estarão desenhadas.'
  }
]
