import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { workUpdateSchema, formatZodError } from '@/lib/cms/validators'

// GET /api/cms/works/[id] - Work詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('works')
      .select(`
        *,
        cover:cover_asset_id(id, bucket, path, alt)
      `)
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 404 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('GET /api/cms/works/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/works/[id] - Work更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Zodでバリデーション
    const result = workUpdateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(formatZodError(result.error), { status: 422 })
    }

    // slug重複チェック
    if (result.data.slug) {
      const { data: existing } = await supabase
        .from('works')
        .select('id')
        .eq('slug', result.data.slug)
        .neq('id', id)
        .single()

      if (existing) {
        return NextResponse.json({
          ok: false,
          error: 'Slug already exists',
          issues: [{ path: 'slug', message: 'このスラッグは既に使用されています' }],
        }, { status: 422 })
      }
    }

    // 更新
    const { data, error } = await supabase
      .from('works')
      .update(result.data)
      .eq('id', id)
      .select(`
        *,
        cover:cover_asset_id(id, bucket, path, alt)
      `)
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('PUT /api/cms/works/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/works/[id] - Work削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('works')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/cms/works/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
