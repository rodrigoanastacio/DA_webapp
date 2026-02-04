-- Phase 3.2: Update Diagnosticos RLS (JWT-based tenant isolation)

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.diagnosticos;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.diagnosticos;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.diagnosticos;
DROP POLICY IF EXISTS "Admins can view all leads" ON public.diagnosticos;
DROP POLICY IF EXISTS "Admins can update leads" ON public.diagnosticos;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.diagnosticos;
DROP POLICY IF EXISTS "Allow public submission" ON public.diagnosticos;

CREATE POLICY "tenant_isolation_diagnosticos_select"
  ON public.diagnosticos FOR SELECT
  USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

CREATE POLICY "tenant_isolation_diagnosticos_insert"
  ON public.diagnosticos FOR INSERT
  WITH CHECK (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

CREATE POLICY "tenant_isolation_diagnosticos_update"
  ON public.diagnosticos FOR UPDATE
  USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

CREATE POLICY "tenant_isolation_diagnosticos_delete"
  ON public.diagnosticos FOR DELETE
  USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

CREATE POLICY "allow_public_diagnostico_submission"
  ON public.diagnosticos FOR INSERT
  WITH CHECK (true);

COMMENT ON POLICY "tenant_isolation_diagnosticos_select" ON public.diagnosticos IS
  'JWT-based tenant isolation: users can only see their tenant data';

COMMENT ON POLICY "tenant_isolation_diagnosticos_insert" ON public.diagnosticos IS
  'JWT-based tenant isolation: users can only insert data for their tenant';

COMMENT ON POLICY "allow_public_diagnostico_submission" ON public.diagnosticos IS
  'Allow anonymous users to submit diagnosticos from landing page';
