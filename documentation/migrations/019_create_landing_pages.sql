-- Create landing_pages table
CREATE TABLE IF NOT EXISTS landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique slug per tenant
  UNIQUE(tenant_id, slug)
);

-- Enable RLS
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_landing_pages_tenant_id ON landing_pages(tenant_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX IF NOT EXISTS idx_landing_pages_is_published ON landing_pages(is_published);

-- RLS Policy: Tenant Isolation (Read/Write own LPs)
CREATE POLICY landing_pages_tenant_isolation ON landing_pages
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid)
  WITH CHECK (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- RLS Policy: Public Access (Read ONLY published LPs)
-- This allows the public render engine to fetch pages
CREATE POLICY landing_pages_public_read ON landing_pages
  FOR SELECT
  TO public
  USING (is_published = true);
