import { TestimonialCard } from './testimonial-card'

interface TestimonialData {
  quote: string
  authorName: string
  authorRole: string
  authorImage?: string
}

const SocialProof = () => {
  const testimonials: TestimonialData[] = [
    {
      quote:
        'Pela primeira vez eu sinto que eu mando no escritório. Meu dia rende e a rotina flui, eu **ganhei tempo e foco**, inclusive para cuidar de coisas pessoais, saúde, **a gestão mudou tudo!** Você mudou meu jeito de trabalhar, só tenho a agradecer!',
      authorName: 'Dr. Ricardo',
      authorRole: 'Advogado'
    },
    {
      quote:
        'Eu achava que gestão era um custo. Já tive problemas com contratações antes e era muito centralizador, não confiava em delegar nada. Com a sua gestão e organização do escritório, eu vi o quanto **é um investimento, não um custo**. \n\nGanhei **confiança para delegar**, consegui tempo para reuniões de negócios, fiquei uma semana de férias e tudo continuou funcionando bem! Além disso, a gestão **melhorou o faturamento** do escritório! Valeu muito a pena! Eu te agradeço demais pela confiança e pela transformação que trouxe pro meu escritório!',
      authorName: 'Marcos',
      authorRole: 'Contador'
    },
    {
      quote:
        'Eu agradeço demais pela ajuda, organização e profissionalismo. Na advocacia, as coisas surgem muito rápido — é um prazo em cima do outro, clientes, diligências — e ter esse suporte na organização e no contato intermediário com o cliente **está salvando a gente!**\n\nJá temos que lidar com a pressão dos prazos processuais e do próprio cliente, então ter alguém que controla e tem essa capacidade de gestão que você tem é **essencial**. É um trabalho incrível que **faz toda a diferença** no dia a dia do escritório.',
      authorName: 'Dr. Fabio',
      authorRole: 'Advogado'
    }
  ]

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mentoria e Gestão Estratégica para Escritórios de Advocacia - Dayane Anastacio',
    description:
      'Consultoria especializada em gestão estratégica, otimização de processos e escalabilidade para escritórios de advocacia.',
    url: 'https://dayaneanastacio.com.br/p/mentoria-e-gestao-estrategica',
    telephone: '+55-11-98765-4321',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      reviewCount: testimonials.length.toString()
    },
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Service',
        name: 'Mentoria e Gestão Estratégica para Escritórios de Advocacia',
        description:
          'Programa de mentoria estratégica focado em otimização de processos, implementação de sistemas de gestão e escalabilidade para escritórios de advocacia.',
        provider: {
          '@type': 'Person',
          name: 'Dayane Anastacio',
          jobTitle: 'Consultora de Gestão Estratégica'
        }
      },
      author: {
        '@type': 'Person',
        name: testimonial.authorName,
        jobTitle: testimonial.authorRole
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: testimonial.quote
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <header className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-lp-primary/10 text-lp-primary rounded-full">
              Prova Social
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-deep-navy mb-4">
              O Efeito Antes e Depois
            </h2>
            <p className="text-gray-500 max-w-[600px] mx-auto">
              Advogados que recuperaram o controle, a liberdade e a paz de
              espírito que só um escritório bem estruturado pode proporcionar.
            </p>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                quote={testimonial.quote}
                authorName={testimonial.authorName}
                authorRole={testimonial.authorRole}
                authorImage={testimonial.authorImage}
              />
            ))}
          </main>
        </div>
      </section>
    </>
  )
}

export default SocialProof
