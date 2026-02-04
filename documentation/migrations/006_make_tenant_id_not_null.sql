-- Migration: Make tenant_id NOT NULL
-- Phase 1.3: Enforce tenant_id constraint
-- ⚠️ EXECUTE ONLY AFTER 005_populate_tenant_id_dayane.sql

ALTER TABLE public.diagnosticos
ALTER COLUMN tenant_id SET NOT NULL;

ALTER TABLE public.profiles
ALTER COLUMN tenant_id SET NOT NULL;

ALTER TABLE public.entrevistas
ALTER COLUMN tenant_id SET NOT NULL;
