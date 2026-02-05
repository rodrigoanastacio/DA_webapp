'use client'

import { Box } from '@/components/ui/box'
import { Save, User } from 'lucide-react'

interface ProfileSectionProps {
  fullName: string
  setFullName: (name: string) => void
  email: string
  loading: boolean
  saving: boolean
  onSave: () => void
}

export function ProfileSection({
  fullName,
  setFullName,
  email,
  loading,
  saving,
  onSave
}: ProfileSectionProps) {
  return (
    <Box>
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        Informações do Perfil
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-100 rounded w-full max-w-md"></div>
          <div className="h-10 bg-gray-100 rounded w-full max-w-md"></div>
        </div>
      ) : (
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">
              O email não pode ser alterado.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Box>
  )
}
