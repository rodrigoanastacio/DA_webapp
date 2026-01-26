export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-gray-50 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm text-gray-400">
          <span>© {currentYear} Dayane Anastácio</span>
          <span className="hidden md:inline">•</span>
          <span>Gestão Jurídica e Organização</span>
          <span className="hidden md:inline">•</span>
          <span>Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  )
}
