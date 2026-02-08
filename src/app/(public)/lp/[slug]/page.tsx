import {
  LPSection,
  SectionRenderer
} from '@/components/lp-renderer/SectionRenderer'
import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface LandingPageProps {
  params: Promise<{
    slug: string
  }>
}

// TODO: Gerar metadados dinâmicos (SEO)
export async function generateMetadata({
  params
}: LandingPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: page } = await supabase
    .from('landing_pages')
    .select('title, meta_title, meta_description')
    .eq('slug', slug)
    .single()

  if (!page) {
    return {
      title: 'Página não encontrada'
    }
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  console.log('🔍 [Public LP] Buscando slug:', slug)

  // Buscar a página pelo slug
  const { data: page, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('❌ [Public LP] Erro Supabase:', error)
  }

  if (!page) {
    console.warn('⚠️ [Public LP] Página não encontrada para slug:', slug)
    notFound()
  }

  console.log('✅ [Public LP] Página encontrada:', page.title)

  const sections = page.content as LPSection[]

  return (
    <main className="min-h-screen bg-white">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  )
}
