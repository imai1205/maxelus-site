'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client'
import PreviewFrame from '@/components/admin/PreviewFrame'
import { FormField, TextInput, TextArea, FormCard, ImagePicker } from '@/components/admin/FormField'
import AssetsPickerModal from '@/components/admin/AssetsPickerModal'

interface Asset {
  id: string
  bucket: string
  path: string
  alt: string
}

interface Service {
  title: string
  description: string
  tags: string[]
  icon: string
}

interface FAQ {
  question: string
  answer: string
}

interface SiteSettings {
  // Hero
  hero_title: string
  hero_subtitle: string
  hero_description: string
  hero_image: Asset | null
  cta_primary_text: string
  cta_primary_href: string
  cta_secondary_text: string
  cta_secondary_href: string
  // Challenge
  challenge_title: string
  challenge_subtitle: string
  challenge_before_items: string[]
  challenge_after_items: string[]
  // Solution
  solution_title: string
  solution_subtitle: string
  // Services
  services_title: string
  services: Service[]
  // Works
  works_title: string
  works_subtitle: string
  works_stat_1_number: number
  works_stat_1_suffix: string
  works_stat_1_label: string
  works_stat_2_number: number
  works_stat_2_suffix: string
  works_stat_2_label: string
  works_stat_3_number: number
  works_stat_3_suffix: string
  works_stat_3_label: string
  // FAQ
  faq_title: string
  faqs: FAQ[]
  // CTA
  cta_section_title: string
  cta_section_subtitle: string
  // Company
  company_name: string
  logo: Asset | null
  about_title: string
  about_text: string
  // Contact Page
  contact_email: string
  contact_phone: string
  contact_address: string
  // Page Settings
  strengths_page_title: string
  strengths_page_subtitle: string
  strengths_stats: Array<{ label: string; value: number; suffix: string }>
  strengths_page_cta_primary_text: string
  strengths_page_cta_primary_href: string
  strengths_page_cta_secondary_text: string
  strengths_page_cta_secondary_href: string
  services_page_title: string
  services_page_subtitle: string
  services_page_cta_primary_text: string
  services_page_cta_primary_href: string
  services_page_cta_secondary_text: string
  services_page_cta_secondary_href: string
  contact_page_title: string
  contact_page_subtitle: string
}

