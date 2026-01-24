'use client'

import { useState, useRef, useEffect } from 'react'

type DeviceType = 'desktop' | 'tablet' | 'mobile'

const deviceSizes: Record<DeviceType, { width: number; height: number; label: string }> = {
  desktop: { width: 1440, height: 900, label: 'PC' },
  tablet: { width: 768, height: 1024, label: 'タブレット' },
  mobile: { width: 375, height: 667, label: 'スマホ' },
}

interface PreviewFrameProps {
  url: string
  onMessage?: (data: { type: string; key: string }) => void
  iframeRef?: React.RefObject<HTMLIFrameElement | null>
}

export default function PreviewFrame({ url, onMessage, iframeRef: externalIframeRef }: PreviewFrameProps) {
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [scale, setScale] = useState(0.57)
  const internalIframeRef = useRef<HTMLIFrameElement>(null)
  const iframeRef = externalIframeRef || internalIframeRef
  const containerRef = useRef<HTMLDivElement>(null)

  // postMessageを受信
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        // セキュリティ: 同じオリジンからのメッセージのみ処理
        if (event.origin !== window.location.origin) return
        
        if (event.data?.type === 'CMS_SELECT' && event.data?.key) {
          onMessage?.(event.data)
        }
      } catch (error) {
        console.error('PreviewFrame: Error handling message', error)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onMessage])

  // コンテナサイズに合わせてスケールを計算
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      
      const containerWidth = containerRef.current.clientWidth - 48 // padding
      const containerHeight = containerRef.current.clientHeight - 48
      const deviceWidth = deviceSizes[device].width
      const deviceHeight = deviceSizes[device].height
      
      const scaleX = containerWidth / deviceWidth
      const scaleY = containerHeight / deviceHeight
      const newScale = Math.min(scaleX, scaleY, 1)
      
      setScale(newScale)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [device])

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const handleOpenNewTab = () => {
    window.open(url, '_blank')
  }

  const currentDevice = deviceSizes[device]
  const scaledWidth = currentDevice.width * scale
  const scaledHeight = currentDevice.height * scale

  return (
    <div className="flex flex-col h-full bg-[#2a2f3e]">
      {/* ツールバー */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1f2e] border-b border-white/10">
        {/* デバイス切替 */}
        <div className="flex items-center gap-1 bg-[#2a2f3e] rounded-lg p-1">
          {(Object.keys(deviceSizes) as DeviceType[]).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                device === d
                  ? 'bg-white text-[#1a1f2e]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {deviceSizes[d].label}
            </button>
          ))}
        </div>

        {/* サイズ表示 */}
        <div className="text-gray-400 text-sm">
          {currentDevice.width} × {currentDevice.height} • {Math.round(scale * 100)}%
        </div>

        {/* アクションボタン */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="リロード"
          >
            <ReloadIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleOpenNewTab}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="新規タブで開く"
          >
            <ExternalLinkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* プレビューエリア */}
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-6 overflow-hidden"
      >
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{
            width: scaledWidth,
            height: scaledHeight,
          }}
        >
          <iframe
            ref={iframeRef}
            src={`${url}?preview=1`}
            className="w-full h-full border-0"
            style={{
              width: currentDevice.width,
              height: currentDevice.height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            title="プレビュー"
          />
        </div>
      </div>
    </div>
  )
}

// リロードメソッドを外部から呼べるようにexport
export function reloadPreview(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  if (iframeRef.current) {
    iframeRef.current.src = iframeRef.current.src
  }
}

function ReloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}
