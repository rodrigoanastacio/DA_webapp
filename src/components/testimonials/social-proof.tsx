import { TestimonialCard } from './testimonial-card'

const SocialProof = () => {
  const testimonials = [
    {
      quote:
        'Eu faturava bem, mas não via meus filhos. Depois do acompanhamento da Dayane, recuperei minhas noites e o escritório finalmente parou de depender de cada decisão minha.',
      authorName: 'Dr. Carlos S.',
      authorRole: 'Direito Empresarial',
      authorInitials: 'CS'
    },
    {
      quote:
        'O maior ganho foi a paz. Hoje eu abro o Dashboard e sei exatamente o que está acontecendo sem precisar perguntar nada a ninguém.',
      authorName: 'Dra. Mariana F.',
      authorRole: 'Advocacia Cível',
      authorInitials: 'MF',
      authorImage: '/assets/dayane-anastacio.jpg'
    },
    {
      quote:
        'Antes eu passava o dia apagando incêndios. Agora tenho tempo para pensar em estratégia e expansão. A diferença é brutal.',
      authorName: 'Dr. Roberto L.',
      authorRole: 'Direito Trabalhista',
      authorInitials: 'RL'
    }
  ]

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: testimonials.map((testimonial, index) => ({
      '@type': 'Review',
      position: index + 1,
      itemReviewed: {
        '@type': 'Service',
        name: 'Mentoria e Gestão Estratégica para Escritórios de Advocacia',
        provider: {
          '@type': 'Person',
          name: 'Dayane Anastacio'
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
        bestRating: '5'
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
                authorInitials={testimonial.authorInitials}
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
