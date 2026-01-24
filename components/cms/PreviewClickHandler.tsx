'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PreviewClickHandler() {
  const searchParams = useSearchParams()
  const isPreview = searchParams.get('preview') === '1'

  useEffect(() => {
    if (!isPreview) return

    // CMS編集可能要素にホバースタイルを追加
    const style = document.createElement('style')
    style.textContent = `
      [data-cms-key] {
        cursor: pointer !important;
        transition: outline 0.15s ease, background-color 0.15s ease;
      }
      [data-cms-key]:hover {
        outline: 2px dashed #fff100 !important;
        outline-offset: 2px !important;
        background-color: rgba(255, 241, 0, 0.1) !important;
      }
    `
    document.head.appendChild(style)

    // クリックイベントをリッスン
    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement
        const cmsElement = target.closest('[data-cms-key]')
        
        if (cmsElement) {
          // リンクやボタンの場合は、デフォルト動作を防ぐ
          const isLinkOrButton = target.closest('a, button')
          if (isLinkOrButton) {
            e.preventDefault()
            e.stopPropagation()
          }
          
          const key = cmsElement.getAttribute('data-cms-key')
          if (key && window.parent !== window) {
            window.parent.postMessage({ type: 'CMS_SELECT', key }, window.location.origin)
          }
        }
      } catch (error) {
        console.error('PreviewClickHandler: Error handling click', error)
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
      if (style.parentNode) {
        style.remove()
      }
    }
  }, [isPreview])

  return null
}
