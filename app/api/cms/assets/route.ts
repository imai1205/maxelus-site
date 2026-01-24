import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const BUCKET_NAME = process.env.NEXT_PUBLIC_CMS_ASSETS_BUCKET || 'cms-assets'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// GET /api/cms/assets - Assets一覧取得
export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''

    let query = supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`path.ilike.%${search}%,alt.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // 公開URLを付与
    const assetsWithUrl = data?.map((asset) => ({
      ...asset,
      publicUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${asset.bucket}/${asset.path}`,
    }))

    return NextResponse.json({ ok: true, data: assetsWithUrl })
  } catch (error) {
    console.error('GET /api/cms/assets error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/assets - ファイルアップロード
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ ok: false, error: 'File is required' }, { status: 422 })
    }

    // ファイルタイプチェック
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({
        ok: false,
        error: 'Invalid file type. Allowed: jpg, png, webp',
      }, { status: 422 })
    }

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        ok: false,
        error: 'File too large. Max size: 5MB',
      }, { status: 422 })
    }

    // ファイル名を生成
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const path = `${timestamp}-${randomStr}.${ext}`

    // Storageにアップロード
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json({ ok: false, error: uploadError.message }, { status: 500 })
    }

    // 画像サイズを取得（簡易版：クライアントから送信されない場合はnull）
    const width = formData.get('width') ? parseInt(formData.get('width') as string) : null
    const height = formData.get('height') ? parseInt(formData.get('height') as string) : null

    // assetsテーブルに登録
    const { data: asset, error: insertError } = await supabase
      .from('assets')
      .insert({
        bucket: BUCKET_NAME,
        path,
        alt: file.name.replace(/\.[^/.]+$/, ''), // 拡張子を除いたファイル名
        width,
        height,
      })
      .select()
      .single()

    if (insertError) {
      // アップロード済みファイルを削除
      await supabase.storage.from(BUCKET_NAME).remove([path])
      return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 })
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`

    return NextResponse.json({
      ok: true,
      data: {
        ...asset,
        publicUrl,
      },
    })
  } catch (error) {
    console.error('POST /api/cms/assets error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
