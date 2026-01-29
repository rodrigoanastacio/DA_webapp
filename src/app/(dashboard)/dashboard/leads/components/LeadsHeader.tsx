'use client'

interface LeadsHeaderProps {
  totalLeads: number
  highPotentialCount: number
}

export function LeadsHeader({}: LeadsHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Gestão de Leads
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">
            Acompanhe e gerencie todos os leads captados através do funil de
            vendas.
          </p>
        </div>
      </div>
    </>
  )
}
