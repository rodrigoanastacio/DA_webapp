export interface IFAQItem {
  question: string
  answer: string
}

export const faqData: IFAQItem[] = [
  {
    question: 'Como funciona a contratação?',
    answer:
      'Tudo começa com o diagnóstico. Preencha o formulário e agendaremos uma reunião para entender sua demanda. O contrato é flexível e baseado na necessidade real do seu escritório.'
  },
  {
    question: 'Você atende escritórios de qual tamanho?',
    answer:
      'Desde advogados autônomos que estão crescendo e não dão mais conta sozinhos, até escritórios pequenos com 2 ou 3 sócios que precisam de processos claros.'
  },
  {
    question: 'Preciso dar acesso às minhas contas bancárias?',
    answer:
      'Não necessariamente. Trabalhamos com níveis de acesso secundário ou preparo de pagamentos para sua aprovação final. A segurança é prioridade absoluta.'
  },
  {
    question: 'Como é a comunicação no dia a dia?',
    answer:
      'Estabelecemos canais oficiais (geralmente Trello/Asana + WhatsApp para urgências) para que você não seja interrompido o tempo todo.'
  }
]
