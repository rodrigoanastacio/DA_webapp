import { GoogleTagManager } from '@/components/analytics/GoogleTagManager'
import type { Metadata } from 'next'
import { Manrope, Montserrat } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap'
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    template: '%s | Dayane Anastacio',
    default: 'Dayane Anastacio | Gestão Jurídica e Organização'
  },
  description:
    'Consultoria de gestão especializada para escritórios de advocacia.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dayaneanastacio.com.br/',
    siteName: 'Dayane Anastacio'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${manrope.variable} ${montserrat.variable} font-manrope antialiased bg-white text-gray-900 min-h-screen selection:bg-lp-primary selection:text-white`}
      >
        <GoogleTagManager />
        {children}
      </body>
    </html>
  )
}
