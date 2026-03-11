export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Dayane Anastacio Consultoria',
        url: 'https://dayaneanastacio.com.br',
        logo: 'https://dayaneanastacio.com.br/assets/dayane-anastacio.jpg',
        description:
          'Consultoria especializada em gestão estratégica para escritórios de advocacia e negócios digitais.',
        founder: {
          '@type': 'Person',
          name: 'Dayane Anastácio',
          jobTitle: 'Consultora em Gestão Estratégica',
          url: 'https://dayaneanastacio.com.br'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Brasil'
        },
        knowsAbout: [
          'Gestão Jurídica',
          'Gestão para Negócios Digitais',
          'Organização de Escritórios de Advocacia',
          'Processos Internos e Operacionais',
          'Consultoria Empresarial',
          'Método GERAR'
        ]
      },
      {
        '@type': 'WebSite',
        url: 'https://dayaneanastacio.com.br',
        name: 'Dayane Anastacio',
        description:
          'Consultoria em gestão estratégica para escritórios de advocacia e negócios digitais em crescimento.',
        publisher: {
          '@type': 'Organization',
          name: 'Dayane Anastacio'
        }
      },
      {
        '@type': 'ProfessionalService',
        name: 'Consultoria em Gestão Estratégica - Dayane Anastacio',
        description:
          'Serviços especializados em gestão, processos e previsibilidade para escritórios, advogados e empreendedores digitais que buscam crescimento sustentável.',
        url: 'https://dayaneanastacio.com.br',
        provider: {
          '@type': 'Person',
          name: 'Dayane Anastácio'
        },
        serviceType: 'Consultoria em Gestão de Negócios',
        areaServed: {
          '@type': 'Country',
          name: 'Brasil'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'O que é a Gestão Estratégica para Escritórios e Negócios Digitais?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A gestão estratégica é o processo de estruturar operações, rotinas e processos internos para que uma empresa possa crescer de forma previsível e sustentável. Ela transforma negócios centralizados e dependentes do dono em operações escaláveis e organizadas, essenciais tanto para escritórios de advocacia quanto para agências e infoprodutores.'
            }
          },
          {
            '@type': 'Question',
            name: 'Como funciona o Método GERAR de Dayane Anastácio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'O Método GERAR é um modelo próprio de estruturação criado por Dayane Anastácio, focado na organização de processos, gestão de rotinas e acompanhamento estratégico ativo. Ele visa diagnosticar gargalos, implementar processos eficientes e acompanhar a execução para validar resultados.'
            }
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
