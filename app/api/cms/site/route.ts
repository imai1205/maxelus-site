import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { siteSettingsPatchSchema, formatZodError } from '@/lib/cms/validators'

// デフォルトのサイト設定（テーブル未作成時のフォールバック）
const defaultSiteSettings = {
  id: 'site',
  
  // Hero Section
  hero_title: 'そのソフト、現場に合わせて\n"我慢して"使っていませんか？',
  hero_subtitle: '業務にソフトを合わせる時代は終わり。\nまずは"触れるデモ"で、最短ルートを見える化します。',
  hero_image: null,
  cta_primary_text: '無料相談する',
  cta_primary_href: '/contact',
  cta_secondary_text: '実績を見る',
  cta_secondary_href: '/works',
  
  // Challenge Section
  challenge_title: '課題は"ズレ"から起きる',
  challenge_subtitle: '開発の失敗の多くは、認識のズレから生まれます。',
  challenge_before_items: ['仕様が固まらない', '途中で手戻りが出る', '追加費用が怖い'],
  challenge_after_items: ['触れるデモで合意', '設計確定→開発', '予算と範囲が明確'],
  
  // Solution Section
  solution_title: 'その業務、システム化して\n"人を増やさず"回すのはどうですか？',
  solution_subtitle: '日々のムダを減らして、現場の処理速度を上げる。',
  
  // Services Section
  services_title: '対応できる内容',
  services: [
    { title: 'HP制作', description: "普通のHPも、3D/アニメーションみたいな『尖った表現』も対応。", tags: ['3D', 'アニメ', 'CMS'], icon: 'web' },
    { title: 'Webアプリ開発', description: '新規事業のSaaSも、社内ツールも。まずはMVPから最短で形に。', tags: ['MVP', 'DB', '認証'], icon: 'app' },
    { title: '業務DXアプリ', description: "散らばった業務を一元管理。集計・分析まで『すぐ見える化』。", tags: ['一元管理', '分析', 'ワークフロー'], icon: 'dx' },
    { title: 'クラウド連携', description: 'SaaS同士をAPIで接続して、二重入力をゼロに。', tags: ['API', '自動同期', '運用設計'], icon: 'cloud' },
    { title: 'iOS/Androidアプリ', description: 'あなたのアイデアをアプリ化。Web連携・DB連携もまとめて対応。', tags: ['Swift', 'Flutter', 'ストア申請'], icon: 'mobile' },
    { title: 'AI活用・自動化', description: '資料・図面・問い合わせ対応をAIで自動化。検索も爆速に。', tags: ['OCR', 'AI検索', '自動化'], icon: 'ai' },
  ],
  
  // Works Section
  works_title: '実績',
  works_subtitle: '製造業、医療、建設など、幅広い業界で実績があります',
  works_stat_1_number: 50,
  works_stat_1_suffix: '+',
  works_stat_1_label: 'プロジェクト実績',
  works_stat_2_number: 98,
  works_stat_2_suffix: '%',
  works_stat_2_label: '顧客満足度',
  works_stat_3_number: 15,
  works_stat_3_suffix: '+',
  works_stat_3_label: '業界対応',
  
  // FAQ Section
  faq_title: 'よくある質問',
  faqs: [
    { question: '料金はどれくらいかかりますか？', answer: '30万円〜対応可能です。内容や規模により異なりますので、まずは無料相談でご要望をお聞かせください。お見積りを提示いたします。' },
    { question: '開発期間はどれくらいですか？', answer: 'プロジェクト規模により異なりますが、シンプルなLPなら2週間〜、Webアプリなら1〜3ヶ月が目安です。デモ提示後に正確なスケジュールをご提示します。' },
    { question: '途中で仕様変更できますか？', answer: 'デモ提示の段階で認識を合わせるため、大きな手戻りは発生しにくい仕組みです。軽微な修正は柔軟に対応しますが、大幅な変更は追加費用が発生する場合があります。' },
    { question: '運用・保守もお願いできますか？', answer: 'はい、運用・保守も対応可能です。月額での保守契約や、都度対応など、ご要望に合わせてプランをご提案します。' },
    { question: '契約の流れを教えてください', answer: '無料相談 → デモ提示 → お見積り → 契約 → 開発 → 納品 の流れです。各ステップで確認しながら進めるため、安心してご依頼いただけます。' },
    { question: '業界は問わず対応できますか？', answer: 'はい、製造業、医療、建設、不動産、飲食など、業界問わず対応可能です。お客様の業務内容をヒアリングし、最適なソリューションをご提案します。' },
  ],
  
  // CTA Section
  cta_title: '既製品に合わせるのをやめて、\n"自社に最適化"しませんか？',
  cta_subtitle: 'まずは無料相談で、課題整理→触れるデモ提示まで一緒に進めます。',
  
  // Company Info
  company_name: 'MAXELUS',
  logo: null,
  about_title: '私たちについて',
  about_text: '私たちは、お客様のビジネスをデジタルで支援するパートナーです。',
}

