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
          'Consultoria especializada em gestão para escritórios de advocacia.',
        founder: {
          '@type': 'Person',
          name: 'Dayane Anastácio',
          jobTitle: 'Consultora em Gestão Jurídica',
          url: 'https://dayaneanastacio.com.br'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Brasil'
        },
        knowsAbout: [
          'Gestão Jurídica',
          'Organização de Escritórios de Advocacia',
          'Processos Jurídicos',
          'Consultoria Empresarial'
        ]
      },
      {
        '@type': 'WebSite',
        url: 'https://dayaneanastacio.com.br',
        name: 'Dayane Anastacio',
        description:
          'Consultoria em gestão jurídica para escritórios de advocacia.',
        publisher: {
          '@type': 'Organization',
          name: 'Dayane Anastacio'
        }
      },
      {
        '@type': 'ProfessionalService',
        name: 'Consultoria em Gestão Jurídica - Dayane Anastacio',
        description:
          'Serviços especializados em gestão, processos e previsibilidade para escritórios e advogados que buscam crescimento sustentável.',
        url: 'https://dayaneanastacio.com.br',
        provider: {
          '@type': 'Person',
          name: 'Dayane Anastácio'
        },
        serviceType: 'Consultoria em Gestão Jurídica',
        areaServed: {
          '@type': 'Country',
          name: 'Brasil'
        }
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
