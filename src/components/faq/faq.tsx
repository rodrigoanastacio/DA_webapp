'use client'

import { faqData } from './faq-data'
import { FAQItem } from './faq-item'

export const FAQ = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-24 bg-lp-bg-light">
        <header className="text-center mb-16">
          <div className="max-w-[900px] mx-auto px-6">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-lp-primary/10 text-lp-primary rounded-full">
              Dúvidas Frequentes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-deep-navy mb-4">
              Quebrando as Últimas Objeções
            </h2>
            <p className="text-gray-500 max-w-[600px] mx-auto">
              As respostas que você precisa ouvir antes de tomar a decisão mais
              importante para o futuro do seu escritório.
            </p>
          </div>
        </header>

        <main className="max-w-[900px] mx-auto px-6 space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </main>
      </section>
    </>
  )
}
