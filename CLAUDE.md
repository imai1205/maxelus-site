# マクセラス コーポレートサイト (maxelus-site)

このファイルは Claude Code (claude.ai/code) および開発者向けのプロジェクト説明書。実装時の判断はこのファイルを根拠にすること。各ページの実表示テキストは [SITE_MAP.md](./SITE_MAP.md)、プロジェクトの入口は [README.md](./README.md) を参照。

## プロジェクト概要

株式会社マクセラス (maxelustech.com) のコーポレートサイト。Next.js (App Router) で構築した日本語の静的中心サイトで、訪問者の問い合わせを Supabase (`contacts` テーブル) に保存し Resend でメール通知する。CMS 機能 (Supabase + 管理画面) も実装済みだが**現在は休止中**で、公開ページの文言は `app/data/*.ts` と各 `page.tsx` のハードコードを表示している。

## ディレクトリ構成

```
.
├── app/                       # Next.js App Router (ルーティング = フォルダ構成)
│   ├── page.tsx               # ホーム (ヒーロー + 事業内容/代表事例/進め方/ミッション/共通CTA。セクション関数群)
│   ├── layout.tsx             # ルートレイアウト。ConditionalHeader + 共通 SEO メタデータ
│   ├── globals.css            # テーマの CSS 変数 (:root) と keyframes。ライトテーマ固定
│   ├── sitemap.ts             # /sitemap.xml を生成 (services.ts の詳細 5 件を動的展開)
│   ├── about/page.tsx         # 会社情報 (MVV / 会社概要 / 社名の由来 / 代表挨拶。ハードコード)
│   ├── services/
│   │   ├── page.tsx           # 事業内容 (サービス4分類/プロダクト/代表事例/よくある課題/改善後/進め方/初期トライアル の10セクション)
│   │   └── [slug]/            # サービス詳細 (services.ts の 5 件)。layout.tsx でメタdata
│   ├── strengths/page.tsx     # 強み (5 つの強み + 対応領域。ハードコード)
│   ├── contact/page.tsx       # お問い合わせ。フォーム + 連絡先の 1 カラム
│   ├── lp/<name>/             # 独立ランディングページ 7 本 (各独自ヘッダー。共通ヘッダーは非表示)
│   ├── admin/                 # CMS 管理画面 (Supabase Auth・休止中)
│   ├── api/                   # API Routes (route.ts は計 14 本)
│   │   ├── contact/route.ts   # 問い合わせ受付 (POST)。contacts 保存 + Resend
│   │   ├── debug-env/route.ts # 環境変数確認用デバッグ (GET。本番不可)
│   │   └── cms/               # CMS の CRUD API (12 本。site/services/strengths/works/assets)
│   ├── components/            # ページ固有 (Header, Footer, ConditionalHeader, AnimationProvider, hero/HeroAppSlider 等)
│   └── data/                  # 公開ページの静的表示データ
│       ├── serviceCategories.ts # サービス4分類 (ホーム事業内容 + /services で共有)
│       ├── products.ts          # 自社プロダクト 8 件 (/services)
│       ├── caseStudies.ts       # 代表事例 8 件 (ホーム4件プレビュー + /services 全8件)
│       ├── approach.ts          # 進め方 5 ステップ (ホーム + /services で共有)
│       ├── services.ts          # /services/[slug] 詳細 5 件 + sitemap が参照
│       ├── servicesData.ts      # ※旧サービス一覧 8 件 (現在どこからも未参照)
│       └── casesData.ts         # ※旧事例データ (現在未参照。LP のデモ画像パスは別途 public/cases/)
├── components/
│   ├── ui/                    # 共有 UI (SectionHeader / ContactCTA / PageHero / GlassCard / Section / MotionPress / BubbleBadge)
│   ├── admin/                 # 管理画面 UI (Sidebar, FormField 等)
│   └── cms/                   # CMS プレビュー連携 (PreviewClickHandler)
├── lib/
│   ├── supabase/              # Supabase クライアント (client=ブラウザ / server=SSR+admin)
│   └── cms/                   # CMS フェッチ (publicFetch.ts) + zod バリデータ (validators.ts)
├── public/                    # 静的ファイル。public/cases/ にロゴ・デモ画像 (約 33 点)
├── supabase/                  # スキーマ・ストレージ・マイグレーション SQL (手動実行)
│   └── migrations/001_create_contacts_table.sql  # contacts テーブル (migrate が適用する唯一の SQL)
├── scripts/                   # マイグレーション (run-migration-api.js) / デプロイスクリプト
├── next.config.ts             # 外部画像ドメイン (Figma / Unsplash) を許可
├── SITE_MAP.md                # 全ページの実表示テキスト一覧
└── README.md                  # プロジェクトの入口ドキュメント
```

## 命名規則

