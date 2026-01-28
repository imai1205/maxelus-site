#!/bin/bash
# ビルドとGitHubへのPushを実行するシェルスクリプト
# 使用方法: ./scripts/deploy.sh "コミットメッセージ"

COMMIT_MESSAGE=${1:-"Update: 変更内容の説明"}

echo "=== ビルドとデプロイを開始します ==="

# ビルド実行
echo ""
echo "1. ビルドを実行中..."
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ビルドに失敗しました"
    exit 1
fi

echo "✅ ビルドが完了しました"

# Git add
echo ""
echo "2. 変更をステージング中..."
git add .

# Git commit
echo ""
echo "3. コミット中..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -ne 0 ]; then
    echo "⚠️  コミットに失敗しました（変更がない可能性があります）"
fi

# Git push
echo ""
echo "4. GitHubにプッシュ中..."
git push origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ プッシュに失敗しました"
    exit 1
fi

echo ""
echo "✅ デプロイが完了しました！"
echo "Vercelが自動でデプロイを開始します..."
