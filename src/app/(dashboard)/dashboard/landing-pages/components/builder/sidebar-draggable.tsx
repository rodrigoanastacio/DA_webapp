import { Card } from '@/components/ui/card'
import {
  Grid,
  LayoutTemplate,
  RectangleHorizontal,
  Type,
  UserCircle2
} from 'lucide-react'

interface SidebarDraggableProps {
  onAddSection: (type: 'hero' | 'features' | 'bio' | 'footer') => void
}

export function SidebarDraggable({ onAddSection }: SidebarDraggableProps) {
  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-20 h-full">
      <div className="p-5 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-blue-600" />
          Biblioteca
        </h2>
        <p className="text-xs text-gray-500 mt-1">Componentes disponíveis</p>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Essenciais
          </p>

          <Card
            className="p-3 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group active:scale-95"
            onClick={() => onAddSection('hero')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-blue-100 transition-colors">
                <Type size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Hero Section
                </h3>
                <p className="text-xs text-gray-500">Destaque principal</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group active:scale-95"
            onClick={() => onAddSection('features')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-blue-100 transition-colors">
                <Grid size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Features</h3>
                <p className="text-xs text-gray-500">Lista de benefícios</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group active:scale-95"
            onClick={() => onAddSection('bio')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-blue-100 transition-colors">
                <UserCircle2 size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Bio / Sobre
                </h3>
                <p className="text-xs text-gray-500">Autoridade & Perfil</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group active:scale-95"
            onClick={() => onAddSection('footer')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-blue-100 transition-colors">
                <RectangleHorizontal size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Footer</h3>
                <p className="text-xs text-gray-500">Rodapé & Contato</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
