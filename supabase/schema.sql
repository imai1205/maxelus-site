-- ================================================
-- Maxelus CMS Schema
-- Supabaseで実行するSQL
-- ================================================

-- 1. assets テーブル（画像メタデータ）
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket TEXT NOT NULL DEFAULT 'cms-assets',
  path TEXT NOT NULL,
  alt TEXT DEFAULT '',
  width INT,
  height INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- site_settings テーブルに不足しているカラムを追加（既存テーブルがある場合）
DO $$ 
BEGIN
  -- Page Settings カラム
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'strengths_page_title') THEN
    ALTER TABLE site_settings ADD COLUMN strengths_page_title TEXT DEFAULT 'マクセラスが選ばれる理由';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'strengths_page_subtitle') THEN
    ALTER TABLE site_settings ADD COLUMN strengths_page_subtitle TEXT DEFAULT '"作るだけ"では終わらない。現場で使える・更新できる・拡張できるシステムを、最短で形にします。';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'strengths_stats') THEN
    ALTER TABLE site_settings ADD COLUMN strengths_stats JSONB DEFAULT '[{"label": "導入実績", "value": 50, "suffix": "社以上"}, {"label": "継続率", "value": 95, "suffix": "%"}, {"label": "平均開発期間", "value": 2, "suffix": "ヶ月〜"}, {"label": "業界経験", "value": 10, "suffix": "年以上"}]';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_page_title') THEN
    ALTER TABLE site_settings ADD COLUMN services_page_title TEXT DEFAULT '製造業の"現場で使える"DXを、最短で形にします。';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_page_subtitle') THEN
    ALTER TABLE site_settings ADD COLUMN services_page_subtitle TEXT DEFAULT '図面管理／受発注・販売管理／Webアプリ／iPhoneデモ搭載LPまで一気通貫。';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'contact_page_title') THEN
    ALTER TABLE site_settings ADD COLUMN contact_page_title TEXT DEFAULT 'お問い合わせ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'contact_page_subtitle') THEN
    ALTER TABLE site_settings ADD COLUMN contact_page_subtitle TEXT DEFAULT 'まずは無料相談から。お気軽にご連絡ください。';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_page_cta_primary_text') THEN
    ALTER TABLE site_settings ADD COLUMN services_page_cta_primary_text TEXT DEFAULT '無料相談する';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_page_cta_primary_href') THEN
    ALTER TABLE site_settings ADD COLUMN services_page_cta_primary_href TEXT DEFAULT '/contact';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_page_cta_secondary_text') THEN
    ALTER TABLE site_settings ADD COLUMN services_page_cta_secondary_text TEXT DEFAULT 'マクセラスの強みを見る';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_page_cta_secondary_href') THEN
    ALTER TABLE site_settings ADD COLUMN services_page_cta_secondary_href TEXT DEFAULT '/strengths';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'strengths_page_cta_primary_text') THEN
    ALTER TABLE site_settings ADD COLUMN strengths_page_cta_primary_text TEXT DEFAULT '無料相談する';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'strengths_page_cta_primary_href') THEN
    ALTER TABLE site_settings ADD COLUMN strengths_page_cta_primary_href TEXT DEFAULT '/contact';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'strengths_page_cta_secondary_text') THEN
    ALTER TABLE site_settings ADD COLUMN strengths_page_cta_secondary_text TEXT DEFAULT 'サービス一覧を見る';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'strengths_page_cta_secondary_href') THEN
    ALTER TABLE site_settings ADD COLUMN strengths_page_cta_secondary_href TEXT DEFAULT '/services';
  END IF;
END $$;

-- 2. site_settings テーブル（Singleton: 1レコード）
-- すべてのセクションの編集可能な項目を含む
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'site',
  
  -- ======= Hero Section =======
  hero_title TEXT DEFAULT 'そのソフト、現場に合わせて
"我慢して"使っていませんか？',
  hero_subtitle TEXT DEFAULT '業務にソフトを合わせる時代は終わり。
まずは"触れるデモ"で、最短ルートを見える化します。',
  hero_description TEXT DEFAULT 'HP/業務DX/Webアプリ・iOSアプリまで対応。目的（集客UP／工数削減／ミス削減）から一緒に整理し、最短で形にします。',
  hero_image_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  cta_primary_text TEXT DEFAULT '無料相談する',
  cta_primary_href TEXT DEFAULT '/contact',
  cta_secondary_text TEXT DEFAULT '実績を見る',
  cta_secondary_href TEXT DEFAULT '/works',
  
  -- ======= Challenge Section =======
  challenge_title TEXT DEFAULT '課題は"ズレ"から起きる',
  challenge_subtitle TEXT DEFAULT '開発の失敗の多くは、認識のズレから生まれます。',
  challenge_before_items JSONB DEFAULT '["仕様が固まらない", "途中で手戻りが出る", "追加費用が怖い"]',
  challenge_after_items JSONB DEFAULT '["触れるデモで合意", "設計確定→開発", "予算と範囲が明確"]',
  
  -- ======= Solution Section =======
  solution_title TEXT DEFAULT 'その業務、システム化して
