# サイト構成・コンテンツマップ

マクセラス (maxelustech.com) コーポレートサイトの **ページツリーと各ページの実表示テキスト**。文言修正の起点として使う。実装の詳細・規約は [CLAUDE.md](./CLAUDE.md)、入口は [README.md](./README.md)。

- 公開ページの文言は `app/data/*.ts` と各 `page.tsx` のハードコード (CMS は休止中)。
- デザイン方針: アイコン不使用 / 配色は黄色をボタン中心に / スクロール連動アニメーション (ライトテーマ固定)。

---

## ページツリー

```
/                      ホーム (会社全体のメッセージ)
├─ /services           事業内容 (サービス4分類 + プロダクト + 代表事例 + 進め方ほか)
│   └─ /services/[slug] サービス詳細 5 件  ← app/data/services.ts
├─ /strengths          強み (5つの強み + 対応領域)
├─ /about              会社情報 (MVV / 会社概要 / 社名の由来 / 代表挨拶)
├─ /contact            お問い合わせ (フォーム + 連絡先)
└─ /lp/<name>          独立LP 9本 (各独自ヘッダー・メインナビ非表示)
    ├─ /lp/full-order-app-development   完全オーダーメイドアプリ開発 (ヒーローに HeroAppSlider 流用)
    ├─ /lp/website-lp-production         ホームページ・LP制作 (計測・改善訴求)
    ├─ /lp/business-dx-design           業務効率化支援 (業務データ連携・As Is/To Be)
    ├─ /lp/products                      弊社プロダクト紹介 (8カード)
    ├─ /lp/zumen-connect                図面コネクト
    ├─ /lp/ai-ocr-automation            AI機能組込み・自動化
    ├─ /lp/interactive-web-3d           体験型Web・3D
    ├─ /lp/ai-coding-education          AIコーディング教育 (LINE CTA)
    └─ /lp/eyelash-salon                まつげサロン (デモ事例)
```

---

## 共通要素

### ヘッダー (`app/components/Header.tsx`)
- ロゴ `MAXELUS` / ナビ **Top・Services・Strengths・About・Contact** / CTA **お問い合わせ**
- `ConditionalHeader` が `/admin` と `/lp/*` では非表示 (LP は各自の独自ヘッダー)

### フッター (`app/components/Footer.tsx`)
- ロゴ `MAXELUS` / タグライン **Connected Paths, Accelerated Future** / 株式会社マクセラス（Maxelus Inc.）
- ナビ Services・Strengths・About・Contact / SNS Instagram・Threads
- **EST. 2025 / KYOTO** / © {年} Maxelus Inc.

### 共通お問い合わせCTA (`components/ui/ContactCTA.tsx`)
- キッカー **READY TO START** / 見出し「業務を整えて、新しい時間を生み出しませんか。」
- ボタン **お問い合わせ**(→/contact)・**サービスを見る**(→/services)

---

## `/` ホーム

| # | セクション | 主な文言 |
|---|---|---|
| 1 | ヒーロー | MAXELUS INC. /「大切なことに、時間を使える世界へ。」/ ボタン「事業内容を見る」「お問い合わせ」 |
| 2 | 事業内容プレビュー (Business) | 「時間を生み出す、効率的な仕組みをつくる。」+ サービス4分類カード |
| 3 | 代表事例プレビュー (Cases) | 「業務改善の具体例」+ 代表事例4件 |
| 4 | 進め方 (Approach) | 「いきなり作らず、まず業務を整える。」+ 5ステップ |
| 5 | ミッション (Mission) | 「業務を効率化し、本当に大切なことに時間を使える世界をつくる。」+ 整える/つくる/改善する |
| 6 | 共通CTA | ContactCTA |

データ: `serviceCategories.ts`(4分類)/ `caseStudies.ts`(`homeCases`=4件)/ `approach.ts`(5)。

---

## `/services` 事業内容

ヒーロー「業務を整え、事業を前へ。」以下に 9 セクション(`app/services/page.tsx`):

1. サービス分類「支援できること」— `serviceCategories.ts` 4分類(本文 + 対応内容タグ + 詳しく見る)
2. ホームページ・LP制作の付加価値「作って終わりではなく、改善できるWebへ。」(GA4・計測等)
3. 弊社プロダクト「弊社プロダクトのご紹介」— `products.ts` 8件
4. 代表事例「代表事例」— `caseStudies.ts` 8件(アコーディオン: 背景/課題/解決策/結果)
5. よくある課題「こんな状態になっていませんか？」(10項目)
6. 改善後の姿「バラバラの業務をつなげると、仕事はもっと楽になる。」(Before/After 5)
7. 進め方「いきなり開発せず、現状整理から始めます。」— `approach.ts` 5
8. 初期トライアル「小さく始めて、方向性を見極めることもできます。」(1ヶ月目/2ヶ月目)
9. 共通CTA

