# Next.js プロジェクト デプロイ手順

## 1. プロジェクト初期化

```bash
npx create-next-app@latest my-project --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd my-project
```

## 2. 開発環境で起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認

## 3. 本番ビルド（ローカル確認）

```bash
npm run build
npm start
```

## 4. GitHubリポジトリ作成

1. https://github.com/new にアクセス
2. リポジトリ名を入力（例: `my-project`）
3. Public または Private を選択
4. 「Create repository」をクリック

## 5. GitHubにプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-project.git
git push -u origin main
```

※ `YOUR_USERNAME` を自分のGitHubユーザー名に置き換え

## 6. Vercelにデプロイ

1. https://vercel.com にアクセス
2. GitHubアカウントでログイン
3. 「Add New Project」をクリック
4. 作成したGitHubリポジトリを選択
5. 「Deploy」をクリック

→ 自動でビルド・デプロイされ、URLが発行されます

---

## 今後の編集→デプロイ手順

### 開発環境で作業

```bash
npm run dev
```

### 変更をGitHubにプッシュ

```bash
git add .
git commit -m "Update: 変更内容の説明"
git push origin main
```

### Vercel自動デプロイ

GitHubにプッシュすると、Vercelが自動で：
1. ビルドを実行
2. 本番環境にデプロイ
3. URLで確認可能

---

## キャッシュクリア（必要時）

### 開発環境のキャッシュクリア

```bash
rm -rf .next
npm run dev
```

npm run dev -- -p 3001


### 本番ビルドのキャッシュクリア

```bash
rm -rf .next
npm run build
```

---

## よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動（ローカル確認用）
npm start

# 依存関係インストール
npm install

# 型チェック
npm run type-check  # または npx tsc --noEmit
```

---

## 編集後にGitHubに再アップロード

ファイルを編集した後、GitHubに再度アップロードする手順：

```bash
# 変更をステージング
git add .

# コミット（変更内容を説明するメッセージを記入）
git commit -m "Update: 変更内容の説明"

# mainブランチにプッシュ
git push origin main
```

→ Vercelが自動でビルド・デプロイを実行します
