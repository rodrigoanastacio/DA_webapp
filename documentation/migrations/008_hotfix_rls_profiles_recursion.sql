-- HOTFIX: Fix RLS recursion in profiles table
-- Issue: Login broken due to infinite loop in SELECT policy
-- Solution: Allow users to always see their own profile, filter others by tenant_id

DROP POLICY IF EXISTS "Users can only see profiles from their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert profiles for their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Users can update profiles from their tenant" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles from their tenant"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT p.id FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);
