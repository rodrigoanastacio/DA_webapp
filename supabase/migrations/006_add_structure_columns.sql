-- Migration: Add structure and overload columns to diagnosticos table
-- Created: 2026-02-16
-- Description: Add desafio_sobrecarga and estrutura_ideal columns, and mark deprecated columns

-- 1. Create new columns
ALTER TABLE diagnosticos
ADD COLUMN IF NOT EXISTS desafio_sobrecarga TEXT,
ADD COLUMN IF NOT EXISTS estrutura_ideal TEXT;

-- 2. Update existing records (optional, set to empty string if needed to avoid nulls in application logic, though schema allows null)
UPDATE diagnosticos
SET desafio_sobrecarga = ''
WHERE desafio_sobrecarga IS NULL;

UPDATE diagnosticos
SET estrutura_ideal = ''
WHERE estrutura_ideal IS NULL;

-- 3. Document deprecated columns (we keep them for data integrity of old records)
COMMENT ON COLUMN diagnosticos.atuacao IS 'DEPRECATED: Replaced by revenue and structure fields.';
COMMENT ON COLUMN diagnosticos.dificuldades IS 'DEPRECATED: Replaced by desafio_sobrecarga.';
COMMENT ON COLUMN diagnosticos.expectativas IS 'DEPRECATED: Replaced by structure and call availability.';

-- 4. Add comments for new columns
COMMENT ON COLUMN diagnosticos.desafio_sobrecarga IS 'Descrição do que gera sobrecarga na rotina (Step 3)';
COMMENT ON COLUMN diagnosticos.estrutura_ideal IS 'Descrição da estrutura organizacional ideal (Step 3)';
