import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { formatZodError } from '@/lib/cms/validators'
import { z } from 'zod'

const strengthUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  features: z.array(z.string().max(200)).optional(),
  icon: z.string().max(50).optional(),
  order_number: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
})

// GET /api/cms/strengths/[id] - 強み取得
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
      .from('strengths')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // JSONB fieldsをパース
    const parsedData = {
      ...data,
      features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features,
    }

    return NextResponse.json({ ok: true, data: parsedData })
  } catch (error) {
    console.error('GET /api/cms/strengths/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/strengths/[id] - 強み更新
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

    const result = strengthUpdateSchema.safeParse(patch)
    if (!result.success) {
      return NextResponse.json(formatZodError(result.error), { status: 422 })
    }

    const { data, error } = await supabase
      .from('strengths')
      .update(result.data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // JSONB fieldsをパース
    const parsedData = {
      ...data,
      features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features,
    }

    return NextResponse.json({ ok: true, data: parsedData })
  } catch (error) {
    console.error('PUT /api/cms/strengths/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/strengths/[id] - 強み削除
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
      .from('strengths')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/cms/strengths/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
