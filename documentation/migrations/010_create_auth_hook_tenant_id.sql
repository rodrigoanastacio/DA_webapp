CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
DECLARE
  claims jsonb;
  user_tenant_id uuid;
BEGIN
  claims := event->'claims';

  SELECT tenant_id INTO user_tenant_id
  FROM public.profiles
  WHERE id = (event->>'user_id')::uuid;

  IF user_tenant_id IS NOT NULL THEN
    claims := jsonb_set(claims, '{tenant_id}', to_jsonb(user_tenant_id));
  ELSE
    RAISE WARNING 'User % has no tenant_id', event->>'user_id';
  END IF;

  event := jsonb_set(event, '{claims}', claims);

  RETURN event;
END;
$$;

GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;

COMMENT ON FUNCTION public.custom_access_token_hook IS 
  'Auth Hook: Injects tenant_id into JWT claims from user profile';
