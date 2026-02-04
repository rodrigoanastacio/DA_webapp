-- Phase 3.3: Update Entrevistas RLS (JWT-based tenant isolation)

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.entrevistas;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.entrevistas;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.entrevistas;

CREATE POLICY "tenant_isolation_entrevistas_select"
  ON public.entrevistas FOR SELECT
  USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

CREATE POLICY "tenant_isolation_entrevistas_insert"
  ON public.entrevistas FOR INSERT
  WITH CHECK (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

CREATE POLICY "tenant_isolation_entrevistas_update"
  ON public.entrevistas FOR UPDATE
  USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

CREATE POLICY "tenant_isolation_entrevistas_delete"
  ON public.entrevistas FOR DELETE
  USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  );

COMMENT ON POLICY "tenant_isolation_entrevistas_select" ON public.entrevistas IS
  'JWT-based tenant isolation: users can only see their tenant data';

COMMENT ON POLICY "tenant_isolation_entrevistas_insert" ON public.entrevistas IS
  'JWT-based tenant isolation: users can only insert data for their tenant';
