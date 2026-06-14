'use client'

import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import s from './hero-scroll-scene.module.css'

const FRAME_PATH = '/scroll-frames-home/frame'
const FRAME_COUNT = 118
const FRAME_NATURAL_W = 1280
const FRAME_NATURAL_H = 720
const POSTER = '/scroll-frames-home/frame-001.jpg'

const MOBILE_QUERY = '(max-width: 799.98px)'

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

function detectAvifSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img.width > 0 && img.height > 0)
    img.onerror = () => resolve(false)
    img.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI='
  })
}

function buildFrameUrl(
  base: string,
  index: number,
  isMobile: boolean,
  ext: 'avif' | 'webp'
) {
  const num = String(index).padStart(3, '0')
  const suffix = isMobile ? '.mobile' : ''
  return `${base}-${num}${suffix}.${ext}`
}

export function HeroScrollScene() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const drawnFrameRef = useRef(-1)
  const [progress, setProgress] = useState(0)
  const [variant, setVariant] = useState<{
    isMobile: boolean
    ext: 'avif' | 'webp'
  } | null>(null)

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY).matches
    let cancelled = false
    detectAvifSupport().then((avif) => {
      if (cancelled) return
      setVariant({ isMobile: mobile, ext: avif ? 'avif' : 'webp' })
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Tie progress to total page scroll so the scene spans top to bottom.
  useLenis(({ scroll }) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const p = docHeight > 0 ? clamp(scroll / docHeight, 0, 1) : 0
    setProgress(p)
  })

  // Preload frame images.
  useEffect(() => {
    if (!variant) return
    const list: HTMLImageElement[] = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.fetchPriority = i === 1 ? 'high' : 'low'
      img.src = buildFrameUrl(FRAME_PATH, i, variant.isMobile, variant.ext)
      list.push(img)
      img.decode().catch(() => {
        // ignore early-decode rejection
      })
    }
    framesRef.current = list
  }, [variant])

  // Canvas drawing setup.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const drawFrame = (idx: number) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const safe = clamp(idx, 0, FRAME_COUNT - 1)
      const frame = framesRef.current[safe]
      if (!frame?.complete || frame.naturalWidth === 0) return
      drawnFrameRef.current = safe
      const cw = canvas.width
      const ch = canvas.height
      const iw = frame.naturalWidth || FRAME_NATURAL_W
      const ih = frame.naturalHeight || FRAME_NATURAL_H
      const scale = Math.max(cw / iw, ch / ih)
      const dw = iw * scale
      const dh = ih * scale
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(frame, dx, dy, dw, dh)
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      drawFrame(drawnFrameRef.current >= 0 ? drawnFrameRef.current : 0)
    }

    ;(
      canvas as HTMLCanvasElement & { _drawFrame?: (i: number) => void }
    )._drawFrame = drawFrame

    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Update canvas frame on progress change.
  useEffect(() => {
    const canvas = canvasRef.current as
      | (HTMLCanvasElement & { _drawFrame?: (i: number) => void })
      | null
    if (!canvas?._drawFrame) return
    const idx = Math.round(progress * (FRAME_COUNT - 1))
    if (idx !== drawnFrameRef.current) {
      canvas._drawFrame(idx)
    }
  }, [progress])

  const overlayAlpha = 0.22 - progress * 0.1

  return (
    <>
      <div className={s.stage} aria-hidden="true">
        <div className={s.layer}>
          {/* biome-ignore lint/performance/noImgElement: poster fallback before canvas frames load */}
          <img
            src={POSTER}
            alt=""
            className={s.layerMedia}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className={s.layer}>
          <canvas ref={canvasRef} className={s.layerMedia} />
        </div>
        <div
          className={s.overlay}
          style={{ background: `rgba(5, 7, 13, ${overlayAlpha})` }}
        />
        <div className={s.lightLine} />
      </div>

      <section ref={sectionRef} className={s.hero} aria-label="ヒーロー">
        <div className={s.panels}>
          <div className={s.panel}>
            <div className={`${s.content} ${s.heroContent}`}>
              <span className={s.kicker}>MAXELUS INC.</span>
              <h1 className={s.title}>
                業務を整え、
                <br />
                大切なことに時間を使える世界へ。
              </h1>
              <p className={s.lede}>
                MAXELUSは、Webサイト制作・業務アプリ開発・AI活用支援を通じて、現場で使われる仕組みを設計・開発する会社です。
              </p>
              <div className={s.ctas}>
                <Link href="/contact" className={`${s.cta} ${s.primary}`}>
                  無料相談する
                </Link>
                <Link href="/services" className={`${s.cta} ${s.secondary}`}>
                  サービスを見る
                </Link>
              </div>
            </div>
            <div className={s.scrollCue} aria-hidden="true">
              <span>SCROLL</span>
              <span className={s.scrollLine} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
