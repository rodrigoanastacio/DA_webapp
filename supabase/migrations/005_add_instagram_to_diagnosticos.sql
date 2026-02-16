-- Migration: Add instagram column and deprecate cidade_estado
-- Created: 2026-02-15
-- Description: Replace cidade_estado field with instagram handle for diagnosticos table

-- Add instagram column
ALTER TABLE diagnosticos
ADD COLUMN IF NOT EXISTS instagram TEXT;

-- Migrate existing data (if any) - set instagram to empty string for existing records
UPDATE diagnosticos
SET instagram = ''
WHERE instagram IS NULL;

-- Optional: You can drop cidade_estado column if you want, but it's safer to keep it for now
-- and remove it in a future migration after confirming everything works
-- ALTER TABLE diagnosticos DROP COLUMN IF EXISTS cidade_estado;

-- Add comment to document the change
COMMENT ON COLUMN diagnosticos.instagram IS 'Instagram handle do lead (com @)';
COMMENT ON COLUMN diagnosticos.cidade_estado IS 'DEPRECATED: Use instagram instead. Will be removed in future migration.';
