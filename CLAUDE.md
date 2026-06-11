# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

マクセラス (maxelustech.com) のコーポレートサイト。Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion。3D 表現に react-three-fiber / drei を使用。サイト全体が日本語。

## コマンド

```bash
npm run dev      # 開発サーバー (localhost:3000)
npm run build    # 本番ビルド
npm run lint     # ESLint (eslint-config-next の core-web-vitals + typescript)
npm run migrate  # scripts/run-migration-api.js で contacts テーブルのマイグレーション実行
```

- テスト基盤は存在しない (テストランナー未導入)。
- 型チェック単体は `npx tsc --noEmit`。パスエイリアスは `@/*` → リポジトリ root。
- `npm run deploy` は build + git commit + push を一括実行するスクリプトなので、通常の開発では使わないこと (`scripts/deploy.sh` / `deploy.ps1` も同様)。
- `npm run migrate` が適用するのは `supabase/migrations/001_create_contacts_table.sql` のみ。Supabase の URL と Service Role Key が必須 (未設定なら exit 1)。`DATABASE_URL` (または `SUPABASE_DB_URL`) 未設定時は SQL を出力して手動実行を案内する。`scripts/run-migration.js` / `run-migration-direct.js` は同機能の別実装 (migrate からは未使用)

## 環境変数 (.env.local)

