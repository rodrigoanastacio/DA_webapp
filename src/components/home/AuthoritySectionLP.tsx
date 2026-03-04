'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const AuthoritySectionLP = () => {
  return (
    <section className="py-24 bg-white overflow-hidden" id="sobre">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="relative aspect-4/5 rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="/assets/avatar.jpg"
                alt="Dayane Anastacio"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-[40px] border-2 border-brand-gold/10" />
          </motion.div>

          <div className="w-full lg:w-1/2 space-y-8">
            <header>
              <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Quem está por trás da estrutura?
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-brand-navy uppercase tracking-tighter">
                Dayane <span className="text-brand-gold">Anastacio</span>
              </h2>
            </header>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed italic font-light">
              <p>
                Sou Secretária Executiva por formação, com especializações na
                área administrativa e experiência como assistente executiva de
                advogados e CEOs.
              </p>
              <p>
                Ao longo dos últimos anos, atuei diretamente na organização e
                estruturação de escritórios e empresas, identificando um padrão
                comum:{' '}
                <span className="text-brand-navy font-bold not-italic underline decoration-brand-gold/30 underline-offset-4">
                  crescimento sem estrutura.
                </span>
              </p>
              <p>O Método GERAR nasceu da prática — não da teoria.</p>

              <div className="py-8 px-10 bg-brand-navy rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-colors" />
                <p className="text-2xl text-white font-bold leading-tight relative z-10">
                  &quot;Meu trabalho não é executar tarefas. É estruturar
                  operações que{' '}
                  <span className="text-brand-gold">
                    sustentam crescimento.
                  </span>
                  &quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
