// 事例ページ用データ構造
// 業種カテゴリ → 事例一覧の構造

export interface Industry {
  id: string;
  label: string;
  description: string;
  heroImage: string;
}

export interface Case {
  id: string;
  industryId: string;
  title: string;
  summary: string; // 課題→解決の要約
  tags: string[]; // AI/分析/自動化/3D/UIなど
  image: string; // サムネ画像
  problem: string; // 課題
  solution: string; // 施策
  impact: string; // 効果（定量が理想、なければ定性）
  screenshots?: string[]; // 画面イメージ
  technologies?: string[]; // 使用技術
  lpHref?: string; // LPがある場合
}

// 業種カテゴリ
export const industries: Industry[] = [
  {
    id: 'manufacturing',
    label: '製造',
    description: '図面管理、受発注管理、生産管理など',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'retail',
    label: '店舗',
    description: 'ECサイト、POS連携、在庫管理など',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'content',
    label: 'コンテンツ',
    description: 'メディア、ブログ、動画配信など',
    heroImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'medical',
    label: '医療',
    description: '診療管理、予約システム、カルテ管理など',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'saas',
    label: 'SaaS',
    description: '業務ツール、分析ダッシュボード、API連携など',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'beauty',
    label: '美容・サービス',
    description: 'サロン、エステ、美容院など',
    heroImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a94f4ed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'other',
    label: 'その他',
    description: 'その他の業種・用途',
    heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  },
];

