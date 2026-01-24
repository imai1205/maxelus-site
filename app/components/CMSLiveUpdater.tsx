'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface SiteSettings {
  hero_title?: string
  hero_subtitle?: string
  hero_description?: string
  cta_primary_text?: string
  cta_primary_href?: string
  cta_secondary_text?: string
  cta_secondary_href?: string
  challenge_title?: string
  challenge_subtitle?: string
  challenge_before_items?: string[]
  challenge_after_items?: string[]
  solution_title?: string
  solution_subtitle?: string
  services_title?: string
  works_title?: string
  works_subtitle?: string
  works_stat_1_label?: string
  works_stat_2_label?: string
  works_stat_3_label?: string
  faq_title?: string
  faqs?: Array<{ question: string; answer: string }>
  cta_section_title?: string
  cta_section_subtitle?: string
  services_page_title?: string
  services_page_subtitle?: string
  services_page_cta_primary_text?: string
  services_page_cta_primary_href?: string
  services_page_cta_secondary_text?: string
  services_page_cta_secondary_href?: string
  strengths_page_title?: string
  strengths_page_subtitle?: string
  strengths_page_cta_primary_text?: string
  strengths_page_cta_primary_href?: string
  strengths_page_cta_secondary_text?: string
  strengths_page_cta_secondary_href?: string
}

export default function CMSLiveUpdater() {
  const searchParams = useSearchParams()
  const isPreview = searchParams.get('preview') === '1'

  useEffect(() => {
    if (!isPreview) return

    const handleMessage = (event: MessageEvent) => {
      try {
        // セキュリティ: 同じオリジンからのメッセージのみ処理
        if (event.origin !== window.location.origin) return
        
        if (event.data?.type === 'CMS_UPDATE' && event.data?.settings) {
          updateDOM(event.data.settings)
        }
      } catch (error) {
        console.error('CMSLiveUpdater: Error handling message', error)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isPreview])

  const updateDOM = (settings: SiteSettings) => {
    try {
      // Hero Section
      updateTextContentWithLineBreaks('[data-cms-key="site.hero_title"]', settings.hero_title)
      updateTextContentWithLineBreaks('[data-cms-key="site.hero_subtitle"]', settings.hero_subtitle)
      updateTextContent('[data-cms-key="site.hero_description"]', settings.hero_description)
      
      // CTA Buttons
      const ctaPrimary = document.querySelector('[data-cms-key="site.cta_primary_text"]')
      if (ctaPrimary) {
        const span = ctaPrimary.querySelector('span')
        if (span && settings.cta_primary_text) {
          span.textContent = settings.cta_primary_text
        }
        if (settings.cta_primary_href && ctaPrimary instanceof HTMLAnchorElement) {
          ctaPrimary.href = settings.cta_primary_href
        }
      }
      
      updateTextContent('[data-cms-key="site.cta_secondary_text"]', settings.cta_secondary_text)
      const ctaSecondary = document.querySelector('[data-cms-key="site.cta_secondary_text"]')
      if (ctaSecondary && settings.cta_secondary_href && ctaSecondary instanceof HTMLAnchorElement) {
        ctaSecondary.href = settings.cta_secondary_href
      }
    
    // Challenge Section
    updateTextContent('[data-cms-key="site.challenge_title"]', settings.challenge_title)
    updateTextContent('[data-cms-key="site.challenge_subtitle"]', settings.challenge_subtitle)
    
    // Before/After items
    if (settings.challenge_before_items) {
      settings.challenge_before_items.forEach((item, i) => {
        const el = document.querySelector(`[data-cms-key="site.challenge_before_${i}"]`)
        if (el) {
          // span要素を探す（クラス名に関係なく）
          const span = el.querySelector('span')
          if (span) {
            span.textContent = item
          } else {
            // spanが見つからない場合は、直接テキストを更新
            el.textContent = item
          }
        }
      })
    }
    if (settings.challenge_after_items) {
      settings.challenge_after_items.forEach((item, i) => {
        const el = document.querySelector(`[data-cms-key="site.challenge_after_${i}"]`)
        if (el) {
          // span要素を探す（クラス名に関係なく）
          const span = el.querySelector('span')
          if (span) {
            span.textContent = item
          } else {
            // spanが見つからない場合は、直接テキストを更新
            el.textContent = item
          }
        }
      })
    }
    
    // Solution Section
    updateTextContentWithLineBreaks('[data-cms-key="site.solution_title"]', settings.solution_title)
    updateTextContent('[data-cms-key="site.solution_subtitle"]', settings.solution_subtitle)
    
    // Services Section
    updateTextContent('[data-cms-key="site.services_title"]', settings.services_title)
    
    // Works Section
    updateTextContent('[data-cms-key="site.works_title"]', settings.works_title)
    updateTextContent('[data-cms-key="site.works_subtitle"]', settings.works_subtitle)
    updateTextContent('[data-cms-key="site.works_stat_1_label"]', settings.works_stat_1_label)
    updateTextContent('[data-cms-key="site.works_stat_2_label"]', settings.works_stat_2_label)
    updateTextContent('[data-cms-key="site.works_stat_3_label"]', settings.works_stat_3_label)
    
    // FAQ Section
    updateTextContent('[data-cms-key="site.faq_title"]', settings.faq_title)
    if (settings.faqs) {
      settings.faqs.forEach((faq, i) => {
        updateTextContent(`[data-cms-key="site.faq_${i}_q"]`, faq.question)
        updateTextContent(`[data-cms-key="site.faq_${i}_a"]`, faq.answer)
      })
    }
    
      // CTA Section (修正: cta_title → cta_section_title)
      updateTextContentWithLineBreaks('[data-cms-key="site.cta_section_title"]', settings.cta_section_title)
      updateTextContent('[data-cms-key="site.cta_section_subtitle"]', settings.cta_section_subtitle)
    } catch (error) {
      console.error('CMSLiveUpdater: Error updating DOM', error)
    }
  }

  const updateTextContent = (selector: string, value: string | undefined) => {
    if (!value) return
    try {
      const el = document.querySelector(selector)
      if (el) {
        el.textContent = value
      }
    } catch (error) {
      console.warn(`CMSLiveUpdater: Failed to update ${selector}`, error)
    }
  }

  const updateTextContentWithLineBreaks = (selector: string, value: string | undefined) => {
    if (!value) return
    try {
      const el = document.querySelector(selector)
      if (el) {
        // 改行を<br>に変換
        const lines = value.split('\n')
        el.innerHTML = lines.map((line, i) => {
          if (i === 0) return line
          return `<br />${line}`
        }).join('')
      }
    } catch (error) {
      console.warn(`CMSLiveUpdater: Failed to update ${selector}`, error)
    }
  }

  return null
}
