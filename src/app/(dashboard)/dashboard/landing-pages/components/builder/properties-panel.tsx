import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { FeatureItem } from '@/components/lp-renderer/sections/FeaturesSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { FormRow } from '@/shared/api-handlers/forms/forms.handler'
import { PageSettings } from '../../hooks/use-landing-page-builder'

interface PropertiesPanelProps {
  selectedSection: LPSection | undefined
  pageSettings: PageSettings
  setPageSettings: React.Dispatch<React.SetStateAction<PageSettings>>
  updateSectionData: (key: string, value: unknown) => void
  isPublished: boolean
  isSaving: boolean
  onTogglePublish: () => void
  onSave: () => void
  availableForms: FormRow[]
}

export function PropertiesPanel({
  selectedSection,
  pageSettings,
  setPageSettings,
  updateSectionData,
  isPublished,
  isSaving,
  onTogglePublish,
  onSave,
  availableForms
}: PropertiesPanelProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.1)] z-20 h-full">
      <div className="p-5 border-b border-gray-100 flex flex-col gap-4 bg-white/50 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Propriedades</h2>
          <Button
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>

        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-700">Status</span>
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-wider',
                isPublished ? 'text-green-600' : 'text-amber-600'
              )}
            >
              {isPublished ? 'Publicada' : 'Rascunho'}
            </span>
          </div>
          <Button
            size="sm"
            variant={isPublished ? 'outline' : 'default'}
            onClick={onTogglePublish}
            disabled={isSaving}
            className={cn(
              'h-8 text-xs font-semibold px-4 transition-all duration-300',
              isPublished
                ? 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
                : 'bg-green-600 hover:bg-green-700 text-white'
            )}
          >
            {isPublished ? 'Despublicar' : 'Publicar'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {selectedSection ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wide">
                {selectedSection.type}
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {selectedSection.id}
              </span>
            </div>

            {selectedSection.type === 'hero' && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Textarea
                    id="headline"
                    value={(selectedSection.data.headline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('headline', e.target.value)
                    }
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subheadline">Subheadline</Label>
                  <Textarea
                    id="subheadline"
                    value={(selectedSection.data.subheadline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('subheadline', e.target.value)
                    }
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="ctaLabel">Texto do Botão</Label>
                    <Input
                      id="ctaLabel"
                      value={(selectedSection.data.ctaLabel as string) || ''}
                      onChange={(e) =>
                        updateSectionData('ctaLabel', e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ctaLink">Link de Destino</Label>
                    <Input
                      id="ctaLink"
                      value={(selectedSection.data.ctaLink as string) || ''}
                      onChange={(e) =>
                        updateSectionData('ctaLink', e.target.value)
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Layout</Label>
                  <Select
                    value={
                      (selectedSection.data.layout as string) || 'centered'
                    }
                    onValueChange={(value) =>
                      updateSectionData('layout', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="centered">Centralizado</SelectItem>
                      <SelectItem value="split">
                        Dividido (Formulário à Direita)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefícios (Um por linha)</Label>
                  <Textarea
                    id="benefits"
                    value={(
                      (selectedSection.data.benefits as string[]) || []
                    ).join('\n')}
                    onChange={(e) =>
                      updateSectionData('benefits', e.target.value.split('\n'))
                    }
                    rows={4}
                    className="resize-none"
                    placeholder="Benefício 1&#10;Benefício 2&#10;Benefício 3"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Tema Visual</Label>
                  <Select
                    value={(selectedSection.data.theme as string) || 'light'}
                    onValueChange={(value) => updateSectionData('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro (Light)</SelectItem>
                      <SelectItem value="dark">Escuro (Dark)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {selectedSection.type === 'features' && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Textarea
                    id="headline"
                    value={(selectedSection.data.headline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('headline', e.target.value)
                    }
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subheadline">Subheadline</Label>
                  <Textarea
                    id="subheadline"
                    value={(selectedSection.data.subheadline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('subheadline', e.target.value)
                    }
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Colunas</Label>
                  <Select
                    value={String(selectedSection.data.columns || 3)}
                    onValueChange={(val) =>
                      updateSectionData('columns', Number(val))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Colunas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Colunas</SelectItem>
                      <SelectItem value="3">3 Colunas</SelectItem>
                      <SelectItem value="4">4 Colunas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <Label className="mb-3 block">Itens (Features)</Label>
                  <div className="space-y-4">
                    {(
                      (selectedSection.data.features as FeatureItem[]) || []
                    ).map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            Item {idx + 1}
                          </span>
                        </div>

                        <div>
                          <Label className="text-xs">Ícone</Label>
                          <Select
                            value={feature.icon}
                            onValueChange={(val) => {
                              const newFeatures = [
                                ...((selectedSection.data
                                  .features as FeatureItem[]) || [])
                              ]
                              newFeatures[idx] = { ...feature, icon: val }
                              updateSectionData('features', newFeatures)
                            }}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Ícone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="zap">Raio (Zap)</SelectItem>
                              <SelectItem value="chart">Gráfico</SelectItem>
                              <SelectItem value="lock">Cadeado</SelectItem>
                              <SelectItem value="rocket">Foguete</SelectItem>
                              <SelectItem value="globe">Globo</SelectItem>
                              <SelectItem value="shield">Escudo</SelectItem>
                              <SelectItem value="bot">Robô</SelectItem>
                              <SelectItem value="clock">Relógio</SelectItem>
                              <SelectItem value="message">Mensagem</SelectItem>
                              <SelectItem value="check">Check</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-xs">Título</Label>
                          <Input
                            value={feature.title}
                            onChange={(e) => {
                              const newFeatures = [
                                ...((selectedSection.data
                                  .features as FeatureItem[]) || [])
                              ]
                              newFeatures[idx] = {
                                ...feature,
                                title: e.target.value
                              }
                              updateSectionData('features', newFeatures)
                            }}
                            className="h-8 text-xs"
                          />
                        </div>

                        <div>
                          <Label className="text-xs">Descrição</Label>
                          <Textarea
                            value={feature.description}
                            onChange={(e) => {
                              const newFeatures = [
                                ...((selectedSection.data
                                  .features as FeatureItem[]) || [])
                              ]
                              newFeatures[idx] = {
                                ...feature,
                                description: e.target.value
                              }
                              updateSectionData('features', newFeatures)
                            }}
                            className="min-h-[60px] text-xs resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Tema Visual</Label>
                  <Select
                    value={(selectedSection.data.theme as string) || 'light'}
                    onValueChange={(value) => updateSectionData('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro (Light)</SelectItem>
                      <SelectItem value="dark">Escuro (Dark)</SelectItem>
                      <SelectItem value="gray">Cinza (Gray)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {selectedSection.type === 'bio' && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="headline">Nome / Título</Label>
                  <Input
                    id="headline"
                    value={(selectedSection.data.headline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('headline', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subheadline">Subtítulo / Cargo</Label>
                  <Textarea
                    id="subheadline"
                    value={(selectedSection.data.subheadline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('subheadline', e.target.value)
                    }
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia (Parágrafos)</Label>
                  <Textarea
                    id="bio"
                    value={((selectedSection.data.bio as string[]) || []).join(
                      '\n\n'
                    )}
                    onChange={(e) =>
                      updateSectionData('bio', e.target.value.split('\n\n'))
                    }
                    rows={6}
                    className="resize-none text-xs"
                    placeholder="Parágrafo 1&#10;&#10;Parágrafo 2"
                  />
                  <p className="text-[10px] text-gray-400">
                    Separe parágrafos com uma linha em branco.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageSrc">URL da Foto</Label>
                  <Input
                    id="imageSrc"
                    value={(selectedSection.data.imageSrc as string) || ''}
                    onChange={(e) =>
                      updateSectionData('imageSrc', e.target.value)
                    }
                    className="text-xs"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Alinhamento da Foto</Label>
                  <Select
                    value={(selectedSection.data.alignment as string) || 'left'}
                    onValueChange={(value) =>
                      updateSectionData('alignment', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Esquerda</SelectItem>
                      <SelectItem value="right">Direita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="ctaLabel">Texto do Botão (Opcional)</Label>
                    <Input
                      id="ctaLabel"
                      value={(selectedSection.data.ctaLabel as string) || ''}
                      onChange={(e) =>
                        updateSectionData('ctaLabel', e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ctaLink">Link do Botão</Label>
                    <Input
                      id="ctaLink"
                      value={(selectedSection.data.ctaLink as string) || ''}
                      onChange={(e) =>
                        updateSectionData('ctaLink', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Tema Visual</Label>
                  <Select
                    value={(selectedSection.data.theme as string) || 'light'}
                    onValueChange={(value) => updateSectionData('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro (Light)</SelectItem>
                      <SelectItem value="dark">Escuro (Dark)</SelectItem>
                      <SelectItem value="gray">Cinza (Gray)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {selectedSection.type === 'footer' && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa / Marca</Label>
                  <Input
                    id="companyName"
                    value={(selectedSection.data.companyName as string) || ''}
                    onChange={(e) =>
                      updateSectionData('companyName', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição / Missão</Label>
                  <Textarea
                    id="description"
                    value={(selectedSection.data.description as string) || ''}
                    onChange={(e) =>
                      updateSectionData('description', e.target.value)
                    }
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <Label className="text-xs font-bold uppercase text-gray-500">
                    Contato
                  </Label>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={(selectedSection.data.email as string) || ''}
                      onChange={(e) =>
                        updateSectionData('email', e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs">
                      Telefone / WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      value={(selectedSection.data.phone as string) || ''}
                      onChange={(e) =>
                        updateSectionData('phone', e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs">
                      Endereço (Opcional)
                    </Label>
                    <Input
                      id="address"
                      value={(selectedSection.data.address as string) || ''}
                      onChange={(e) =>
                        updateSectionData('address', e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <Label className="text-xs font-bold uppercase text-gray-500">
                    Redes Sociais (Links)
                  </Label>

                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-xs">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={(selectedSection.data.instagram as string) || ''}
                      onChange={(e) =>
                        updateSectionData('instagram', e.target.value)
                      }
                      className="h-8 text-xs"
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-xs">
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={(selectedSection.data.linkedin as string) || ''}
                      onChange={(e) =>
                        updateSectionData('linkedin', e.target.value)
                      }
                      className="h-8 text-xs"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <Label>Tema Visual</Label>
                  <Select
                    value={(selectedSection.data.theme as string) || 'light'}
                    onValueChange={(value) => updateSectionData('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro (Light)</SelectItem>
                      <SelectItem value="dark">Escuro (Dark)</SelectItem>
                      <SelectItem value="gray">Cinza (Gray)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded uppercase tracking-widest">
                Configurações Gerais
              </div>
            </div>

            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="pageTitle">Título da Página</Label>
                <Input
                  id="pageTitle"
                  value={pageSettings.title}
                  onChange={(e) =>
                    setPageSettings((prev) => ({
                      ...prev,
                      title: e.target.value
                    }))
                  }
                  placeholder="Ex: Minha Nova Landing Page"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pageSlug">URL (Slug)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">/lp/</span>
                  <Input
                    id="pageSlug"
                    value={pageSettings.slug}
                    onChange={(e) =>
                      setPageSettings((prev) => ({
                        ...prev,
                        slug: e.target.value
                      }))
                    }
                    placeholder="exemplo-de-slug"
                  />
                </div>
                <p className="text-[10px] text-gray-400">
                  Apenas letras minúsculas, números e hífens.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  SEO & Metadados
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Título SEO</Label>
                    <Input
                      id="metaTitle"
                      value={pageSettings.metaTitle || ''}
                      onChange={(e) =>
                        setPageSettings((prev) => ({
                          ...prev,
                          metaTitle: e.target.value
                        }))
                      }
                      placeholder="Título que aparece no Google"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Descrição SEO</Label>
                    <Textarea
                      id="metaDescription"
                      value={pageSettings.metaDescription || ''}
                      onChange={(e) =>
                        setPageSettings((prev) => ({
                          ...prev,
                          metaDescription: e.target.value
                        }))
                      }
                      rows={3}
                      placeholder="Breve resumo para buscadores..."
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Captação de Leads
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Formulário de Destino</Label>
                    <Select
                      value={pageSettings.formId || 'none'}
                      onValueChange={(val) =>
                        setPageSettings((prev) => ({
                          ...prev,
                          formId: val === 'none' ? undefined : val
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Nenhum (Botão padrão)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          Nenhum (Botão padrão)
                        </SelectItem>
                        {availableForms.map((form) => (
                          <SelectItem key={form.id} value={form.id}>
                            {form.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-gray-400">
                      Define qual formulário será aberto ao clicar no CTA do
                      Hero.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
