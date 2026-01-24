'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

interface Asset {
  id: string
  bucket: string
  path: string
  alt: string
  publicUrl: string
  created_at: string
}

export default function AdminAssetsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [assets, setAssets] = useState<Asset[]>([])
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingAlt, setEditingAlt] = useState('')
  const [dragOver, setDragOver] = useState(false)

  // 認証チェック & データ取得
  useEffect(() => {
    const init = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      await fetchAssets()
      setLoading(false)
    }

    init()
  }, [router])

  const fetchAssets = useCallback(async () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    
    const res = await fetch(`/api/cms/assets?${params}`)
    const data = await res.json()
    
    if (data.ok) {
      setAssets(data.data)
    }
  }, [search])

  useEffect(() => {
    if (!loading) {
      fetchAssets()
    }
  }, [search, loading, fetchAssets])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/cms/assets', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()
        
        if (!data.ok) {
          alert(`${file.name}: ${data.error || 'アップロードに失敗しました'}`)
        }
      }
      
      await fetchAssets()
    } catch (error) {
      alert('アップロードに失敗しました')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleUpload(e.dataTransfer.files)
  }

  const handleAltUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/assets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt: editingAlt }),
      })

      const data = await res.json()
      
      if (data.ok) {
        setAssets(assets.map(a => a.id === id ? { ...a, alt: editingAlt } : a))
        setEditingId(null)
        setEditingAlt('')
      } else {
        alert(data.error || '更新に失敗しました')
      }
    } catch (error) {
      alert('更新に失敗しました')
    }
  }

  const handleDelete = async (asset: Asset) => {
    if (!confirm('この画像を削除しますか？')) return
    
    try {
      const res = await fetch(`/api/cms/assets/${asset.id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      
      if (data.ok) {
        setAssets(assets.filter(a => a.id !== asset.id))
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
        <p className="text-sm text-gray-500">画像のアップロード・管理</p>
      </div>

      {/* アップロードエリア */}
      <div
        className={`mb-6 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver
            ? 'border-[#fff100] bg-[#fff100]/10'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-600 mb-2">ドラッグ&ドロップでアップロード</p>
        <p className="text-sm text-gray-500 mb-4">または</p>
        <label className="inline-block px-6 py-2 bg-[#fff100] text-[#1a1f2e] font-medium rounded-lg cursor-pointer hover:bg-[#fdc700] transition-colors">
          {uploading ? 'アップロード中...' : 'ファイルを選択'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="text-xs text-gray-500 mt-4">JPG, PNG, WebP • 最大5MB</p>
      </div>

      {/* 検索 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fff100] focus:border-transparent outline-none"
        />
      </div>

      {/* グリッド */}
      {assets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>画像がありません</p>
          <p className="text-sm">アップロードしてください</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
            >
              <div className="aspect-square relative">
                <img
                  src={asset.publicUrl}
                  alt={asset.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleDelete(asset)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-3">
                {editingId === asset.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingAlt}
                      onChange={(e) => setEditingAlt(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#fff100] outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => handleAltUpdate(asset.id)}
                      className="px-2 py-1 bg-[#fff100] text-[#1a1f2e] text-xs rounded hover:bg-[#fdc700]"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null)
                        setEditingAlt('')
                      }}
                      className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(asset.id)
                      setEditingAlt(asset.alt)
                    }}
                    className="w-full text-left"
                  >
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {asset.alt || '(alt未設定)'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{asset.path}</p>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