"人を増やさず"回すのはどうですか？',
  solution_subtitle TEXT DEFAULT '日々のムダを減らして、現場の処理速度を上げる。',
  
  -- ======= Services Section =======
  services_title TEXT DEFAULT '対応できる内容',
  services JSONB DEFAULT '[
    {"title": "HP制作", "description": "普通のHPも、3D/アニメーションみたいな『尖った表現』も対応。", "tags": ["3D", "アニメ", "CMS"], "icon": "web"},
    {"title": "Webアプリ開発", "description": "新規事業のSaaSも、社内ツールも。まずはMVPから最短で形に。", "tags": ["MVP", "DB", "認証"], "icon": "app"},
    {"title": "業務DXアプリ", "description": "散らばった業務を一元管理。集計・分析まで『すぐ見える化』。", "tags": ["一元管理", "分析", "ワークフロー"], "icon": "dx"},
    {"title": "クラウド連携", "description": "SaaS同士をAPIで接続して、二重入力をゼロに。", "tags": ["API", "自動同期", "運用設計"], "icon": "cloud"},
    {"title": "iOS/Androidアプリ", "description": "あなたのアイデアをアプリ化。Web連携・DB連携もまとめて対応。", "tags": ["Swift", "Flutter", "ストア申請"], "icon": "mobile"},
    {"title": "AI活用・自動化", "description": "資料・図面・問い合わせ対応をAIで自動化。検索も爆速に。", "tags": ["OCR", "AI検索", "自動化"], "icon": "ai"}
  ]',
  
  -- ======= Works Section =======
  works_title TEXT DEFAULT '実績',
  works_subtitle TEXT DEFAULT '製造業、医療、建設など、幅広い業界で実績があります',
  works_stat_1_number INT DEFAULT 50,
  works_stat_1_suffix TEXT DEFAULT '+',
  works_stat_1_label TEXT DEFAULT 'プロジェクト実績',
  works_stat_2_number INT DEFAULT 98,
  works_stat_2_suffix TEXT DEFAULT '%',
  works_stat_2_label TEXT DEFAULT '顧客満足度',
  works_stat_3_number INT DEFAULT 15,
  works_stat_3_suffix TEXT DEFAULT '+',
  works_stat_3_label TEXT DEFAULT '業界対応',
  
  -- ======= FAQ Section =======
  faq_title TEXT DEFAULT 'よくある質問',
  faqs JSONB DEFAULT '[
    {"question": "料金はどれくらいかかりますか？", "answer": "30万円〜対応可能です。内容や規模により異なりますので、まずは無料相談でご要望をお聞かせください。お見積りを提示いたします。"},
    {"question": "開発期間はどれくらいですか？", "answer": "プロジェクト規模により異なりますが、シンプルなLPなら2週間〜、Webアプリなら1〜3ヶ月が目安です。デモ提示後に正確なスケジュールをご提示します。"},
    {"question": "途中で仕様変更できますか？", "answer": "デモ提示の段階で認識を合わせるため、大きな手戻りは発生しにくい仕組みです。軽微な修正は柔軟に対応しますが、大幅な変更は追加費用が発生する場合があります。"},
    {"question": "運用・保守もお願いできますか？", "answer": "はい、運用・保守も対応可能です。月額での保守契約や、都度対応など、ご要望に合わせてプランをご提案します。"},
    {"question": "契約の流れを教えてください", "answer": "無料相談 → デモ提示 → お見積り → 契約 → 開発 → 納品 の流れです。各ステップで確認しながら進めるため、安心してご依頼いただけます。"},
    {"question": "業界は問わず対応できますか？", "answer": "はい、製造業、医療、建設、不動産、飲食など、業界問わず対応可能です。お客様の業務内容をヒアリングし、最適なソリューションをご提案します。"}
  ]',
  
  -- ======= CTA Section =======
  cta_section_title TEXT DEFAULT '既製品に合わせるのをやめて、
