import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'

// POST /api/cms/site/history/restore - 履歴を復元
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

    // 履歴データを取得
    const { data: history, error: historyError } = await supabase
      .from('site_settings_history')
      .select('*')
      .eq('id', history_id)
      .single()

    if (historyError || !history) {
      return NextResponse.json({ ok: false, error: '履歴が見つかりません' }, { status: 404 })
    }

    // site_settingsを更新（履歴の内容で上書き）
    const { data, error } = await supabase
      .from('site_settings')
      .update({
        hero_title: history.hero_title,
        hero_subtitle: history.hero_subtitle,
        hero_description: history.hero_description,
        hero_image_asset_id: history.hero_image_asset_id,
        cta_primary_text: history.cta_primary_text,
        cta_primary_href: history.cta_primary_href,
        cta_secondary_text: history.cta_secondary_text,
        cta_secondary_href: history.cta_secondary_href,
        challenge_title: history.challenge_title,
        challenge_subtitle: history.challenge_subtitle,
        challenge_before_items: history.challenge_before_items,
        challenge_after_items: history.challenge_after_items,
        solution_title: history.solution_title,
        solution_subtitle: history.solution_subtitle,
        services_title: history.services_title,
        services: history.services,
        works_title: history.works_title,
        works_subtitle: history.works_subtitle,
        works_stat_1_number: history.works_stat_1_number,
        works_stat_1_suffix: history.works_stat_1_suffix,
        works_stat_1_label: history.works_stat_1_label,
        works_stat_2_number: history.works_stat_2_number,
        works_stat_2_suffix: history.works_stat_2_suffix,
        works_stat_2_label: history.works_stat_2_label,
        works_stat_3_number: history.works_stat_3_number,
        works_stat_3_suffix: history.works_stat_3_suffix,
        works_stat_3_label: history.works_stat_3_label,
        faq_title: history.faq_title,
        faqs: history.faqs,
        cta_section_title: history.cta_section_title,
        cta_section_subtitle: history.cta_section_subtitle,
        company_name: history.company_name,
        logo_asset_id: history.logo_asset_id,
        about_title: history.about_title,
        about_text: history.about_text,
      })
      .eq('id', 'site')
      .select()
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('POST /api/cms/site/history/restore error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}