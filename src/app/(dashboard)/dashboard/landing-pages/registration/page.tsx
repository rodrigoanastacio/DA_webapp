'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { CreateLandingPageForm } from '@/components/dashboard/landing-pages/CreateForm'

export default function RegistrationPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <PageHeader
          title="Nova Landing Page"
          description="Crie uma nova página preenchendo as informações abaixo."
        />
      </div>

      <div className="flex-1 -mx-6 -mb-6 border-t border-gray-200 h-full bg-gray-50/50">
        <CreateLandingPageForm />
      </div>
    </div>
  )
}
