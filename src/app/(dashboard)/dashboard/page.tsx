export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
          Bem-vinda,{' '}
          <span className="font-extrabold text-blue-600">Dayane</span>
        </h1>
        <p className="text-gray-400 font-medium text-sm mt-1">
          Visão geral da performance em{' '}
          {new Date().toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long'
          })}
          .
        </p>
      </div>

      {/* Conteúdo será definido posteriormente */}
      <div className="bg-white border border-gray-100 rounded-lg p-12 text-center">
        <p className="text-gray-400 text-sm">
          Dashboard em construção. Acesse os módulos pelo menu lateral.
        </p>
      </div>
    </div>
  )
}
