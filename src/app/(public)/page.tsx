import { HeroInstitucional } from '@/components/home/HeroInstitucional'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dayane Anastacio - Consultoria em Gestão Jurídica',
  description:
    'Consultoria especializada em gestão de escritórios de advocacia. Processos claros, previsibilidade e crescimento sustentável.'
}

export default function Home() {
  return (
    <main>
      {/* <Header /> */}
      <HeroInstitucional />
    </main>
  )
}
