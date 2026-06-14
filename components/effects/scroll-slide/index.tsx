'use client'

import cn from 'clsx'
import gsap from 'gsap'
import { ScrollTrigger as GSAPScrollTrigger } from 'gsap/all'
import { useLenis } from 'lenis/react'
import { type PropsWithChildren, useEffect, useRef } from 'react'
import s from './scroll-slide.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(GSAPScrollTrigger)
}

type Direction = 'left' | 'right' | 'up' | 'down'

interface ScrollSlideProps extends PropsWithChildren {
  direction?: Direction
  /** GSAP-compatible distance string e.g. "60vw", "300px" */
  distance?: string
  rotate?: number
  fade?: boolean
  className?: string | undefined
  /** ScrollTrigger start, default 'top bottom' (element top hits viewport bottom) */
  start?: string
  /** ScrollTrigger end, default 'top 50%' (element top reaches viewport center — animation completes before user reaches middle of element) */
  end?: string
  scrub?: number | boolean
  as?: 'div' | 'section' | 'article' | 'aside'
}

export function ScrollSlide({
  children,
  direction = 'left',
  distance = '60vw',
  rotate = 0,
  fade = false,
  className,
  start = 'top bottom',
  end = 'top 50%',
  scrub = 0.5,
  as: Tag = 'div',
}: ScrollSlideProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) {
      gsap.set(node, { x: 0, y: 0, rotate: 0, opacity: 1, clearProps: 'all' })
      return
    }

    let fromX: string | number = 0
    let fromY: string | number = 0
    if (direction === 'left') fromX = `-${distance}`
    else if (direction === 'right') fromX = distance
    else if (direction === 'up') fromY = `-${distance}`
    else if (direction === 'down') fromY = distance

    const tween = gsap.fromTo(
      node,
      {
        x: fromX,
        y: fromY,
        rotate,
        opacity: fade ? 0 : 1,
      },
      {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start,
          end,
          scrub,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [direction, distance, rotate, fade, start, end, scrub])

  useLenis(() => GSAPScrollTrigger.update())

  const Component = Tag as 'div'

  return (
    <Component ref={ref as never} className={cn(s.slide, className)}>
      {children}
    </Component>
  )
}
