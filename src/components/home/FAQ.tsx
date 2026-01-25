import { LucidePlus } from 'lucide-react'

export const FAQ = () => {
  const faqs = [
    {
      q: 'Como funciona a contratação?',
      a: 'Tudo começa com o diagnóstico. Preencha o formulário e agendaremos uma reunião para entender sua demanda. O contrato é flexível e baseado na necessidade real do seu escritório.'
    },
    {
      q: 'Você atende escritórios de qual tamanho?',
      a: 'Desde advogados autônomos que estão crescendo e não dão mais conta sozinhos, até escritórios pequenos com 2 ou 3 sócios que precisam de processos claros.'
    },
    {
      q: 'Preciso dar acesso às minhas contas bancárias?',
      a: 'Não necessariamente. Trabalhamos com níveis de acesso secundário ou preparo de pagamentos para sua aprovação final. A segurança é prioridade absoluta.'
    },
    {
      q: 'Como é a comunicação no dia a dia?',
      a: 'Estabelecemos canais oficiais (geralmente Trello/Asana + WhatsApp para urgências) para que você não seja interrompido o tempo todo.'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-16 underline decoration-gray-200 decoration-wavy underline-offset-8">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-200 open:border-gray-400 transition-colors duration-200 cursor-pointer"
            >
              <summary className="flex justify-between items-center p-6 font-bold text-gray-900 list-none focus:outline-none">
                <span className="text-lg">{faq.q}</span>
                <span className="transform group-open:rotate-45 transition-transform duration-200">
                  <LucidePlus className="w-5 h-5 text-gray-400 group-open:text-gray-900" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-transparent group-open:border-gray-100 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
