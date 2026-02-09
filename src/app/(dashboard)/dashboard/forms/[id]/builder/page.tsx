import { createClient } from '@/lib/supabase/server'
import { formsHandler } from '@/shared/api-handlers/forms/forms.handler'
import { notFound } from 'next/navigation'
import { FormBuilder } from '../../components/builder/form-builder'

interface BuilderPageProps {
  params: Promise<{ id: string }>
}

async function getTenantId(supabase: Awaited<ReturnType<typeof createClient>>) {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single()

  if (!profile?.tenant_id) throw new Error('Tenant not found')
  return profile.tenant_id
}

export default async function FormBuilderPage({ params }: BuilderPageProps) {
  const { id } = await params
  const supabase = await createClient()

  let form
  let tenantId

  try {
    tenantId = await getTenantId(supabase)
    form = await formsHandler.getById(supabase, id, tenantId)
  } catch (error) {
    console.error('[Form Builder Page]:', error)
    notFound()
  }

  if (!form) {
    notFound()
  }

  return (
    <div className="h-full animate-in fade-in duration-700">
      <FormBuilder formId={id} initialData={form} />
    </div>
  )
}
