-- Migration: Populate tenant_id with Dayane's tenant
-- Phase 1.2: Associate existing data with Dayane Anastacio tenant
-- ✅ SAFE: Only UPDATEs NULL values

UPDATE public.diagnosticos
SET tenant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid
WHERE tenant_id IS NULL;

UPDATE public.profiles
SET tenant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid
WHERE tenant_id IS NULL;

UPDATE public.entrevistas
SET tenant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid
WHERE tenant_id IS NULL;
