-- ================================================
-- Supabase Storage バケット設定
-- Supabaseダッシュボードの SQL Editor で実行
-- ================================================

-- cms-assets バケットを作成（公開バケット）
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms-assets',
  'cms-assets',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS ポリシー

-- 公開：誰でもファイルを閲覧可能
CREATE POLICY "cms_assets_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms-assets');

-- 認証済み：ファイルアップロード可能
CREATE POLICY "cms_assets_insert_authenticated" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cms-assets');

-- 認証済み：ファイル更新可能
CREATE POLICY "cms_assets_update_authenticated" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'cms-assets') WITH CHECK (bucket_id = 'cms-assets');

-- 認証済み：ファイル削除可能
CREATE POLICY "cms_assets_delete_authenticated" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'cms-assets');
