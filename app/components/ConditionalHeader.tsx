'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // 管理画面と LP では共通ヘッダー(メインナビ)を表示しない
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/lp/')) {
    return null
  }
  
  return <Header />
}
