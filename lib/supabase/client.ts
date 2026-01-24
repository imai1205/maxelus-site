'use client'

import { createBrowserClient } from '@supabase/ssr'

// 環境変数チェック
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase環境変数が設定されていません')
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
