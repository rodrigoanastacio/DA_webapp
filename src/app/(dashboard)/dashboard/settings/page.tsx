'use client'

import { BrandingSection } from '@/app/(dashboard)/dashboard/settings/components/BrandingSection'
import { ProfileSection } from '@/app/(dashboard)/dashboard/settings/components/ProfileSection'
import { useBrandSettings } from '@/app/(dashboard)/dashboard/settings/hooks/useBrandSettings'
import { useProfileSettings } from '@/app/(dashboard)/dashboard/settings/hooks/useProfileSettings'

export default function ConfiguracoesPage() {
  const {
    fullName,
    setFullName,
    email,
    loading: loadingProfile,
    saving: savingProfile,
    updateProfile
  } = useProfileSettings()

  const {
    logoPreview,
    uploading,
    error,
    handleFileChange,
    uploadLogo,
    cancelUpload
  } = useBrandSettings()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Configurações
          </h1>
          <p className="text-gray-400 font-medium text-sm mt-1">
            Personalize seu perfil e a identidade visual do painel
          </p>
        </div>
      </div>

      <ProfileSection
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        loading={loadingProfile}
        saving={savingProfile}
        onSave={updateProfile}
      />

      <BrandingSection
        logoPreview={logoPreview}
        uploading={uploading}
        error={error}
        onFileChange={handleFileChange}
        onUpload={uploadLogo}
        onCancel={cancelUpload}
      />
    </div>
  )
}
