'use server'

import { env } from '@/config/env'
import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { LandingPage, LandingPageContent, SaveLandingPageResult } from './types'

export async function createLandingPage(input: {
  title: string
  slug: string
  description?: string
  content?: LandingPageContent
}): Promise<SaveLandingPageResult> {
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

      const { data: sessionData } = await supabase.auth.getSession()

      if (sessionData.session?.user) {
        console.log('✅ Recuperado via getSession()')
        user = sessionData.session.user
      } else {
        if (env.app.isDevelopment) {
          console.warn(
            '🚧 DEV MODE: Bypass de autenticação ativado para criar Landing Page'
          )
          user = {
            id: 'bypass-dev-user',
            app_metadata: {
              tenant_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
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

    let tenantId = user.app_metadata?.tenant_id

    if (!tenantId) {
      console.warn('Tenant ID não encontrado no metadata. Usando fallback.')
      tenantId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    }

    // 2. Validar Slug (básico)
    const finalSlug = input.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')

    // 3. Salvar no banco
    const { data, error } = await supabase
      .from('landing_pages')
      .insert({
        tenant_id: tenantId,
        title: input.title,
        slug: finalSlug,
        content: input.content || [],
        is_published: false,
        meta_title: input.title,
        meta_description: input.description || 'Página criada com o Construtor.'
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar LP:', error)
      return {
        success: false,
        message: 'Erro ao criar página no banco de dados.'
      }
    }

    console.log('✅ LP criada com sucesso:', data.slug)
    return { success: true, slug: data.slug, id: data.id }
  } catch (error) {
    console.error('Erro geral ao criar:', error)
    return { success: false, message: 'Ocorreu um erro inesperado ao criar.' }
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

    const tenantId =
      user.app_metadata?.tenant_id || user.user_metadata?.tenant_id

    const { data, error } = await supabase
      .from('landing_pages')
      .update({ content: sections, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select('slug, id')
      .single()

    if (error) throw error
    return { success: true, slug: data.slug, id: data.id }
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

    if (!tenantId) {
      console.warn('⚠️ User without tenant_id in getLandingPages')
      return []
    }

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

    if (!tenantId) {
      return null
    }

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
