'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-[#fff100] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/site"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#fff100] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#fff100]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#fff100] transition-colors">
            <svg className="w-6 h-6 text-[#1a1f2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Site Settings</h2>
          <p className="text-sm text-gray-500">サイトの基本設定を編集</p>
        </Link>

        <Link
          href="/admin/services"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#fff100] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#fff100]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#fff100] transition-colors">
            <svg className="w-6 h-6 text-[#1a1f2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Services</h2>
          <p className="text-sm text-gray-500">サービスの追加・編集</p>
        </Link>

        <Link
          href="/admin/strengths"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#fff100] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#fff100]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#fff100] transition-colors">
            <svg className="w-6 h-6 text-[#1a1f2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Strengths</h2>
          <p className="text-sm text-gray-500">強みの追加・編集</p>
        </Link>

        <Link
          href="/admin/works"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#fff100] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#fff100]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#fff100] transition-colors">
            <svg className="w-6 h-6 text-[#1a1f2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Works</h2>
          <p className="text-sm text-gray-500">実績の追加・編集</p>
        </Link>

        <Link
          href="/admin/assets"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#fff100] hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#fff100]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#fff100] transition-colors">
            <svg className="w-6 h-6 text-[#1a1f2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Assets</h2>
          <p className="text-sm text-gray-500">画像のアップロード・管理</p>
        </Link>
      </div>
    </div>
  )
}
