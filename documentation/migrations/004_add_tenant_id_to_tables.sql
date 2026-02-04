-- Migration: Add tenant_id column to existing tables
-- Phase 1.1: Add NULLABLE column (backward compatible)
-- ✅ SAFE: Allows existing code to continue working

ALTER TABLE public.diagnosticos
ADD COLUMN IF NOT EXISTS tenant_id UUID
  REFERENCES public.tenants(id) ON DELETE CASCADE;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tenant_id UUID
  REFERENCES public.tenants(id) ON DELETE CASCADE;

ALTER TABLE public.entrevistas
ADD COLUMN IF NOT EXISTS tenant_id UUID
  REFERENCES public.tenants(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_diagnosticos_tenant_id 
  ON public.diagnosticos(tenant_id);

CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id 
  ON public.profiles(tenant_id);

CREATE INDEX IF NOT EXISTS idx_entrevistas_tenant_id 
  ON public.entrevistas(tenant_id);