// セットアップバナー
function SetupBanner({ 
  message, 
  onSaveInitialData 
}: { 
  message: string
  onSaveInitialData?: () => void
}) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-800">{message}</p>
          <p className="text-xs text-amber-700 mt-1">
            Supabase SQL Editorで <code className="bg-amber-100 px-1 rounded">supabase/schema.sql</code> を実行してください。
          </p>
          {onSaveInitialData && (
            <button
              onClick={onSaveInitialData}
              className="mt-3 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              初期データをデータベースに保存
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminSitePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerTarget, setPickerTarget] = useState<'hero_image' | 'logo' | null>(null)
  const [isDefault, setIsDefault] = useState(false)
  const [setupMessage, setSetupMessage] = useState<string | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [histories, setHistories] = useState<any[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)

  // リアルタイムプレビュー更新
  useEffect(() => {
    if (!settings || !iframeRef.current) return

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }

    updateTimeoutRef.current = setTimeout(() => {
      try {
        const iframe = iframeRef.current
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({
            type: 'CMS_UPDATE',
            settings: settings
          }, window.location.origin)
        }
      } catch (error) {
        console.error('AdminSitePage: Error sending update message', error)
      }
    }, 500)

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [settings])

  // 認証チェック & データ取得
  useEffect(() => {
    const init = async () => {
      if (isSupabaseConfigured()) {
        const supabase = createSupabaseBrowserClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/admin/login')
          return
        }
      }

      const res = await fetch('/api/cms/site')
      const data = await res.json()
      
      if (data.ok) {
        // 配列フィールドにデフォルト値を設定（JSONBフィールドをパース）
        const settingsData = {
          ...data.data,
          // Hero Section - 実際のページのテキストに合わせる
          // 古い値（"デジタル"など）が入っている場合は正しいデフォルト値に置き換え
          hero_title: (data.data.hero_title && 
                       data.data.hero_title !== 'デジタル' && 
                       data.data.hero_title.includes('そのソフト')) 
            ? data.data.hero_title 
            : 'そのソフト、現場に合わせて\n"我慢して"使っていませんか？',
          hero_subtitle: (data.data.hero_subtitle && 
                          data.data.hero_subtitle !== 'お客様のビジネスをデジタルで支援します。' &&
                          data.data.hero_subtitle.includes('業務にソフト')) 
            ? data.data.hero_subtitle 
            : '業務にソフトを合わせる時代は終わり。\nまずは"触れるデモ"で、最短ルートを見える化します。',
          hero_description: data.data.hero_description || 'HP/業務DX/Webアプリ・iOSアプリまで対応。目的（集客UP／工数削減／ミス削減）から一緒に整理し、最短で形にします。',
          cta_primary_text: data.data.cta_primary_text || '無料相談する',
          cta_primary_href: data.data.cta_primary_href || '/contact',
          cta_secondary_text: data.data.cta_secondary_text || '実績を見る',
          cta_secondary_href: data.data.cta_secondary_href || '/works',
          // Challenge Section
          challenge_title: data.data.challenge_title || '課題は"ズレ"から起きる',
          challenge_subtitle: data.data.challenge_subtitle || '開発の失敗の多くは、認識のズレから生まれます。',
          challenge_before_items: typeof data.data.challenge_before_items === 'string' 
            ? JSON.parse(data.data.challenge_before_items) 
            : (data.data.challenge_before_items || ['仕様が固まらない', '途中で手戻りが出る', '追加費用が怖い']),
          challenge_after_items: typeof data.data.challenge_after_items === 'string' 
            ? JSON.parse(data.data.challenge_after_items) 
            : (data.data.challenge_after_items || ['触れるデモで合意', '設計確定→開発', '予算と範囲が明確']),
          // Solution Section
          solution_title: data.data.solution_title || 'その業務、システム化して\n"人を増やさず"回すのはどうですか？',
          solution_subtitle: data.data.solution_subtitle || '日々のムダを減らして、現場の処理速度を上げる。',
          // Services Section
          services_title: data.data.services_title || '対応できる内容',
          services: typeof data.data.services === 'string' 
            ? JSON.parse(data.data.services) 
            : (data.data.services || []),
          // Works Section
          works_title: data.data.works_title || '実績',
          works_subtitle: data.data.works_subtitle || '製造業、医療、建設など、幅広い業界で実績があります',
          works_stat_1_number: data.data.works_stat_1_number ?? 50,
          works_stat_1_suffix: data.data.works_stat_1_suffix || '+',
          works_stat_1_label: data.data.works_stat_1_label || 'プロジェクト実績',
          works_stat_2_number: data.data.works_stat_2_number ?? 98,
          works_stat_2_suffix: data.data.works_stat_2_suffix || '%',
          works_stat_2_label: data.data.works_stat_2_label || '顧客満足度',
          works_stat_3_number: data.data.works_stat_3_number ?? 15,
          works_stat_3_suffix: data.data.works_stat_3_suffix || '+',
          works_stat_3_label: data.data.works_stat_3_label || '業界対応',
          // FAQ Section
          faq_title: data.data.faq_title || 'よくある質問',
          faqs: typeof data.data.faqs === 'string' 
            ? JSON.parse(data.data.faqs) 
            : (data.data.faqs || []),
          // CTA Section
          cta_section_title: data.data.cta_section_title || '既製品に合わせるのをやめて、\n"自社に最適化"しませんか？',
          cta_section_subtitle: data.data.cta_section_subtitle || 'まずは無料相談で、課題整理→触れるデモ提示まで一緒に進めます。',
          // Company Info
          company_name: data.data.company_name || 'MAXELUS',
          about_title: data.data.about_title || '私たちについて',
          about_text: data.data.about_text || '私たちは、お客様のビジネスをデジタルで支援するパートナーです。',
          // Contact Page
          contact_email: data.data.contact_email || 'info@maxelus.com',
          contact_phone: data.data.contact_phone || '',
          contact_address: data.data.contact_address || '',
          // Page Settings
          strengths_page_title: data.data.strengths_page_title || 'マクセラスが選ばれる理由',
          strengths_page_subtitle: data.data.strengths_page_subtitle || '"作るだけ"では終わらない。現場で使える・更新できる・拡張できるシステムを、最短で形にします。',
          strengths_stats: typeof data.data.strengths_stats === 'string' 
            ? JSON.parse(data.data.strengths_stats) 
            : (data.data.strengths_stats || [
                { label: "導入実績", value: 50, suffix: "社以上" },
                { label: "継続率", value: 95, suffix: "%" },
                { label: "平均開発期間", value: 2, suffix: "ヶ月〜" },
                { label: "業界経験", value: 10, suffix: "年以上" }
              ]),
          services_page_title: data.data.services_page_title || '製造業の"現場で使える"DXを、最短で形にします。',
          services_page_subtitle: data.data.services_page_subtitle || '図面管理／受発注・販売管理／Webアプリ／iPhoneデモ搭載LPまで一気通貫。',
          services_page_cta_primary_text: data.data.services_page_cta_primary_text || '無料相談する',
          services_page_cta_primary_href: data.data.services_page_cta_primary_href || '/contact',
          services_page_cta_secondary_text: data.data.services_page_cta_secondary_text || 'マクセラスの強みを見る',
          services_page_cta_secondary_href: data.data.services_page_cta_secondary_href || '/strengths',
          strengths_page_cta_primary_text: data.data.strengths_page_cta_primary_text || '無料相談する',
          strengths_page_cta_primary_href: data.data.strengths_page_cta_primary_href || '/contact',
          strengths_page_cta_secondary_text: data.data.strengths_page_cta_secondary_text || 'サービス一覧を見る',
          strengths_page_cta_secondary_href: data.data.strengths_page_cta_secondary_href || '/services',
          contact_page_title: data.data.contact_page_title || 'お問い合わせ',
          contact_page_subtitle: data.data.contact_page_subtitle || 'まずは無料相談から。お気軽にご連絡ください。',
        }
        setSettings(settingsData)
        setIsDefault(data.isDefault || false)
        setSetupMessage(data.message || null)
      }
      
      setLoading(false)
    }

    init()
  }, [router])

  // postMessageでクリック連動
  const handlePreviewMessage = useCallback((data: { type: string; key: string }) => {
    try {
      if (data.type === 'CMS_SELECT') {
        const key = data.key.replace('site.', '')
        setHighlightedKey(key)
        
        // 対応するフィールドまでスクロール
        setTimeout(() => {
          try {
            const element = document.querySelector(`[data-cms-key="${key}"]`)
            if (element && formContainerRef.current) {
              const containerRect = formContainerRef.current.getBoundingClientRect()
              const elementRect = element.getBoundingClientRect()
              const scrollTop = formContainerRef.current.scrollTop
              const targetScrollTop = scrollTop + elementRect.top - containerRect.top - (containerRect.height / 2) + (elementRect.height / 2)
              
              formContainerRef.current.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
              })
              
              // inputにフォーカス
              setTimeout(() => {
                const input = element.querySelector('input, textarea')
                if (input) {
                  (input as HTMLElement).focus()
                }
              }, 300)
            }
          } catch (error) {
            console.error('AdminSitePage: Error scrolling to element', error)
          }
        }, 100)
        
        setTimeout(() => setHighlightedKey(null), 2000)
      }
    } catch (error) {
      console.error('AdminSitePage: Error handling preview message', error)
    }
  }, [])

  // 初期データを保存
  const handleSaveInitialData = async () => {
    if (!isSupabaseConfigured()) {
      alert('Supabaseが設定されていません。\n.env.localファイルを確認してください。')
      return
    }
    
    setSaving(true)
    try {
      const res = await fetch('/api/cms/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      
      if (data.ok) {
        // データを再取得
        const res2 = await fetch('/api/cms/site')
        const data2 = await res2.json()
        if (data2.ok) {
          // 配列フィールドにデフォルト値を設定
          const settingsData = {
            ...data2.data,
            hero_title: data2.data.hero_title || 'そのソフト、現場に合わせて\n"我慢して"使っていませんか？',
            hero_subtitle: data2.data.hero_subtitle || '業務にソフトを合わせる時代は終わり。\nまずは"触れるデモ"で、最短ルートを見える化します。',
            hero_description: data2.data.hero_description || 'HP/業務DX/Webアプリ・iOSアプリまで対応。目的（集客UP／工数削減／ミス削減）から一緒に整理し、最短で形にします。',
            cta_primary_text: data2.data.cta_primary_text || '無料相談する',
            cta_primary_href: data2.data.cta_primary_href || '/contact',
            cta_secondary_text: data2.data.cta_secondary_text || '実績を見る',
            cta_secondary_href: data2.data.cta_secondary_href || '/works',
            challenge_title: data2.data.challenge_title || '課題は"ズレ"から起きる',
            challenge_subtitle: data2.data.challenge_subtitle || '開発の失敗の多くは、認識のズレから生まれます。',
            challenge_before_items: typeof data2.data.challenge_before_items === 'string' 
              ? JSON.parse(data2.data.challenge_before_items) 
              : (data2.data.challenge_before_items || ['仕様が固まらない', '途中で手戻りが出る', '追加費用が怖い']),
            challenge_after_items: typeof data2.data.challenge_after_items === 'string' 
              ? JSON.parse(data2.data.challenge_after_items) 
              : (data2.data.challenge_after_items || ['触れるデモで合意', '設計確定→開発', '予算と範囲が明確']),
            solution_title: data2.data.solution_title || 'その業務、システム化して\n"人を増やさず"回すのはどうですか？',
            solution_subtitle: data2.data.solution_subtitle || '日々のムダを減らして、現場の処理速度を上げる。',
            services_title: data2.data.services_title || '対応できる内容',
            services: typeof data2.data.services === 'string' 
              ? JSON.parse(data2.data.services) 
              : (data2.data.services || []),
            works_title: data2.data.works_title || '実績',
            works_subtitle: data2.data.works_subtitle || '製造業、医療、建設など、幅広い業界で実績があります',
            works_stat_1_number: data2.data.works_stat_1_number ?? 50,
            works_stat_1_suffix: data2.data.works_stat_1_suffix || '+',
            works_stat_1_label: data2.data.works_stat_1_label || 'プロジェクト実績',
            works_stat_2_number: data2.data.works_stat_2_number ?? 98,
            works_stat_2_suffix: data2.data.works_stat_2_suffix || '%',
            works_stat_2_label: data2.data.works_stat_2_label || '顧客満足度',
            works_stat_3_number: data2.data.works_stat_3_number ?? 15,
            works_stat_3_suffix: data2.data.works_stat_3_suffix || '+',
            works_stat_3_label: data2.data.works_stat_3_label || '業界対応',
            faq_title: data2.data.faq_title || 'よくある質問',
            faqs: typeof data2.data.faqs === 'string' 
              ? JSON.parse(data2.data.faqs) 
              : (data2.data.faqs || []),
            cta_section_title: data2.data.cta_section_title || '既製品に合わせるのをやめて、\n"自社に最適化"しませんか？',
            cta_section_subtitle: data2.data.cta_section_subtitle || 'まずは無料相談で、課題整理→触れるデモ提示まで一緒に進めます。',
            company_name: data2.data.company_name || 'MAXELUS',
            about_title: data2.data.about_title || '私たちについて',
            about_text: data2.data.about_text || '私たちは、お客様のビジネスをデジタルで支援するパートナーです。',
          }
          setSettings(settingsData)
          setIsDefault(false)
          setSetupMessage(null)
        }
        alert('初期データを保存しました')
      } else {
        alert(data.error || '保存に失敗しました')
      }
    } catch (error) {
      alert('保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  // 保存
  const handleSave = async () => {
    if (!settings) return
    
    if (isDefault) {
      alert('データベースが設定されていないため保存できません。\nSupabase SQL Editorで schema.sql を実行してください。')
      return
    }
    
    setSaving(true)
    try {
      // #region agent log
      const patchData = {
        hero_title: settings.hero_title,
        hero_subtitle: settings.hero_subtitle,
        hero_description: settings.hero_description,
        hero_image_asset_id: settings.hero_image?.id || null,
        cta_primary_text: settings.cta_primary_text,
        cta_primary_href: settings.cta_primary_href,
        cta_secondary_text: settings.cta_secondary_text,
        cta_secondary_href: settings.cta_secondary_href,
        challenge_title: settings.challenge_title,
        challenge_subtitle: settings.challenge_subtitle,
        challenge_before_items: settings.challenge_before_items,
        challenge_after_items: settings.challenge_after_items,
        solution_title: settings.solution_title,
        solution_subtitle: settings.solution_subtitle,
        services_title: settings.services_title,
        services: settings.services,
        works_title: settings.works_title,
        works_subtitle: settings.works_subtitle,
        works_stat_1_number: settings.works_stat_1_number,
        works_stat_1_suffix: settings.works_stat_1_suffix,
        works_stat_1_label: settings.works_stat_1_label,
        works_stat_2_number: settings.works_stat_2_number,
        works_stat_2_suffix: settings.works_stat_2_suffix,
        works_stat_2_label: settings.works_stat_2_label,
        works_stat_3_number: settings.works_stat_3_number,
        works_stat_3_suffix: settings.works_stat_3_suffix,
        works_stat_3_label: settings.works_stat_3_label,
        faq_title: settings.faq_title,
        faqs: settings.faqs,
        cta_section_title: settings.cta_section_title,
        cta_section_subtitle: settings.cta_section_subtitle,
            company_name: settings.company_name,
            logo_asset_id: settings.logo?.id || null,
            about_title: settings.about_title,
            about_text: settings.about_text,
            contact_email: settings.contact_email,
            contact_phone: settings.contact_phone,
            contact_address: settings.contact_address,
            strengths_page_title: settings.strengths_page_title,
            strengths_page_subtitle: settings.strengths_page_subtitle,
            strengths_stats: settings.strengths_stats,
            strengths_page_cta_primary_text: settings.strengths_page_cta_primary_text,
            strengths_page_cta_primary_href: settings.strengths_page_cta_primary_href,
            strengths_page_cta_secondary_text: settings.strengths_page_cta_secondary_text,
            strengths_page_cta_secondary_href: settings.strengths_page_cta_secondary_href,
            services_page_title: settings.services_page_title,
            services_page_subtitle: settings.services_page_subtitle,
            services_page_cta_primary_text: settings.services_page_cta_primary_text,
            services_page_cta_primary_href: settings.services_page_cta_primary_href,
            services_page_cta_secondary_text: settings.services_page_cta_secondary_text,
            services_page_cta_secondary_href: settings.services_page_cta_secondary_href,
            contact_page_title: settings.contact_page_title,
            contact_page_subtitle: settings.contact_page_subtitle,
      };
      fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/site/page.tsx:handleSave',message:'Sending patch data',data:{patchKeys:Object.keys(patchData),patchData},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      const res = await fetch('/api/cms/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patch: patchData,
        }),
      })

      // #region agent log
      const responseStatus = res.status;
      const responseText = await res.clone().text();
      fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/site/page.tsx:handleSave',message:'API response received',data:{status:responseStatus,responseText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion

      const data = await res.json()
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/site/page.tsx:handleSave',message:'Parsed response data',data:{ok:data.ok,error:data.error,issues:data.issues},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      if (data.ok) {
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src
        }
        alert('保存しました')
      } else {
        alert(data.error || '保存に失敗しました')
      }
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/site/page.tsx:handleSave',message:'Exception caught',data:{errorMessage:error instanceof Error ? error.message : String(error),errorStack:error instanceof Error ? error.stack : undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      alert('保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  // 履歴一覧を取得
  const loadHistory = async () => {
    setLoadingHistory(true)
    try {
      const res = await fetch('/api/cms/site/history?limit=50')
      const data = await res.json()
      
      if (data.ok) {
        setHistories(data.data || [])
      } else {
        alert('履歴の取得に失敗しました')
      }
    } catch (error) {
      alert('履歴の取得に失敗しました')
    } finally {
      setLoadingHistory(false)
    }
  }

  // 履歴を復元
  const handleRestoreHistory = async (historyId: string) => {
    if (!confirm('この履歴を復元しますか？現在の設定は上書きされます。')) {
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/cms/site/history/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history_id: historyId }),
      })

      const data = await res.json()

      if (data.ok) {
        // データを再取得
        const res2 = await fetch('/api/cms/site')
        const data2 = await res2.json()
        if (data2.ok) {
          const settingsData = {
            ...data2.data,
            hero_title: data2.data.hero_title || 'そのソフト、現場に合わせて\n"我慢して"使っていませんか？',
            hero_subtitle: data2.data.hero_subtitle || '業務にソフトを合わせる時代は終わり。\nまずは"触れるデモ"で、最短ルートを見える化します。',
            hero_description: data2.data.hero_description || 'HP/業務DX/Webアプリ・iOSアプリまで対応。目的（集客UP／工数削減／ミス削減）から一緒に整理し、最短で形にします。',
            challenge_before_items: typeof data2.data.challenge_before_items === 'string'
              ? JSON.parse(data2.data.challenge_before_items)
              : (data2.data.challenge_before_items || []),
            challenge_after_items: typeof data2.data.challenge_after_items === 'string'
              ? JSON.parse(data2.data.challenge_after_items)
              : (data2.data.challenge_after_items || []),
            services: typeof data2.data.services === 'string'
              ? JSON.parse(data2.data.services)
              : (data2.data.services || []),
            faqs: typeof data2.data.faqs === 'string'
              ? JSON.parse(data2.data.faqs)
              : (data2.data.faqs || []),
          }
          setSettings(settingsData)
          
          // iframeをリロード
          if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src
          }
          
          alert('履歴を復元しました')
          setHistoryOpen(false)
        }
      } else {
        alert(data.error || '履歴の復元に失敗しました')
      }
    } catch (error) {
      alert('履歴の復元に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  // 履歴モーダルを開く
  const openHistoryModal = () => {
    setHistoryOpen(true)
    loadHistory()
  }

  // 画像選択
  const handleImageSelect = (asset: Asset) => {
    if (!settings || !pickerTarget) return
    
    if (pickerTarget === 'hero_image') {
      setSettings({ ...settings, hero_image: asset })
    } else if (pickerTarget === 'logo') {
      setSettings({ ...settings, logo: asset })
    }
    
    setPickerOpen(false)
    setPickerTarget(null)
  }

  const openPicker = (target: 'hero_image' | 'logo') => {
    setPickerTarget(target)
    setPickerOpen(true)
  }

  // ヘルパー関数
  const updateChallengeItem = (type: 'before' | 'after', index: number, value: string) => {
    if (!settings) return
    const key = type === 'before' ? 'challenge_before_items' : 'challenge_after_items'
    const items = [...settings[key]]
    items[index] = value
    setSettings({ ...settings, [key]: items })
  }

  const updateService = (index: number, field: keyof Service, value: string | string[]) => {
    if (!settings) return
    const services = [...settings.services]
    services[index] = { ...services[index], [field]: value }
    setSettings({ ...settings, services })
  }

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    if (!settings) return
    const faqs = [...settings.faqs]
    faqs[index] = { ...faqs[index], [field]: value }
    setSettings({ ...settings, faqs })
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

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-full bg-[#f5f5f7]">
        <p className="text-gray-600">設定を読み込めませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* 左：プレビュー */}
      <div className="flex-1 min-w-0">
        <PreviewFrame 
          url="/" 
          onMessage={handlePreviewMessage}
          iframeRef={iframeRef}
        />
      </div>

      {/* 右：編集フォーム */}
      <div className="w-[450px] bg-white border-l border-gray-200 flex flex-col shadow-xl">
        {/* ヘッダー */}
        <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#1a1f2e] to-[#2a2f3e] flex-shrink-0">
          <div className="flex-1 min-w-0 pr-3">
            <h1 className="text-lg font-semibold text-white truncate">サイト設定</h1>
            <p className="text-xs text-gray-400 mt-0.5">プレビューをクリックして編集</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={openHistoryModal}
              className="flex items-center gap-2 px-3 py-2.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
              title="履歴"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={handleSave}
              disabled={saving || isDefault}
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
        <div 
          ref={formContainerRef}
          className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50"
        >
          {isDefault && setupMessage && (
            <SetupBanner 
              message={setupMessage} 
              onSaveInitialData={isSupabaseConfigured() ? handleSaveInitialData : undefined}
            />
          )}

          {/* ヒーローセクション */}
          <FormCard title="ヒーローセクション" description="トップページのメインビジュアル">
            <FormField label="メインタイトル" cmsKey="hero_title" highlighted={highlightedKey === 'hero_title'}>
              <TextArea
                cmsKey="hero_title"
                value={settings.hero_title}
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                rows={3}
              />
            </FormField>
            <FormField label="サブタイトル" cmsKey="hero_subtitle" highlighted={highlightedKey === 'hero_subtitle'}>
              <TextArea
                cmsKey="hero_subtitle"
                value={settings.hero_subtitle}
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                rows={3}
              />
            </FormField>
            <FormField label="ヒーロー画像" cmsKey="hero_image" highlighted={highlightedKey === 'hero_image'}>
              <ImagePicker
                cmsKey="hero_image"
                value={settings.hero_image}
                onChange={(asset) => setSettings({ ...settings, hero_image: asset })}
                onPickerOpen={() => openPicker('hero_image')}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="CTAボタン1" cmsKey="cta_primary_text" highlighted={highlightedKey === 'cta_primary_text'}>
                <TextInput
                  cmsKey="cta_primary_text"
                  value={settings.cta_primary_text}
                  onChange={(e) => setSettings({ ...settings, cta_primary_text: e.target.value })}
                />
              </FormField>
              <FormField label="リンク" cmsKey="cta_primary_href">
                <TextInput
                  cmsKey="cta_primary_href"
                  value={settings.cta_primary_href}
                  onChange={(e) => setSettings({ ...settings, cta_primary_href: e.target.value })}
                />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="CTAボタン2" cmsKey="cta_secondary_text" highlighted={highlightedKey === 'cta_secondary_text'}>
                <TextInput
                  cmsKey="cta_secondary_text"
                  value={settings.cta_secondary_text}
                  onChange={(e) => setSettings({ ...settings, cta_secondary_text: e.target.value })}
                />
              </FormField>
              <FormField label="リンク" cmsKey="cta_secondary_href">
                <TextInput
                  cmsKey="cta_secondary_href"
                  value={settings.cta_secondary_href}
                  onChange={(e) => setSettings({ ...settings, cta_secondary_href: e.target.value })}
                />
              </FormField>
            </div>
          </FormCard>

          {/* 課題セクション */}
          <div>
            <FormCard title="課題セクション" description="Before/After比較">
              <FormField label="セクションタイトル" cmsKey="challenge_title" highlighted={highlightedKey === 'challenge_title'}>
                <TextInput
                  cmsKey="challenge_title"
                  value={settings.challenge_title}
                  onChange={(e) => setSettings({ ...settings, challenge_title: e.target.value })}
                />
              </FormField>
              <FormField label="サブタイトル" cmsKey="challenge_subtitle">
                <TextInput
                  cmsKey="challenge_subtitle"
                  value={settings.challenge_subtitle}
                  onChange={(e) => setSettings({ ...settings, challenge_subtitle: e.target.value })}
                />
              </FormField>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Before項目</p>
                {(settings.challenge_before_items || []).map((item, i) => (
                  <TextInput
                    key={i}
                    cmsKey={`challenge_before_${i}`}
                    value={item}
                    onChange={(e) => updateChallengeItem('before', i, e.target.value)}
                    placeholder={`Before ${i + 1}`}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">After項目</p>
                {(settings.challenge_after_items || []).map((item, i) => (
                  <TextInput
                    key={i}
                    cmsKey={`challenge_after_${i}`}
                    value={item}
                    onChange={(e) => updateChallengeItem('after', i, e.target.value)}
                    placeholder={`After ${i + 1}`}
                  />
                ))}
              </div>
            </FormCard>
          </div>

          {/* 解決策セクション */}
          <div>
            <FormCard title="解決策セクション" description="提案メッセージ">
              <FormField label="タイトル" cmsKey="solution_title" highlighted={highlightedKey === 'solution_title'}>
                <TextArea
                  cmsKey="solution_title"
                  value={settings.solution_title}
                  onChange={(e) => setSettings({ ...settings, solution_title: e.target.value })}
                  rows={3}
                />
              </FormField>
              <FormField label="サブタイトル" cmsKey="solution_subtitle">
                <TextInput
                  cmsKey="solution_subtitle"
                  value={settings.solution_subtitle}
                  onChange={(e) => setSettings({ ...settings, solution_subtitle: e.target.value })}
                />
              </FormField>
            </FormCard>
          </div>

          {/* サービスセクション */}
          <div>
            <FormCard title="サービスセクション" description="提供サービス一覧">
              <FormField label="セクションタイトル" cmsKey="services_title">
                <TextInput
                  cmsKey="services_title"
                  value={settings.services_title}
                  onChange={(e) => setSettings({ ...settings, services_title: e.target.value })}
                />
              </FormField>
              {(settings.services || []).map((service, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border space-y-2">
                  <p className="text-sm font-medium text-gray-600">サービス {i + 1}</p>
                  <TextInput
                    cmsKey={`service_${i}_title`}
                    value={service.title}
                    onChange={(e) => updateService(i, 'title', e.target.value)}
                    placeholder="タイトル"
                  />
                  <TextArea
                    cmsKey={`service_${i}_desc`}
                    value={service.description}
                    onChange={(e) => updateService(i, 'description', e.target.value)}
                    rows={2}
                    placeholder="説明"
                  />
                  <TextInput
                    cmsKey={`service_${i}_tags`}
                    value={service.tags.join(', ')}
                    onChange={(e) => updateService(i, 'tags', e.target.value.split(',').map(t => t.trim()))}
                    placeholder="タグ（カンマ区切り）"
                  />
                </div>
              ))}
            </FormCard>
          </div>

          {/* 実績セクション */}
          <div>
            <FormCard title="実績セクション" description="統計情報">
              <FormField label="セクションタイトル" cmsKey="works_title">
                <TextInput
                  cmsKey="works_title"
                  value={settings.works_title}
                  onChange={(e) => setSettings({ ...settings, works_title: e.target.value })}
                />
              </FormField>
              <FormField label="サブタイトル" cmsKey="works_subtitle">
                <TextInput
                  cmsKey="works_subtitle"
                  value={settings.works_subtitle}
                  onChange={(e) => setSettings({ ...settings, works_subtitle: e.target.value })}
                />
              </FormField>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">統計1</label>
                  <TextInput cmsKey="stat1_num" type="number" value={String(settings.works_stat_1_number)} onChange={(e) => setSettings({ ...settings, works_stat_1_number: parseInt(e.target.value) || 0 })} />
                  <TextInput cmsKey="stat1_suffix" value={settings.works_stat_1_suffix} onChange={(e) => setSettings({ ...settings, works_stat_1_suffix: e.target.value })} placeholder="+" />
                  <TextInput cmsKey="stat1_label" value={settings.works_stat_1_label} onChange={(e) => setSettings({ ...settings, works_stat_1_label: e.target.value })} placeholder="ラベル" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">統計2</label>
                  <TextInput cmsKey="stat2_num" type="number" value={String(settings.works_stat_2_number)} onChange={(e) => setSettings({ ...settings, works_stat_2_number: parseInt(e.target.value) || 0 })} />
                  <TextInput cmsKey="stat2_suffix" value={settings.works_stat_2_suffix} onChange={(e) => setSettings({ ...settings, works_stat_2_suffix: e.target.value })} placeholder="%" />
                  <TextInput cmsKey="stat2_label" value={settings.works_stat_2_label} onChange={(e) => setSettings({ ...settings, works_stat_2_label: e.target.value })} placeholder="ラベル" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">統計3</label>
                  <TextInput cmsKey="stat3_num" type="number" value={String(settings.works_stat_3_number)} onChange={(e) => setSettings({ ...settings, works_stat_3_number: parseInt(e.target.value) || 0 })} />
                  <TextInput cmsKey="stat3_suffix" value={settings.works_stat_3_suffix} onChange={(e) => setSettings({ ...settings, works_stat_3_suffix: e.target.value })} placeholder="+" />
                  <TextInput cmsKey="stat3_label" value={settings.works_stat_3_label} onChange={(e) => setSettings({ ...settings, works_stat_3_label: e.target.value })} placeholder="ラベル" />
                </div>
              </div>
            </FormCard>
          </div>

          {/* FAQセクション */}
          <div>
            <FormCard title="FAQセクション" description="よくある質問">
              <FormField label="セクションタイトル" cmsKey="faq_title">
                <TextInput
                  cmsKey="faq_title"
                  value={settings.faq_title}
                  onChange={(e) => setSettings({ ...settings, faq_title: e.target.value })}
                />
              </FormField>
              {(settings.faqs || []).map((faq, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border space-y-2">
                  <p className="text-sm font-medium text-gray-600">Q{i + 1}</p>
                  <TextInput
                    cmsKey={`faq_${i}_q`}
                    value={faq.question}
                    onChange={(e) => updateFAQ(i, 'question', e.target.value)}
                    placeholder="質問"
                  />
                  <TextArea
                    cmsKey={`faq_${i}_a`}
                    value={faq.answer}
                    onChange={(e) => updateFAQ(i, 'answer', e.target.value)}
                    rows={3}
                    placeholder="回答"
                  />
                </div>
              ))}
            </FormCard>
          </div>

          {/* CTAセクション */}
          <div>
            <FormCard title="CTAセクション" description="最終アクション誘導">
              <FormField label="タイトル" cmsKey="cta_section_title" highlighted={highlightedKey === 'cta_section_title'}>
                <TextArea
                  cmsKey="cta_section_title"
                  value={settings.cta_section_title}
                  onChange={(e) => setSettings({ ...settings, cta_section_title: e.target.value })}
                  rows={3}
                />
              </FormField>
              <FormField label="サブタイトル" cmsKey="cta_section_subtitle">
                <TextInput
                  cmsKey="cta_section_subtitle"
                  value={settings.cta_section_subtitle}
                  onChange={(e) => setSettings({ ...settings, cta_section_subtitle: e.target.value })}
                />
              </FormField>
            </FormCard>
          </div>

          {/* 会社情報 */}
          <div>
            <FormCard title="会社情報" description="フッター・Aboutに表示">
              <FormField label="会社名" cmsKey="company_name">
                <TextInput
                  cmsKey="company_name"
                  value={settings.company_name}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                />
              </FormField>
              <FormField label="About見出し" cmsKey="about_title">
                <TextInput
                  cmsKey="about_title"
                  value={settings.about_title}
                  onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
                />
              </FormField>
              <FormField label="About説明" cmsKey="about_text">
                <TextArea
                  cmsKey="about_text"
                  value={settings.about_text}
                  onChange={(e) => setSettings({ ...settings, about_text: e.target.value })}
                  rows={4}
                />
              </FormField>
              <FormField label="ロゴ" cmsKey="logo">
                <ImagePicker
                  cmsKey="logo"
                  value={settings.logo}
                  onChange={(asset) => setSettings({ ...settings, logo: asset })}
                  onPickerOpen={() => openPicker('logo')}
                />
              </FormField>
            </FormCard>
          </div>

          {/* お問い合わせページ設定 */}
          <div>
            <FormCard title="お問い合わせページ設定" description="お問い合わせフォームの送信先など">
              <FormField label="メールアドレス" cmsKey="contact_email">
                <TextInput
                  cmsKey="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  placeholder="info@maxelus.com"
                />
              </FormField>
              <FormField label="電話番号" cmsKey="contact_phone">
                <TextInput
                  cmsKey="contact_phone"
                  value={settings.contact_phone}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                  placeholder="03-1234-5678"
                />
              </FormField>
              <FormField label="住所" cmsKey="contact_address">
                <TextArea
                  cmsKey="contact_address"
                  value={settings.contact_address}
                  onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                  rows={3}
                  placeholder="東京都..."
                />
              </FormField>
            </FormCard>
          </div>

          {/* サービスページ設定 */}
          <div>
            <FormCard title="サービスページ設定" description="サービスページのタイトル・サブタイトル・CTAボタン">
              <FormField label="ページタイトル" cmsKey="services_page_title">
                <TextInput
                  cmsKey="services_page_title"
                  value={settings.services_page_title}
                  onChange={(e) => setSettings({ ...settings, services_page_title: e.target.value })}
                />
              </FormField>
              <FormField label="ページサブタイトル" cmsKey="services_page_subtitle">
                <TextArea
                  cmsKey="services_page_subtitle"
                  value={settings.services_page_subtitle}
                  onChange={(e) => setSettings({ ...settings, services_page_subtitle: e.target.value })}
                  rows={2}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="CTAボタン1テキスト" cmsKey="services_page_cta_primary_text">
                  <TextInput
                    cmsKey="services_page_cta_primary_text"
                    value={settings.services_page_cta_primary_text}
                    onChange={(e) => setSettings({ ...settings, services_page_cta_primary_text: e.target.value })}
                  />
                </FormField>
                <FormField label="CTAボタン1リンク" cmsKey="services_page_cta_primary_href">
                  <TextInput
                    cmsKey="services_page_cta_primary_href"
                    value={settings.services_page_cta_primary_href}
                    onChange={(e) => setSettings({ ...settings, services_page_cta_primary_href: e.target.value })}
                    placeholder="/contact"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="CTAボタン2テキスト" cmsKey="services_page_cta_secondary_text">
                  <TextInput
                    cmsKey="services_page_cta_secondary_text"
                    value={settings.services_page_cta_secondary_text}
                    onChange={(e) => setSettings({ ...settings, services_page_cta_secondary_text: e.target.value })}
                  />
                </FormField>
                <FormField label="CTAボタン2リンク" cmsKey="services_page_cta_secondary_href">
                  <TextInput
                    cmsKey="services_page_cta_secondary_href"
                    value={settings.services_page_cta_secondary_href}
                    onChange={(e) => setSettings({ ...settings, services_page_cta_secondary_href: e.target.value })}
                    placeholder="/strengths"
                  />
                </FormField>
              </div>
            </FormCard>
          </div>

          {/* 強みページ設定 */}
          <div>
            <FormCard title="強みページ設定" description="強みページのタイトル・サブタイトル・CTAボタン">
              <FormField label="ページタイトル" cmsKey="strengths_page_title">
                <TextInput
                  cmsKey="strengths_page_title"
                  value={settings.strengths_page_title}
                  onChange={(e) => setSettings({ ...settings, strengths_page_title: e.target.value })}
                />
              </FormField>
              <FormField label="ページサブタイトル" cmsKey="strengths_page_subtitle">
                <TextArea
                  cmsKey="strengths_page_subtitle"
                  value={settings.strengths_page_subtitle}
                  onChange={(e) => setSettings({ ...settings, strengths_page_subtitle: e.target.value })}
                  rows={2}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="CTAボタン1テキスト" cmsKey="strengths_page_cta_primary_text">
                  <TextInput
                    cmsKey="strengths_page_cta_primary_text"
                    value={settings.strengths_page_cta_primary_text}
                    onChange={(e) => setSettings({ ...settings, strengths_page_cta_primary_text: e.target.value })}
                  />
                </FormField>
                <FormField label="CTAボタン1リンク" cmsKey="strengths_page_cta_primary_href">
                  <TextInput
                    cmsKey="strengths_page_cta_primary_href"
                    value={settings.strengths_page_cta_primary_href}
                    onChange={(e) => setSettings({ ...settings, strengths_page_cta_primary_href: e.target.value })}
                    placeholder="/contact"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="CTAボタン2テキスト" cmsKey="strengths_page_cta_secondary_text">
                  <TextInput
                    cmsKey="strengths_page_cta_secondary_text"
                    value={settings.strengths_page_cta_secondary_text}
                    onChange={(e) => setSettings({ ...settings, strengths_page_cta_secondary_text: e.target.value })}
                  />
                </FormField>
                <FormField label="CTAボタン2リンク" cmsKey="strengths_page_cta_secondary_href">
                  <TextInput
                    cmsKey="strengths_page_cta_secondary_href"
                    value={settings.strengths_page_cta_secondary_href}
                    onChange={(e) => setSettings({ ...settings, strengths_page_cta_secondary_href: e.target.value })}
                    placeholder="/services"
                  />
                </FormField>
              </div>
            </FormCard>
          </div>
        </div>
      </div>

      {/* 画像ピッカーモーダル */}
      <AssetsPickerModal
        isOpen={pickerOpen}
        onClose={() => {
          setPickerOpen(false)
          setPickerTarget(null)
        }}
        onSelect={handleImageSelect}
      />

      {/* 履歴モーダル */}
      {historyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            {/* モーダルヘッダー */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">保存履歴</h2>
              <button
                onClick={() => setHistoryOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 履歴一覧 */}
            <div className="flex-1 overflow-auto p-6">
              {loadingHistory ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-[#fff100] border-t-transparent rounded-full" />
                </div>
              ) : histories.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>履歴がありません</p>
                  <p className="text-sm mt-2">保存すると履歴が作成されます</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {histories.map((history) => (
                    <div
                      key={history.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            バージョン {history.version_number}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(history.created_at).toLocaleString('ja-JP')}
                          </span>
                        </div>
                        {history.note && (
                          <p className="text-sm text-gray-600 truncate">{history.note}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRestoreHistory(history.id)}
                        disabled={saving}
                        className="ml-4 px-4 py-2 bg-[#fff100] text-[#1a1f2e] font-medium rounded-lg hover:bg-[#fdc700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        復元
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
