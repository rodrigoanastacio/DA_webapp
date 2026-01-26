-- Migration: Add status column to diagnosticos table
-- ✅ EXECUTADO via MCP Supabase em 2026-01-26

-- Add status column with default value
ALTER TABLE diagnosticos
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'novo_lead';

-- Add CHECK constraint for valid status values
ALTER TABLE diagnosticos
ADD CONSTRAINT diagnosticos_status_check
CHECK (status IN ('novo_lead', 'qualificado', 'em_contato', 'aguardando_doc', 'convertido', 'descartado'));

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_diagnosticos_status ON diagnosticos(status);

-- Update existing records to have default status
UPDATE diagnosticos
SET status = 'novo_lead'
WHERE status IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN diagnosticos.status IS 'Status do lead no funil de vendas';
