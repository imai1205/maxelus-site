'use client'

import { useState, useEffect, useCallback } from 'react'

interface Asset {
  id: string
  bucket: string
  path: string
  alt: string
  publicUrl: string
}

interface AssetsPickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (asset: Asset) => void
}

export default function AssetsPickerModal({ isOpen, onClose, onSelect }: AssetsPickerModalProps) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)

  const fetchAssets = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      
      const res = await fetch(`/api/cms/assets?${params}`)
      const data = await res.json()
      
      if (data.ok) {
        setAssets(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch assets:', error)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    if (isOpen) {
      fetchAssets()
    }
  }, [isOpen, fetchAssets])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/cms/assets', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      
      if (data.ok) {
        // 新しいアセットを選択
        onSelect(data.data)
        onClose()
      } else {
        alert(data.error || 'アップロードに失敗しました')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('アップロードに失敗しました')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* モーダル */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">画像を選択</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ツールバー */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fff100] focus:border-transparent outline-none"
          />
          <label className="px-4 py-2 bg-[#fff100] text-[#1a1f2e] rounded-lg font-medium cursor-pointer hover:bg-[#fdc700] transition-colors">
            {uploading ? 'アップロード中...' : 'アップロード'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin w-8 h-8 border-4 border-[#fff100] border-t-transparent rounded-full" />
            </div>
          ) : assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>画像がありません</p>
              <p className="text-sm">アップロードしてください</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => {
                    onSelect(asset)
                    onClose()
                  }}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-[#fff100] hover:ring-2 hover:ring-[#fff100] transition-all"
                >
                  <img
                    src={asset.publicUrl}
                    alt={asset.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  {asset.alt && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-xs truncate">{asset.alt}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
