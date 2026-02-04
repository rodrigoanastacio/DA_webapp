-- Phase 3.1: Update Profiles RLS (NO tenant check - avoid recursion)

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.profiles;

CREATE POLICY "users_own_profile_select"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users_own_profile_insert"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_own_profile_update"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

COMMENT ON POLICY "users_own_profile_select" ON public.profiles IS
  'Users can view their own profile (no tenant check to avoid recursion)';

COMMENT ON POLICY "users_own_profile_insert" ON public.profiles IS
  'Users can insert their own profile during signup';

COMMENT ON POLICY "users_own_profile_update" ON public.profiles IS
  'Users can update their own profile';
