'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

interface Strength {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  order_number: number
  published: boolean
  updated_at: string
}

export default function AdminStrengthsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [strengths, setStrengths] = useState<Strength[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [creating, setCreating] = useState(false)

  // 認証チェック & データ取得
  useEffect(() => {
    const init = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      await fetchStrengths()
      setLoading(false)
    }

    init()
  }, [router])

  const fetchStrengths = async () => {
    try {
      const res = await fetch('/api/cms/strengths')
      const data = await res.json()
      
      if (data.ok) {
        setStrengths(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch strengths:', error)
    }
  }

  const handleCreate = async () => {
    setCreating(true)
    try {
      const res = await fetch('/api/cms/strengths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '新規強み',
          description: '',
          features: [],
          icon: 'sparkles',
          order_number: strengths.length,
        }),
      })

      const data = await res.json()
      
      if (data.ok) {
        router.push(`/admin/strengths/${data.data.id}`)
      } else {
        alert(data.error || '作成に失敗しました')
      }
    } catch (error) {
      alert('作成に失敗しました')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('この強みを削除しますか？')) return

    try {
      const res = await fetch(`/api/cms/strengths/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      
      if (data.ok) {
        await fetchStrengths()
      } else {
        alert(data.error || '削除に失敗しました')
      }
    } catch (error) {
      alert('削除に失敗しました')
    }
  }

  const filteredStrengths = strengths.filter(strength => {
    const matchesSearch = strength.title.toLowerCase().includes(search.toLowerCase()) ||
                         strength.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' ||
                         (filter === 'published' && strength.published) ||
                         (filter === 'draft' && !strength.published)
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#f5f5f7]">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-[#fff100] border-t-transparent rounded-full mx-auto" />
          <p className="text-gray-500 mt-4">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">強み管理</h1>
            <p className="text-sm text-gray-500 mt-1">強み一覧の管理</p>
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center gap-2 px-4 py-2 bg-[#fff100] text-[#1a1f2e] font-semibold rounded-lg hover:bg-[#fdc700] transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {creating ? '作成中...' : '新規作成'}
          </button>
        </div>

        {/* フィルター・検索 */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* 検索 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="強みタイトルまたは説明で検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fff100] focus:border-transparent"
              />
            </div>

            {/* フィルター */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-[#fff100] text-[#1a1f2e]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                すべて
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === 'published'
                    ? 'bg-[#fff100] text-[#1a1f2e]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                公開中
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === 'draft'
                    ? 'bg-[#fff100] text-[#1a1f2e]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                下書き
              </button>
            </div>
          </div>
        </div>

        {/* 強み一覧 */}
        <div className="flex-1 overflow-auto p-6">
          {filteredStrengths.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>強みがありません</p>
              <p className="text-sm mt-2">「新規作成」ボタンから強みを追加してください</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStrengths.map((strength) => (
                <div
                  key={strength.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          #{strength.order_number}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{strength.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{strength.description}</p>
                      {strength.features && strength.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {strength.features.slice(0, 3).map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        strength.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {strength.published ? '公開' : '下書き'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/strengths/${strength.id}`}
                      className="flex-1 px-3 py-2 bg-[#fff100] text-[#1a1f2e] font-medium rounded-lg hover:bg-[#fdc700] transition-colors text-center text-sm"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(strength.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
