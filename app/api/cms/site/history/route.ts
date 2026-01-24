import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'

// GET /api/cms/site/history - 履歴一覧を取得
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data, error } = await supabase
      .from('site_settings_history')
      .select(`
        id,
        version_number,
        created_at,
        created_by,
        note
      `)
      .eq('site_settings_id', 'site')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('GET /api/cms/site/history error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/cms/site/history/[id] - 特定の履歴を取得
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
    const { history_id } = body

    if (!history_id) {
      return NextResponse.json({ ok: false, error: 'history_id is required' }, { status: 422 })
    }

    const { data, error } = await supabase
      .from('site_settings_history')
      .select(`
        *,
        hero_image:hero_image_asset_id(id, bucket, path, alt),
        logo:logo_asset_id(id, bucket, path, alt)
      `)
      .eq('id', history_id)
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // JSONB fieldsをパース
    const parsedData = {
      ...data,
      challenge_before_items: typeof data.challenge_before_items === 'string'
        ? JSON.parse(data.challenge_before_items)
        : data.challenge_before_items,
      challenge_after_items: typeof data.challenge_after_items === 'string'
        ? JSON.parse(data.challenge_after_items)
        : data.challenge_after_items,
      services: typeof data.services === 'string'
        ? JSON.parse(data.services)
        : data.services,
      faqs: typeof data.faqs === 'string'
        ? JSON.parse(data.faqs)
        : data.faqs,
    }

    return NextResponse.json({ ok: true, data: parsedData })
  } catch (error) {
    console.error('POST /api/cms/site/history error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
