'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

interface Work {
  id: string
  title: string
  slug: string
  summary: string
  published: boolean
  sort_order: number
  updated_at: string
  cover: {
    id: string
    bucket: string
    path: string
    alt: string
  } | null
}

export default function AdminWorksPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [works, setWorks] = useState<Work[]>([])
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

      await fetchWorks()
      setLoading(false)
    }

    init()
  }, [router])

  const fetchWorks = async () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (filter === 'published') params.set('published', 'true')
    if (filter === 'draft') params.set('published', 'false')
    
    const res = await fetch(`/api/cms/works?${params}`)
    const data = await res.json()
    
    if (data.ok) {
      setWorks(data.data)
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchWorks()
    }
  }, [search, filter])

  const handleCreate = async () => {
    setCreating(true)
    try {
      const res = await fetch('/api/cms/works', {
        method: 'POST',
      })
      const data = await res.json()
      
      if (data.ok) {
        router.push(`/admin/works/${data.data.id}`)
      } else {
        alert(data.error || '作成に失敗しました')
      }
    } catch (error) {
      alert('作成に失敗しました')
    } finally {
      setCreating(false)
    }
  }

  const handleTogglePublish = async (work: Work) => {
    try {
      const res = await fetch(`/api/cms/works/${work.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !work.published }),
      })
      const data = await res.json()
      
      if (data.ok) {
        setWorks(works.map(w => w.id === work.id ? { ...w, published: !w.published } : w))
      }
    } catch (error) {
      alert('更新に失敗しました')
    }
  }

  const handleDelete = async (work: Work) => {
    if (!confirm(`「${work.title}」を削除しますか？`)) return
    
    try {
      const res = await fetch(`/api/cms/works/${work.id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      
      if (data.ok) {
        setWorks(works.filter(w => w.id !== work.id))
      } else {
        alert(data.error || '削除に失敗しました')
      }
    } catch (error) {
      alert('削除に失敗しました')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-[#fff100] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Works</h1>
          <p className="text-sm text-gray-500">実績の追加・編集</p>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="flex items-center gap-2 px-4 py-2 bg-[#fff100] text-[#1a1f2e] font-medium rounded-lg hover:bg-[#fdc700] transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {creating ? '作成中...' : '追加'}
        </button>
      </div>

      {/* フィルター */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fff100] focus:border-transparent outline-none"
        />
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {f === 'all' ? '全て' : f === 'published' ? '公開' : '下書き'}
            </button>
          ))}
        </div>
      </div>

      {/* テーブル */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                タイトル
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                スラッグ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                順序
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                更新日
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {works.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  実績がありません
                </td>
              </tr>
            ) : (
              works.map((work) => (
                <tr key={work.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/works/${work.id}`}
                      className="font-medium text-gray-900 hover:text-[#fdc700]"
                    >
                      {work.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {work.slug}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePublish(work)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        work.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {work.published ? '公開' : '下書き'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {work.sort_order}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(work.updated_at).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/works/${work.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(work)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
