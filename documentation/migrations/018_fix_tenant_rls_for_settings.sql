-- ============================================
-- Fix: Allow Users to Read Their Own Tenant
-- ============================================
-- Purpose: Fix RLS policies to allow non-admin users to read/update their tenant
-- Issue: Previous policies only allowed 'admin' role to access tenants table
-- Date: 2026-02-04

-- ============================================
-- PROBLEM
-- ============================================
-- Current RLS policies on 'tenants' table:
-- - SELECT: Only admins
-- - UPDATE: Only admins
-- - INSERT: Only admins
--
-- This prevents 'viewer' users from:
-- - Reading tenant settings (for TenantLogo component)
-- - Updating tenant settings (for logo upload)

-- ============================================
-- SOLUTION: Add Tenant-Scoped Policies
-- ============================================

-- Policy: Users can view their own tenant
CREATE POLICY "Users can view their own tenant"
ON tenants
FOR SELECT
USING (
  id = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::uuid
);

-- Policy: Users can update their own tenant
-- This allows logo upload and settings updates
CREATE POLICY "Users can update their own tenant"
ON tenants
FOR UPDATE
USING (
  id = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::uuid
)
WITH CHECK (
  id = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::uuid
);

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify policies exist
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE tablename = 'tenants'
ORDER BY policyname;

-- Expected output:
-- 1. Admins can insert tenants (INSERT, admin only)
-- 2. Admins can update tenants (UPDATE, admin only) 
-- 3. Admins can view all tenants (SELECT, admin only)
-- 4. Users can view their own tenant (SELECT, tenant_id match) ✅ NEW
-- 5. Users can update their own tenant (UPDATE, tenant_id match) ✅ NEW

-- ============================================
-- TESTING
-- ============================================

/*
Test as viewer user:

1. Login as rodrigo@dayaneanastacio.com (role: viewer)
2. Navigate to /dashboard/settings
3. API call to GET /api/settings should work
4. Upload logo should work
5. Verify Rodrigo can only see/update his tenant (isolation)

Test as admin:

1. Login as suportedayaneanastacio@gmail.com (role: admin)  
2. Should see all tenants via admin policies
3. Can update any tenant
*/

-- ============================================
-- NOTES
-- ============================================

-- Security:
-- ✅ Users can only access their own tenant (filtered by JWT)
-- ✅ Admin users retain full access via separate policies
-- ✅ No cross-tenant data leakage
-- ✅ Policies enforced at database level (can't bypass)

-- Policy Precedence:
-- If user is admin: admin policies apply (full access)
-- If user is viewer/other: tenant-scoped policies apply (own tenant only)
