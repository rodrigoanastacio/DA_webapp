-- Migration: 001_create_diagnosticos_table.sql
-- Description: Create diagnosticos table for diagnostic assessment data

CREATE TABLE diagnosticos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Dados de Contato
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  cidade_estado TEXT,
  
  -- Perfil Profissional
  tempo TEXT, -- experienceTime
  atuacao TEXT, -- currentRole
  
  -- Estrutura
  estrutura_equipe TEXT, -- teamStructure
  nivel_gestao TEXT, -- managementLevel
  
  -- Desafios
  dificuldades TEXT[], -- array de strings
  
  -- Financeiro
  faturamento TEXT, -- revenue
  
  -- Finalização
  expectativas TEXT,
  investimento TEXT,
  
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
CREATE INDEX idx_diagnosticos_tenant_id ON diagnosticos(tenant_id);
CREATE INDEX idx_diagnosticos_status ON diagnosticos(status);
CREATE INDEX idx_diagnosticos_created_at ON diagnosticos(created_at DESC);
CREATE INDEX idx_diagnosticos_email ON diagnosticos(email);

-- RLS (Row Level Security)
ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver diagnósticos do próprio tenant
CREATE POLICY "Users can view diagnosticos from their tenant"
  ON diagnosticos FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Policy: Usuários podem inserir diagnósticos no próprio tenant
CREATE POLICY "Users can insert diagnosticos to their tenant"
  ON diagnosticos FOR INSERT
  WITH CHECK (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Policy: Usuários podem atualizar diagnósticos do próprio tenant
CREATE POLICY "Users can update diagnosticos from their tenant"
  ON diagnosticos FOR UPDATE
  USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_diagnosticos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER diagnosticos_updated_at
  BEFORE UPDATE ON diagnosticos
  FOR EACH ROW
  EXECUTE FUNCTION update_diagnosticos_updated_at();
