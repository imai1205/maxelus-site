import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { serviceCreateSchema, serviceUpdateSchema, formatZodError } from '@/lib/cms/validators'

// GET /api/cms/services - サービス一覧取得
export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ ok: false, error: 'Supabaseが設定されていません' }, { status: 500 })
    }

    const supabase = await createSupabaseServerClient()

    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    let query = supabase
      .from('services')
      .select('*')
      .order('order_number', { ascending: true })

    if (published === 'true') {
      query = query.eq('published', true)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // JSONB fieldsをパース
    const parsedData = (data || []).map(item => ({
      ...item,
      tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags,
      detail_content: typeof item.detail_content === 'string' ? JSON.parse(item.detail_content) : item.detail_content,
    }))

    return NextResponse.json({ ok: true, data: parsedData })
  } catch (error) {
    console.error('GET /api/cms/services error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/services - サービス作成
export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ ok: false, error: 'Supabaseが設定されていません' }, { status: 500 })
    }

    const supabase = await createSupabaseServerClient()

    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const result = serviceCreateSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(formatZodError(result.error), { status: 422 })
    }

    const { data, error } = await supabase
      .from('services')
      .insert(result.data)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('POST /api/cms/services error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
