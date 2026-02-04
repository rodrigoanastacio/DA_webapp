-- Migration: Create tenants table for multi-tenancy support
-- Phase 0: Setup - Creates new table WITHOUT touching existing data
-- ✅ SAFE: Only creates, no alterations to existing tables

CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identificação (slug com hífen: dayane-anastacio)
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  
  -- Status de Assinatura
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'trialing', 'past_due', 'canceled')),
  
  -- Configurações Flexíveis (JSONB para suportar diferentes nichos)
  -- Estrutura: { branding: {...}, domain: {...}, features: {...}, niche: "..." }
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Soft Delete
  deleted_at TIMESTAMPTZ
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_tenants_slug 
  ON public.tenants(slug) 
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_tenants_status 
  ON public.tenants(status) 
  WHERE deleted_at IS NULL;

-- Row Level Security
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Policy: Apenas admins podem visualizar tenants
CREATE POLICY "Admins can view all tenants"
  ON public.tenants
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Policy: Apenas admins podem inserir tenants
CREATE POLICY "Admins can insert tenants"
  ON public.tenants
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Policy: Apenas admins podem atualizar tenants
CREATE POLICY "Admins can update tenants"
  ON public.tenants
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Seed: Criar tenant da Dayane Anastácio (primeiro tenant)
INSERT INTO public.tenants (id, slug, name, status, settings)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid,
  'dayane-anastacio',
  'Dayane Anastácio - Gestão Estratégica para Advocacia',
  'active',
  '{
    "branding": {
      "primaryColor": "#0B3FDA",
      "secondaryColor": "#08298A",
      "logo": "/assets/dayane-logo.png"
    },
    "domain": {
      "custom": "dayaneanastacio.com.br",
      "subdomain": "dayane-anastacio"
    },
    "features": {
      "diagnostico": true,
      "entrevistas": true,
      "dashboard": true
    },
    "niche": "advocacia"
  }'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Comments para documentação
COMMENT ON TABLE public.tenants IS 'Multi-tenant configuration table. Each row represents a customer (law firm, clinic, etc.)';
COMMENT ON COLUMN public.tenants.slug IS 'URL-safe identifier for subdomain routing (e.g., dayane-anastacio.conversionengine.app)';
COMMENT ON COLUMN public.tenants.settings IS 'Flexible JSONB field for tenant-specific configs (colors, logos, features per niche)';
COMMENT ON COLUMN public.tenants.status IS 'Subscription status: active, trialing, past_due, canceled';
