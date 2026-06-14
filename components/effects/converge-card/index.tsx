'use client'

import {
  type CSSProperties,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import s from './converge-card.module.css'

type Direction = 'left' | 'top' | 'right'

interface ConvergeCardProps extends PropsWithChildren {
  direction: Direction
  delay?: number
}

const DIRECTION_CLASS: Record<Direction, string> = {
  left: s.fromLeft ?? '',
  top: s.fromTop ?? '',
  right: s.fromRight ?? '',
}

const ANIM_DURATION = 1400

export function ConvergeCard({
  direction,
  delay = 0,
  children,
}: ConvergeCardProps) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) {
      /* eslint-disable react-hooks/set-state-in-effect -- reduced-motion 時の同期表示 (移植元 React Compiler 前提) */
      setVisible(true)
      setInteractive(true)
      /* eslint-enable react-hooks/set-state-in-effect */
      return
    }
    const target = node.parentElement ?? node
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px 10% 0px', threshold: 0 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setInteractive(true), delay + ANIM_DURATION)
    return () => clearTimeout(t)
  }, [visible, delay])

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
  }

  return (
    <li
      ref={ref}
      className={`${s.card} ${DIRECTION_CLASS[direction]} ${visible ? s.cardVisible : ''} ${interactive ? s.cardInteractive : ''}`}
      style={style}
    >
      {children}
    </li>
  )
}
