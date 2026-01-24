import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { serviceUpdateSchema, formatZodError } from '@/lib/cms/validators'

// GET /api/cms/services/[id] - サービス取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ ok: false, error: 'Supabaseが設定されていません' }, { status: 500 })
    }

    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // JSONB fieldsをパース
    const parsedData = {
      ...data,
      tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags,
      detail_content: typeof data.detail_content === 'string' ? JSON.parse(data.detail_content) : data.detail_content,
    }

    return NextResponse.json({ ok: true, data: parsedData })
  } catch (error) {
    console.error('GET /api/cms/services/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/services/[id] - サービス更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const { patch } = body

    if (!patch || typeof patch !== 'object') {
      return NextResponse.json({ ok: false, error: 'patch object is required' }, { status: 422 })
    }

    const result = serviceUpdateSchema.safeParse(patch)
    if (!result.success) {
      return NextResponse.json(formatZodError(result.error), { status: 422 })
    }

    const { data, error } = await supabase
      .from('services')
      .update(result.data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('PUT /api/cms/services/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/services/[id] - サービス削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ ok: false, error: 'Supabaseが設定されていません' }, { status: 500 })
    }

    const supabase = await createSupabaseServerClient()

    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/cms/services/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
