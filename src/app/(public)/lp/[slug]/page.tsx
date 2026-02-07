import {
  LPSection,
  SectionRenderer
} from '@/components/lp-renderer/SectionRenderer'
import { createClient } from '@/lib/supabase/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface LandingPageProps {
  params: {
    slug: string
  }
}

// TODO: Gerar metadados dinâmicos (SEO)
export async function generateMetadata({
  params
}: LandingPageProps): Promise<Metadata> {
  const supabase = createClient()
  const { data: page } = await supabase
    .from('landing_pages')
    .select('title, seo_title, seo_description')
    .eq('slug', params.slug)
    .single()

  if (!page) {
    return {
      title: 'Página não encontrada'
    }
  }

  return {
    title: page.seo_title || page.title,
    description: page.seo_description
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  const supabase = createClient()

  // Buscar a página pelo slug (e garante que está publicada)
  const { data: page, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (error || !page) {
    console.error('Erro ao buscar LP:', error)
    notFound()
  }

  const sections = page.content as LPSection[]

  return (
    <main className="min-h-screen bg-white">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  )
}
