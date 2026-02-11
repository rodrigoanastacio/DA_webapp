-- Migration: 002_backup_and_rename_leads.sql
-- Description: Backup current leads table before restructuring

-- Create backup of existing leads table
CREATE TABLE leads_backup AS SELECT * FROM leads;

-- Add comment to backup table
COMMENT ON TABLE leads_backup IS 'Backup of leads table before migration to diagnosticos - Created on 2026-02-10';
