import { PageHeader } from '@/components/dashboard/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getLandingPages } from '@/services/landing-pages/actions'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Edit, Eye, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function LandingPagesList() {
  const landingPages = await getLandingPages()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Landing Pages"
          description="Gerencie suas páginas de captura e vendas."
        />
        <Link href="/dashboard/landing-pages/registration">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Página
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landingPages.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
            <p>Nenhuma página criada ainda.</p>
            <Link
              href="/dashboard/landing-pages/registration"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Criar a primeira página
            </Link>
          </div>
        ) : (
          landingPages.map((lp) => (
            <Card key={lp.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium truncate pr-4">
                  {lp.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Link
                    href={`/lp/${lp.slug}`}
                    target="_blank"
                    title="Visualizar"
                  >
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href={`/dashboard/landing-pages/${lp.id}/edition`}
                    title="Editar"
                  >
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lp.published ? (
                    <span className="text-green-500 text-xs border border-green-200 bg-green-50 px-2 py-1 rounded-full">
                      Publicada
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs border border-gray-200 bg-gray-50 px-2 py-1 rounded-full">
                      Rascunho
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Criada em{' '}
                  {format(new Date(lp.created_at), "d 'de' MMMM, yyyy", {
                    locale: ptBR
                  })}
                </p>
                <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                  <span>/{lp.slug}</span>
                  <span>{lp.views || 0} visualizações</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