`supabase/env-example.txt` に記載:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_CMS_ASSETS_BUCKET` (cms-assets)

env-example.txt には載っていないが使用されるもの:

- `RESEND_API_KEY` (問い合わせメール送信。未設定時はコンソール出力にフォールバック)
- `DATABASE_URL` / `SUPABASE_DB_URL` (マイグレーション実行時のみ)

Supabase 未設定でも公開ページは動く。admin はセットアップガイド画面を表示する。

## アーキテクチャ

### 二重データソース: 静的データと CMS

**重要**: CMS 機能は現在公開ページ側でコメントアウトされている (`app/layout.tsx` や `app/page.tsx` の「CMS機能をコメントアウト（将来の復旧用）」を参照)。`app/page.tsx` 内の `data-cms-key` 属性は復旧時の識別用なので残すこと。

- **公開ページの実データソース**: `app/data/*.ts`。表示文言を変えるときはここを編集する。**サービスデータは 2 ファイルに分裂している**: `/services` 一覧と sitemap は `servicesData.ts`、`/services/[slug]` 詳細は `services.ts` を参照。両方の更新が必要な場合がある。事例は `casesData.ts` (/cases)。`homeCasesData.ts` はどこからも import されていない未使用ファイル
- **CMS 側 (実装済みだが休止中)**: Supabase テーブル (`site_settings` / `services` / `strengths` / `works` / `assets` + history テーブル) → `lib/cms/publicFetch.ts` で取得。`CMSDataProvider` / `CMSLiveUpdater` / `PreviewClickHandler` がライブ更新・プレビュー用

### CMS 管理画面と API

- `/admin/*` — Supabase Auth (email/password) でログインする管理 UI (`app/admin/`、共通 UI は `components/admin/`)。認証チェックは各ページの `useEffect` で `auth.getUser()` → 未認証なら `/admin/login` へリダイレクトするクライアントサイド方式
- `/api/cms/*` — CRUD API。**全ての mutation は冒頭で `supabase.auth.getUser()` による認証チェックを行う**。新規 CMS ルートを追加する場合もこのパターンに従う。GET は混在: 一覧系は認証チェックあり、`/api/cms/site` `/api/cms/works/public` `/api/cms/services/[id]` `/api/cms/strengths/[id]` は認証チェックなし (RLS の published フィルタに依存)
- 入力バリデーションは `lib/cms/validators.ts` の zod スキーマに集約
- `app/api/cms/site/route.ts` はテーブル未作成時のフォールバックとしてデフォルトのサイト設定オブジェクトを持つ。PUT は実テーブルのカラム一覧を取得して存在するカラムのみ更新する仕組みのため、スキーマ変更時は要注意
- サイト設定には履歴・復元機能あり (`site_settings_history` テーブル + `/api/cms/site/history` / `history/restore`)

### Supabase クライアントの使い分け (`lib/supabase/`)

- `client.ts` — ブラウザ用 (`createBrowserClient`)
- `server.ts` — Server Component / Route Handler 用 (`createServerClient`、cookie 連携)。`createSupabaseAdminClient()` は Service Role Key で RLS をバイパスする — サーバー側専用、認証チェック後のみ使用 (例外: `/api/contact` の contacts INSERT)
- スキーマは Supabase SQL Editor で `supabase/schema.sql` → `supabase/storage.sql` を手動実行する (`SUPABASE_SETUP.md` 参照)
- RLS は `published` フラグで公開制御 (匿名 SELECT は published=true のみ、書き込みは認証必須)。コンテンツテーブルにはデフォルトデータが INSERT 済み

### ページ構成

- 公開ページ: `/` `/about` `/services` `/services/[slug]` `/strengths` `/contact`。多くは大きな単一の client component。事例ページ (`/cases` `/works`) は作り直し前提で削除済み (`public/cases/` の画像はロゴ等が参照するため残存)
- LP: `app/lp/<name>/` 配下に独立したランディングページ群 (7 本: zumen-connect, ai-ocr-automation など)。各 LP は layout.tsx でメタデータだけ定義し、本文・問い合わせフォーム (`/api/contact` へ POST) は page.tsx にハードコード
- 各ルートの layout.tsx が SEO メタデータを定義 (`METADATA_OPTIMIZATION.md` に方針)
- `app/api/contact/route.ts` は contacts テーブル保存 (失敗許容) + Resend でメール送信の二段構え
- 外部画像ドメインは `next.config.ts` の `images.remotePatterns` (Figma / Unsplash) に追加が必要

### UI とテーマ

- 共有 UI プリミティブは `components/ui/` (GlassCard, Section, MotionPress, BubbleBadge。`index.ts` から re-export)。ページ固有コンポーネントは `app/components/`
- Tailwind CSS 4 のため tailwind.config は存在しない。テーマは `app/globals.css` の CSS 変数 (`:root`) と `@theme inline` ブロックで管理。keyframes アニメーションも globals.css に集約
- **ダークモードは廃止済み** (ライトテーマ固定)。OS 設定に関わらず常にライト配色で表示する。新規 UI に `dark:` バリアントや `prefers-color-scheme` 分岐を追加しないこと
- デザイン方針: アイコン (SVG / 絵文字) は使わない。番号タイポグラフィ「01/02/03」+ 細罫線 + 左ボーダーアクセントで構成する (脱 AI 感のための編集デザイン路線)
- ブランドカラー: イエロー `#fff100` (hover は `#fdc700`)。公開ページの配色は globals.css の CSS 変数が正 (テキスト `#1a1a1a`、ダーク背景 `#0b1220` 等)。admin UI はネイビー `#1a1f2e` × イエローの配色をクラスにハードコード
- 重量級コンポーネント (SalonReservationAppMockup, StorySlider 等) は `dynamic(..., { ssr: false })` で読み込む

## サイト構成と主要文言 (訪問者視点)

文言変更タスクの起点となる、ページツリーと各ページの実表示文言の整理。詳細な本文は各ページ/データファイルを参照。

```
/                  ホーム (課題解決型の営業 LP 構成)
├─ /services       サービス一覧 (3 カテゴリ × 8 サービス)
│   └─ /services/[slug]  サービス詳細 (5 件、一覧とは別データ)
├─ /strengths      強み (5 つの強み + 実績統計)
├─ /about          会社情報 (概要 / Mission・Vision・Value / 代表挨拶)
├─ /contact        無料相談・お問い合わせ (フォームのみ)
└─ /lp/<name>      独立 LP 7 本 (ヘッダーナビには出ない)
```

- ヘッダーナビ: ホーム / サービス / 強み / 会社情報 / お問い合わせ + CTA「無料相談する」
- フッターナビ: ホーム / お問い合わせ / 無料相談 + Instagram / Threads (テキストリンク)。コピーライトは「© 2024 MAXELUS」固定。プライバシーポリシー / 利用規約はリンク先未実装 (`href="#"`)
- サイト全体の頻出 CTA ペア: 「無料相談する」(→/contact) +「サービスを見る」(→/services)

### / (ホーム) — セクション順と見出し

1. Hero — キッカー「AI × 最新手法」、見出し「完全オーダーメイドで課題解決」「WEB・アプリ制作」
2. Solution (OUR APPROACH) — 「MAXELUSはオーダーメイド × 伴走で成果から逆算します」(完全オーダーメイド / 企画から運用まで伴走 / 成果から逆算)
3. Services — 「対応できる内容」5 カード (完全オーダーメイドアプリ開発 / 業務DX設計・開発 / AI機能組込み・自動化 / ホームページ制作 / プロダクト開発)
4. Challenge (PROBLEM) — 「課題は"ズレ"から起きる」Before/After 各 3 枚
5. Demo (DEMO、インライン section) — 「触れるデモで合意」+ SalonReservationAppMockup
6. StorySlider (PROCESS) — 「成果から逆算する設計プロセス」6 ステップ (課題→無料相談→デモ提示→発注→開発→納品・運用)
7. ServiceTypes — 「ホームページ・Webアプリ・iOSアプリ、全部できます」
8. CTA — 「社内業務の効率化と売上拡大を加速させませんか？」

事例 (Works) セクションと FAQ セクションはホームには存在しない。

### /services — 「アプリ開発とWeb制作で、ビジネスを最短で形にします。」

カテゴリタブ × サービスカード (`servicesData.ts`)。カードクリックで ServiceDetailPanel (固定ラベル: できること / こんな人におすすめ / 進め方 / 料金目安) が開く。FAQ は廃止済み (servicesData の `faq` フィールドは未表示のまま残存):

- **アプリ開発・DX支援**: 完全オーダーメイドアプリ開発 / 業務DX設計 / AIコーディング教育
- **ホームページ制作（普通→特殊）**: ベーシック (WordPress/Wix) / スペシャル「WordPressではできない体験型Web」
- **プロダクト**: 図面コネクト / 販売管理 / シミュレーション

### /services/[slug] — 詳細ページは 5 件 (`services.ts`)

zumen-connect (図面コネクト) / sales-management (製造業向け 販売管理ソフト) / web-app-development (業務Webアプリ開発) / website-development (ホームページ制作) / iphone-app (iPhoneアプリ開発)。一覧 (8 件) と詳細 (5 件) でサービスの切り方・キャッチコピーが一致していない点に注意。

### /strengths — 「MAXELUSが選ばれる理由」

実績統計 (満足度 98% / 平均開発期間 1ヶ月 / 累計顧客数 50 以上) + 5 つの強み: 01 WordPressでは出せない"体験"を作れる / 02 打ち合わせ後すぐに"デモ"が出る開発スタイル / 03 業務DXは"運用まで"作る / 04 あとから自分で更新できる（microCMS対応） / 05 拡張できる設計（最小→スケール）。文言はページ内ハードコード (CMS 復旧時は /api/cms/strengths で上書きされる設計)。

### /about — 「会社情報」

会社概要 (株式会社MAXELUS、京都府八幡市、代表取締役社長 今井 俊喜) → 事業内容 7 項目 → 私たちについて → できること（提供価値）5 分類 → Mission・Vision・Value → 代表挨拶 → CTA。

- Mission: 「業務を効率化し、本当に大切なことに時間を使える世界をつくる。」
- Vision: 「データとAIで、意思決定と実行が加速する社会をつくる。」
- Value: Evolve / Connect / Accelerate / Collaborate / Simplify / Cutting-Edge の 6 つ

### /contact — 「無料相談・お問い合わせ」

フォーム中心の 1 カラム構成 (お名前・会社名・メール・ご相談内容・ご予算・希望納期・詳細)。フォーム下に連絡先テキスト: info@maxelustech.com、受付時間 平日 10:00-18:00。メリット訴求・FAQ は廃止済み。

### /lp/* — 独立 LP 7 本 (それぞれヒーローのキャッチコピー)

| LP | 商材 | ヒーロー見出し |
|---|---|---|
| zumen-connect | 図面管理 SaaS | 図面・関連資料・見積を、探す時間ゼロへ。 |
| full-order-app-development | 受託アプリ開発 | 完全オーダーメイドで課題を解決する |
| business-dx-design | 業務 DX 設計 | そのソフト、現場に合わせて"我慢して"使っていませんか？ |
| ai-ocr-automation | AI 組込み・自動化 | AI機能組込み。業務を自動化する |
| interactive-web-3d | 体験型 Web 制作 | WordPressではできない体験型Webサイト |
| ai-coding-education | AI プログラミング講座 | 知識0から始める。かんたんすぎる！プログラミング×AI (CTA は LINE 友だち追加) |
| eyelash-salon | サロンサイトの実例デモ | ま い に ち が / き ら き ら な / あ な た へ |

## 注意点

- `http://127.0.0.1:7243/ingest/...` へ送信するデバッグ計装コードが 3 ファイルに残っている: `app/api/contact/route.ts` / `app/api/cms/site/route.ts` / `app/admin/site/page.tsx`。該当箇所を触る際は除去対象として扱う
- `app/api/debug-env/route.ts` は環境変数確認用のデバッグルート (本番に残すべきでない)
- `README.md` は create-next-app のテンプレートのままでプロジェクト情報なし
