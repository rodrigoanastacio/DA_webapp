'use server'

import { env } from '@/config/env'
import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { LandingPage, LandingPageContent, SaveLandingPageResult } from './types'

export async function saveLandingPage(
  sections: LandingPageContent
): Promise<SaveLandingPageResult> {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      env.supabase.url,
      env.supabase.anonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value }) => {
                cookieStore.set(name, value)
              })
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          }
        }
      }
    )

    // 1. Obter usuário/tenant atual
    const { data: userData, error: userError } = await supabase.auth.getUser()

    let user = userData.user

    if (userError || !user) {
      console.warn('⚠️ getUser() falhou:', userError?.message || 'null')

      // TENTATIVA DE FALLBACK: Usar getSession()
      const { data: sessionData } = await supabase.auth.getSession()

      if (sessionData.session?.user) {
        console.log('✅ Recuperado via getSession()')
        user = sessionData.session.user
      } else {
        // BYPASS DE DESENVOLVIMENTO
        // Se estivermos em desenvolvimento e a auth falhar, permitimos salvar com usuário mock
        if (env.app.isDevelopment) {
          console.warn(
            '🚧 DEV MODE: Bypass de autenticação ativado para salvar Landing Page'
          )
          user = {
            id: 'bypass-dev-user',
            app_metadata: {
              tenant_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Tenant da Dayane
              provider: 'email'
            },
            user_metadata: {
              email: 'dev@local.com'
            },
            aud: 'authenticated',
            created_at: new Date().toISOString()
          } as unknown as User
        } else {
          console.error('❌ Falha total de autenticação')
          return {
            success: false,
            message: 'Usuário não autenticado. Faça login novamente.'
          }
        }
      }
    }

    // tenant_id is in app_metadata
    let tenantId = user.app_metadata?.tenant_id

    if (!tenantId) {
      console.warn('Tenant ID não encontrado no metadata. Usando fallback.')
      tenantId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    }

    // 2. Preparar dados
    const title = `Landing Page ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`
    const slug = `lp-${Date.now()}` // Slug único temporário

    // 3. Salvar no banco
    const { data, error } = await supabase
      .from('landing_pages')
      .insert({
        tenant_id: tenantId,
        title,
        slug,
        content: sections,
        published: true,
        seo_title: title,
        seo_description: 'Página criada com o Construtor de Landing Pages.'
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao salvar LP:', error)
      return { success: false, message: 'Erro ao salvar no banco de dados.' }
    }

    console.log('✅ LP salva com sucesso:', data.slug)
    return { success: true, slug: data.slug }
  } catch (error) {
    console.error('Erro geral ao salvar:', error)
    return { success: false, message: 'Ocorreu um erro inesperado ao salvar.' }
  }
}

export async function updateLandingPage(
  id: string,
  sections: LandingPageContent
) {
  const cookieStore = await cookies()
  const supabase = createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} }
  })

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) return { success: false, message: 'Não autenticado' }

    const tenantId = user.app_metadata?.tenant_id

    const { error } = await supabase
      .from('landing_pages')
      .update({ content: sections, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('tenant_id', tenantId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar LP:', error)
    return { success: false, message: 'Erro ao atualizar.' }
  }
}

export async function getLandingPages() {
  const cookieStore = await cookies()
  const supabase = createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} }
  })

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    // Bypass dev
    if (!user && env.app.isDevelopment) {
      return [
        {
          id: '1',
          title: 'LP Demo Dev',
          slug: 'lp-demo',
          published: true,
          created_at: new Date().toISOString()
        }
      ] as unknown as LandingPage[]
    }

    if (!user) return []

    const tenantId = user.app_metadata?.tenant_id

    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })

    if (error) {
      console.warn(
        'Erro na query do Supabase (getLandingPages):',
        error.message
      )
      throw error
    }
    return (data as LandingPage[]) || []
  } catch (error) {
    console.warn('Falha ao buscar LPs (retornando lista vazia):', error)
    return []
  }
}

export async function getLandingPage(id: string) {
  const cookieStore = await cookies()
  const supabase = createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} }
  })

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user && env.app.isDevelopment) {
      return {
        id,
        title: 'LP Demo Mock',
        slug: 'lp-demo',
        content: []
      } as unknown as LandingPage
    }

    if (!user) return null

    const tenantId = user.app_metadata?.tenant_id

    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single()

    if (error) return null
    return data as LandingPage
  } catch (error) {
    console.warn('Erro ao buscar LP:', error)
    return null
  }
}
