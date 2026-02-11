-- Migration: 004_drop_old_leads_and_create_new.sql
-- Description: Drop old leads table and create new generic leads table for LP submissions

-- Drop old leads table (data is now in diagnosticos)
DROP TABLE IF EXISTS leads CASCADE;

-- Create new generic leads table for Landing Page submissions
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Dados Básicos
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  
  -- Rastreamento
  form_id UUID REFERENCES forms(id) ON DELETE SET NULL,
  landing_page_id UUID, -- Opcional: referência à LP de origem
  
  -- Respostas Dinâmicas (JSONB para flexibilidade)
  answers JSONB,
  
  -- Metadados
  status TEXT DEFAULT 'novo_lead',
  ip_cliente TEXT,
  agente_usuario TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_leads_tenant_id ON leads(tenant_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_form_id ON leads(form_id);
CREATE INDEX idx_leads_answers_gin ON leads USING GIN (answers);

-- RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver leads do próprio tenant
CREATE POLICY "Users can view leads from their tenant"
  ON leads FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Policy: Usuários podem inserir leads no próprio tenant
CREATE POLICY "Users can insert leads to their tenant"
  ON leads FOR INSERT
  WITH CHECK (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Policy: Usuários podem atualizar leads do próprio tenant
CREATE POLICY "Users can update leads from their tenant"
  ON leads FOR UPDATE
  USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();
