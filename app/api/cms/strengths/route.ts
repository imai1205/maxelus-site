import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { formatZodError } from '@/lib/cms/validators'
import { z } from 'zod'

const strengthCreateSchema = z.object({
  title: z.string().min(1).max(200).default('新規強み'),
  description: z.string().max(1000).optional(),
  features: z.array(z.string().max(200)).optional(),
  icon: z.string().max(50).optional(),
  order_number: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
})

// GET /api/cms/strengths - 強み一覧取得
export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ ok: false, error: 'Supabaseが設定されていません' }, { status: 500 })
    }

    const supabase = await createSupabaseServerClient()

    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    let query = supabase
      .from('strengths')
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
      features: typeof item.features === 'string' ? JSON.parse(item.features) : item.features,
    }))

    return NextResponse.json({ ok: true, data: parsedData })
  } catch (error) {
    console.error('GET /api/cms/strengths error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/strengths - 強み作成
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
    const result = strengthCreateSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(formatZodError(result.error), { status: 422 })
    }

    const { data, error } = await supabase
      .from('strengths')
      .insert(result.data)
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
    console.error('POST /api/cms/strengths error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
