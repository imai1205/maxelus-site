'use client'

import cn from 'clsx'
import {
  Children,
  type CSSProperties,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import s from './reveal.module.css'

interface StaggerRevealProps extends PropsWithChildren {
  className?: string | undefined
  /** Delay added to each child in ms */
  step?: number | undefined
  /** Initial delay in ms before the first child appears */
  delay?: number | undefined
  distance?: number | undefined
  variant?: 'fade' | 'blur' | 'slideLeft' | 'slideRight' | undefined
  as?: 'ul' | 'ol' | 'div' | undefined
  /** When true, fade/slide back out as the container leaves the viewport. */
  repeat?: boolean | undefined
}

interface ChildExtraProps {
  className?: string
  style?: CSSProperties
}

export function StaggerReveal({
  children,
  className,
  step = 120,
  delay = 0,
  distance = 24,
  variant = 'fade',
  as: Tag = 'div',
  repeat = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
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
  }, [repeat])

  const Component = Tag as 'div'

  return (
    <Component ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        const element = child as ReactElement<ChildExtraProps>
        const existing = element.props
        return cloneElement(element, {
          className: cn(
            existing.className,
            s.reveal,
            variant === 'blur' && s.blur,
            variant === 'slideLeft' && s.slideLeft,
            variant === 'slideRight' && s.slideRight,
            visible && s.visible
          ),
          style: {
            ...existing.style,
            ['--reveal-delay' as string]: `${delay + i * step}ms`,
            ['--reveal-distance' as string]: `${distance}px`,
          } as CSSProperties,
        })
      })}
    </Component>
  )
}
