'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Pela primeira vez eu sinto que eu mando no escritório. Meu dia rende e a rotina flui, eu **ganhei tempo e foco**, inclusive para cuidar de coisas pessoais, saúde, **a gestão mudou tudo!** Você mudou meu jeito de trabalhar, só tenho a agradecer!',
    name: 'Dr. Ricardo',
    role: 'Advogado',
    image: '/assets/avatar-1.jpg' // Placeholder, will use initials if not found
  },
  {
    quote:
      'Eu achava que gestão era um custo. Já tive problemas com contratações antes e era muito centralizador, não confiava em delegar nada. Com a sua gestão e organização do escritório, eu vi o quanto **é um investimento, não um custo**. \n\nGanhei **confiança para delegar**, consegui tempo para reuniões de negócios, fiquei uma semana de férias e tudo continuou funcionando bem! Além disso, a gestão **melhorou o faturamento** do escritório! Valeu muito a pena! Eu te agradeço demais pela confiança e pela transformação que trouxe pro meu escritório!',
    name: 'Marcos',
    role: 'Contador',
    image: '/assets/avatar-2.jpg'
  },
  {
    quote:
      'Eu agradeço demais pela ajuda, organização e profissionalismo. Na advocacia, as coisas surgem muito rápido — é um prazo em cima do outro, clientes, diligências — e ter esse suporte na organização e no contato intermediário com o cliente **está salvando a gente!**\n\nJá temos que lidar com a pressão dos prazos processuais e do próprio cliente, então ter alguém que controla e tem essa capacidade de gestão que você tem é **essencial**. É um trabalho incrível que **faz toda a diferença** no dia a dia do escritório.',
    name: 'Dr. Fabio',
    role: 'Advogado',
    image: ''
  }
]

export function TestimonialsSection() {
  return (
    <section
      className="py-24 bg-slate-950 relative overflow-hidden"
      id="depoimentos"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-brand-gold text-sm font-bold tracking-wide uppercase shadow-sm"
          >
            Histórias de transformação real
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            O que dizem <span className="text-brand-gold">meus clientes</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-navy/50 border border-slate-800 rounded-3xl p-8 flex flex-col relative hover:border-brand-gold/30 transition-colors duration-300"
            >
              {/* Quote Icon */}
              <Quote
                className="absolute top-8 right-8 text-slate-800 w-12 h-12 rotate-180"
                fill="currentColor"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-brand-gold fill-brand-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-slate-300 italic font-manrope leading-relaxed mb-8 grow relative z-10 space-y-4">
                {testimonial.quote
                  .split('\n\n')
                  .map((paragraph, pIdx, array) => (
                    <p key={pIdx}>
                      {pIdx === 0 && <>&ldquo;</>}
                      {paragraph.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return (
                            <strong
                              key={i}
                              className="text-brand-gold font-bold not-italic"
                            >
                              {part.slice(2, -2)}
                            </strong>
                          )
                        }
                        return part
                      })}
                      {pIdx === array.length - 1 && <>&rdquo;</>}
                    </p>
                  ))}
              </blockquote>

              {/* Profile */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-800">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700 shrink-0">
                  {/* Fallback to initials since images are placeholders */}
                  <span className="font-bold text-slate-400 text-lg">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-brand-gold text-xs uppercase tracking-wide font-bold mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
