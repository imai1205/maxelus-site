-- ================================================
-- contacts テーブル（お問い合わせ）の作成
-- ================================================

-- contacts テーブル
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  inquiry_type TEXT,
  budget TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- contacts RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 公開：INSERT可能（誰でも問い合わせを送信できる）
DROP POLICY IF EXISTS "contacts_insert_public" ON contacts;
CREATE POLICY "contacts_insert_public" ON contacts
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 認証済み：SELECT可能（管理者のみ閲覧可能）
DROP POLICY IF EXISTS "contacts_select_authenticated" ON contacts;
CREATE POLICY "contacts_select_authenticated" ON contacts
  FOR SELECT TO authenticated USING (true);
