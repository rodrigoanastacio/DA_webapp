-- Migration: Update status check constraint to match LeadStatus enum
-- This fixes the archive feature and aligns DB with application enum

-- STEP 1: Drop old constraint FIRST (to allow existing won/lost values)
ALTER TABLE diagnosticos
DROP CONSTRAINT IF EXISTS diagnosticos_status_check;

-- STEP 2: Map old legacy status values to new ones (if any exist)
UPDATE diagnosticos SET status = 'qualificado' WHERE status = 'aguardando_doc';
UPDATE diagnosticos SET status = 'won' WHERE status = 'convertido';
UPDATE diagnosticos SET status = 'lost' WHERE status = 'descartado';

-- STEP 3: Add updated constraint with all LeadStatus values
ALTER TABLE diagnosticos
ADD CONSTRAINT diagnosticos_status_check
CHECK (status IN (
  'novo_lead',
  'analisar_lead',
  'em_contato',
  'qualificado',
  'reuniao_agendada',
  'em_negociacao',
  'proposta_enviada',
  'won',
  'lost',
  'archived'
));

-- STEP 4: Update comment for documentation
COMMENT ON COLUMN diagnosticos.status IS 'Status do lead no funil de vendas (10 estágios: novo → arquivado/won/lost)';
