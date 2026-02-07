import { PageHeader } from '@/components/dashboard/PageHeader'
import LandingPageEditor from '@/components/lp-builder/LandingPageEditor'
import { getLandingPage } from '@/services/landing-pages/actions'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditionPage({ params }: PageProps) {
  const { id } = await params
  const landingPage = await getLandingPage(id)

  if (!landingPage) {
    notFound()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <PageHeader
          title={`Editando: ${landingPage.title}`}
          description="Edite o conteúdo da sua Landing Page."
        />
      </div>

      <div className="flex-1 -mx-6 -mb-6 border-t border-gray-200 h-full">
        <LandingPageEditor
          initialSections={landingPage.content}
          id={landingPage.id}
        />
      </div>
    </div>
  )
}