"自社に最適化"しませんか？',
  cta_section_subtitle TEXT DEFAULT 'まずは無料相談で、課題整理→触れるデモ提示まで一緒に進めます。',
  
  -- ======= Company Info =======
  company_name TEXT DEFAULT 'MAXELUS',
  logo_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  about_title TEXT DEFAULT '私たちについて',
  about_text TEXT DEFAULT '私たちは、お客様のビジネスをデジタルで支援するパートナーです。',
  
  -- ======= Contact Page =======
  contact_email TEXT DEFAULT 'info@maxelus.com',
  contact_phone TEXT DEFAULT '',
  contact_address TEXT DEFAULT '',
  
  -- ======= Page Settings =======
  strengths_page_title TEXT DEFAULT 'マクセラスが選ばれる理由',
  strengths_page_subtitle TEXT DEFAULT '"作るだけ"では終わらない。現場で使える・更新できる・拡張できるシステムを、最短で形にします。',
  strengths_stats JSONB DEFAULT '[{"label": "導入実績", "value": 50, "suffix": "社以上"}, {"label": "継続率", "value": 95, "suffix": "%"}, {"label": "平均開発期間", "value": 2, "suffix": "ヶ月〜"}, {"label": "業界経験", "value": 10, "suffix": "年以上"}]',
  services_page_title TEXT DEFAULT '製造業の"現場で使える"DXを、最短で形にします。',
  services_page_subtitle TEXT DEFAULT '図面管理／受発注・販売管理／Webアプリ／iPhoneデモ搭載LPまで一気通貫。',
  services_page_cta_primary_text TEXT DEFAULT '無料相談する',
  services_page_cta_primary_href TEXT DEFAULT '/contact',
  services_page_cta_secondary_text TEXT DEFAULT 'マクセラスの強みを見る',
  services_page_cta_secondary_href TEXT DEFAULT '/strengths',
  strengths_page_cta_primary_text TEXT DEFAULT '無料相談する',
  strengths_page_cta_primary_href TEXT DEFAULT '/contact',
  strengths_page_cta_secondary_text TEXT DEFAULT 'サービス一覧を見る',
  strengths_page_cta_secondary_href TEXT DEFAULT '/services',
  contact_page_title TEXT DEFAULT 'お問い合わせ',
  contact_page_subtitle TEXT DEFAULT 'まずは無料相談から。お気軽にご連絡ください。',
  
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. services テーブル（サービスコレクション）
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '新規サービス',
  slug TEXT UNIQUE NOT NULL,
  catch TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  tags JSONB DEFAULT '[]'::jsonb,
  primary_cta_label TEXT DEFAULT '詳細を見る',
  external_url TEXT DEFAULT NULL,
  icon TEXT DEFAULT 'code',
  order_number INT DEFAULT 0,
  detail_content JSONB DEFAULT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. strengths テーブル（強みコレクション）
CREATE TABLE IF NOT EXISTS strengths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  features JSONB DEFAULT '[]'::jsonb,
  icon TEXT DEFAULT 'sparkles',
  order_number INT DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. works テーブル（実績コレクション）
CREATE TABLE IF NOT EXISTS works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '新規実績',
  slug TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  problem TEXT DEFAULT '',
  solution TEXT DEFAULT '',
  result TEXT DEFAULT '',
  stack TEXT DEFAULT '',
  cover_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- works テーブルに不足しているカラムを追加（既存テーブルがある場合）
ALTER TABLE works ADD COLUMN IF NOT EXISTS category TEXT DEFAULT '';
ALTER TABLE works ADD COLUMN IF NOT EXISTS summary TEXT DEFAULT '';
ALTER TABLE works ADD COLUMN IF NOT EXISTS industry TEXT DEFAULT '';
ALTER TABLE works ADD COLUMN IF NOT EXISTS problem TEXT DEFAULT '';
ALTER TABLE works ADD COLUMN IF NOT EXISTS solution TEXT DEFAULT '';
ALTER TABLE works ADD COLUMN IF NOT EXISTS result TEXT DEFAULT '';
ALTER TABLE works ADD COLUMN IF NOT EXISTS stack TEXT DEFAULT '';
ALTER TABLE works ADD COLUMN IF NOT EXISTS cover_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL;
ALTER TABLE works ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT FALSE;
ALTER TABLE works ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- site_settings_history テーブルに不足しているカラムを追加（既存テーブルがある場合）
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'strengths_page_title') THEN
    ALTER TABLE site_settings_history ADD COLUMN strengths_page_title TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'strengths_page_subtitle') THEN
    ALTER TABLE site_settings_history ADD COLUMN strengths_page_subtitle TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'strengths_stats') THEN
    ALTER TABLE site_settings_history ADD COLUMN strengths_stats JSONB;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'services_page_title') THEN
    ALTER TABLE site_settings_history ADD COLUMN services_page_title TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'services_page_subtitle') THEN
    ALTER TABLE site_settings_history ADD COLUMN services_page_subtitle TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'contact_page_title') THEN
    ALTER TABLE site_settings_history ADD COLUMN contact_page_title TEXT;
  END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'contact_page_subtitle') THEN
    ALTER TABLE site_settings_history ADD COLUMN contact_page_subtitle TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'services_page_cta_primary_text') THEN
    ALTER TABLE site_settings_history ADD COLUMN services_page_cta_primary_text TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'services_page_cta_primary_href') THEN
    ALTER TABLE site_settings_history ADD COLUMN services_page_cta_primary_href TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'services_page_cta_secondary_text') THEN
    ALTER TABLE site_settings_history ADD COLUMN services_page_cta_secondary_text TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'services_page_cta_secondary_href') THEN
    ALTER TABLE site_settings_history ADD COLUMN services_page_cta_secondary_href TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'strengths_page_cta_primary_text') THEN
    ALTER TABLE site_settings_history ADD COLUMN strengths_page_cta_primary_text TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'strengths_page_cta_primary_href') THEN
    ALTER TABLE site_settings_history ADD COLUMN strengths_page_cta_primary_href TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'strengths_page_cta_secondary_text') THEN
    ALTER TABLE site_settings_history ADD COLUMN strengths_page_cta_secondary_text TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings_history' AND column_name = 'strengths_page_cta_secondary_href') THEN
    ALTER TABLE site_settings_history ADD COLUMN strengths_page_cta_secondary_href TEXT;
  END IF;