// GET /api/cms/site - Site Settings取得
export async function GET() {
  try {
    // Supabaseが設定されていない場合はデフォルト値を返す
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        ok: true, 
        data: defaultSiteSettings,
        isDefault: true,
        message: 'Supabaseが設定されていません。デフォルト値を表示しています。'
      })
    }

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
      // テーブルが存在しない、またはレコードがない場合もデフォルト値を返す
      console.warn('site_settings fetch error:', error.message)
      return NextResponse.json({ 
        ok: true, 
        data: defaultSiteSettings,
        isDefault: true,
        message: 'データベースにテーブルが存在しません。schema.sqlを実行してください。'
      })
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
      strengths_stats: typeof data.strengths_stats === 'string' 
        ? JSON.parse(data.strengths_stats) 
        : data.strengths_stats,
    }

    return NextResponse.json({ ok: true, data: parsedData })
  } catch (error) {
    console.error('GET /api/cms/site error:', error)
    return NextResponse.json({ 
      ok: true, 
      data: defaultSiteSettings,
      isDefault: true,
      message: 'データ取得中にエラーが発生しました。'
    })
  }
}

// POST /api/cms/site - 初期データを保存
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    // 初期データを保存
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        id: 'site',
        hero_title: defaultSiteSettings.hero_title,
        hero_subtitle: defaultSiteSettings.hero_subtitle,
        cta_primary_text: defaultSiteSettings.cta_primary_text,
        cta_primary_href: defaultSiteSettings.cta_primary_href,
        cta_secondary_text: defaultSiteSettings.cta_secondary_text,
        cta_secondary_href: defaultSiteSettings.cta_secondary_href,
        challenge_title: defaultSiteSettings.challenge_title,
        challenge_subtitle: defaultSiteSettings.challenge_subtitle,
        challenge_before_items: defaultSiteSettings.challenge_before_items,
        challenge_after_items: defaultSiteSettings.challenge_after_items,
        solution_title: defaultSiteSettings.solution_title,
        solution_subtitle: defaultSiteSettings.solution_subtitle,
        services_title: defaultSiteSettings.services_title,
        services: defaultSiteSettings.services,
        works_title: defaultSiteSettings.works_title,
        works_subtitle: defaultSiteSettings.works_subtitle,
        works_stat_1_number: defaultSiteSettings.works_stat_1_number,
        works_stat_1_suffix: defaultSiteSettings.works_stat_1_suffix,
        works_stat_1_label: defaultSiteSettings.works_stat_1_label,
        works_stat_2_number: defaultSiteSettings.works_stat_2_number,
        works_stat_2_suffix: defaultSiteSettings.works_stat_2_suffix,
        works_stat_2_label: defaultSiteSettings.works_stat_2_label,
        works_stat_3_number: defaultSiteSettings.works_stat_3_number,
        works_stat_3_suffix: defaultSiteSettings.works_stat_3_suffix,
        works_stat_3_label: defaultSiteSettings.works_stat_3_label,
        faq_title: defaultSiteSettings.faq_title,
        faqs: defaultSiteSettings.faqs,
        cta_title: defaultSiteSettings.cta_title,
        cta_subtitle: defaultSiteSettings.cta_subtitle,
        company_name: defaultSiteSettings.company_name,
        about_title: defaultSiteSettings.about_title,
        about_text: defaultSiteSettings.about_text,
      }, {
        onConflict: 'id'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('POST /api/cms/site error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/site - Site Settings更新
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    // リクエストボディをパース
    const body = await request.json()
    const { patch } = body

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/cms/site/route.ts:PUT',message:'Received patch data',data:{patchKeys:patch ? Object.keys(patch) : [],patch},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    if (!patch || typeof patch !== 'object') {
      return NextResponse.json({ ok: false, error: 'patch object is required' }, { status: 422 })
    }

    // Zodでバリデーション
    const result = siteSettingsPatchSchema.safeParse(patch)
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/cms/site/route.ts:PUT',message:'Zod validation result',data:{success:result.success,errors:result.success ? null : result.error.issues},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    if (!result.success) {
      return NextResponse.json(formatZodError(result.error), { status: 422 })
    }

    // テーブルの実際の構造を確認（既存レコードを取得してキーを確認）
    // #region agent log
    const { data: existingRecord, error: fetchError } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'site')
      .single();
    const actualColumns = existingRecord ? Object.keys(existingRecord) : [];
    const missingColumns = result.data ? Object.keys(result.data).filter(key => !actualColumns.includes(key)) : [];
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/cms/site/route.ts:PUT',message:'Table structure analysis',data:{actualColumns,updateKeys:result.data ? Object.keys(result.data) : [],missingColumns,fetchError:fetchError?.message,fetchErrorCode:fetchError?.code},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
    // #endregion

    // 存在するカラムのみをフィルタリング
    const filteredData = result.data ? Object.keys(result.data)
      .filter(key => actualColumns.includes(key))
      .reduce((obj, key) => {
        obj[key] = (result.data as any)[key];
        return obj;
      }, {} as Record<string, any>) : {};

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/cms/site/route.ts:PUT',message:'Filtered update data',data:{filteredKeys:Object.keys(filteredData),excludedKeys:missingColumns},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
    // #endregion

    // 更新（存在するカラムのみ）
    const { data, error } = await supabase
      .from('site_settings')
      .update(filteredData)
      .eq('id', 'site')
      .select()
      .single()

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/cms/site/route.ts:PUT',message:'Supabase update result',data:{error:error?.message,errorCode:error?.code,errorDetails:error?.details,errorHint:error?.hint,updateKeys:result.data ? Object.keys(result.data) : []},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/cms/site/route.ts:PUT',message:'Exception caught',data:{errorMessage:error instanceof Error ? error.message : String(error),errorStack:error instanceof Error ? error.stack : undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    console.error('PUT /api/cms/site error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
