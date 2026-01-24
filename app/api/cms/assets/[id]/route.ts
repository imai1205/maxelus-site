import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { assetUpdateSchema, formatZodError } from '@/lib/cms/validators'

// PUT /api/cms/assets/[id] - Asset更新（alt等）
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
    const result = assetUpdateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(formatZodError(result.error), { status: 422 })
    }

    // 更新
    const { data, error } = await supabase
      .from('assets')
      .update(result.data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.bucket}/${data.path}`

    return NextResponse.json({
      ok: true,
      data: {
        ...data,
        publicUrl,
      },
    })
  } catch (error) {
    console.error('PUT /api/cms/assets/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/assets/[id] - Asset削除
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

    // まずassetを取得
    const { data: asset, error: getError } = await supabase
      .from('assets')
      .select('bucket, path')
      .eq('id', id)
      .single()

    if (getError || !asset) {
      return NextResponse.json({ ok: false, error: 'Asset not found' }, { status: 404 })
    }

    // Storageからファイル削除
    await supabase.storage.from(asset.bucket).remove([asset.path])

    // DBから削除
    const { error: deleteError } = await supabase
      .from('assets')
      .delete()
      .eq('id', id)

    if (deleteError) {
      return NextResponse.json({ ok: false, error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/cms/assets/[id] error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