// 事例データ（各業種最低3件）
export const cases: Case[] = [
  // 製造業
  {
    id: 'case-manufacturing-1',
    industryId: 'manufacturing',
    title: '製造業向け図面・案件管理DXシステム',
    summary: 'Excelでの図面管理や案件情報の手作業転記により、情報の検索に時間がかかり、更新漏れやバージョン違いが頻発していました。',
    tags: ['図面管理', 'OCR', 'AI', '検索'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    problem: 'Excelでの図面管理や案件情報の手作業転記により、情報の検索に時間がかかり、更新漏れやバージョン違いが頻発していました。',
    solution: '図面をOCRで読み取り、AIで項目整理。図番・会社・材質などで検索可能にし、案件管理と連携。',
    impact: '検索時間90%削減、更新漏れゼロ、バージョン管理の一元化を実現',
    technologies: ['Next.js', 'Supabase', 'OCR API', 'AI'],
    lpHref: '/lp/zumen-connect',
  },
  {
    id: 'case-manufacturing-2',
    industryId: 'manufacturing',
    title: '製造業向け販売管理システム',
    summary: '見積→受注→工程→納品→請求まで、Excelで管理していたため二重入力が発生し、進捗把握が困難でした。',
    tags: ['販売管理', '受発注', '在庫', 'スマホ対応'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    problem: '見積→受注→工程→納品→請求まで、Excelで管理していたため二重入力が発生し、進捗把握が困難でした。',
    solution: '見積から請求まで一気通貫で管理できるシステムを構築。PC＋スマホで現場からも更新可能に。',
    impact: '二重入力ゼロ、進捗リアルタイム把握、原価計算の自動化を実現',
    technologies: ['Next.js', 'Supabase', 'React Native'],
  },
  {
    id: 'case-manufacturing-3',
    industryId: 'manufacturing',
    title: '3D可視化・シミュレーションシステム',
    summary: '設計段階での問題を早期発見したいが、3Dツールが複雑で使いこなせない課題がありました。',
    tags: ['3D', '可視化', 'シミュレーション'],
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b9a08?auto=format&fit=crop&w=800&q=80',
    problem: '設計段階での問題を早期発見したいが、3Dツールが複雑で使いこなせない課題がありました。',
    solution: 'Webブラウザ上で3Dモデルを操作できるシステムを構築。設計検証や製造工程の可視化を実現。',
    impact: '設計ミス70%削減、設計レビュー時間50%短縮',
    technologies: ['Three.js', 'Next.js', 'WebGL'],
  },

  // 店舗
  {
    id: 'case-retail-1',
    industryId: 'retail',
    title: 'ECサイト・在庫管理システム',
    summary: 'ECサイトと店舗在庫が連携しておらず、在庫切れや過剰在庫が発生していました。',
    tags: ['EC', '在庫管理', 'POS連携'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    problem: 'ECサイトと店舗在庫が連携しておらず、在庫切れや過剰在庫が発生していました。',
    solution: 'ECサイトと店舗在庫をリアルタイムで連携。POSシステムとも連携し、在庫を一元管理。',
    impact: '在庫切れゼロ、過剰在庫30%削減、売上20%向上',
    technologies: ['Next.js', 'Supabase', 'Stripe API'],
  },
  {
    id: 'case-retail-2',
    industryId: 'retail',
    title: '店舗向け予約・顧客管理システム',
    summary: '電話予約が多く、予約漏れや二重予約が発生。顧客情報の管理もバラバラでした。',
    tags: ['予約システム', '顧客管理', '自動化'],
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    problem: '電話予約が多く、予約漏れや二重予約が発生。顧客情報の管理もバラバラでした。',
    solution: 'Web予約システムを構築。顧客情報を一元管理し、予約状況をリアルタイムで共有。',
    impact: '予約漏れゼロ、予約処理時間50%短縮、顧客満足度向上',
    technologies: ['Next.js', 'Supabase', 'SendGrid'],
  },
  {
    id: 'case-retail-3',
    industryId: 'retail',
    title: '店舗向け分析ダッシュボード',
    summary: '売上データがバラバラで、経営判断の材料が不足していました。',
    tags: ['分析', 'ダッシュボード', 'BI'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    problem: '売上データがバラバラで、経営判断の材料が不足していました。',
    solution: '複数のデータソースを統合し、リアルタイムで分析できるダッシュボードを構築。',
    impact: '経営判断のスピード向上、売上分析時間80%削減',
    technologies: ['Next.js', 'Supabase', 'Chart.js'],
  },

  // コンテンツ
  {
    id: 'case-content-1',
    industryId: 'content',
    title: 'メディアサイト・CMS構築',
    summary: 'WordPressでは物足りない、体験型のメディアサイトを作りたいという要望がありました。',
    tags: ['Web制作', 'CMS', '3D', 'インタラクティブ'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    problem: 'WordPressでは物足りない、体験型のメディアサイトを作りたいという要望がありました。',
    solution: '3Dモデルやインタラクティブアニメーションを組み込んだ体験型メディアサイトを構築。',
    impact: '滞在時間2倍、SNSシェア3倍、ブランド認知度向上',
    technologies: ['Next.js', 'Three.js', 'Framer Motion'],
    lpHref: '/lp/interactive-web-3d',
  },
  {
    id: 'case-content-2',
    industryId: 'content',
    title: '動画配信プラットフォーム',
    summary: '動画コンテンツの管理・配信が手作業で、効率が悪い課題がありました。',
    tags: ['動画配信', 'CMS', '自動化'],
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    problem: '動画コンテンツの管理・配信が手作業で、効率が悪い課題がありました。',
    solution: '動画アップロードから配信まで自動化。AIで動画分析・タグ付けも実装。',
    impact: '配信作業時間80%削減、動画検索精度向上',
    technologies: ['Next.js', 'Supabase', 'Video API', 'AI'],
  },
  {
    id: 'case-content-3',
    industryId: 'content',
    title: 'ブログ・記事管理システム',
    summary: '複数のライターが記事を書くが、管理がバラバラで公開フローが複雑でした。',
    tags: ['CMS', 'ワークフロー', 'コラボレーション'],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?auto=format&fit=crop&w=800&q=80',
    problem: '複数のライターが記事を書くが、管理がバラバラで公開フローが複雑でした。',
    solution: '記事の執筆から公開まで一元管理できるCMSを構築。承認フローも自動化。',
    impact: '公開フロー時間50%短縮、記事管理の一元化',
    technologies: ['Next.js', 'Supabase', 'Rich Text Editor'],
  },

  // 医療
  {
    id: 'case-medical-1',
    industryId: 'medical',
    title: '診療予約・患者管理システム',
    summary: '電話予約が多く、予約漏れや待ち時間の把握が困難でした。',
    tags: ['予約システム', '患者管理', '自動化'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
    problem: '電話予約が多く、予約漏れや待ち時間の把握が困難でした。',
    solution: 'Web予約システムを構築。患者情報を一元管理し、待ち時間をリアルタイムで表示。',
    impact: '予約漏れゼロ、待ち時間30%短縮、患者満足度向上',
    technologies: ['Next.js', 'Supabase', 'Twilio'],
  },
  {
    id: 'case-medical-2',
    industryId: 'medical',
    title: 'カルテ管理・分析システム',
    summary: 'カルテデータが紙ベースで、検索や分析が困難でした。',
    tags: ['カルテ管理', '分析', 'AI'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173cba13d4f?auto=format&fit=crop&w=800&q=80',
    problem: 'カルテデータが紙ベースで、検索や分析が困難でした。',
    solution: 'カルテをデジタル化し、AIで要約・分類。検索機能も強化。',
    impact: 'カルテ検索時間90%削減、データ分析の自動化',
    technologies: ['Next.js', 'Supabase', 'AI API'],
  },
  {
    id: 'case-medical-3',
    industryId: 'medical',
    title: '医療機器管理システム',
    summary: '医療機器のメンテナンス記録がバラバラで、管理が困難でした。',
    tags: ['機器管理', 'メンテナンス', 'IoT'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    problem: '医療機器のメンテナンス記録がバラバラで、管理が困難でした。',
    solution: '医療機器のメンテナンス記録を一元管理。IoT連携で自動記録も実装。',
    impact: 'メンテナンス漏れゼロ、管理時間50%削減',
    technologies: ['Next.js', 'Supabase', 'IoT API'],
  },

  // SaaS
  {
    id: 'case-saas-1',
    industryId: 'saas',
    title: '業務ツールSaaS開発',
    summary: '既存のSaaSでは足りない、自社専用の業務ツールを作りたいという要望がありました。',
    tags: ['SaaS', '業務ツール', 'カスタム開発'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    problem: '既存のSaaSでは足りない、自社専用の業務ツールを作りたいという要望がありました。',
    solution: 'MVPから始めて、段階的に機能を追加。ユーザーフィードバックを反映しながら改善。',
    impact: '業務効率50%向上、ユーザー満足度95%',
    technologies: ['Next.js', 'Supabase', 'Stripe'],
  },
  {
    id: 'case-saas-2',
    industryId: 'saas',
    title: '分析ダッシュボードSaaS',
    summary: '複数のデータソースを統合し、リアルタイムで分析できるツールが必要でした。',
    tags: ['分析', 'ダッシュボード', 'BI', 'API連携'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    problem: '複数のデータソースを統合し、リアルタイムで分析できるツールが必要でした。',
    solution: '複数のデータソースを統合し、リアルタイムで分析できるダッシュボードを構築。',
    impact: '分析時間80%削減、経営判断のスピード向上',
    technologies: ['Next.js', 'Supabase', 'Chart.js', 'API'],
  },
  {
    id: 'case-saas-3',
    industryId: 'saas',
    title: 'API連携・自動化ツール',
    summary: '複数のSaaS間でデータ連携が必要だが、手作業で二重入力が発生していました。',
    tags: ['API連携', '自動化', 'ワークフロー'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    problem: '複数のSaaS間でデータ連携が必要だが、手作業で二重入力が発生していました。',
    solution: 'API連携により、複数のSaaS間でデータを自動同期。ワークフローも自動化。',
    impact: '二重入力ゼロ、作業時間70%削減',
    technologies: ['Next.js', 'Supabase', 'Zapier API', 'Webhook'],
  },

  // 美容・サービス
  {
    id: 'case-beauty-1',
    industryId: 'beauty',
    title: 'まつげサロン向けホームページ',
    summary: 'ピンク系の優しいデザインで、お客様に「まいにちがきらきらなあなたへ」を届けるホームページを制作。メニュー紹介、施術の流れ、FAQ、サロン検索機能などを実装。',
    tags: ['ホームページ制作', 'レスポンシブ', '予約システム', 'UI/UX'],
    image: 'https://www.figma.com/api/mcp/asset/5a2485c4-a1e9-48b0-983a-1111d3da2430',
    problem: '既存のホームページが古く、お客様に魅力が伝わらない。予約機能やメニュー情報が見つけにくい。',
    solution: 'ピンク系の優しいデザインで、お客様に親しみやすさを演出。メニュー紹介、施術の流れ、FAQ、サロン検索機能を分かりやすく配置。レスポンシブ対応でスマホからも快適に閲覧可能。',
    impact: '問い合わせ数30%増加、予約率向上、ブランドイメージ向上を実現',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'レスポンシブデザイン'],
    lpHref: '/lp/eyelash-salon',
  },

  // その他
  {
    id: 'case-other-1',
    industryId: 'other',
    title: '不動産向け物件管理システム',
    summary: '物件情報の管理がバラバラで、検索や更新が困難でした。',
    tags: ['物件管理', '検索', '3D'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    problem: '物件情報の管理がバラバラで、検索や更新が困難でした。',
    solution: '物件情報を一元管理し、3D可視化や検索機能を実装。',
    impact: '検索時間80%削減、物件情報の一元化',
    technologies: ['Next.js', 'Supabase', 'Three.js'],
  },
  {
    id: 'case-other-2',
    industryId: 'other',
    title: '教育向け学習管理システム',
    summary: '学習進捗の管理が手作業で、効率が悪い課題がありました。',
    tags: ['学習管理', '進捗管理', '分析'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    problem: '学習進捗の管理が手作業で、効率が悪い課題がありました。',
    solution: '学習進捗を自動記録し、分析ダッシュボードで可視化。',
    impact: '管理時間60%削減、学習効果の可視化',
    technologies: ['Next.js', 'Supabase', 'Chart.js'],
  },
  {
    id: 'case-other-3',
    industryId: 'other',
    title: '飲食店向け注文・在庫管理システム',
    summary: '注文管理と在庫管理がバラバラで、在庫切れが頻発していました。',
    tags: ['注文管理', '在庫管理', 'POS連携'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    problem: '注文管理と在庫管理がバラバラで、在庫切れが頻発していました。',
    solution: '注文と在庫を一元管理。POSシステムとも連携し、リアルタイムで在庫を更新。',
    impact: '在庫切れゼロ、在庫管理時間50%削減',
    technologies: ['Next.js', 'Supabase', 'POS API'],
  },
];

// 業種IDで事例を取得
export function getCasesByIndustry(industryId: string): Case[] {
  return cases.filter(c => c.industryId === industryId);
}

// 全事例を取得
export function getAllCases(): Case[] {
  return cases;
}

// IDで事例を取得
export function getCaseById(id: string): Case | undefined {
  return cases.find(c => c.id === id);
}