END $$;

-- 6. site_settings_history テーブル（サイト設定の履歴）
CREATE TABLE IF NOT EXISTS site_settings_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_settings_id TEXT NOT NULL DEFAULT 'site',
  version_number INT NOT NULL,
  -- すべてのsite_settingsのフィールドをコピー
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_description TEXT,
  hero_image_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  cta_primary_text TEXT,
  cta_primary_href TEXT,
  cta_secondary_text TEXT,
  cta_secondary_href TEXT,
  challenge_title TEXT,
  challenge_subtitle TEXT,
  challenge_before_items JSONB,
  challenge_after_items JSONB,
  solution_title TEXT,
  solution_subtitle TEXT,
  services_title TEXT,
  services JSONB,
  works_title TEXT,
  works_subtitle TEXT,
  works_stat_1_number INT,
  works_stat_1_suffix TEXT,
  works_stat_1_label TEXT,
  works_stat_2_number INT,
  works_stat_2_suffix TEXT,
  works_stat_2_label TEXT,
  works_stat_3_number INT,
  works_stat_3_suffix TEXT,
  works_stat_3_label TEXT,
  faq_title TEXT,
  faqs JSONB,
  cta_section_title TEXT,
  cta_section_subtitle TEXT,
  company_name TEXT,
  logo_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
    about_title TEXT,
    about_text TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    contact_address TEXT,
    strengths_page_title TEXT,
    strengths_page_subtitle TEXT,
    strengths_stats JSONB,
    services_page_title TEXT,
    services_page_subtitle TEXT,
    services_page_cta_primary_text TEXT,
    services_page_cta_primary_href TEXT,
    services_page_cta_secondary_text TEXT,
    services_page_cta_secondary_href TEXT,
    strengths_page_cta_primary_text TEXT,
    strengths_page_cta_primary_href TEXT,
    strengths_page_cta_secondary_text TEXT,
    strengths_page_cta_secondary_href TEXT,
    contact_page_title TEXT,
    contact_page_subtitle TEXT,
    -- 履歴メタデータ
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  note TEXT DEFAULT '' -- 変更メモ（オプション）
);

-- 7. works_history テーブル（実績の履歴）
CREATE TABLE IF NOT EXISTS works_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  -- すべてのworksのフィールドをコピー
  title TEXT,
  slug TEXT,
  category TEXT,
  summary TEXT,
  industry TEXT,
  problem TEXT,
  solution TEXT,
  result TEXT,
  stack TEXT,
  cover_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  published BOOLEAN,
  sort_order INT,
  -- 履歴メタデータ
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  note TEXT DEFAULT '' -- 変更メモ（オプション）
);

-- ================================================
-- RLS (Row Level Security) ポリシー
-- ================================================

-- assets RLS
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- 公開：誰でもSELECT可能
DROP POLICY IF EXISTS "assets_select_public" ON assets;
CREATE POLICY "assets_select_public" ON assets
  FOR SELECT USING (true);

-- 認証済み：INSERT/UPDATE/DELETE可能
DROP POLICY IF EXISTS "assets_insert_authenticated" ON assets;
CREATE POLICY "assets_insert_authenticated" ON assets
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "assets_update_authenticated" ON assets;
CREATE POLICY "assets_update_authenticated" ON assets
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "assets_delete_authenticated" ON assets;
CREATE POLICY "assets_delete_authenticated" ON assets
  FOR DELETE TO authenticated USING (true);

-- site_settings RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 公開：誰でもSELECT可能
DROP POLICY IF EXISTS "site_settings_select_public" ON site_settings;
CREATE POLICY "site_settings_select_public" ON site_settings
  FOR SELECT USING (true);

