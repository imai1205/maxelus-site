import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'
import Sidebar from '@/components/admin/Sidebar'

function SetupGuide() {
  return (
    <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#fff100] rounded-xl flex items-center justify-center">
              <span className="text-[#1a1f2e] font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-semibold">CMS管理</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">セットアップが必要です</h1>
          <p className="text-gray-600">Supabaseの環境変数を設定してください</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">1. Supabaseプロジェクトを作成</h2>
            <p className="text-gray-600 text-sm mb-2">
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                supabase.com
              </a> で新規プロジェクトを作成してください。
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">2. .env.local ファイルを作成</h2>
            <p className="text-gray-600 text-sm mb-3">プロジェクトルートに .env.local を作成し、以下を設定：</p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_CMS_ASSETS_BUCKET=cms-assets`}
            </pre>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">3. SQLを実行</h2>
            <p className="text-gray-600 text-sm">
              Supabase SQL Editorで <code className="bg-gray-200 px-1 rounded">supabase/schema.sql</code> と{' '}
              <code className="bg-gray-200 px-1 rounded">supabase/storage.sql</code> を実行してください。
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">4. 開発サーバーを再起動</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm">npm run dev</pre>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          詳細は <code className="bg-gray-100 px-1 rounded">supabase/README.md</code> を参照してください。
        </p>
      </div>
    </div>
  )
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 環境変数が設定されていない場合はセットアップガイドを表示
  if (!isSupabaseConfigured()) {
    return <SetupGuide />
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // ログインページは認証不要
  // クライアントサイドでリダイレクトは扱うので、ここではchildrenを返す
  
  return (
    <div className="flex h-screen bg-[#f5f5f7]">
      {user && <Sidebar />}
      <main className={`flex-1 overflow-hidden ${user ? '' : 'w-full'}`}>
        {children}
      </main>
    </div>
  )
}
