import { PageHeader } from '@/components/dashboard/PageHeader'
import LandingPageEditor from '@/components/lp-builder/LandingPageEditor'
import { createClient } from '@/lib/supabase/server'
import { getLandingPage } from '@/services/landing-pages/actions'
import { formsHandler } from '@/shared/api-handlers/forms/forms.handler'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditionPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Pegar tenant_id
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) notFound()

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single()

  if (!profile?.tenant_id) notFound()

  const [landingPage, { forms }] = await Promise.all([
    getLandingPage(id),
    formsHandler.list(supabase, profile.tenant_id)
  ])

  if (!landingPage) {
    notFound()
  }

  // Bloquear edição de LPs customizadas
  if (landingPage.type === 'custom') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] gap-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            LP Customizada
          </h1>
          <p className="text-gray-600">
            Esta Landing Page é customizada e não pode ser editada pelo builder.
            Ela foi criada com código personalizado.
          </p>
        </div>
      </div>
    )
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
          initialPublished={landingPage.is_published}
          initialTitle={landingPage.title}
          initialSlug={landingPage.slug}
          initialMetaTitle={landingPage.meta_title}
          initialMetaDescription={landingPage.meta_description}
          initialFormId={landingPage.form_id}
          availableForms={forms}
        />
      </div>
    </div>
  )
}
