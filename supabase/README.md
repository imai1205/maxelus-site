# CMS管理画面 セットアップ手順

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセス
2. 新規プロジェクトを作成
3. プロジェクトのダッシュボードから以下の値を取得：
   - Project URL
   - anon public key
   - service_role key (Settings > API)

## 2. 環境変数の設定

`.env.local` を作成し、以下を設定：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_CMS_ASSETS_BUCKET=cms-assets
```

## 3. データベースのセットアップ

Supabase ダッシュボードの **SQL Editor** で以下を実行：

### 3.1 テーブル作成（schema.sql）

`supabase/schema.sql` の内容を実行

### 3.2 Storageバケット作成（storage.sql）

`supabase/storage.sql` の内容を実行

## 4. 認証ユーザーの作成

Supabase ダッシュボードの **Authentication > Users** から：

1. 「Add user」をクリック
2. メールアドレスとパスワードを設定
3. 「Create user」で作成

※ このユーザーで `/admin/login` からログインできます

## 5. 動作確認

```bash
npm run dev
```

1. http://localhost:3000/admin/login にアクセス
2. 作成したユーザーでログイン
3. 管理画面が表示されることを確認

---

## ファイル構成

```
/
├── app/
│   ├── admin/                    # 管理画面
│   │   ├── layout.tsx            # 管理画面レイアウト
│   │   ├── login/page.tsx        # ログインページ
│   │   ├── page.tsx              # ダッシュボード
│   │   ├── site/page.tsx         # サイト設定（二分割UI）
│   │   ├── works/page.tsx        # Works一覧
│   │   ├── works/[id]/page.tsx   # Works編集（二分割UI）
│   │   └── assets/page.tsx       # Assets管理
│   └── api/cms/                  # CMS API
│       ├── site/route.ts         # サイト設定API
│       ├── works/route.ts        # Works一覧API
│       ├── works/[id]/route.ts   # Works詳細API
│       ├── assets/route.ts       # Assets一覧/アップロードAPI
│       └── assets/[id]/route.ts  # Assets詳細API
├── components/
│   ├── admin/                    # 管理画面コンポーネント
│   │   ├── Sidebar.tsx           # サイドバー
│   │   ├── PreviewFrame.tsx      # プレビューフレーム
│   │   ├── FormField.tsx         # フォーム入力
│   │   └── AssetsPickerModal.tsx # 画像選択モーダル
│   └── cms/
│       └── PreviewClickHandler.tsx # プレビュークリック連動
├── lib/
│   ├── supabase/
│   │   ├── server.ts             # サーバーサイドクライアント
│   │   └── client.ts             # ブラウザクライアント
│   └── cms/
│       ├── publicFetch.ts        # 公開データ取得
│       └── validators.ts         # Zodバリデーター
└── supabase/
    ├── schema.sql                # DBスキーマ
    ├── storage.sql               # Storageバケット設定
    └── README.md                 # このファイル
```

---

## 機能一覧

### 管理画面

- **ダッシュボード** (`/admin`): 各機能へのショートカット
- **Site Settings** (`/admin/site`): サイト基本設定の編集
  - 左：プレビュー（デバイス切替対応）
  - 右：編集フォーム
- **Works** (`/admin/works`): 実績の一覧・CRUD
- **Works編集** (`/admin/works/[id]`): 実績の詳細編集
  - 左：プレビュー
  - 右：編集フォーム
- **Assets** (`/admin/assets`): 画像のアップロード・管理

### API

| エンドポイント | メソッド | 説明 |
|---------------|---------|------|
| `/api/cms/site` | GET | サイト設定取得 |
| `/api/cms/site` | PUT | サイト設定更新 |
| `/api/cms/works` | GET | Works一覧取得 |
| `/api/cms/works` | POST | 新規Work作成 |
| `/api/cms/works/[id]` | GET | Work詳細取得 |
| `/api/cms/works/[id]` | PUT | Work更新 |
| `/api/cms/works/[id]` | DELETE | Work削除 |
| `/api/cms/assets` | GET | Assets一覧取得 |
| `/api/cms/assets` | POST | 画像アップロード |
| `/api/cms/assets/[id]` | PUT | Asset更新（alt等） |
| `/api/cms/assets/[id]` | DELETE | Asset削除 |

---

## クリック連動機能

公開側のページで `data-cms-key` 属性を持つ要素をクリックすると、
管理画面の右フォームの該当入力欄にジャンプ＆ハイライトされます。

### 公開側での設定例

```tsx
<h1 data-cms-key="site.hero_title">見出しテキスト</h1>
<p data-cms-key="site.hero_subtitle">サブタイトル</p>
```

プレビューモード（`?preview=1`）のときのみ、
クリック時に親フレーム（管理画面）へpostMessageが送信されます。
