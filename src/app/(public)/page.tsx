import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dayane Anastacio - Consultoria em Gestão Jurídica',
  description:
    'Página institucional - Em breve. Consultoria especializada em gestão de escritórios de advocacia.'
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-deep-navy mb-4">
          Em breve
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Página institucional em construção
        </p>
        <Link
          href="/lp/mentoria-e-gestao-estrategica"
          className="inline-block bg-lp-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors"
        >
          Acessar Landing Page de Mentoria
        </Link>
      </div>
    </main>
  )
}
