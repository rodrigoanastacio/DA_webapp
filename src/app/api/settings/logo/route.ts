import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/settings/logo
 *
 * Upload tenant logo to Supabase Storage and update tenant settings.
 *
 * Security:
 * - Requires authentication
 * - Validates tenant_id from JWT
 * - Validates file type and size
 * - RLS enforces folder isolation
 *
 * Request: FormData with 'logo' file
 * Response: { success: boolean, logoUrl?: string, error?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // 1. Authenticate and get tenant_id
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    const tenant_id = user.user_metadata?.tenant_id
    if (!tenant_id) {
      return NextResponse.json(
        { error: 'No tenant_id found in user metadata' },
        { status: 400 }
      )
    }

    // 2. Get file from FormData
    const formData = await req.formData()
    const file = formData.get('logo') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please upload a logo.' },
        { status: 400 }
      )
    }

    // 3. Validate file type
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/webp'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PNG, JPG, SVG, WebP' },
        { status: 400 }
      )
    }

    // 4. Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // 5. Get current tenant settings (to preserve other fields)
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('settings')
      .eq('id', tenant_id)
      .single()

    if (tenantError) {
      return NextResponse.json(
        { error: 'Failed to fetch tenant settings' },
        { status: 500 }
      )
    }

    // 6. Upload to Supabase Storage
    const fileExt = file.type.split('/')[1]
    const fileName = `${tenant_id}/logo.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('tenant-assets')
      .upload(fileName, file, {
        upsert: true, // Replace if exists
        contentType: file.type
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    // 7. Get public URL
    const { data: urlData } = supabase.storage
      .from('tenant-assets')
      .getPublicUrl(fileName)

    if (!urlData.publicUrl) {
      return NextResponse.json(
        { error: 'Failed to generate public URL' },
        { status: 500 }
      )
    }

    // 8. Update tenant settings JSONB
    const updatedSettings = {
      ...tenant.settings,
      branding: {
        ...tenant.settings?.branding,
        logoUrl: urlData.publicUrl
      }
    }

    const { error: updateError } = await supabase
      .from('tenants')
      .update({ settings: updatedSettings })
      .eq('id', tenant_id)

    if (updateError) {
      console.error('Settings update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update tenant settings' },
        { status: 500 }
      )
    }

    // 9. Success response
    return NextResponse.json({
      success: true,
      logoUrl: urlData.publicUrl
    })
  } catch (error) {
    console.error('Logo upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
