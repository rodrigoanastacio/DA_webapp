import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
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
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
