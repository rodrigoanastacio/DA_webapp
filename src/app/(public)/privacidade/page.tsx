import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Dayane Anastácio',
  description:
    'Entenda como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.'
}

export default function PrivacidadePage() {
  return (
    <main className="pt-32 pb-24 bg-stone-50 min-h-screen font-manrope">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
          <header className="mb-10 border-b border-stone-100 pb-8">
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </header>

          <div className="text-slate-600 leading-relaxed space-y-8">
            <p className="text-lg">
              A sua privacidade é importante para nós. É política da{' '}
              <strong className="text-slate-900">
                Dayane Anastácio Consultoria
              </strong>{' '}
              respeitar a sua privacidade em relação a qualquer informação sua
              que possamos coletar no site{' '}
              <a
                href="https://dayaneanastacio.com.br"
                className="text-amber-600 hover:underline"
              >
                dayaneanastacio.com.br
              </a>
              .
            </p>

            <section>
              <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-4">
                1. Informações que coletamos
              </h3>
              <p className="mb-4">
                Solicitamos informações pessoais apenas quando realmente
                precisamos delas para lhe fornecer um serviço (como agendamento
                de consultoria). Fazemo-lo por meios justos e legais, com o seu
                conhecimento e consentimento. Também informamos por que estamos
                coletando e como será usado.
              </p>
              <p className="mb-2">Os dados comumente coletados incluem:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-amber-500">
                <li>Nome completo;</li>
                <li>Endereço de e-mail;</li>
                <li>Número de telefone/WhatsApp;</li>
                <li>Informações profissionais (cargo, empresa).</li>
              </ul>
            </section>

            <section>
              <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-4">
                2. Uso das informações
              </h3>
              <p className="mb-4">Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-amber-500">
                <li>Entrar em contato para agendamento de reuniões;</li>
                <li>Enviar propostas comerciais solicitadas;</li>
                <li>Melhorar nossos serviços e atendimento;</li>
                <li>
                  Enviar newsletters ou conteúdos educativos (apenas se
                  autorizado).
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-4">
                3. Retenção de dados
              </h3>
              <p>
                Apenas retemos as informações coletadas pelo tempo necessário
                para fornecer o serviço solicitado. Quando armazenamos dados,
                protegemos dentro de meios comercialmente aceitáveis ​​para
                evitar perdas e roubos, bem como acesso, divulgação, cópia, uso
                ou modificação não autorizados.
              </p>
            </section>

            <section>
              <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-4">
                4. Compartilhamento de dados
              </h3>
              <p>
                Não compartilhamos informações de identificação pessoal
                publicamente ou com terceiros, exceto quando exigido por lei.
              </p>
            </section>

            <section>
              <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-4">
                5. Cookies
              </h3>
              <p>
                O nosso site pode usar "cookies" para melhorar a experiência do
                usuário. Você tem a liberdade de recusar a nossa solicitação de
                informações pessoais, entendendo que talvez não possamos
                fornecer alguns dos serviços desejados.
              </p>
            </section>

            <section>
              <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-4">
                6. Seus Direitos (LGPD)
              </h3>
              <p className="mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
                direito a:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-amber-500">
                <li>Acessar seus dados;</li>
                <li>Corrigir dados incompletos ou desatualizados;</li>
                <li>Solicitar a eliminação de seus dados pessoais;</li>
                <li>Revogar seu consentimento a qualquer momento.</li>
              </ul>
            </section>

            <section className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-2">
                7. Contato
              </h3>
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre esta política,
                entre em contato conosco através do e-mail:{' '}
                <a
                  href="mailto:dayanastacioconsultoria@gmail.com"
                  className="text-amber-600 font-bold hover:underline break-all"
                >
                  dayanastacioconsultoria@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