### `/services/[slug]` 詳細 5 件 (`app/data/services.ts`)
zumen-connect / sales-management / web-app-development / website-development / iphone-app。固定セクション: 特長 / 導入メリット / 対象業種 / CTA / その他のサービス。`products.ts` の販売管理が `/services/sales-management` を参照。

---

## `/strengths` 強み

ヒーロー「MAXELUSが選ばれる理由」+ リード。5つの強み(`page.tsx` ハードコード):
01 触れるデモで、完成イメージを共有できる / 02 業務の流れから整理できる / 03 Web・アプリ・AI・自動化まで一貫対応できる / 04 小さく作って、あとから拡張できる / 05 運用・改善まで伴走できる。
+ 対応領域(Webアプリ/iOSアプリ/ホームページ・LP/業務効率化/AI活用/OCR/外部サービス連携/管理画面・ダッシュボード/自社プロダクト導入相談)+ 共通CTA。

---

## `/about` 会社情報

ヒーロー「仕組みを整え、時間を生み出す。」以下:
- **Mission**: 業務を効率化し、本当に大切なことに時間を使える世界をつくる。
- **Vision**: 人と事業が、より大切なことに時間を使える社会をつくる。
- **Value**: 整える / つくる / 改善する
- **会社概要**: 株式会社マクセラス（Maxelus Inc.）/ 設立 2025年8月14日 / 〒614-8121 京都府八幡市下奈良小宮1 / 代表取締役 CEO 今井 俊喜 / 法人番号 1130001080399 / インボイス T1130001080399 / https://www.maxelustech.com/
- **社名の由来**: Maxelusに込めた想い (Max × Eras)
- **代表挨拶** (署名: 代表取締役 CEO 今井 俊喜) + 共通CTA

---

## `/contact` お問い合わせ

ヒーロー「お問い合わせ」+ リード。フォーム(`/api/contact` へ POST):
お名前* / 会社・組織名（任意）/ メールアドレス* / ご相談内容*(7択: Webアプリ・iOSアプリ制作 / ホームページ・LP制作 / 業務効率化支援 / AI導入・AI活用 / OCR・データ化 / 弊社プロダクト / その他)/ メッセージ*。送信ボタン「送信する / 送信中…」。
連絡先: **contact@maxelustech.com** / 平日 10:00 — 18:00 / 〒614-8121 京都府八幡市下奈良小宮1。

---

## LP 7本 (`app/lp/*`)

各自独自ヘッダー(ロゴ + 無料相談)。メインナビには出さない。

| LP | 内容 |
|---|---|
| full-order-app-development | 完全オーダーメイドアプリ開発(サービス01の飛び先)。ヒーローは HeroAppSlider 流用。inquiryType: 完全オーダーメイドアプリ開発 |
| website-lp-production | ホームページ・LP制作(サービス02の飛び先)。計測・改善(GA4/タグ/クリック計測)+ SEO・MEO 管理を訴求。Hero に管理画面風モック。inquiryType: ホームページ・LP制作 |
| business-dx-design | 業務効率化支援(サービス03の飛び先)。「バラバラの業務データをつなぎ〜」よくある課題→As Is/To Be→連携ツール→AI・OCR→代表事例→進め方→初期トライアル→フォーム。inquiryType: 業務DX設計 |
| products | 弊社プロダクト紹介(サービス04の飛び先)。products.ts 8件をカード表示。個別LPあり4件はリンク、なし4件は相談導線。inquiryType: 弊社プロダクト |
| zumen-connect | 図面コネクト(図面・関連資料・見積を、探す時間ゼロへ) |
| ai-ocr-automation | AI機能組込み・自動化(要約/分類/検索/生成/動画分析) |
| interactive-web-3d | 体験型Web・3D(WordPressではできない体験型Web) |
| ai-coding-education | AIコーディング教育(0円キャンペーン。CTA は LINE 友だち追加) |
| eyelash-salon | まつげサロンの予約デモ事例 |

---

## データソース早見表

| 変えたい文言 | 編集するファイル |
|---|---|
| ホームの各セクション | `app/page.tsx`(+ 下記データ) |
| サービス4分類(ホーム/services) | `app/data/serviceCategories.ts` |
| 自社プロダクト8件 | `app/data/products.ts` |
| 代表事例8件(ホーム4件は `homeCaseIds`) | `app/data/caseStudies.ts` |
| 進め方5ステップ | `app/data/approach.ts` |
| サービス詳細5件 + sitemap | `app/data/services.ts` |
| 強み / 会社情報 / お問い合わせ | `app/{strengths,about,contact}/page.tsx` |
| 各 LP | `app/lp/<name>/page.tsx`(本文)+ `layout.tsx`(SEO) |
| ヘッダー / フッター / 共通CTA | `app/components/Header.tsx` / `Footer.tsx` / `components/ui/ContactCTA.tsx` |
| セクション見出し / 下層ヒーロー | `components/ui/SectionHeader.tsx` / `PageHero.tsx` |
