'use client'

interface LeadsHeaderProps {
  totalLeads: number
  highPotentialCount: number
  title?: string
  description?: string
}

export function LeadsHeader({
  title = 'Gestão de Leads',
  description = 'Acompanhe e gerencie todos os leads captados através do funil de vendas.'
}: LeadsHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">{description}</p>
        </div>
      </div>
    </>
  )
}