-- 認証済み：UPDATE可能（INSERTは初期データのみ）
DROP POLICY IF EXISTS "site_settings_update_authenticated" ON site_settings;
CREATE POLICY "site_settings_update_authenticated" ON site_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- works RLS
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- 公開：published=true のみSELECT可能
DROP POLICY IF EXISTS "works_select_published" ON works;
CREATE POLICY "works_select_published" ON works
  FOR SELECT USING (published = true);

-- 認証済み：全てのレコードにアクセス可能
DROP POLICY IF EXISTS "works_select_authenticated" ON works;
CREATE POLICY "works_select_authenticated" ON works
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "works_insert_authenticated" ON works;
CREATE POLICY "works_insert_authenticated" ON works
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "works_update_authenticated" ON works;
CREATE POLICY "works_update_authenticated" ON works
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "works_delete_authenticated" ON works;
CREATE POLICY "works_delete_authenticated" ON works
  FOR DELETE TO authenticated USING (true);

-- services RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 公開：published=true のみSELECT可能
DROP POLICY IF EXISTS "services_select_published" ON services;
CREATE POLICY "services_select_published" ON services
  FOR SELECT USING (published = true);

-- 認証済み：全てのレコードにアクセス可能
DROP POLICY IF EXISTS "services_select_authenticated" ON services;
CREATE POLICY "services_select_authenticated" ON services
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "services_insert_authenticated" ON services;
CREATE POLICY "services_insert_authenticated" ON services
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "services_update_authenticated" ON services;
CREATE POLICY "services_update_authenticated" ON services
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "services_delete_authenticated" ON services;
CREATE POLICY "services_delete_authenticated" ON services
  FOR DELETE TO authenticated USING (true);

-- strengths RLS
ALTER TABLE strengths ENABLE ROW LEVEL SECURITY;

-- 公開：published=true のみSELECT可能
DROP POLICY IF EXISTS "strengths_select_published" ON strengths;
CREATE POLICY "strengths_select_published" ON strengths
  FOR SELECT USING (published = true);

-- 認証済み：全てのレコードにアクセス可能
DROP POLICY IF EXISTS "strengths_select_authenticated" ON strengths;
CREATE POLICY "strengths_select_authenticated" ON strengths
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "strengths_insert_authenticated" ON strengths;
CREATE POLICY "strengths_insert_authenticated" ON strengths
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "strengths_update_authenticated" ON strengths;
CREATE POLICY "strengths_update_authenticated" ON strengths
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "strengths_delete_authenticated" ON strengths;
CREATE POLICY "strengths_delete_authenticated" ON strengths
  FOR DELETE TO authenticated USING (true);

-- site_settings_history RLS
ALTER TABLE site_settings_history ENABLE ROW LEVEL SECURITY;

-- 認証済み：SELECT/INSERT可能
DROP POLICY IF EXISTS "site_settings_history_select_authenticated" ON site_settings_history;
CREATE POLICY "site_settings_history_select_authenticated" ON site_settings_history
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "site_settings_history_insert_authenticated" ON site_settings_history;
CREATE POLICY "site_settings_history_insert_authenticated" ON site_settings_history
  FOR INSERT TO authenticated WITH CHECK (true);

-- works_history RLS
ALTER TABLE works_history ENABLE ROW LEVEL SECURITY;

-- 認証済み：SELECT/INSERT可能
DROP POLICY IF EXISTS "works_history_select_authenticated" ON works_history;
CREATE POLICY "works_history_select_authenticated" ON works_history
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "works_history_insert_authenticated" ON works_history;
CREATE POLICY "works_history_insert_authenticated" ON works_history
  FOR INSERT TO authenticated WITH CHECK (true);

-- ================================================
-- 初期データ
-- ================================================

-- site_settings 初期レコード（id='site'）
INSERT INTO site_settings (id) VALUES ('site')
ON CONFLICT (id) DO NOTHING;

