'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface SiteSettings {
  hero_title: string
  hero_subtitle: string
  hero_description: string
  hero_image: { id: string; bucket: string; path: string; alt: string } | null
  cta_primary_text: string
  cta_primary_href: string
  cta_secondary_text: string
  cta_secondary_href: string
  about_title: string
  about_text: string
  company_name: string
  logo: { id: string; bucket: string; path: string; alt: string } | null
}

interface CMSDataProviderProps {
  children: (settings: SiteSettings | null) => React.ReactNode
}

export default function CMSDataProvider({ children }: CMSDataProviderProps) {
  const searchParams = useSearchParams()
  const isPreview = searchParams.get('preview') === '1'
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  // CMSデータを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/cms/site')
        const data = await res.json()
        if (data.ok) {
          setSettings(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch CMS data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // プレビューモードの場合、親ウィンドウからの更新メッセージをリッスン
  useEffect(() => {
    if (!isPreview) return

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CMS_UPDATE' && event.data?.settings) {
        setSettings(event.data.settings)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isPreview])

  if (loading) {
    return <>{children(null)}</>
  }

  return <>{children(settings)}</>
}
