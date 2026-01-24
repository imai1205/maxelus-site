'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // 管理画面ではヘッダーを表示しない
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <Header />
}
