import { CreateForm } from '@/components/dashboard/forms/CreateForm'
import { PageHeader } from '@/components/dashboard/PageHeader'

export default function NewFormPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      <PageHeader
        title="Novo Formulário"
        description="Preencha as informações básicas para começar a construir seu formulário."
      />
      <CreateForm />
    </div>
  )
}
