'use client'

import cn from 'clsx'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import s from './char-stagger.module.css'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
type Variant = 'fadeUp' | 'shake'

interface CharStaggerProps {
  text: string
  as?: Tag | undefined
  className?: string | undefined
  /** Initial delay in ms before first char appears */
  delay?: number | undefined
  /** Per-char stagger in ms */
  step?: number | undefined
  /** When true, replay when re-entering viewport */
  repeat?: boolean | undefined
  /** Start visible without observer (for above-the-fold immediate reveal) */
  immediate?: boolean | undefined
  /** Animation style */
  variant?: Variant | undefined
}

export function CharStagger({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  step = 60,
  repeat = false,
  immediate = false,
  variant = 'fadeUp',
}: CharStaggerProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(immediate)

  useEffect(() => {
    if (immediate) return
    const node = ref.current
    if (!node) return
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reduced-motion 時の同期表示 (移植元 React Compiler 前提)
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (repeat) {
            setVisible(entry.isIntersecting)
          } else if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [immediate, repeat])

  const Component = Tag as 'span'
  const chars = Array.from(text)

  return (
    <Component
      ref={ref as never}
      className={cn(
        s.root,
        variant === 'fadeUp' && s.fadeUp,
        variant === 'shake' && s.shake,
        visible && s.visible,
        className
      )}
      aria-label={text}
    >
      {chars.map((ch, i) => {
        if (ch === '\n') {
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: char position is stable
              key={i}
              className={s.charBreak}
              aria-hidden="true"
            />
          )
        }
        const isSpace = ch === ' ' || ch === '　'
        const charDelay = delay + i * step
        const style = { '--char-delay': `${charDelay}ms` } as CSSProperties
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: char position is stable
            key={i}
            className={cn(s.char, isSpace && s.charSpace)}
            style={style}
            aria-hidden="true"
          >
            {ch}
          </span>
        )
      })}
    </Component>
  )
}
