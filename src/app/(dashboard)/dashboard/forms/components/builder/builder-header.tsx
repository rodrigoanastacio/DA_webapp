'use client'

import { FormSchema } from '@/components/forms/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BuilderHeaderProps {
  schema: FormSchema
  activeTab: 'editor' | 'preview'
  setActiveTab: (tab: 'editor' | 'preview') => void
  onSave: () => Promise<void>
  isSaving: boolean
}

export function BuilderHeader({
  schema,
  activeTab,
  setActiveTab,
  onSave,
  isSaving
}: BuilderHeaderProps) {
  const router = useRouter()

  return (
    <div className="h-20 border-b border-gray-50 px-8 flex items-center justify-between bg-white z-20">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-xl hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </Button>
        <div>
          <h1 className="text-lg font-extrabold text-[#111827] leading-none mb-1">
            {schema.name}
          </h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Form Builder <span className="mx-2">•</span>{' '}
            {schema.display_type === 'wizard' ? 'Multi-etapas' : 'Simples'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 mr-4">
          <button
            onClick={() => setActiveTab('editor')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider',
              activeTab === 'editor'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider',
              activeTab === 'preview'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Preview
          </button>
        </div>

        <Button
          onClick={onSave}
          disabled={isSaving}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl h-11 px-6 font-extrabold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Salvar
        </Button>
      </div>
    </div>
  )
}