- **ルートセグメント (app/ 配下のフォルダ)**: 小文字または kebab-case。例 `services/`, `lp/zumen-connect/`, 動的は `[slug]`。新規ページもこれに合わせること。
- **Next.js 規約ファイル**: `page.tsx` / `layout.tsx` / `route.ts` / `sitemap.ts`。役割が固定なのでリネーム禁止。
- **React コンポーネントファイル**: PascalCase + `.tsx`。例 `Header.tsx`, `GlassCard.tsx`, `ServiceDetailPanel.tsx`。
- **データ・ユーティリティファイル**: camelCase + `.ts`。例 `servicesData.ts`, `publicFetch.ts`, `validators.ts`。
- **関数**: React コンポーネントは PascalCase (`export default function Home`)、通常の関数・カスタムフックは camelCase (`createSupabaseServerClient`, `getSiteSettings`, `isSupabaseConfigured`)。
- **DB カラム / CMS フィールド**: snake_case。例 `inquiry_type`, `created_at`, `hero_title`, `cta_primary_href`。
- **CMS 識別用 `data-cms-key` 属性**: ドット区切り。例 `site.challenge_title`, `site.faq_0_q`。**復旧用なので削除しないこと**。
- **適用しない対象 (固有名・そのまま使う)**: ブランド名 `MAXELUS` / `マクセラス`、CSS 変数 `--font-noto-sans-jp` 等の kebab-case、`public/cases/` 配下の既存画像ファイル名 (`logo(W).png` 等、括弧を含むものもそのまま)。

## 技術スタック

- **言語**: TypeScript 5 / React 19.2.3 (パスエイリアス `@/*` → リポジトリ root)
- **フレームワーク**: Next.js 16.1.4 (App Router)
- **スタイル**: Tailwind CSS 4 (`@tailwindcss/postcss`)。**tailwind.config は存在しない**。テーマは `app/globals.css` の CSS 変数で管理
- **アニメーション**: Framer Motion 12.29.0
- **3D 表現**: three 0.182.0 / @react-three/fiber 9.5.0 / @react-three/drei 10.7.7
- **バックエンド**: Supabase (@supabase/ssr 0.8.0 / @supabase/supabase-js 2.91.0)
- **メール送信**: Resend 6.8.0
- **入力バリデーション**: zod 4.3.5
- **マイグレーション用 DB ドライバ**: pg 8.17.2
- **Lint**: ESLint 9 + eslint-config-next 16.1.4
- **実行基盤**: Node.js。**Docker は使用しない** (Dockerfile / compose なし)。Vercel デプロイを想定
- **テスト**: テストランナー未導入 (テスト基盤なし)

## 開発コマンド

```bash
# 一括実行（おすすめ）: 初回セットアップして開発サーバーを起動
npm install && npm run dev          # 依存インストール → http://localhost:3000 で起動

# コミット前の一括チェック（テスト基盤がないため lint + 型 + ビルドで担保）
npm run lint && npx tsc --noEmit && npm run build
```

```bash
# 個別実行
npm run dev        # 開発サーバー (localhost:3000)
npm run build      # 本番ビルド
npm run start      # 本番サーバー (build 後)
npm run lint       # ESLint
npx tsc --noEmit   # 型チェック単体
npm run migrate    # contacts テーブルのマイグレーション (要 Supabase 環境変数)
```

- `npm run deploy` は build + git commit + push を一括実行するスクリプト。**通常の開発では使用禁止** (`scripts/deploy.sh` / `deploy.ps1` も同様)。
- `npm run migrate` が適用するのは `supabase/migrations/001_create_contacts_table.sql` のみ。`DATABASE_URL` (または `SUPABASE_DB_URL`) 未設定時は SQL を出力して手動実行を案内する。

## 環境変数

`.env.local` に設定する (雛形: `supabase/env-example.txt`)。**★実際の値・秘密情報はこのファイルやコードに絶対に書かないこと。**

| キー | 説明 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL (公開可) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名キー (公開可・RLS で保護) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role キー (RLS バイパス。**サーバー専用・秘匿**) |
| `NEXT_PUBLIC_CMS_ASSETS_BUCKET` | CMS アセット用ストレージバケット名 (`cms-assets`) |
| `RESEND_API_KEY` | 問い合わせメール送信用 (**秘匿**。未設定時はコンソール出力にフォールバック) |
| `NEXT_PUBLIC_SITE_URL` | サイトの絶対 URL (メタデータ・sitemap 用。既定 `https://maxelustech.com`) |
| `DATABASE_URL` または `SUPABASE_DB_URL` | マイグレーション実行時のみ必要 (**秘匿**) |

Supabase 未設定でも公開ページは動作する。admin はセットアップガイド画面を表示する。

## データ（処理）フロー

### お問い合わせ送信
- ユーザー入力 (`/contact` のフォーム / 各 LP のフォーム) → POST `app/api/contact/route.ts` → ① `createSupabaseAdminClient()` で `contacts` テーブルへ INSERT (**失敗してもエラーを返さず続行**) → ② `RESEND_API_KEY` があれば Resend で `info@maxelustech.com` 宛にメール送信、無ければコンソール出力 → `{ success: true }` を返す

### 公開ページ表示 (現行)
- 静的データ `app/data/serviceCategories.ts` (4分類) / `products.ts` (8件) / `caseStudies.ts` (8件) / `approach.ts` (5ステップ) → ホーム・`/services` がインポートしてレンダリング (サーバー経由なし)
- `app/data/services.ts` (詳細5件) → `/services/[slug]` + `sitemap.ts`
- ハードコード文言 → `app/{about,strengths,contact}/page.tsx`・`app/page.tsx`・各 LP が直接描画

