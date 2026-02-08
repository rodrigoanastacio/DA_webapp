import { LeadFormData } from '@/lib/zod/lead.schema'
import { leadsHandler } from '@/shared/api-handlers/leads/leads.handler'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tenant_id, ...formData } = body

    if (!tenant_id) {
      return NextResponse.json(
        { error: 'Tenant ID é obrigatório' },
        { status: 400 }
      )
    }

    // Initialize Supabase Admin (Service Role) to bypass RLS for public insertions
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false
        }
      }
    )

    // Extract Metadata
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    // Extract known form fields to match LeadFormData
    // Note: If dynamic fields don't match exactly, they might be dropped by the handler's strict typing
    // Ideally, we should update the handler to accept extra fields in a metadata column.
    // For now, we assume the form matches the lead structure.

    // Validate minimally or trust the handler's validation (which uses Zod inside LeadSubmission class)
    // We cast to LeadFormData for now.
    const leadData = formData as LeadFormData

    const metadata = {
      clientIp,
      userAgent,
      utmSource: formData.utm_source,
      utmMedium: formData.utm_medium,
      utmCampaign: formData.utm_campaign,
      utmContent: formData.utm_content,
      utmTerm: formData.utm_term,
      referrer: formData.referrer
    }

    // Call Handler with Service Role Client and Explicit Tenant ID
    await leadsHandler.create(supabaseAdmin, leadData, metadata, tenant_id)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error capturing lead:', error)
    const message =
      error instanceof Error ? error.message : 'Erro interno ao processar lead'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
