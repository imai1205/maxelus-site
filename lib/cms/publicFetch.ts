import { createSupabaseServerClient } from '../supabase/server'

// 全てのCMSフェッチは tags: ['cms'] を使用
const CMS_CACHE_TAG = 'cms'

// Site Settings を取得
export async function getSiteSettings() {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('site_settings')
    .select(`
      *,
      hero_image:hero_image_asset_id(id, bucket, path, alt),
      logo:logo_asset_id(id, bucket, path, alt)
    `)
    .eq('id', 'site')
    .single()

  if (error) {
    console.error('Failed to fetch site settings:', error)
    return null
  }

  return data
}

// 公開済み Works 一覧を取得
export async function getPublishedWorks() {
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
    console.error('Failed to fetch works:', error)
    return []
  }

  return data || []
}

// Works詳細を取得（slug指定）
export async function getWorkBySlug(slug: string) {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('works')
    .select(`
      *,
      cover:cover_asset_id(id, bucket, path, alt)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Failed to fetch work:', error)
    return null
  }

  return data
}

// 公開済み Services 一覧を取得
export async function getPublishedServices() {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('order_number', { ascending: true })

  if (error) {
    console.error('Failed to fetch services:', error)
    return []
  }

  // JSONB fieldsをパース
  const parsedData = (data || []).map(item => ({
    ...item,
    tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags,
    detail_content: typeof item.detail_content === 'string' ? JSON.parse(item.detail_content) : item.detail_content,
  }))

  return parsedData
}

// Service詳細を取得（slug指定）
export async function getServiceBySlug(slug: string) {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Failed to fetch service:', error)
    return null
  }

  // JSONB fieldsをパース
  const parsedData = {
    ...data,
    tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags,
    detail_content: typeof data.detail_content === 'string' ? JSON.parse(data.detail_content) : data.detail_content,
  }

  return parsedData
}

// 公開済み Strengths 一覧を取得
export async function getPublishedStrengths() {
  const supabase = await createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('strengths')
    .select('*')
    .eq('published', true)
    .order('order_number', { ascending: true })

  if (error) {
    console.error('Failed to fetch strengths:', error)
    return []
  }

  // JSONB fieldsをパース
  const parsedData = (data || []).map(item => ({
    ...item,
    features: typeof item.features === 'string' ? JSON.parse(item.features) : item.features,
  }))

  return parsedData
}

// Asset の公開URLを生成
export function getAssetPublicUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

// キャッシュタグを取得（revalidateTag用）
export function getCmsCacheTag() {
  return CMS_CACHE_TAG
}