### サイトマップ / SEO
- `app/data/services.ts` (詳細5件) → `app/sitemap.ts` が動的展開 → `/sitemap.xml`
- 各ルートの `layout.tsx` の `metadata` → `<head>` (方針は `METADATA_OPTIMIZATION.md`)

### CMS 経由 (実装済みだが休止中)
- 管理操作: `app/admin/*` (Supabase Auth) → `app/api/cms/*` (mutation は `auth.getUser()` で認証チェック) → Supabase テーブル (`site_settings` / `services` / `strengths` / `works` / `assets` + history)
- 公開取得: `lib/cms/publicFetch.ts` → ただし公開ページ側の呼び出しは**現在コメントアウト**

## 設計上の注意点

- **公開ページの文言は `app/data/*.ts` と各 `page.tsx` を編集する**。CMS 側 (`app/admin`, `app/api/cms`, `lib/cms`) を触っても公開ページには反映されない (休止中)。`data-cms-key` 属性は復旧用なので削除しないこと。
- **公開ページのデータは `serviceCategories.ts` (4分類) / `products.ts` (8件) / `caseStudies.ts` (8件) / `approach.ts` (5ステップ) に集約**。ホームと `/services` が共有する。`/services/[slug]` 詳細のみ `services.ts` (5件) を使い、`sitemap.ts` も services.ts を参照する。`servicesData.ts` (旧8件) と `casesData.ts` (旧事例) はどこからも未参照 (削除候補だが復旧用に残置)。
- **下層ページは共通レイアウトコンポーネントを使う**。ヒーローは `PageHero`、セクション見出しは `SectionHeader`、末尾の問い合わせ誘導は `ContactCTA` (すべて `components/ui/`)。新規ページもこれに揃える。
- **共通ヘッダーは英語ナビ (Top / Services / Strengths / About / Contact)**。`ConditionalHeader` が `/admin` と `/lp/*` で共通ヘッダーを非表示にし、LP は各自で独自ヘッダー (ロゴ + 無料相談 CTA) を持つ。
- **スクロール演出**: スクロール連動は `app/components/AnimationProvider.tsx` の `AnimatedSection` (fade-up/down/left/right・zoom) + `StaggeredContainer` を使う。ホームは Lenis (スムーススクロール) + `ScrollFrameSequence` も併用。配色は黄色を増やさずボタン中心に使う。
- **CMS API の mutation (POST/PUT/PATCH/DELETE) は必ず冒頭で `supabase.auth.getUser()` の認証チェックを行うこと**。新規 CMS ルートも同パターンに従う。認証不要の GET は `/api/cms/site`・`/api/cms/works/public`・一部 `[id]` 系のみ (RLS の published フィルタに依存)。
- **`createSupabaseAdminClient()` は Service Role キーで RLS をバイパスする**。サーバー側専用かつ認証チェック後にのみ使用すること。例外は `/api/contact` の `contacts` INSERT (匿名投稿を許可するため、RLS でも anon INSERT を許可済み)。
- **ダークモードは廃止済み (ライトテーマ固定)**。`dark:` バリアントや `prefers-color-scheme` 分岐を新規追加しないこと。
- **アイコン (SVG / 絵文字) は使わない**。番号タイポグラフィ「01/02/03」+ 細罫線 + 左ボーダーアクセントで構成する (脱 AI 感のための編集デザイン路線)。
- **デバッグ計装コードを除去対象として扱うこと**。`http://127.0.0.1:7243/ingest/...` へ送信するコードが `app/api/contact/route.ts` / `app/api/cms/site/route.ts` / `app/admin/site/page.tsx` の 3 ファイルに残存している。該当箇所を触る際は削除する。
- **`app/api/debug-env/route.ts` は本番に残してはいけない**デバッグルート (環境変数を返す)。
- **事例ページ (`/cases`・`/works`) は削除済み**。`app/data/casesData.ts` は LP のデモ画像パス参照のため残存しているが、事例本文としては未表示。復活させる場合は別途設計する。
- **外部画像を使う場合は `next.config.ts` の `images.remotePatterns` にドメインを追加すること** (現在は Figma / Unsplash を許可)。
- **Supabase のスキーマ変更時は `app/api/cms/site/route.ts` のフォールバックに注意**。PUT は実テーブルのカラム一覧を取得して存在カラムのみ更新する仕組みのため、列の追加・改名が挙動に影響する。スキーマは `supabase/schema.sql` → `supabase/storage.sql` を SQL Editor で手動実行する (`SUPABASE_SETUP.md` 参照)。
- **テスト基盤は未導入**。コミット前は `npm run lint` + `npx tsc --noEmit` + `npm run build` で品質を担保する。
- **default ブランチへ直接 push しない**運用が望ましいが、本リポジトリは過去に main 直結運用の履歴あり。破壊的 git 操作 (force push / reset --hard 等) はユーザー明示指示がある場合のみ。
