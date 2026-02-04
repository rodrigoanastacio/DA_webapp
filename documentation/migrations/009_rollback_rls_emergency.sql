-- EMERGENCY ROLLBACK: Restore original RLS policies
-- Issue: Multi-tenant RLS broke login flow
-- Strategy: Keep tenant_id columns but restore old policies

-- === PROFILES (Back to original) ===
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles from their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can only see profiles from their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert profiles for their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Users can update profiles from their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by authenticated users" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- === DIAGNOSTICOS (Back to original) ===
DROP POLICY IF EXISTS "Users can only see their tenant's diagnosticos" ON public.diagnosticos;
DROP POLICY IF EXISTS "Users can insert diagnosticos for their tenant" ON public.diagnosticos;
DROP POLICY IF EXISTS "Users can update their tenant's diagnosticos" ON public.diagnosticos;

CREATE POLICY "Enable read access for authenticated users"
  ON public.diagnosticos
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert access for authenticated users"
  ON public.diagnosticos
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update access for authenticated users"
  ON public.diagnosticos
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- === ENTREVISTAS (Back to original) ===
DROP POLICY IF EXISTS "Users can only see their tenant's entrevistas" ON public.entrevistas;
DROP POLICY IF EXISTS "Users can insert entrevistas for their tenant" ON public.entrevistas;
DROP POLICY IF EXISTS "Users can update their tenant's entrevistas" ON public.entrevistas;

CREATE POLICY "Enable read access for authenticated users"
  ON public.entrevistas
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert access for authenticated users"
  ON public.entrevistas
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update access for authenticated users"
  ON public.entrevistas
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);
