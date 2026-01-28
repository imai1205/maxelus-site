# ビルドとGitHubへのPushを実行するPowerShellスクリプト
# 使用方法: .\scripts\deploy.ps1 "コミットメッセージ"

param(
    [Parameter(Mandatory=$false)]
    [string]$CommitMessage = "Update: 変更内容の説明"
)

Write-Host "=== ビルドとデプロイを開始します ===" -ForegroundColor Cyan

# ビルド実行
Write-Host "`n1. ビルドを実行中..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ ビルドに失敗しました" -ForegroundColor Red
    exit 1
}

Write-Host "✅ ビルドが完了しました" -ForegroundColor Green

# Git add
Write-Host "`n2. 変更をステージング中..." -ForegroundColor Yellow
git add .

# Git commit
Write-Host "`n3. コミット中..." -ForegroundColor Yellow
git commit -m $CommitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  コミットに失敗しました（変更がない可能性があります）" -ForegroundColor Yellow
}

# Git push
Write-Host "`n4. GitHubにプッシュ中..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ プッシュに失敗しました" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ デプロイが完了しました！" -ForegroundColor Green
Write-Host "Vercelが自動でデプロイを開始します..." -ForegroundColor Cyan