-- strengths デフォルトデータ（5件）
INSERT INTO strengths (title, description, features, icon, order_number, published) VALUES
(
  'WordPressでは出せない"体験"を作れる',
  'iPhoneデモがサイト内で動く。3D表現・アニメーション・インタラクション。「かっこいい」だけでなく、理解しやすい導線に落とし込みます。',
  '["iPhoneデモがサイト内で動く（操作感が伝わる）", "3D表現・アニメーション・インタラクション（離脱を減らす）", "「かっこいい」だけじゃなく、理解しやすい導線に落とし込む"]'::jsonb,
  'sparkles',
  0,
  true
),
(
  '打ち合わせ後すぐに"デモ"が出る開発スタイル',
  '先にデザインで全体像を固める。次回打ち合わせで触れる画面がある。「失敗ゼロへ」＝ 仕様のズレを最初に潰します。',
  '["先にデザインで全体像を固める → 迷いが減る", "次回打ち合わせで触れる画面がある → 判断が早い", "「失敗ゼロへ」＝ 仕様のズレを最初に潰す"]'::jsonb,
  'demo',
  1,
  true
),
(
  '業務DXは"運用まで"作る',
  'Excel置き換えだけで終わらない。検索・権限・履歴・進捗・データ蓄積まで設計。製造業の現場フロー前提で開発します。',
  '["Excel置き換えだけで終わらない", "検索・権限・履歴・進捗・データ蓄積まで設計", "製造業の現場フロー前提（図面・見積・発注・工程…）"]'::jsonb,
  'operation',
  2,
  true
),
(
  'あとから自分で更新できる（microCMS対応）',
  '新着・実績・サービス内容を管理画面で編集。エンジニアがいなくても更新できる状態にします。「作って終わり」じゃなく、運用コストを下げます。',
  '["新着・実績・サービス内容を管理画面で編集", "エンジニアがいなくても更新できる状態にする", "「作って終わり」じゃなく、運用コストを下げる"]'::jsonb,
  'cms',
  3,
  true
),
(
  '拡張できる設計（最小→スケール）',
  '最初は小さく作る（MVP）。データが貯まるほどAI/OCR/検索が強くなる設計。Webアプリ・業務システムへ段階的に広げられます。',
  '["最初は小さく作る（MVP）", "データが貯まるほどAI/OCR/検索が強くなる設計", "Webアプリ・業務システムへ段階的に広げられる"]'::jsonb,
  'scale',
  4,
  true
)
ON CONFLICT DO NOTHING;

