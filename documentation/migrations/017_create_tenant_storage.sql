-- ============================================
-- Tenant Settings: Storage & File Management
-- ============================================
-- Purpose: Create storage bucket for tenant-specific assets (logos, images)
-- Security: RLS enforces tenant isolation
-- Date: 2026-02-04

-- ============================================
-- PHASE 1: CREATE STORAGE BUCKET
-- ============================================

-- Create bucket for tenant assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tenant-assets',
  'tenant-assets',
  true,  -- Public read access (anyone can view uploaded files)
  5242880,  -- 5MB limit per file
  ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']  -- Only images
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PHASE 2: ROW LEVEL SECURITY POLICIES
-- ============================================

-- Policy 1: INSERT - Users can only upload to their tenant folder
-- File path must be: /{tenant_id}/filename.ext
CREATE POLICY "Tenant users can upload to own folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'tenant-assets' AND
  (storage.foldername(name))[1] = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

-- Policy 2: SELECT - Public read access (anyone can view files)
-- This allows logos to be displayed on public pages if needed
CREATE POLICY "Public read access for tenant assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'tenant-assets');

-- Policy 3: UPDATE - Users can only update files in their tenant folder
CREATE POLICY "Tenant users can update own files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'tenant-assets' AND
  (storage.foldername(name))[1] = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

-- Policy 4: DELETE - Users can only delete files in their tenant folder
CREATE POLICY "Tenant users can delete own files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'tenant-assets' AND
  (storage.foldername(name))[1] = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

-- ============================================
-- PHASE 3: HELPER FUNCTION (OPTIONAL)
-- ============================================

-- Function to get current user's tenant_id from JWT
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::uuid,
    NULL
  );
$$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify bucket created
SELECT * FROM storage.buckets WHERE id = 'tenant-assets';

-- Verify policies exist
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE tablename = 'objects' AND policyname LIKE '%tenant%'
ORDER BY policyname;

-- ============================================
-- USAGE EXAMPLES
-- ============================================

/*
Example file structure after uploads:

tenant-assets/
  ├── a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11/  (Dayane tenant)
  │   ├── logo.png
  │   └── favicon.ico
  └── 00000000-0000-0000-0000-000000000002/  (Rodrigo tenant)
      └── logo.png

Example upload via JS client:
```javascript
const { data, error } = await supabase.storage
  .from('tenant-assets')
  .upload(`${tenant_id}/logo.png`, file, {
    upsert: true,
    contentType: file.type
  })
```

Get public URL:
```javascript
const { data } = supabase.storage
  .from('tenant-assets')
  .getPublicUrl(`${tenant_id}/logo.png`)

console.log(data.publicUrl)
// https://[project].supabase.co/storage/v1/object/public/tenant-assets/[tenant_id]/logo.png
```
*/

-- ============================================
-- ROLLBACK (if needed)
-- ============================================

/*
-- Remove policies
DROP POLICY IF EXISTS "Tenant users can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for tenant assets" ON storage.objects;
DROP POLICY IF EXISTS "Tenant users can update own files" ON storage.objects;
DROP POLICY IF EXISTS "Tenant users can delete own files" ON storage.objects;

-- Remove helper function
DROP FUNCTION IF EXISTS get_user_tenant_id();

-- Remove bucket (this will delete all files!)
DELETE FROM storage.buckets WHERE id = 'tenant-assets';
*/
