'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import PreviewFrame from '@/components/admin/PreviewFrame'
import { FormField, TextInput, TextArea, FormCard } from '@/components/admin/FormField'
import AssetsPickerModal from '@/components/admin/AssetsPickerModal'

interface Asset {
  id: string
  bucket: string
  path: string
  alt: string
}

interface Service {
  id: string
  title: string
  slug: string
  catch: string
  summary: string
  tags: string[]
  primary_cta_label: string
  external_url: string | null
  icon: string
  order_number: number
  detail_content: any
  published: boolean
}

export default function AdminServiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [service, setService] = useState<Service | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
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

      await fetchService()
      setLoading(false)
    }

    init()
  }, [router, id])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/cms/services/${id}`)
      const data = await res.json()
      
      if (data.ok) {
        setService(data.data)
      } else {
        alert('サービスを取得できませんでした')
        router.push('/admin/services')
      }
    } catch (error) {
      alert('サービスを取得できませんでした')
      router.push('/admin/services')
    }
  }

  const handleSave = async () => {
    if (!service) return

    setSaving(true)
    try {
      const res = await fetch(`/api/cms/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patch: {
            title: service.title,
            slug: service.slug,
            catch: service.catch,
            summary: service.summary,
            tags: service.tags,
            primary_cta_label: service.primary_cta_label,
            external_url: service.external_url,
            icon: service.icon,
            order_number: service.order_number,
            published: service.published,
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

  if (!service) {
    return (
      <div className="flex items-center justify-center h-full bg-[#f5f5f7]">
        <div className="text-center">
          <p className="text-gray-600 font-medium">サービスが見つかりません</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* 左：プレビュー */}
      <div className="flex-1 min-w-0">
        <PreviewFrame
          url={`/services/${service.slug}`}
          onMessage={() => {}}
          iframeRef={iframeRef}
        />
      </div>

      {/* 右：編集フォーム */}
      <div className="w-[450px] bg-white border-l border-gray-200 flex flex-col shadow-xl">
        {/* ヘッダー */}
        <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#1a1f2e] to-[#2a2f3e] flex-shrink-0">
          <div className="flex-1 min-w-0 pr-3">
            <h1 className="text-lg font-semibold text-white truncate">サービス編集</h1>
            <p className="text-xs text-gray-400 mt-0.5">{service.title}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => router.push('/admin/services')}
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
            <FormField label="タイトル" cmsKey={`service.${id}.title`}>
              <TextInput
                cmsKey={`service.${id}.title`}
                value={service.title}
                onChange={(e) => setService({ ...service, title: e.target.value })}
              />
            </FormField>

            <FormField label="スラッグ" cmsKey={`service.${id}.slug`}>
              <TextInput
                cmsKey={`service.${id}.slug`}
                value={service.slug}
                onChange={(e) => setService({ ...service, slug: e.target.value })}
                placeholder="service-slug"
              />
            </FormField>

            <FormField label="キャッチコピー" cmsKey={`service.${id}.catch`}>
              <TextInput
                cmsKey={`service.${id}.catch`}
                value={service.catch}
                onChange={(e) => setService({ ...service, catch: e.target.value })}
                placeholder="1行のキャッチコピー"
              />
            </FormField>

            <FormField label="説明" cmsKey={`service.${id}.summary`}>
              <TextArea
                cmsKey={`service.${id}.summary`}
                value={service.summary}
                onChange={(e) => setService({ ...service, summary: e.target.value })}
                rows={4}
                placeholder="2〜3行の説明文"
              />
            </FormField>
          </FormCard>

          <FormCard title="CTA設定">
            <FormField label="ボタンラベル" cmsKey={`service.${id}.primary_cta_label`}>
              <TextInput
                cmsKey={`service.${id}.primary_cta_label`}
                value={service.primary_cta_label}
                onChange={(e) => setService({ ...service, primary_cta_label: e.target.value })}
                placeholder="詳細を見る"
              />
            </FormField>

            <FormField label="外部URL（LPなど）" cmsKey={`service.${id}.external_url`}>
              <TextInput
                cmsKey={`service.${id}.external_url`}
                value={service.external_url || ''}
                onChange={(e) => setService({ ...service, external_url: e.target.value || null })}
                placeholder="https://example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                外部URLを設定すると、そのURLに遷移します。未設定の場合は内部詳細ページに遷移します。
              </p>
            </FormField>
          </FormCard>

          <FormCard title="その他">
            <FormField label="タグ（カンマ区切り）" cmsKey={`service.${id}.tags`}>
              <TextInput
                cmsKey={`service.${id}.tags`}
                value={service.tags?.join(', ') || ''}
                onChange={(e) => setService({ 
                  ...service, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
                placeholder="Webアプリ, 業務システム, MVP"
              />
            </FormField>

            <FormField label="アイコン" cmsKey={`service.${id}.icon`}>
              <TextInput
                cmsKey={`service.${id}.icon`}
                value={service.icon}
                onChange={(e) => setService({ ...service, icon: e.target.value })}
                placeholder="code, document, chart, globe, mobile"
              />
            </FormField>

            <FormField label="並び順" cmsKey={`service.${id}.order_number`}>
              <TextInput
                cmsKey={`service.${id}.order_number`}
                type="number"
                value={service.order_number}
                onChange={(e) => setService({ ...service, order_number: parseInt(e.target.value) || 0 })}
              />
            </FormField>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={service.published}
                onChange={(e) => setService({ ...service, published: e.target.checked })}
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
