# Supabase セットアップ手順

## 1. Supabase SQL Editorで実行

### ステップ1: `supabase/schema.sql` を実行

1. Supabase Dashboardにログイン
2. 左メニューから「SQL Editor」を選択
3. 「New query」をクリック
4. `supabase/schema.sql` の内容をすべてコピー＆ペースト
5. 「Run」ボタンをクリックして実行

### ステップ2: `supabase/storage.sql` を実行

1. 同じSQL Editorで「New query」をクリック
2. `supabase/storage.sql` の内容をすべてコピー＆ペースト
3. 「Run」ボタンをクリックして実行

## 2. 実行内容の確認

以下のテーブルが作成されていることを確認：

- ✅ `assets` - 画像メタデータ
- ✅ `site_settings` - サイト設定（シングルトン）
- ✅ `services` - サービスコレクション
- ✅ `strengths` - 強みコレクション
- ✅ `works` - 実績コレクション
- ✅ `site_settings_history` - サイト設定履歴
- ✅ `works_history` - 実績履歴

## 3. デフォルトデータの確認

以下のデータが挿入されていることを確認：

- ✅ `site_settings` に `id='site'` のレコードが1件
- ✅ `strengths` に5件のデータ
- ✅ `services` に5件のデータ
- ✅ `works` に6件のデータ

## 4. エラーが発生した場合

### エラー: "column already exists"
- 既にカラムが存在する場合は、`ALTER TABLE` 文はスキップされます（`IF NOT EXISTS` で保護されています）
- 問題ありません

### エラー: "table already exists"
- 既にテーブルが存在する場合は、`CREATE TABLE IF NOT EXISTS` で保護されています
- 問題ありません

### エラー: "policy already exists"
- `DROP POLICY IF EXISTS` で既存ポリシーを削除してから再作成します
- 問題ありません

## 5. 実行後の確認方法

SQL Editorで以下のクエリを実行して確認：

```sql
-- テーブル一覧を確認
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- site_settingsのカラムを確認
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'site_settings' 
ORDER BY ordinal_position;

-- デフォルトデータの件数を確認
SELECT 
  (SELECT COUNT(*) FROM site_settings) as site_settings_count,
  (SELECT COUNT(*) FROM strengths) as strengths_count,
  (SELECT COUNT(*) FROM services) as services_count,
  (SELECT COUNT(*) FROM works) as works_count;
```

## 6. 完了後の動作確認

1. 開発サーバーを起動: `npm run dev`
2. 管理画面にアクセス: `http://localhost:3000/admin/login`
3. ログイン後、`/admin/site` で設定が表示されることを確認
4. 各ページ（`/services`, `/strengths`, `/works`）でデータが表示されることを確認
