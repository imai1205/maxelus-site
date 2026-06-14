import cn from 'clsx'
import type { ComponentType, ElementType, ReactNode } from 'react'
import { createElement } from 'react'
import s from './glow-card.module.css'

type GlowCardIntensity = 'subtle' | 'normal' | 'strong'

interface GlowCardProps {
  as?: ElementType | ComponentType<Record<string, unknown>> | undefined
  className?: string | undefined
  children: ReactNode
  intensity?: GlowCardIntensity | undefined
  interactive?: boolean | undefined
  [key: string]: unknown
}

const INTENSITY_CLASS: Record<GlowCardIntensity, string> = {
  subtle: s.subtle ?? '',
  normal: s.normal ?? '',
  strong: s.strong ?? '',
}

export function GlowCard({
  as,
  className,
  children,
  intensity = 'normal',
  interactive = true,
  ...rest
}: GlowCardProps) {
  const Component = (as ?? 'div') as ElementType
  return createElement(
    Component,
    {
      className: cn(
        s.root,
        INTENSITY_CLASS[intensity],
        interactive && s.interactive,
        className
      ),
      ...rest,
    },
    children
  )
}
