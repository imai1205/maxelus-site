'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import PreviewFrame from '@/components/admin/PreviewFrame'
import { FormField, TextInput, TextArea, FormCard, ImagePicker } from '@/components/admin/FormField'
import AssetsPickerModal from '@/components/admin/AssetsPickerModal'

interface Asset {
  id: string
  bucket: string
  path: string
  alt: string
}

interface Work {
  id: string
  title: string
  slug: string
  summary: string
  industry: string
  problem: string
  solution: string
  result: string
  stack: string
  cover: Asset | null
  published: boolean
  sort_order: number
}

export default function AdminWorkEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [work, setWork] = useState<Work | null>(null)
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [slugError, setSlugError] = useState<string | null>(null)

  // 認証チェック & データ取得
  useEffect(() => {
    const init = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      // データ取得
      const res = await fetch(`/api/cms/works/${id}`)
      const data = await res.json()
      
      if (data.ok) {
        setWork(data.data)
      } else {
        router.push('/admin/works')
        return
      }
      
      setLoading(false)
    }

    init()
  }, [router, id])

  // postMessageでクリック連動
  const handlePreviewMessage = useCallback((data: { type: string; key: string }) => {
    if (data.type === 'CMS_SELECT') {
      // works.<id>.<field> から fieldを取得
      const parts = data.key.split('.')
      const field = parts[parts.length - 1]
      setHighlightedKey(field)
      
      // 該当フィールドにスクロール
      const element = document.querySelector(`[data-cms-key="${field}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        
        // inputにフォーカス
        const input = element.querySelector('input, textarea')
        if (input) {
          (input as HTMLElement).focus()
        }
      }
      
      // ハイライトを解除
      setTimeout(() => setHighlightedKey(null), 1500)
    }
  }, [])

  // 保存
  const handleSave = async () => {
    if (!work) return
    
    setSaving(true)
    setSlugError(null)
    
    try {
      const res = await fetch(`/api/cms/works/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: work.title,
          slug: work.slug,
          summary: work.summary,
          industry: work.industry,
          problem: work.problem,
          solution: work.solution,
          result: work.result,
          stack: work.stack,
          cover_asset_id: work.cover?.id || null,
          published: work.published,
          sort_order: work.sort_order,
        }),
      })

      const data = await res.json()
      
      if (data.ok) {
        alert('保存しました')
      } else {
        // slugエラーをチェック
        const slugIssue = data.issues?.find((i: { path: string }) => i.path === 'slug')
        if (slugIssue) {
          setSlugError(slugIssue.message)
        } else {
          alert(data.error || '保存に失敗しました')
        }
      }
    } catch (error) {
      alert('保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  // 画像選択
  const handleImageSelect = (asset: Asset) => {
    if (!work) return
    setWork({ ...work, cover: asset })
    setPickerOpen(false)
  }

  // プレビューURL
  const previewUrl = work?.slug ? `/works/${work.slug}` : '/works'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-[#fff100] border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!work) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">実績を読み込めませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* 左：プレビュー */}
      <div className="flex-1 min-w-0">
        <PreviewFrame 
          url={previewUrl} 
          onMessage={handlePreviewMessage}
        />
      </div>

      {/* 右：編集フォーム */}
      <div className="w-[400px] bg-white border-l border-gray-200 flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <button
              onClick={() => router.push('/admin/works')}
              className="text-sm text-gray-500 hover:text-gray-700 mb-1 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Works一覧へ
            </button>
            <h1 className="text-lg font-semibold text-gray-900">実績を編集</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#fff100] text-[#1a1f2e] font-medium rounded-lg hover:bg-[#fdc700] transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {saving ? '保存中...' : '保存'}
          </button>
        </div>

        {/* フォーム */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {/* 基本情報 */}
          <FormCard title="基本情報">
            <FormField label="タイトル" cmsKey="title" highlighted={highlightedKey === 'title'}>
              <TextInput
                cmsKey="title"
                value={work.title}
                onChange={(e) => setWork({ ...work, title: e.target.value })}
              />
            </FormField>

            <FormField label="スラッグ (URL)" cmsKey="slug" highlighted={highlightedKey === 'slug'}>
              <TextInput
                cmsKey="slug"
                value={work.slug}
                onChange={(e) => {
                  setWork({ ...work, slug: e.target.value })
                  setSlugError(null)
                }}
                className={slugError ? 'border-red-500' : ''}
              />
              {slugError && (
                <p className="text-red-500 text-xs mt-1">{slugError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                /works/{work.slug || '...'}
              </p>
            </FormField>

            <FormField label="概要" cmsKey="summary" highlighted={highlightedKey === 'summary'}>
              <TextArea
                cmsKey="summary"
                value={work.summary || ''}
                onChange={(e) => setWork({ ...work, summary: e.target.value })}
                rows={2}
              />
            </FormField>

            <FormField label="業種" cmsKey="industry" highlighted={highlightedKey === 'industry'}>
              <TextInput
                cmsKey="industry"
                value={work.industry || ''}
                onChange={(e) => setWork({ ...work, industry: e.target.value })}
              />
            </FormField>

            <FormField label="カバー画像" cmsKey="cover" highlighted={highlightedKey === 'cover'}>
              <ImagePicker
                cmsKey="cover"
                value={work.cover}
                onChange={(asset) => setWork({ ...work, cover: asset })}
                onPickerOpen={() => setPickerOpen(true)}
              />
            </FormField>
          </FormCard>

          {/* 内容 */}
          <FormCard title="内容">
            <FormField label="課題" cmsKey="problem" highlighted={highlightedKey === 'problem'}>
              <TextArea
                cmsKey="problem"
                value={work.problem || ''}
                onChange={(e) => setWork({ ...work, problem: e.target.value })}
                rows={4}
              />
            </FormField>

            <FormField label="ソリューション" cmsKey="solution" highlighted={highlightedKey === 'solution'}>
              <TextArea
                cmsKey="solution"
                value={work.solution || ''}
                onChange={(e) => setWork({ ...work, solution: e.target.value })}
                rows={4}
              />
            </FormField>

            <FormField label="結果" cmsKey="result" highlighted={highlightedKey === 'result'}>
              <TextArea
                cmsKey="result"
                value={work.result || ''}
                onChange={(e) => setWork({ ...work, result: e.target.value })}
                rows={4}
              />
            </FormField>

            <FormField label="技術スタック" cmsKey="stack" highlighted={highlightedKey === 'stack'}>
              <TextInput
                cmsKey="stack"
                value={work.stack || ''}
                onChange={(e) => setWork({ ...work, stack: e.target.value })}
                placeholder="React, Next.js, TypeScript"
              />
            </FormField>
          </FormCard>

          {/* 公開設定 */}
          <FormCard title="公開設定">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">公開ステータス</p>
                <p className="text-sm text-gray-500">
                  {work.published ? '公開中' : '下書き'}
                </p>
              </div>
              <button
                onClick={() => setWork({ ...work, published: !work.published })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  work.published ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    work.published ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <FormField label="表示順序" cmsKey="sort_order" highlighted={highlightedKey === 'sort_order'}>
              <TextInput
                cmsKey="sort_order"
                type="number"
                value={work.sort_order}
                onChange={(e) => setWork({ ...work, sort_order: parseInt(e.target.value) || 0 })}
              />
              <p className="text-xs text-gray-500 mt-1">数字が小さいほど上に表示</p>
            </FormField>
          </FormCard>
        </div>
      </div>

      {/* 画像ピッカーモーダル */}
      <AssetsPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  )
}
