import { z } from 'zod'

// Site Settings 更新スキーマ（全セクション対応）
export const siteSettingsPatchSchema = z.object({
  // Hero Section
  hero_title: z.string().max(200).optional(),
  hero_subtitle: z.string().max(500).optional(),
  hero_description: z.string().max(500).optional(),
  hero_image_asset_id: z.string().uuid().nullable().optional(),
  cta_primary_text: z.string().max(50).optional(),
  cta_primary_href: z.string().max(200).optional(),
  cta_secondary_text: z.string().max(50).optional(),
  cta_secondary_href: z.string().max(200).optional(),
  
  // Challenge Section
  challenge_title: z.string().max(100).optional(),
  challenge_subtitle: z.string().max(200).optional(),
  challenge_before_items: z.array(z.string()).optional(),
  challenge_after_items: z.array(z.string()).optional(),
  
  // Solution Section
  solution_title: z.string().max(200).optional(),
  solution_subtitle: z.string().max(200).optional(),
  
  // Services Section
  services_title: z.string().max(100).optional(),
  services: z.array(z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    icon: z.string(),
  })).optional(),
  
  // Works Section
  works_title: z.string().max(100).optional(),
  works_subtitle: z.string().max(200).optional(),
  works_stat_1_number: z.number().int().optional(),
  works_stat_1_suffix: z.string().max(10).optional(),
  works_stat_1_label: z.string().max(50).optional(),
  works_stat_2_number: z.number().int().optional(),
  works_stat_2_suffix: z.string().max(10).optional(),
  works_stat_2_label: z.string().max(50).optional(),
  works_stat_3_number: z.number().int().optional(),
  works_stat_3_suffix: z.string().max(10).optional(),
  works_stat_3_label: z.string().max(50).optional(),
  
  // FAQ Section
  faq_title: z.string().max(100).optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  
  // CTA Section
  cta_section_title: z.string().max(200).optional(),
  cta_section_subtitle: z.string().max(500).optional(),
  
  // Company Info
  company_name: z.string().max(100).optional(),
  logo_asset_id: z.string().uuid().nullable().optional(),
  about_title: z.string().max(100).optional(),
  about_text: z.string().max(1000).optional(),
  // Contact Page
  contact_email: z.string().email().max(200).optional(),
  contact_phone: z.string().max(50).optional(),
  contact_address: z.string().max(500).optional(),
  // Page Settings
  strengths_page_title: z.string().max(200).optional(),
  strengths_page_subtitle: z.string().max(500).optional(),
  strengths_stats: z.array(z.object({
    label: z.string(),
    value: z.number(),
    suffix: z.string(),
  })).optional(),
  services_page_title: z.string().max(200).optional(),
  services_page_subtitle: z.string().max(500).optional(),
  services_page_cta_primary_text: z.string().max(100).optional(),
  services_page_cta_primary_href: z.string().max(200).optional(),
  services_page_cta_secondary_text: z.string().max(100).optional(),
  services_page_cta_secondary_href: z.string().max(200).optional(),
  strengths_page_cta_primary_text: z.string().max(100).optional(),
  strengths_page_cta_primary_href: z.string().max(200).optional(),
  strengths_page_cta_secondary_text: z.string().max(100).optional(),
  strengths_page_cta_secondary_href: z.string().max(200).optional(),
  contact_page_title: z.string().max(200).optional(),
  contact_page_subtitle: z.string().max(500).optional(),
})

export type SiteSettingsPatch = z.infer<typeof siteSettingsPatchSchema>

// Service 作成スキーマ
export const serviceCreateSchema = z.object({
  title: z.string().min(1).max(200).default('新規サービス'),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'スラッグは英小文字、数字、ハイフンのみ'),
})

export type ServiceCreate = z.infer<typeof serviceCreateSchema>

// Service 更新スキーマ
export const serviceUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'スラッグは英小文字、数字、ハイフンのみ').optional(),
  catch: z.string().max(200).optional(),
  summary: z.string().max(1000).optional(),
  tags: z.array(z.string().max(50)).optional(),
  primary_cta_label: z.string().max(100).optional(),
  external_url: z.string().url().max(500).nullable().optional(),
  icon: z.string().max(50).optional(),
  order_number: z.number().int().min(0).optional(),
  detail_content: z.any().optional(), // JSONBなのでany
  published: z.boolean().optional(),
})

export type ServiceUpdate = z.infer<typeof serviceUpdateSchema>

// Works 作成スキーマ
export const workCreateSchema = z.object({
  title: z.string().min(1).max(200).default('新規実績'),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'スラッグは英小文字、数字、ハイフンのみ'),
})

export type WorkCreate = z.infer<typeof workCreateSchema>

// Works 更新スキーマ
export const workUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'スラッグは英小文字、数字、ハイフンのみ').optional(),
  category: z.string().max(100).optional(),
  summary: z.string().max(500).optional(),
  industry: z.string().max(100).optional(),
  problem: z.string().max(2000).optional(),
  solution: z.string().max(2000).optional(),
  result: z.string().max(2000).optional(),
  stack: z.string().max(500).optional(),
  cover_asset_id: z.string().uuid().nullable().optional(),
  published: z.boolean().optional(),
  sort_order: z.number().int().min(0).optional(),
})

export type WorkUpdate = z.infer<typeof workUpdateSchema>

// Asset alt更新スキーマ
export const assetUpdateSchema = z.object({
  alt: z.string().max(200),
})

export type AssetUpdate = z.infer<typeof assetUpdateSchema>

// バリデーションエラーをJSON形式に整形
export function formatZodError(error: z.ZodError) {
  return {
    ok: false,
    error: 'Validation failed',
    issues: error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  }
}
