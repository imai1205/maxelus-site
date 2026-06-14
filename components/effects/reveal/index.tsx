'use client'

import cn from 'clsx'
import { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import s from './reveal.module.css'

type RevealVariant = 'fade' | 'blur' | 'slideLeft' | 'slideRight'

interface RevealProps extends PropsWithChildren {
  className?: string | undefined
  delay?: number | undefined
  immediate?: boolean | undefined
  distance?: number | undefined
  variant?: RevealVariant | undefined
  as?: 'div' | 'section' | 'article' | 'aside' | 'li' | undefined
  /** When true, fade/slide back out as the element leaves the viewport. */
  repeat?: boolean | undefined
}

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
  distance = 24,
  variant = 'fade',
  as: Tag = 'div',
  repeat = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
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
      { rootMargin: '-8% 0px -12% 0px', threshold: [0, 0.12] }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [immediate, repeat])

  const Component = Tag as 'div'

  return (
    <Component
      ref={ref}
      className={cn(
        s.reveal,
        variant === 'blur' && s.blur,
        variant === 'slideLeft' && s.slideLeft,
        variant === 'slideRight' && s.slideRight,
        visible && s.visible,
        className
      )}
      style={
        {
          '--reveal-delay': `${delay}ms`,
          '--reveal-distance': `${distance}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Component>
  )
}
