'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import PreviewFrame from '@/components/admin/PreviewFrame'
import { FormField, TextInput, TextArea, FormCard } from '@/components/admin/FormField'

interface Strength {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  order_number: number
  published: boolean
}

export default function AdminStrengthDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [strength, setStrength] = useState<Strength | null>(null)
  const [featuresText, setFeaturesText] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // 認証チェック & データ取得
  useEffect(() => {
    const init = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      await fetchStrength()
      setLoading(false)
    }

    init()
  }, [router, id])

  const fetchStrength = async () => {
    try {
      const res = await fetch(`/api/cms/strengths/${id}`)
      const data = await res.json()
      
      if (data.ok) {
        setStrength(data.data)
        setFeaturesText(data.data.features?.join('\n') || '')
      } else {
        alert('強みを取得できませんでした')
        router.push('/admin/strengths')
      }
    } catch (error) {
      alert('強みを取得できませんでした')
      router.push('/admin/strengths')
    }
  }

  const handleSave = async () => {
    if (!strength) return

    setSaving(true)
    try {
      const features = featuresText.split('\n').filter(line => line.trim())
      
      const res = await fetch(`/api/cms/strengths/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patch: {
            title: strength.title,
            description: strength.description,
            features: features,
            icon: strength.icon,
            order_number: strength.order_number,
            published: strength.published,
          },
        }),
      })

      const data = await res.json()
      
      if (data.ok) {
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src
        }
        alert('保存しました')
      } else {
        alert(data.error || '保存に失敗しました')
      }
    } catch (error) {
      alert('保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }

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

  if (!strength) {
    return (
      <div className="flex items-center justify-center h-full bg-[#f5f5f7]">
        <div className="text-center">
          <p className="text-gray-600 font-medium">強みが見つかりません</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* 左：プレビュー */}
      <div className="flex-1 min-w-0">
        <PreviewFrame
          url="/strengths"
          onMessage={() => {}}
          iframeRef={iframeRef}
        />
      </div>

      {/* 右：編集フォーム */}
      <div className="w-[450px] bg-white border-l border-gray-200 flex flex-col shadow-xl">
        {/* ヘッダー */}
        <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#1a1f2e] to-[#2a2f3e] flex-shrink-0">
          <div className="flex-1 min-w-0 pr-3">
            <h1 className="text-lg font-semibold text-white truncate">強み編集</h1>
            <p className="text-xs text-gray-400 mt-0.5">{strength.title}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => router.push('/admin/strengths')}
              className="px-3 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all"
            >
              一覧へ
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#fff100] text-[#1a1f2e] font-semibold rounded-xl hover:bg-[#fdc700] transition-all disabled:opacity-50 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>

        {/* フォーム */}
        <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
          <FormCard title="基本情報">
            <FormField label="タイトル" cmsKey={`strength.${id}.title`}>
              <TextInput
                cmsKey={`strength.${id}.title`}
                value={strength.title}
                onChange={(e) => setStrength({ ...strength, title: e.target.value })}
              />
            </FormField>

            <FormField label="説明" cmsKey={`strength.${id}.description`}>
              <TextArea
                cmsKey={`strength.${id}.description`}
                value={strength.description}
                onChange={(e) => setStrength({ ...strength, description: e.target.value })}
                rows={4}
                placeholder="強みの説明文"
              />
            </FormField>

            <FormField label="特徴（1行1項目）" cmsKey={`strength.${id}.features`}>
              <TextArea
                cmsKey={`strength.${id}.features`}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                rows={5}
                placeholder="特徴1&#10;特徴2&#10;特徴3"
              />
              <p className="text-xs text-gray-500 mt-1">
                1行に1つの特徴を入力してください
              </p>
            </FormField>
          </FormCard>

          <FormCard title="その他">
            <FormField label="アイコン" cmsKey={`strength.${id}.icon`}>
              <TextInput
                cmsKey={`strength.${id}.icon`}
                value={strength.icon}
                onChange={(e) => setStrength({ ...strength, icon: e.target.value })}
                placeholder="sparkles, demo, operation, cms, scale"
              />
            </FormField>

            <FormField label="並び順" cmsKey={`strength.${id}.order_number`}>
              <TextInput
                cmsKey={`strength.${id}.order_number`}
                type="number"
                value={strength.order_number}
                onChange={(e) => setStrength({ ...strength, order_number: parseInt(e.target.value) || 0 })}
              />
            </FormField>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={strength.published}
                onChange={(e) => setStrength({ ...strength, published: e.target.checked })}
                className="w-4 h-4 text-[#fff100] border-gray-300 rounded focus:ring-[#fff100]"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">
                公開する
              </label>
            </div>
          </FormCard>
        </div>
      </div>
    </div>
  )
}
