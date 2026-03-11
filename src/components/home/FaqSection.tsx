'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    question: 'O que é a Gestão Estratégica para Escritórios e Negócios Digitais?',
    answer:
      'A gestão estratégica é o processo de estruturar operações, rotinas e processos internos para que uma empresa possa crescer de forma previsível e sustentável. Ela transforma negócios centralizados e dependentes do dono em operações escaláveis e organizadas, essenciais tanto para escritórios de advocacia quanto para agências e infoprodutores.'
  },
  {
    question: 'Como funciona o Método GERAR de Dayane Anastácio?',
    answer:
      'O Método GERAR é um modelo próprio de estruturação criado por Dayane Anastácio, focado na organização de processos, gestão de rotinas e acompanhamento estratégico ativo. Ele visa diagnosticar gargalos, implementar processos eficientes e acompanhar a execução para validar resultados.'
  },
  {
    question: 'Qual a diferença entre a Consultoria GERAR e a Gestão GERAR?',
    answer:
      'A Consultoria GERAR tem foco na implementação orientada com acompanhamento de 30 dias para quem precisa de clareza e metas. Já a Gestão GERAR oferece um acompanhamento contínuo e estruturado mensalmente para empresas que necessitam de um suporte de longo prazo na sua expansão.'
  },
  {
    question: 'Por que o crescimento sem gestão operacional é um risco?',
    answer:
      'Muitos negócios digitais e escritórios experimentam um salto no faturamento, mas sem processos delineados. Isso leva à sobrecarga, retrabalho, perda de qualidade nas entregas e decisões precipitadas. A gestão operacional atua como a base que sustenta esse crescimento, protegendo a lucratividade e o tempo dos fundadores.'
  }
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-sm font-bold tracking-wide shadow-sm"
          >
            Perguntas Frequentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Dúvidas comuns sobre <span className="text-brand-gold">Gestão e Organização</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="font-montserrat font-bold text-lg text-brand-navy pr-8">
                  {faq.question}
                </h3>
                <span className="text-brand-gold text-2xl font-light shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
