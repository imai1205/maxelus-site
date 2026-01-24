import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// GET /api/cms/works - Works一覧取得
export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック（管理画面用）
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const published = searchParams.get('published')

    let query = supabase
      .from('works')
      .select(`
        *,
        cover:cover_asset_id(id, bucket, path, alt)
      `)
      .order('sort_order', { ascending: true })

    if (search) {
      query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`)
    }

    if (published === 'true') {
      query = query.eq('published', true)
    } else if (published === 'false') {
      query = query.eq('published', false)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('GET /api/cms/works error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/works - 新規Work作成（ドラフト）
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    // ユニークなslugを生成
    const timestamp = Date.now()
    const slug = `work-${timestamp}`

    // ドラフト作成
    const { data, error } = await supabase
      .from('works')
      .insert({
        title: '新規実績',
        slug,
        published: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('POST /api/cms/works error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
