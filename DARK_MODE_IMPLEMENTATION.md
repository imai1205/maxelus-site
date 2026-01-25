# ダークモード実装ガイド

## 実装済み

### 1. テーマシステム
- ✅ `ThemeProvider`コンポーネントの作成
- ✅ `ThemeToggle`コンポーネントの作成
- ✅ CSS変数によるダークモード色定義
- ✅ システム設定と手動切り替えの両方に対応

### 2. 主要コンポーネント
- ✅ Header（ダークモード対応）
- ✅ Footer（ダークモード対応）
- ✅ ThemeToggle（ヘッダーに統合）

### 3. CSS変数
- ✅ ライトモード/ダークモードの色定義
- ✅ `prefers-color-scheme`メディアクエリ対応

## 残りの作業

### 全ページのダークモード対応

各ページコンポーネントに以下のクラスを追加する必要があります：

#### 背景色
- `bg-white` → `bg-white dark:bg-[#0b1220]`
- `bg-[#fafafa]` → `bg-[#fafafa] dark:bg-[#1e293b]`

#### テキスト色
- `text-[#1a1a1a]` → `text-[#1a1a1a] dark:text-[#f9fafb]`
- `text-[#666]` → `text-[#666] dark:text-[#9ca3af]`
- `text-[#6b7280]` → `text-[#6b7280] dark:text-[#9ca3af]`

#### ボーダー色
- `border-[#e5e7eb]` → `border-[#e5e7eb] dark:border-[#374151]`

#### カード・コンテナ
- `bg-white` → `bg-white dark:bg-[#1e293b]`
- `bg-[#fafafa]` → `bg-[#fafafa] dark:bg-[#0b1220]`

## 対応が必要なページ

1. **ホームページ** (`app/page.tsx`)
   - Heroセクション
   - サービスセクション
   - 事例セクション
   - CTAセクション

2. **サービスページ** (`app/services/page.tsx`)
   - カテゴリセクション
   - サービスカード

3. **事例ページ** (`app/cases/page.tsx`)
   - 業種カード
   - 事例カード
   - モーダル

4. **強みページ** (`app/strengths/page.tsx`)
   - 統計セクション
   - 強みカード

5. **会社情報ページ** (`app/about/page.tsx`)
   - 会社概要
   - Mission/Vision/Value
   - 事業内容

6. **お問い合わせページ** (`app/contact/page.tsx`)
   - フォーム

7. **LPページ** (`app/lp/*/page.tsx`)
   - 各LPページの全セクション

## 実装例

```tsx
// 背景色の例
<div className="bg-white dark:bg-[#0b1220]">

// テキスト色の例
<h1 className="text-[#1a1a1a] dark:text-[#f9fafb]">

// ボーダーの例
<div className="border border-[#e5e7eb] dark:border-[#374151]">

// カードの例
<div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg">
```

## 注意事項

1. **グラデーション背景**: ダークモードでも見やすい色に調整
2. **画像**: 必要に応じて`brightness`や`invert`フィルターを使用
3. **グラスモーフィズム**: ダークモードでも適切な透明度を設定
4. **アクセシビリティ**: コントラスト比を確保

## テスト項目

- [ ] 全ページでダークモードが正しく表示される
- [ ] テーマ切り替えがスムーズに動作する
- [ ] システム設定に従って自動切り替えされる
- [ ] ローカルストレージに設定が保存される
- [ ] アクセシビリティ（コントラスト比）が確保されている
