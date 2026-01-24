import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// GET /api/cms/works/public - 公開済みWorks一覧取得（認証不要）
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { data, error } = await supabase
      .from('works')
      .select(`
        *,
        cover:cover_asset_id(id, bucket, path, alt)
      `)
      .eq('published', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('GET /api/cms/works/public error:', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data: data || [] })
  } catch (error) {
    console.error('GET /api/cms/works/public error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
