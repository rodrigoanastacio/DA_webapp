import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Método GERAR - Mentoria e Gestão Estratégica | Dayane Anastacio',
  description:
    'Transforme o "Advogado Bombeiro" em "Advogado CEO". Recupere 10h+ por semana com o Método GERAR de gestão jurídica. Mentoria estratégica para escritórios.',
  openGraph: {
    title: 'Método GERAR - Mentoria e Gestão Estratégica | Dayane Anastacio',
    description:
      'Transforme o "Advogado Bombeiro" em "Advogado CEO". Recupere 10h+ por semana com o Método GERAR de gestão jurídica.',
    url: 'https://dayaneanastacio.com.br/lp/mentoria-e-gestao-estrategica',
    siteName: 'Dayane Anastacio',
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Método GERAR - Mentoria e Gestão Estratégica',
    description:
      'Transforme o "Advogado Bombeiro" em "Advogado CEO". Recupere 10h+ por semana com o Método GERAR.'
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