-- services デフォルトデータ（5件）
INSERT INTO services (title, slug, catch, summary, tags, primary_cta_label, external_url, icon, order_number, published) VALUES
(
  '図面コネクト',
  'zumen-connect',
  '図面が『資産』になる。検索できる図面管理。',
  'アップロードした図面をOCRで読み取り、AIで項目整理。図番・会社・材質などで探せる状態にして、現場のムダを削減します。',
  '["図面管理", "OCR", "AI", "製造業", "検索"]'::jsonb,
  '図面コネクトLPを見る',
  'https://zumen-connect.example.com',
  'document',
  0,
  true
),
(
  '製造業向け 販売管理ソフト',
  'sales-management',
  '見積→受注→手配→納品→請求まで、つながる。',
  'Excel運用を卒業し、進捗・履歴・原価の見える化へ。PC＋スマホ（iPhoneデモ）で『現場が更新できる』運用にします。',
  '["販売管理", "受発注", "在庫", "製造業", "スマホ対応"]'::jsonb,
  '概要を見る',
  NULL,
  'chart',
  1,
  true
),
(
  '業務Webアプリ開発',
  'web-app-development',
  'あなたの業務に合わせた『専用アプリ』を作ります。',
  '既存のSaaSでは足りない、御社専用の業務アプリを開発。最初はMVP（最小機能）から始めて、徐々に拡張できる設計で進めます。',
  '["Webアプリ", "業務システム", "MVP", "カスタム開発"]'::jsonb,
  '詳細を見る',
  NULL,
  'code',
  2,
  true
),
(
  'ホームページ制作',
  'website-development',
  '普通のHPも、尖った表現も。印象に残るサイトを。',
  'シンプルな企業サイトから、3D/アニメーションを使った先進的な表現まで対応。WordPressでは難しい体験を作ります。',
  '["HP制作", "3D", "アニメーション", "CMS", "コーポレート"]'::jsonb,
  '詳細を見る',
  NULL,
  'globe',
  3,
  true
),
(
  'iPhoneアプリ開発',
  'iphone-app',
  'あなたのアイデアをアプリに。Web連携もまとめて対応。',
  'iPhone/iPadアプリの企画から開発、ストア申請までワンストップ。業務アプリや顧客向けアプリなど、幅広く対応します。',
  '["iOS", "iPhone", "Swift", "アプリ開発", "ストア申請"]'::jsonb,
  '詳細を見る',
  NULL,
  'mobile',
  4,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- works デフォルトデータ（6件）
INSERT INTO works (title, slug, category, summary, industry, problem, solution, result, stack, published, sort_order) VALUES
(
  '製造業向け図面・案件管理DXシステム',
  'manufacturing-drawing-management',
  '製造業',
  'Excelでの図面管理や案件情報の手作業転記により、情報の検索に時間がかかり、更新漏れやバージョン違いが頻発していました。',
  '製造業',
  '図面と案件情報がExcelで分散管理されており、検索に平均15分、更新漏れによる手戻りが月10件以上発生していました。',
  'クラウドベースの統合管理システムを構築。図面のバージョン管理、案件との紐付け、検索機能を実装しました。',
  '検索時間が15分→30秒に短縮。更新漏れによる手戻りが月10件→0件に。年間約500時間の工数削減を実現。',
  'Next.js, PostgreSQL, AWS S3, Vercel',
  true,
  0
),
(
  '医療機関向け予約・問診システム',
  'medical-appointment-system',
  '医療・ヘルスケア',
  '電話予約の対応に多くの時間を取られ、受付業務が圧迫。問診票の記入漏れも課題でした。',
  '医療・ヘルスケア',
  '1日平均50件の電話予約対応で受付スタッフが疲弊。問診票の記入漏れが20%発生し、診察効率が低下していました。',
  'オンライン予約システムと電子問診票を開発。患者様が事前に入力できる仕組みを構築しました。',
  '電話予約が70%減少、受付業務時間が1日3時間短縮。問診漏れも5%以下に改善し、診察効率が向上しました。',
  'React, Node.js, MongoDB, LINE API',
  true,
  1
),
(
  '建設業向け顧客・進捗管理システム',
  'construction-progress-management',
  '建設・不動産',
  '複数の現場案件を紙とExcelで管理しており、進捗状況の共有が遅れ、顧客への報告が手間でした。',
  '建設・不動産',
  '現場監督と営業の情報共有にタイムラグがあり、顧客への進捗報告が遅れることが多発していました。',
  'リアルタイムで進捗を共有できるWebアプリを開発。写真アップロード機能と自動レポート生成機能を実装しました。',
  '情報共有のタイムラグが1日→即時に。顧客満足度が15%向上し、リピート受注率も増加しました。',
  'Vue.js, Firebase, Cloud Functions, Sendgrid',
  true,
  2
),
(
  '在庫管理・発注自動化システム',
  'inventory-management-automation',
  '小売・EC',
  '複数店舗の在庫管理をExcelで行っており、発注タイミングの遅れや過剰在庫が課題でした。',
  '小売・EC',
  '5店舗の在庫をExcelで個別管理。発注判断に時間がかかり、欠品と過剰在庫が同時に発生していました。',
  'リアルタイム在庫管理システムと、AIによる需要予測・自動発注機能を開発しました。',
  '欠品率50%減、過剰在庫30%削減。発注業務時間が週8時間→1時間に短縮されました。',
  'Next.js, Python, TensorFlow, PostgreSQL',
  true,
  3
),
(
  '採用管理・面接スケジューリングシステム',
  'recruitment-scheduling-system',
  '人材・採用',
  '採用活動の管理がスプレッドシートで煩雑になり、面接日程調整に多大な時間を要していました。',
  '人材・採用',
  '年間200名以上の応募者管理と面接調整を手作業で実施。担当者の負荷が高く、対応漏れも発生していました。',
  '応募者管理から面接スケジューリングまで一元化。カレンダー連携と自動リマインド機能を実装しました。',
  '面接調整時間が80%削減。対応漏れゼロを達成し、採用担当者の残業時間も大幅に減少しました。',
  'React, Node.js, Google Calendar API, Slack API',
  true,
  4
),
(
  '経費精算・承認ワークフローシステム',
  'expense-approval-workflow',
  '会計・経理',
  '紙ベースの経費精算と承認フローにより、処理に時間がかかり、月末の経理業務が逼迫していました。',
  '会計・経理',
  '月平均300件の経費精算を紙で処理。承認に平均5日かかり、経理の月末業務が深夜まで及ぶことも。',
  'スマホから申請できる経費精算アプリと、多段階承認ワークフローを開発しました。',
  '承認期間が5日→1日に短縮。経理の月末残業が50%削減され、ペーパーレス化も実現しました。',
  'React Native, Node.js, PostgreSQL, freee API',
  true,
  5
)
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- updated_at 自動更新トリガー
-- ================================================

-- トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- site_settings トリガー
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- services トリガー
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- strengths トリガー
DROP TRIGGER IF EXISTS update_strengths_updated_at ON strengths;
CREATE TRIGGER update_strengths_updated_at
  BEFORE UPDATE ON strengths
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- works トリガー
DROP TRIGGER IF EXISTS update_works_updated_at ON works;
CREATE TRIGGER update_works_updated_at
  BEFORE UPDATE ON works
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- 履歴作成関数
-- ================================================

-- site_settings の履歴を作成する関数
CREATE OR REPLACE FUNCTION create_site_settings_history()
RETURNS TRIGGER AS $$
DECLARE
  next_version INT;
  current_user_id UUID;
BEGIN
  -- 現在のユーザーIDを取得（認証済みの場合）
  current_user_id := auth.uid();
  
  -- 次のバージョン番号を取得
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO next_version
  FROM site_settings_history
  WHERE site_settings_id = NEW.id;
  
  -- 履歴レコードを作成
  INSERT INTO site_settings_history (
    site_settings_id,
    version_number,
    hero_title,
    hero_subtitle,
    hero_description,
    hero_image_asset_id,
    cta_primary_text,
    cta_primary_href,
    cta_secondary_text,
    cta_secondary_href,
    challenge_title,
    challenge_subtitle,
    challenge_before_items,
    challenge_after_items,
    solution_title,
    solution_subtitle,
    services_title,
    services,
    works_title,
    works_subtitle,
    works_stat_1_number,
    works_stat_1_suffix,
    works_stat_1_label,
    works_stat_2_number,
    works_stat_2_suffix,
    works_stat_2_label,
    works_stat_3_number,
    works_stat_3_suffix,
    works_stat_3_label,
    faq_title,
    faqs,
    cta_section_title,
    cta_section_subtitle,
    company_name,
    logo_asset_id,
    about_title,
    about_text,
    contact_email,
    contact_phone,
    contact_address,
    created_by
  ) VALUES (
    NEW.id,
    next_version,
    NEW.hero_title,
    NEW.hero_subtitle,
    NEW.hero_description,
    NEW.hero_image_asset_id,
    NEW.cta_primary_text,
    NEW.cta_primary_href,
    NEW.cta_secondary_text,
    NEW.cta_secondary_href,
    NEW.challenge_title,
    NEW.challenge_subtitle,
    NEW.challenge_before_items,
    NEW.challenge_after_items,
    NEW.solution_title,
    NEW.solution_subtitle,
    NEW.services_title,
    NEW.services,
    NEW.works_title,
    NEW.works_subtitle,
    NEW.works_stat_1_number,
    NEW.works_stat_1_suffix,
    NEW.works_stat_1_label,
    NEW.works_stat_2_number,
    NEW.works_stat_2_suffix,
    NEW.works_stat_2_label,
    NEW.works_stat_3_number,
    NEW.works_stat_3_suffix,
    NEW.works_stat_3_label,
    NEW.faq_title,
    NEW.faqs,
    NEW.cta_section_title,
    NEW.cta_section_subtitle,
    NEW.company_name,
    NEW.logo_asset_id,
    NEW.about_title,
    NEW.about_text,
    NEW.contact_email,
    NEW.contact_phone,
    NEW.contact_address,
    NEW.strengths_page_title,
    NEW.strengths_page_subtitle,
    NEW.strengths_stats,
    NEW.services_page_title,
    NEW.services_page_subtitle,
    NEW.services_page_cta_primary_text,
    NEW.services_page_cta_primary_href,
    NEW.services_page_cta_secondary_text,
    NEW.services_page_cta_secondary_href,
    NEW.strengths_page_cta_primary_text,
    NEW.strengths_page_cta_primary_href,
    NEW.strengths_page_cta_secondary_text,
    NEW.strengths_page_cta_secondary_href,
    NEW.contact_page_title,
    NEW.contact_page_subtitle,
    current_user_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- works の履歴を作成する関数
CREATE OR REPLACE FUNCTION create_works_history()
RETURNS TRIGGER AS $$
DECLARE
  next_version INT;
  current_user_id UUID;
BEGIN
  -- 現在のユーザーIDを取得（認証済みの場合）
  current_user_id := auth.uid();
  
  -- 次のバージョン番号を取得
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO next_version
  FROM works_history
  WHERE work_id = NEW.id;
  
  -- 履歴レコードを作成
  INSERT INTO works_history (
    work_id,
    version_number,
    title,
    slug,
    category,
    summary,
    industry,
    problem,
    solution,
    result,
    stack,
    cover_asset_id,
    published,
    sort_order,
    created_by
  ) VALUES (
    NEW.id,
    next_version,
    NEW.title,
    NEW.slug,
    NEW.category,
    NEW.summary,
    NEW.industry,
    NEW.problem,
    NEW.solution,
    NEW.result,
    NEW.stack,
    NEW.cover_asset_id,
    NEW.published,
    NEW.sort_order,
    current_user_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- 履歴作成トリガー
-- ================================================

-- site_settings 更新時に履歴を作成
DROP TRIGGER IF EXISTS trigger_create_site_settings_history ON site_settings;
CREATE TRIGGER trigger_create_site_settings_history
  AFTER UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION create_site_settings_history();

-- works 更新時に履歴を作成
DROP TRIGGER IF EXISTS trigger_create_works_history ON works;
CREATE TRIGGER trigger_create_works_history
  AFTER UPDATE ON works
  FOR EACH ROW
  EXECUTE FUNCTION create_works_history();

-- ================================================
-- slug生成用関数（オプション）
-- ================================================

CREATE OR REPLACE FUNCTION generate_unique_slug()
RETURNS TEXT AS $$
BEGIN
  RETURN 'work-' || substr(gen_random_uuid()::text, 1, 8);
END;
$$ LANGUAGE plpgsql;
