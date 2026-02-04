-- Migration: Update RLS policies for multi-tenancy
-- Phase 1.4: Filter all queries by tenant_id
-- ✅ SAFE: Replaces existing policies with tenant-aware versions

-- === DIAGNOSTICOS ===
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.diagnosticos;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.diagnosticos;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.diagnosticos;

CREATE POLICY "Users can only see their tenant's diagnosticos"
  ON public.diagnosticos
  FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can insert diagnosticos for their tenant"
  ON public.diagnosticos
  FOR INSERT
  WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their tenant's diagnosticos"
  ON public.diagnosticos
  FOR UPDATE
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

-- === PROFILES ===
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.profiles;

CREATE POLICY "Users can only see profiles from their tenant"
  ON public.profiles
  FOR SELECT
  USING (
    tenant_id = (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can insert profiles for their tenant"
  ON public.profiles
  FOR INSERT
  WITH CHECK (
    tenant_id = (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update profiles from their tenant"
  ON public.profiles
  FOR UPDATE
  USING (
    tenant_id = (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

-- === ENTREVISTAS ===
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.entrevistas;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.entrevistas;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.entrevistas;

CREATE POLICY "Users can only see their tenant's entrevistas"
  ON public.entrevistas
  FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can insert entrevistas for their tenant"
  ON public.entrevistas
  FOR INSERT
  WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their tenant's entrevistas"
  ON public.entrevistas
  FOR UPDATE
  USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );
